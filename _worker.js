export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    if (url.pathname === '/api/check' && request.method === 'POST') {
      try {
        const { code } = await request.json();
        if (!code) {
          return new Response(JSON.stringify({ message: '请输入兑换码' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const input = code.trim();
        const SECRET_SALT = "celistria123"; // 建议改成 env.SECRET_SALT

        // 新增：判断是否 Mega 链接格式
        const megaRegex = /^https:\/\/mega\.nz\/file\/[A-Za-z0-9_-]{8}#[A-Za-z0-9_-]{43}$/;
        const isMega = megaRegex.test(input);

        let responseData;

        if (isMega) {
          // Mega 模式：获取 IP 并检查限制
          const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
          const attemptsKey = `ip_attempts::${ip}`;
          const banKey = `ip_ban_until::${ip}`;
          
          // 检查是否禁用
          const banUntil = await env.KEY_RECODER.get(banKey);
          if (banUntil && Date.now() < parseInt(banUntil)) {
            const daysLeft = Math.ceil((parseInt(banUntil) - Date.now()) / (1000 * 60 * 60 * 24));
            responseData = { type: 'error', message: `您今天已经尝试了250回，因此此功能暂时在一周内被限制无法使用，如果有问题请私聊管理员。剩余${daysLeft}天。` };
          } else {
            // 计算哈希（整个输入 + 盐）
            const raw = input + SECRET_SALT;
            const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashedKey = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

            const value = await env.KEY_RECODER.get(hashedKey);
            
            let tail;
            if (value) {
              // 匹配 KV：使用预设尾部
              const data = JSON.parse(value);
              tail = data.content || '默认尾部';
              responseData = { type: 'mega', tail }; // 成功：返回真实尾部
              // 成功时，重置尝试次数
              await env.KEY_RECODER.put(attemptsKey, '0');
            } else {
              // 不匹配：生成随机尾部
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
              const randomId = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
              const randomKey = Array.from({ length: 43 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
              tail = `${randomId}#${randomKey}`;
              responseData = { type: 'mega', tail }; // 失败：返回随机尾部（看起来一样）

              // 累加错误尝试
              let attempts = parseInt(await env.KEY_RECODER.get(attemptsKey) || '0');
              attempts += 1;
              await env.KEY_RECODER.put(attemptsKey, attempts.toString());

              if (attempts >= 100) {
                // 超过100：禁用一周（7天）
                const banTime = Date.now() + (7 * 24 * 60 * 60 * 1000); // ms
                await env.KEY_RECODER.put(banKey, banTime.toString());
                responseData = { type: 'error', message: '您今天已经尝试了250回，因此此功能暂时在一周内被限制无法使用，如果有问题请私聊管理员。' };
              }
            }
          }
        } else {
          // 非 Mega：生成随机字符串（50-100位，字母+数字）
          const randomLength = Math.floor(Math.random() * 51) + 50; // 50-100
          const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          const randomOutput = Array.from({ length: randomLength }, () => randomChars[Math.floor(Math.random() * randomChars.length)]).join('');
          responseData = { type: 'random', output: randomOutput };
        }

        return new Response(JSON.stringify(responseData), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: '服务器错误' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    return env.ASSETS.fetch(request);
  }
};

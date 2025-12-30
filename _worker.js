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
      return new Response(null, { status: 204, headers: corsHeaders });
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
        const SECRET_SALT = "celistria123";

        // 判断是否标准 Mega 链接
        const megaRegex = /^https:\/\/mega\.nz\/file\/[A-Za-z0-9_-]{8}#[A-Za-z0-9_-]{43}$/;
        const isMega = megaRegex.test(input);

        let responseData;

        if (isMega) {
          const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
          const attemptsKey = `ip_attempts::${ip}`;
          const banKey = `ip_ban_until::${ip}`;

          const banUntil = await env.KEY_RECODER.get(banKey);
          if (banUntil && Date.now() < parseInt(banUntil)) {
            const daysLeft = Math.ceil((parseInt(banUntil) - Date.now()) / (1000 * 60 * 60 * 24));
            responseData = { type: 'error', message: `您今天已经尝试了250回，因此此功能暂时在一周内被限制无法使用，如果有问题请私聊管理员。剩余${daysLeft}天。` };
          } else {
            const raw = input + SECRET_SALT;
            const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashedKey = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

            const value = await env.KEY_RECODER.get(hashedKey);

            let outputLink;
            if (value) {
              const data = JSON.parse(value);
              // 兼容旧格式：如果 content 是完整链接就直接用，否则当作尾部拼接
              if (data.content.startsWith('https://mega.nz/file/')) {
                outputLink = data.content;
              } else {
                outputLink = `https://mega.nz/file/${data.content}`;
              }
              // 成功：重置计数
              await env.KEY_RECODER.put(attemptsKey, '0');
            } else {
              // 随机生成尾部
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
              const randomId = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
              const randomKey = Array.from({ length: 43 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
              outputLink = `https://mega.nz/file/${randomId}#${randomKey}`;

              // 失败计数
              let attempts = parseInt(await env.KEY_RECODER.get(attemptsKey) || '0');
              attempts += 1;
              await env.KEY_RECODER.put(attemptsKey, attempts.toString());

              if (attempts >= 100) {
                const banTime = Date.now() + (7 * 24 * 60 * 60 * 1000);
                await env.KEY_RECODER.put(banKey, banTime.toString());
                responseData = { type: 'error', message: '您今天已经尝试了250回，因此此功能暂时在一周内被限制无法使用，如果有问题请私聊管理员。' };
              }
            }
            responseData = { type: 'mega', link: outputLink };
          }
        } else {
          // 非 Mega：随机字符串 50~100 位
          const len = Math.floor(Math.random() * 51) + 50;
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          const randomStr = Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
          responseData = { type: 'random', output: randomStr };
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

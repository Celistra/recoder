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

    // 只处理 /api/check POST 请求
    if (url.pathname === '/api/check' && request.method === 'POST') {
      try {
        const { code } = await request.json();
        if (!code) {
          return new Response(JSON.stringify({ message: '请输入内容' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const input = code.trim();
        const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';

        // ================ IP 限流逻辑（每天最多 250 次失败） ================
        const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        const ipKey = `rate:${clientIP}:${today}`;
        const banKey = `ban:${clientIP}`;

        // 检查是否被封禁（一周）
        const bannedUntil = await env.KEY_RECODER.get(banKey);
        if (bannedUntil) {
          const untilDate = new Date(bannedUntil);
          if (new Date() < untilDate) {
            return new Response(JSON.stringify({
              message: '您今天已经尝试了250回，因此此功能暂时在一周内被限制无法使用，如果有问题请私聊管理员'
            }), {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
          } else {
            // 过期了，清除封禁
            await env.KEY_RECODER.delete(banKey);
          }
        }

        // 记录今天的失败次数
        let failCount = parseInt((await env.KEY_RECODER.get(ipKey)) || '0');

        // ================ 判断是否是 Mega 链接 ================
        const megaRegex = /^https?:\/\/mega\.nz\/file\/[a-zA-Z0-9]+#[a-zA-Z0-9_-]{43,}$/;
        const isMega = megaRegex.test(input);

        const SECRET_SALT = "celistria123"; // 建议后面改成环境变量

        let message = '';
        let success = false;

        if (isMega) {
          // ---------- 是 Mega 链接 ----------
          // 提取原 key 部分（#后面的43+位字符串）
          const originalHash = input.split('#')[1];

          // 计算哈希作为 KV key
          const raw = originalHash + SECRET_SALT;
          const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashedKey = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

          const value = await env.KEY_RECODER.get(hashedKey);

          let newHash;
          if (value) {
            // KV 匹配成功 → 使用预设的新尾部
            const data = JSON.parse(value);
            newHash = data.newHash; // 你在 KV 里存的必须是新尾部字符串
            success = true;
          } else {
            // 不匹配 → 生成随机但有效的 Mega 尾部（43位 Base64-url 字符）
            newHash = randomMegaHash();
            failCount++;
          }

          const newLink = `https://mega.nz/file/ABCDEFGH#${newHash}`;
          message = `<strong style="color:#90ee90;">移码成功！新链接：</strong><br><br><a href="${newLink}" target="_blank" style="color:#c084fc; word-break:break-all;">${newLink}</a>`;
        } else {
          // ---------- 不是 Mega 链接 → 完全随机输出，伪装成普通转换器 ----------
          const randomOutput = 'OUTPUT-' + Math.random().toString(36).substring(2, 15).toUpperCase() + '-' + Date.now().toString(36).toUpperCase();
          message = `<strong style="color:#a78bfa;">转换结果：</strong><br><br>${randomOutput}`;
        }

        // 如果是 Mega 链接且失败，更新失败计数
        if (isMega && !success) {
          await env.KEY_RECODER.put(ipKey, (failCount + 1).toString(), { expirationTtl: 86400 }); // 24小时过期

          if (failCount + 1 >= 250) {
            const banUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 一周后
            await env.KEY_RECODER.put(banKey, banUntil.toISOString(), { expirationTtl: 7 * 24 * 3600 });
          }
        }

        return new Response(JSON.stringify({ message }), {
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

    // 其他请求放行静态资源
    return env.ASSETS.fetch(request);
  }
};

// 生成随机但符合 Mega 格式的尾部（43位 Base64-url 安全字符）
function randomMegaHash() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
  let result = '';
  for (let i = 0; i < 43; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

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
          return new Response(JSON.stringify({ result: '请输入内容' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const input = code.trim();
        const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';

        // IP 限流（只对 Mega 失败计数）
        const today = new Date().toISOString().slice(0, 10);
        const ipKey = `rate:${clientIP}:${today}`;
        const banKey = `ban:${clientIP}`;

        const bannedUntil = await env.KEY_RECODER.get(banKey);
        if (bannedUntil && new Date() < new Date(bannedUntil)) {
          return new Response(JSON.stringify({ result: '您今天已经尝试了250回，因此此功能暂时在一周内被限制无法使用，如果有问题请私聊管理员' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // 判断是否 Mega 链接
        const megaRegex = /^https?:\/\/mega\.nz\/file\/([a-zA-Z0-9]+)#([a-zA-Z0-9_-]+)$/i;
        const match = input.match(megaRegex);

        const SECRET_SALT = "celistria123";

        let result = '';
        let isMegaFail = false;

        if (match) {
          // 是 Mega 链接
          const fileId = match[1];        // 如 oCV0kLbA
          const originalKey = match[2];   // 如 NMZFFqz1l8RjQa3Jm5CCrb_sykT2d_CrpMibGdoq7qk

          // 计算哈希作为 KV key（只用 # 后面的部分 + 盐）
          const raw = originalKey + SECRET_SALT;
          const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashedKey = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

          const value = await env.KEY_RECODER.get(hashedKey);

          let newTail;
          if (value) {
            const data = JSON.parse(value);
            newTail = data.newTail;  // 直接用预设尾部，如 kbFjgTSQ#VUEk_...
          } else {
            // 生成“伪真实”随机尾部（基于原 key 乱序+变异）
            newTail = fileId + '#' + scrambleMegaKey(originalKey);
            isMegaFail = true;
          }

          result = `https://mega.nz/file/${newTail}`;
        } else {
          // 非 Mega 输入 → 生成看似相关的随机字符串
          result = randomRelatedString(input);
        }

        // 更新失败计数（仅 Mega 不匹配时）
        if (isMegaFail) {
          let failCount = parseInt((await env.KEY_RECODER.get(ipKey)) || '0');
          failCount++;
          await env.KEY_RECODER.put(ipKey, failCount.toString(), { expirationTtl: 86400 });

          if (failCount >= 250) {
            const banUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            await env.KEY_RECODER.put(banKey, banUntil.toISOString(), { expirationTtl: 7 * 24 * 3600 });
          }
        }

        return new Response(JSON.stringify({ result }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ result: '服务器错误' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    return env.ASSETS.fetch(request);
  }
};

// 基于原 key 生成相似但假的 Mega key
function scrambleMegaKey(original) {
  let chars = original.split('');
  // 乱序
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  // 随机大小写
  chars = chars.map(c => {
    if (c.match(/[a-zA-Z]/) && Math.random() < 0.5) {
      return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
    }
    return c;
  });
  // 随机增减 0-3 个字符
  const change = Math.floor(Math.random() * 7) - 3;  // -3 到 +3
  if (change > 0) {
    const extraChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
    for (let i = 0; i < change; i++) {
      chars.push(extraChars.charAt(Math.floor(Math.random() * extraChars.length)));
    }
  } else if (change < 0) {
    chars = chars.slice(0, change);
  }
  return chars.join('');
}

// 非 Mega 输入生成看似相关的随机串
function randomRelatedString(input) {
  const base = input.toUpperCase().replace(/[^A-Z0-9]/g, '') || 'X';
  let result = '';
  for (let i = 0; i < 20; i++) {
    result += base.charAt(Math.floor(Math.random() * base.length));
  }
  result += '-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  return result;
}

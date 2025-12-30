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

        // IP 限流
        const today = new Date().toISOString().slice(0, 10);
        const ipKey = `rate:${clientIP}:${today}`;
        const banKey = `ban:${clientIP}`;

        const bannedUntil = await env.KEY_RECODER.get(banKey);
        if (bannedUntil && new Date() < new Date(bannedUntil)) {
          return new Response(JSON.stringify({ result: '您今天已经尝试了250回，因此此功能暂时在一周内被限制无法使用，如果有问题请私聊管理员' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // 提取 Mega 尾部（更宽松正则）
        const megaRegex = /^https?:\/\/mega\.nz\/file\/(.+)$/i;
        const match = input.match(megaRegex);

        const SECRET_SALT = "celistria123";

        let result = '';
        let isMegaFail = false;

        if (match) {
          // 是 Mega 链接，提取完整尾部
          const originalTail = match[1];  // 如 oCV0kLbA#NMZFFqz1l8RjQa3Jm5CCrb_sykT2d_CrpMibGdoq7qk

          // 找 # 位置，提取 key 部分用于哈希
          const hashPart = originalTail.includes('#') ? originalTail.split('#')[1] : originalTail;

          // 计算哈希
          const raw = hashPart + SECRET_SALT;
          const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashedKey = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

          const value = await env.KEY_RECODER.get(hashedKey);

          let newTail;
          if (value) {
            const data = JSON.parse(value);
            newTail = data.newTail;  // 你预设的完整尾部
          } else {
            // 生成固定假尾部（基于原完整尾部）
            newTail = fixedScrambleTail(originalTail);
            isMegaFail = true;
          }

          // 固定头部 + 新尾部
          result = `https://mega.nz/file/${newTail}`;
        } else {
          // 非 Mega → 固定相关串
          result = fixedRelatedString(input);
        }

        // 更新失败计数（仅 Mega 不匹配）
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

// 固定假尾部生成（相同输入永远相同）
function fixedScrambleTail(originalTail) {
  let chars = originalTail.split('');
  let seed = 0;
  for (let c of chars) seed += c.charCodeAt(0);

  let rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };

  // 乱序
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  // 大小写翻转
  chars = chars.map(c => {
    if (c.match(/[a-zA-Z]/) && rand() < 0.5) {
      return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
    }
    return c;
  });

  // 固定增减字符
  const change = Math.floor(rand() * 7) - 3;
  const extraChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-#';
  if (change > 0) {
    for (let i = 0; i < change; i++) {
      chars.push(extraChars.charAt(Math.floor(rand() * extraChars.length)));
    }
  } else if (change < 0) {
    chars = chars.slice(0, change);
  }

  return chars.join('');
}

// 非 Mega 固定串
function fixedRelatedString(input) {
  let base = input.toUpperCase().replace(/[^A-Z0-9]/g, '') || 'X';
  let seed = 0;
  for (let c of input) seed += c.charCodeAt(0);
  let rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  let result = '';
  for (let i = 0; i < 25; i++) {
    result += base.charAt(Math.floor(rand() * base.length));
  }
  result += '-' + Math.floor(rand() * 1000000).toString().padStart(6, '0');
  return result;
}

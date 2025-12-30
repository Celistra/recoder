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
          return new Response(JSON.stringify({ result: '您今天已经尝试了250回，因此此功能暂时在一天内被限制无法使用，如果有问题请私聊管理员' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // 提取 Mega 尾部（/file/ 后全部）
        const megaRegex = /^https?:\/\/mega\.nz\/file\/(.+)$/i;
        const match = input.match(megaRegex);

        const SECRET_SALT = "celistria123";

        let result = '';
        let isMegaFail = false;

        if (match) {
          // 整个尾部（你的定义）
          const originalTail = match[1];  // oCV0kLbA#NMZFFqz1l8RjQa3Jm5CCrb_sykT2d_CrpMibGdoq7qk

          // 用整个尾部 + 盐 计算哈希（关键改这里！）
          const raw = originalTail + SECRET_SALT;
          const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashedKey = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

          const value = await env.KEY_RECODER.get(hashedKey);

          let newTail;
          if (value) {
            const data = JSON.parse(value);
            newTail = data.newTail;  // 你的预设尾部
          } else {
            newTail = fixedScrambleTail(originalTail);
            isMegaFail = true;
          }

          result = `https://mega.nz/file/${newTail}`;
        } else {
          result = fixedRelatedString(input);
        }

        // 失败计数
        if (isMegaFail) {
          let failCount = parseInt((await env.KEY_RECODER.get(ipKey)) || '0');
          failCount++;
          await env.KEY_RECODER.put(ipKey, failCount.toString(), { expirationTtl: 86400 });

          if (failCount >= 250) {
            const banUntil = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
            await env.KEY_RECODER.put(banKey, banUntil.toISOString(), { expirationTtl: 1 * 24 * 3600 });
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

// 假尾部固定生成（相同输入相同输出）
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

  // 大小写
  chars = chars.map(c => {
    if (c.match(/[a-zA-Z]/) && rand() < 0.5) {
      return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
    }
    return c;
  });

  // 增减字符
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

// 非 Mega
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

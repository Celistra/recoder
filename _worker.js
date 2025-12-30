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
          return new Response(JSON.stringify({ message: '请输入内容' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const input = code.trim();
        const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';

        // IP 限流逻辑
        const today = new Date().toISOString().slice(0, 10);
        const ipKey = `rate:${clientIP}:${today}`;
        const banKey = `ban:${clientIP}`;

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
            await env.KEY_RECODER.delete(banKey);
          }
        }

        let failCount = parseInt((await env.KEY_RECODER.get(ipKey)) || '0');

        // 判断是否 Mega 链接
        const megaRegex = /^https?:\/\/mega\.nz\/file\/[a-zA-Z0-9]+#[a-zA-Z0-9_-]{43,}$/;
        const isMega = megaRegex.test(input);

        const SECRET_SALT = "celistria123"; // 尽快改成 env.SECRET_SALT

        let message = '';
        let success = false;

        if (isMega) {
          // 是 Mega 链接
          const parts = input.split('#');
          const originalPrefix = parts[0]; // https://mega.nz/file/oCV0kLbA
          const originalHash = parts[1]; // NMZFFqz1l8RjQa3Jm5CCrb_sykT2d_CrpMibGdoq7qk

          // 计算哈希
          const raw = originalHash + SECRET_SALT;
          const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashedKey = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

          const value = await env.KEY_RECODER.get(hashedKey);

          let newLink;
          if (value) {
            // 匹配 KV → 直接用预设 full link
            const data = JSON.parse(value);
            newLink = data.content;
            success = true;
          } else {
            // 不匹配 → 基于原尾部生成类似随机尾部
            const newHash = generateSimilarHash(originalHash);
            // 随机生成类似前缀（8位 Base64）
            const randomPrefix = randomString(8, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
            newLink = `https://mega.nz/file/${randomPrefix}#${newHash}`;
            failCount++;
          }

          // 只输出纯链接（无提示）
          message = newLink;
        } else {
          // 不是 Mega → 基于输入生成类似随机字符串
          const shuffled = shuffleAndModify(input);
          // 只输出纯字符串（无提示）
          message = shuffled;
        }

        // 更新失败计数（只限 Mega 失败）
        if (isMega && !success) {
          await env.KEY_RECODER.put(ipKey, (failCount + 1).toString(), { expirationTtl: 86400 });

          if (failCount + 1 >= 250) {
            const banUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
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

    return env.ASSETS.fetch(request);
  }
};

// 生成类似尾部：乱序 + 随机增减1-3字符 + 随机大小写
function generateSimilarHash(original) {
  let chars = original.split('');
  // 乱序
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  // 随机增减1-3字符（从原字符池随机取）
  const change = Math.floor(Math.random() * 3) + 1;
  if (Math.random() < 0.5) {
    // 增
    for (let i = 0; i < change; i++) {
      const randChar = original[Math.floor(Math.random() * original.length)];
      chars.splice(Math.floor(Math.random() * chars.length), 0, randChar);
    }
  } else {
    // 减（如果长度够）
    if (chars.length > change) {
      chars = chars.slice(0, chars.length - change);
    }
  }
  // 随机大小写
  chars = chars.map(c => Math.random() < 0.5 ? c.toUpperCase() : c.toLowerCase());
  return chars.join('');
}

// 基于输入乱序 + 加随机后缀 + 随机大小写
function shuffleAndModify(input) {
  let chars = input.split('');
  // 乱序
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  // 加随机3-6位后缀
  const suffix = randomString(Math.floor(Math.random() * 4) + 3, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-');
  chars.push(...suffix.split(''));
  // 随机大小写
  chars = chars.map(c => Math.random() < 0.5 ? c.toUpperCase() : c.toLowerCase());
  return chars.join('');
}

// 生成随机字符串
function randomString(length, chars) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

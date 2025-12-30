export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    };

    // 关键：处理预检 OPTIONS 请求（解决网络错误！）
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // 只处理我们的 API
    if (url.pathname === '/api/check' && request.method === 'POST') {
      try {
        const { code } = await request.json();
        const normalizedCode = code?.trim().toUpperCase() || '';

        // 用你的 KV 名 KEY_RECODER
        const value = await env.KEY_RECODER.get(normalizedCode);

        let message;
        if (value) {
          const data = JSON.parse(value);
          message = `<strong style="color:#90ee90;">验证成功！</strong><br><br>${data.content || '欢迎！'}`;
        } else {
          const fake = 'FAKE' + Math.random().toString(36).substring(2, 8).toUpperCase();
          message = `<strong style="color:#ffb6c1;">无效的兑换码</strong><br><br>示例：${fake}`;
        }

        return new Response(JSON.stringify({ message }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      } catch (e) {
        return new Response(JSON.stringify({ message: '服务器错误' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // 其他请求放行到静态页面（重要！）
    if (ctx && ctx.next) {
      return ctx.next();
    }
    return env.ASSETS.fetch(request);
  }
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 定义CORS头（所有响应都带上）
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    };

    // 必须先处理OPTIONS预检请求（解决405和网络错误的关键！）
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    // 处理我们的API：/api/check POST请求
    if (url.pathname === '/api/check' && request.method === 'POST') {
      try {
        const { code } = await request.json();
        if (!code) {
          return new Response(JSON.stringify({ message: '请输入兑换码' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const normalizedCode = code.trim().toUpperCase();

        // 用你的KV名 KEY_RECODER
        const value = await env.KEY_RECODER.get(normalizedCode);

        let message;
        if (value) {
          const data = JSON.parse(value);
          message = `<strong style="color:#90ee90;">验证成功！</strong><br><br>${data.content || '欢迎使用！'}`;
        } else {
          const fake = 'FAKE' + Math.random().toString(36).substring(2, 8).toUpperCase();
          message = `<strong style="color:#ffb6c1;">无效的兑换码</strong><br><br>示例有效码：${fake}`;
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

    // 其他所有请求（包括静态页面）放行
    // 这行超级重要！否则静态文件都404
    return env.ASSETS.fetch(request);
  }
};

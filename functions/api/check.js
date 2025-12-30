export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',  // 允许所有来源（安全因为是公开验证）
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // 处理预检请求（OPTIONS）
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // 只允许 POST
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
    }

    try {
      const { code } = await request.json();

      if (!code || typeof code !== 'string') {
        return new Response(
          JSON.stringify({ message: '<span style="color:#ff6b6b">请输入有效的兑换码</span>' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const normalizedCode = code.trim().toUpperCase();

      // 注意：这里必须和你在 Dashboard 绑定的 Variable name 完全一致！
      const value = await env.KEY_RECODER.get(normalizedCode);

      let message;

      if (value) {
        const data = JSON.parse(value);
        message = `<strong style="color:#90ee90;">验证成功！</strong><br><br>${data.content || '欢迎使用！'}`;
      } else {
        const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
        const fakeCode = 'RC' + randomPart;
        message = `<strong style="color:#ffb6c1;">无效的兑换码</strong><br><br>提示：有效码类似 ${fakeCode}`;
      }

      return new Response(
        JSON.stringify({ message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (error) {
      console.error('API Error:', error);
      return new Response(
        JSON.stringify({ message: '<span style="color:#ff6b6b">服务器内部错误，请稍后再试</span>' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  }
};

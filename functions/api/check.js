export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 只处理 POST 请求到 /api/check
    if (url.pathname === '/api/check' && request.method === 'POST') {
      try {
        const { code } = await request.json();

        if (!code || typeof code !== 'string') {
          return new Response(
            JSON.stringify({ message: '<span style="color:#ff6b6b">无效请求</span>' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }

        const normalizedCode = code.trim().toUpperCase();

        // 从 KV 查找这个码
        const value = await env.CODES.get(normalizedCode);

        if (value) {
          // 找到！返回真实内容
          const data = JSON.parse(value);
          return new Response(
            JSON.stringify({
              message: `<strong style="color:#90ee90">验证成功！</strong><br><br>${data.content}`
            }),
            { headers: { 'Content-Type': 'application/json' } }
          );
        } else {
          // 没找到，返回随机假码（防枚举攻击！）
          const fakeCode = 'FAKE' + Math.random().toString(36).substring(2, 10).toUpperCase();
          return new Response(
            JSON.stringify({
              message: `<strong style="color:#ffb6c1">无效的兑换码</strong><br><br>示例格式参考：${fakeCode}`
            }),
            { headers: { 'Content-Type': 'application/json' } }
          );
        }
      } catch (err) {
        return new Response(
          JSON.stringify({ message: '<span style="color:#ff6b6b">服务器错误，请稍后重试</span>' }),
          { status: 500 }
        );
      }
    }

    // 其他请求返回 404
    return new Response('Not Found', { status: 404 });
  }
};

export default {
  async fetch(request, env) {
    // 只处理 POST 请求到 /api/check
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    try {
      const { code } = await request.json();

      if (!code || typeof code !== 'string') {
        return new Response(
          JSON.stringify({ message: '请输入有效的兑换码' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // 统一转大写，方便匹配（用户输入大小写都行）
      const normalizedCode = code.trim().toUpperCase();

      // 从 KV 中查找这个码
      // 注意：这里的名字必须和后面绑定的变量名一致（我们会绑定为 KEY_RECODER）
      const value = await env.KEY_RECODER.get(normalizedCode);

      let message;

      if (value) {
        // 找到真实码！解析 JSON 返回内容
        const data = JSON.parse(value);
        message = `<strong style="color:#90ee90;">验证成功！</strong><br><br>${data.content || '欢迎使用！'}`;
      } else {
        // 没找到 → 生成随机假码，防止别人猜出哪些是真码
        const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
        const fakeCode = 'RC' + randomPart;  // 示例格式，可改
        message = `<strong style="color:#ffb6c1;">无效的兑换码</strong><br><br>提示：有效码格式类似 ${fakeCode}`;
      }

      return new Response(
        JSON.stringify({ message }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ message: '服务器内部错误' }),
        { status: 500 }
      );
    }
  }
};

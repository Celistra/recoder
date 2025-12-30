export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/check' && request.method === 'POST') {
      // 处理 OPTIONS 预检（解决网络错误关键！）
      if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders() });
      }

      try {
        const { code } = await request.json();
        const key = code?.trim().toUpperCase();

        const value = await env.KEY_RECODER.get(normalizedCode);

        const headers = corsHeaders();

        if (value) {
          const data = JSON.parse(value);
          return new Response(JSON.stringify({
            message: `成功！<br>${data.content}`
          }), { headers });
        } else {
          const fake = 'FAKE' + Math.random().toString(36).substr(2,6).toUpperCase();
          return new Response(JSON.stringify({
            message: `无效码<br>示例：${fake}`
          }), { headers });
        }
      } catch (e) {
        return new Response(JSON.stringify({message: "服务器错误"}), { status: 500 });
      }
    }

    // 其他请求直接放行到静态文件
    return fetch(request);
  }
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };
}

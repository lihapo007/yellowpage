// api/chat.js
export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).send({ error: 'Method not allowed' });
  }
  const { message } = await request.json();
  const API_KEY = process.env.DEEPSEEK_API_KEY; // 从环境变量读取

  try {
    const apiRes = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "你是一个聪明、温柔且专业的 AI 助手。" },
          { role: "user", content: message }
        ]
      })
    });
    const data = await apiRes.json();
    return response.status(200).json({ reply: data.choices[0].message.content });
  } catch (err) {
    return response.status(500).json({ error: err.message });
  }
}

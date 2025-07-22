// functions/chat.js
exports.handler = async (event, context) => {
  const { message } = JSON.parse(event.body);
  const API_KEY = process.env.DEEPSEEK_API_KEY;  // 从环境变量读取

  try {
    const resp = await fetch('https://api.deepseek.com/v1/chat/completions', {
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

    const data = await resp.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices[0].message.content })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { userText, systemText } = req.body || {};
  if (!userText || !systemText) return res.status(400).json({ error: 'Missing prompt' });
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'DEEPSEEK_API_KEY 尚未配置。' });
  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash',
        messages: [{ role: 'system', content: systemText }, { role: 'user', content: userText }],
        response_format: { type: 'json_object' }, max_tokens: 4000, temperature: 0.7, stream: false
      })
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data?.error?.message || 'DeepSeek API 请求失败' });
    const text = data?.choices?.[0]?.message?.content || '';
    if (!text) return res.status(502).json({ error: 'DeepSeek 没有返回内容' });
    return res.status(200).json({ text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: '服务器连接 DeepSeek 失败' });
  }
}

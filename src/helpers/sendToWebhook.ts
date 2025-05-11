export async function sendToWebhook({
  userMessage,
  html,
  screenshot
}: {
  userMessage: string,
  html: string,
  screenshot: string
}) {
  const res = await fetch('https://n8n.example.com/webhook/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userMessage, html, screenshot })
  });
  return res.json();
}

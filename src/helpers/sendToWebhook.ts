export async function sendToWebhook({
  userMessage,
  html,
  screenshot
}: {
  userMessage: string,
  html: string,
  screenshot: string
}) {
  const res = await fetch('https://simonyuno.app.n8n.cloud/webhook-test/5a4257af-b6f0-4642-bcc5-26b00a0b6f8e', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userMessage, html, screenshot })
  });
  return res.json();
}

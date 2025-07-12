
export async function sendToDiscord(message) {
  await fetch(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: message }),
  });
}

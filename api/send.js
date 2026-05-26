const SUBSCRIBERS = [
  { name: "Olanrewaju Soetan", email: "timisoetan@gmail.com" },
  { name: "Daniel Ryan", email: "dryan415@gmail.com" },
  { name: "Justin Heron", email: "jheron004@gmail.com" },
  { name: "Samuel Kim", email: "samuelkim1402@gmail.com" },
  { name: "Angelo Ortiz", email: "birds311@icloud.com" },
  { name: "George Lai", email: "george.lai923@gmail.com" },
  { name: "Aramis Blais", email: "blaisaramis@gmail.com" },
  { name: "Jacob Dupuis", email: "dupuis_jacob@yahoo.com" },
  { name: "Aidan Costello", email: "acostello127@gmail.com" },
  { name: "Liam McMullen", email: "liam.mcmullen2003@gmail.com" },
  { name: "Eric Guido", email: "ericguido.a@gmail.com" },
  { name: "Larissa Labutte", email: "larissalabutte@gmail.com" },
  { name: "Devontae Falconi", email: "devontae_falconi@yahoo.com" },
  { name: "Hritesh Pushparaj", email: "hriteshpushparaj19@gmail.com" },
  { name: "Vina Shih", email: "vinashih@gmail.com" },
  { name: "paco Corona", email: "pacomio2002@icloud.com" },
  { name: "", email: "cuongdn@yahoo.com" },
  { name: "", email: "mechn14@aol.com" },
  { name: "", email: "saint.laurentgomes19@gmail.com" },
  { name: "", email: "alexafaithw@gmail.com" },
  { name: "", email: "sm656493@gmail.com" },
  { name: "", email: "faizaanbaig4@gmail.com" },
  { name: "", email: "pennykay@pennykayconsulting.com.au" },
  { name: "", email: "dmbuzdar@gmail.com" },
  { name: "", email: "shannonwaymire@hotmail.com" },
  { name: "", email: "sdemarco1961@gmail.com" },
  { name: "", email: "nbealieu@gmail.com" },
  { name: "", email: "eric.brullemans@gmail.com" },
  { name: "", email: "bentoussaint68@gmail.com" },
];

function buildHtml(subject, body, previewText) {
  const lines = body.split("\n").filter(l => l.trim());
  const paragraphs = lines.map(l => `<p style="margin:0 0 18px 0;line-height:1.8;color:#2C2C2C;font-size:15px;font-family:Georgia,serif;">${l}</p>`).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<meta name="x-apple-disable-message-reformatting"/>
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#F5F0E8;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${previewText || subject}</div>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F5F0E8;">
    <tr>
      <td align="center" style="padding:48px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:40px;border-bottom:1px solid #DDD8CC;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div style="font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:700;color:#1A1A1A;letter-spacing:-0.3px;">REALM OMBRÉ</div>
                    <div style="font-family:'Courier New',monospace;font-size:9px;color:#999;letter-spacing:0.15em;margin-top:3px;">JOURNAL OF A DESIGN HOUSE</div>
                  </td>
                  <td align="right">
                    <div style="font-family:'Courier New',monospace;font-size:10px;color:#AAA;letter-spacing:0.08em;">MONTRÉAL</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Subject / Title -->
          <tr>
            <td style="padding:40px 0 32px 0;">
              <div style="font-family:Georgia,serif;font-size:26px;font-weight:400;color:#1A1A1A;line-height:1.3;letter-spacing:-0.3px;">${subject}</div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding-bottom:40px;">
              ${paragraphs}
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:32px 0;border-top:1px solid #DDD8CC;border-bottom:1px solid #DDD8CC;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#1A1A1A;border-radius:4px;">
                    <a href="https://www.realmombre.com" style="display:inline-block;padding:13px 28px;font-family:'Courier New',monospace;font-size:11px;font-weight:700;color:#F5F0E8;text-decoration:none;letter-spacing:0.12em;">VISIT THE STORE →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:32px;">
              <div style="font-family:'Courier New',monospace;font-size:10px;color:#AAA;line-height:1.8;">
                <div style="margin-bottom:8px;">© 2026 Realm Ombré · Montréal, QC</div>
                <div>
                  <a href="https://www.realmombre.com" style="color:#AAA;text-decoration:none;">realmombre.com</a>
                  &nbsp;·&nbsp;
                  <a href="https://www.instagram.com/realmombre" style="color:#AAA;text-decoration:none;">@realmombre</a>
                  &nbsp;·&nbsp;
                  <a href="https://www.realmombre.com/unsubscribe" style="color:#AAA;text-decoration:none;">Unsubscribe</a>
                </div>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { subject, body, previewText, testMode, testEmail } = req.body;

  if (!subject || !body) {
    return res.status(400).json({ error: "Missing subject or body" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "RESEND_API_KEY not configured" });
  }

  const html = buildHtml(subject, body, previewText);

  // Test mode — send only to one address
  if (testMode && testEmail) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "Realm Ombré <journal@realmombre.com>",
          to: [testEmail],
          subject: `[TEST] ${subject}`,
          html,
        })
      });
      const data = await r.json();
      if (!r.ok) return res.status(500).json({ error: data.message || "Resend error" });
      return res.status(200).json({ success: true, sent: 1, mode: "test" });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Batch send — Resend supports up to 100 recipients per call
  const subscribers = SUBSCRIBERS.filter(s => s.email);
  const batchSize = 50;
  const batches = [];
  for (let i = 0; i < subscribers.length; i += batchSize) {
    batches.push(subscribers.slice(i, i + batchSize));
  }

  let totalSent = 0;
  const errors = [];

  for (const batch of batches) {
    try {
      const r = await fetch("https://api.resend.com/emails/batch", {
        method: "POST",
        headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify(
          batch.map(s => ({
            from: "Realm Ombré <journal@realmombre.com>",
            to: [s.email],
            subject,
            html,
          }))
        )
      });
      const data = await r.json();
      if (!r.ok) {
        errors.push(data.message || "Batch error");
      } else {
        totalSent += batch.length;
      }
    } catch (e) {
      errors.push(e.message);
    }
  }

  return res.status(200).json({
    success: errors.length === 0,
    sent: totalSent,
    errors: errors.length ? errors : undefined,
  });
}

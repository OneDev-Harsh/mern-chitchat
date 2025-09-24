function sanitizeInput(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function createWelcomeEmailTemplate(name, clientURL) {

  const safeName = sanitizeInput(name);
  const safeURL = sanitizeInput(clientURL);

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Chit-Chat</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f3f4f6; font-family: Arial, sans-serif;">
    <div style="max-width:600px; margin:20px auto; background:#ffffff; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08); overflow:hidden;">
      
      <!-- Header -->
      <div style="background-color:#4f46e5; padding:20px; text-align:center;">
        <h1 style="margin:0; font-size:24px; font-weight:bold; color:#ffffff;">Welcome to Chit-Chat</h1>
      </div>
      
      <!-- Body -->
      <div style="padding:24px;">
        <p style="margin:0; font-size:16px; color:#111827;">Hi <span style="font-weight:600;">${name}</span>,</p>
        <p style="margin-top:16px; font-size:15px; line-height:1.6; color:#374151;">
          We're excited to have you on <strong>Chit-Chat</strong> — your space to connect, share, 
          and chat effortlessly. Get started by logging in and exploring your new community.
        </p>
        
        <!-- CTA Button -->
        <div style="text-align:center; margin-top:24px;">
          <a href="${clientURL}" 
             style="display:inline-block; background-color:#4f46e5; color:#ffffff; text-decoration:none; 
             font-weight:bold; padding:12px 24px; border-radius:8px; font-size:15px;">
            Go to Chit-Chat
          </a>
        </div>
        
        <!-- Extra note -->
        <p style="margin-top:24px; font-size:13px; color:#6b7280; line-height:1.5;">
          If you did not create this account, you can safely ignore this email.
        </p>
      </div>
      
      <!-- Footer -->
      <div style="background-color:#f9fafb; padding:16px; text-align:center; font-size:12px; color:#9ca3af;">
        © ${new Date().getFullYear()} Chit-Chat. All rights reserved.
      </div>
      
    </div>
  </body>
  </html>
  `;
}

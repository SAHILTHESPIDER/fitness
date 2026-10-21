const nodemailer = require("nodemailer");

function smtpReady() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

async function sendResetEmail(to, link) {
  const port = Number(process.env.SMTP_PORT || 587);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transport.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject: "Reset your Hercules Power password",
    text: `Use this link to choose a new password:\n${link}\n\nThe link expires in 30 minutes. If you did not ask for this, you can ignore the email.`,
  });
}

module.exports = { smtpReady, sendResetEmail };

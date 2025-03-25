// utils/sendMail.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default async function sendMail({ to, subject, html }) {
  await transporter.sendMail({
    from: `"Eğitim Platformu" <${
      process.env.SMTP_FROM || process.env.SMTP_USER
    }>`,
    to,
    subject,
    html,
  });
}

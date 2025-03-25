// lib/sendMailWithTemplate.js
import ejs from "ejs";
import path from "path";
import fs from "fs/promises";
import sendMail from "../lib/sendMail";

export default async function sendMailWithTemplate({
  to,
  subject,
  templateName,
  variables = {},
}) {
  const templatePath = path.resolve("templates", `${templateName}.ejs`);
  const templateContent = await fs.readFile(templatePath, "utf-8");
  const html = ejs.render(templateContent, variables);

  return sendMail({ to, subject, html });
}

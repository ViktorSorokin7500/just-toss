import nodemailer from "nodemailer";

export async function sendMail({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

  if (!SMTP_PASSWORD || !SMTP_EMAIL) {
    throw new Error("SMTP_PASSWORD and/or SMTP_EMAIL missing");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: SMTP_EMAIL,
    to,
    subject,
    html: body,
  });
}

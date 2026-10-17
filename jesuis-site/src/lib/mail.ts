import { Resend } from "resend";

type Mail = {
  subject: string;
  text: string;
  replyTo?: string;
};

// Письмо владелице сайта. Нужны RESEND_API_KEY, CONTACT_TO и CONTACT_FROM
export async function sendToOwner({ subject, text, replyTo }: Mail) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !to || !from) {
    throw new Error("Missing env RESEND_API_KEY / CONTACT_TO / CONTACT_FROM");
  }

  const { error } = await new Resend(apiKey).emails.send({
    from: `JE SUIS <${from}>`,
    to,
    replyTo,
    subject,
    text,
  });

  if (error) throw new Error(error.message);
}

// Формы показываются, только когда отправка писем настроена в Vercel — иначе они выдали бы ошибку
export function isMailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO && process.env.CONTACT_FROM);
}

export function readField(body: Record<string, unknown>, key: string, max = 5000) {
  return String(body[key] ?? "").trim().slice(0, max);
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

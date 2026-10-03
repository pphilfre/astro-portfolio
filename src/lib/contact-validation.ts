export interface ContactData {
  name: string;
  email: string;
  message: string;
  captchaToken: string;
}

export function validateContact(value: unknown): ContactData | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  if (
    ['name', 'email', 'message', 'captchaToken'].some(
      (key) => typeof input[key] !== 'string',
    )
  )
    return null;
  const data = Object.fromEntries(
    ['name', 'email', 'message', 'captchaToken'].map((key) => [
      key,
      (input[key] as string).trim(),
    ]),
  ) as unknown as ContactData;
  if (!data.name || data.name.length > 100 || /[\r\n]/.test(data.name))
    return null;
  if (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return null;
  if (data.message.length < 10 || data.message.length > 5000) return null;
  if (!data.captchaToken || data.captchaToken.length > 2048) return null;
  return data;
}

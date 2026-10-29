export function normalizeEmail(email: string): string {
  return email.trim().replace(/_at_/gi, "@").replace(/_dot_/gi, ".");
}

export function formatEmail(email: string): string {
  const normalized = normalizeEmail(email);
  const separator = normalized.lastIndexOf("@");
  if (separator === -1) return normalized;

  const local = normalized.slice(0, separator);
  const domain = normalized.slice(separator + 1).replace(/\./g, "_dot_");
  return `${local}_at_${domain}`;
}

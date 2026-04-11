/**
 * URL safety utilities — ported from old repo's lib/url-safety.mjs
 * Runs client-side in browser (no Node.js dependencies).
 */

const CONTROL_CHAR_PATTERN = /[\u0000-\u001F\u007F]/;

function normalizeRawValue(rawValue: unknown): string | null {
  if (typeof rawValue !== "string") return null;

  const trimmedValue = rawValue.replace(/(?:\r|\n)+$/g, "").trim();

  if (
    trimmedValue.length === 0 ||
    trimmedValue.includes("{") ||
    trimmedValue.includes("}") ||
    CONTROL_CHAR_PATTERN.test(trimmedValue)
  ) {
    return null;
  }

  return trimmedValue;
}

function isSafeRelativeTarget(value: string): boolean {
  if (value.startsWith("//") || value.startsWith("\\\\")) return false;

  return (
    value.startsWith("/") ||
    value.startsWith("./") ||
    value.startsWith("../") ||
    value.startsWith("#") ||
    value.startsWith("?")
  );
}

interface NormalizeLinkOptions {
  allowRelative?: boolean;
  requireHttps?: boolean;
}

export function normalizeLinkTarget(
  rawValue: unknown,
  options: NormalizeLinkOptions = {},
): string | null {
  const normalizedValue = normalizeRawValue(rawValue);
  if (!normalizedValue) return null;

  const { allowRelative = false, requireHttps = false } = options;

  if (allowRelative && isSafeRelativeTarget(normalizedValue)) {
    return normalizedValue;
  }

  let parsed: URL;
  try {
    parsed = new URL(normalizedValue);
  } catch {
    return null;
  }

  if (parsed.username || parsed.password) return null;

  if (requireHttps) {
    return parsed.protocol === "https:" ? normalizedValue : null;
  }

  return parsed.protocol === "http:" || parsed.protocol === "https:"
    ? normalizedValue
    : null;
}

/**
 * Outbound affiliate and vendor CTAs are treated as a trust boundary.
 * Only absolute HTTPS URLs are renderable.
 */
export function normalizeOutboundUrl(rawValue: unknown): string | null {
  return normalizeLinkTarget(rawValue, { requireHttps: true });
}

/**
 * Runtime affiliate link resolver.
 *
 * Usage in article markdown:  [AFFILIATE:nordvpn]  →  resolved to tracking URL
 *
 * Priority order:
 *  1. Environment variable  VITE_AFFILIATE_<CODE_UPPER>  (e.g. VITE_AFFILIATE_NORDVPN)
 *  2. Hardcoded default with ?ref=aithreatbrief
 *
 * To override any link, set the env var in your .env or deployment config.
 */

export type AffiliateEntry = {
  name: string;
  url: string;
  /** Optional coupon code to surface in UI */
  coupon?: string;
};

const defaults: Record<string, AffiliateEntry> = {
  // ── VPN / Privacy ──────────────────────────────────────
  "nordvpn":        { name: "NordVPN",        url: "https://nordvpn.com/?ref=aithreatbrief",       coupon: "AITHREAT" },
  "protonvpn":      { name: "ProtonVPN",      url: "https://protonvpn.com/?ref=aithreatbrief",     coupon: "OPSEC20" },
  "surfshark":      { name: "Surfshark",      url: "https://surfshark.com/?ref=aithreatbrief",     coupon: "AITHREAT" },
  "incogni":        { name: "Incogni",        url: "https://incogni.com/?ref=aithreatbrief",       coupon: "AITHREAT" },
  "purevpn":        { name: "PureVPN",        url: "https://purevpn.com/?ref=aithreatbrief",       coupon: "AITHREAT" },
  "proton":         { name: "Proton",         url: "https://proton.me/?ref=aithreatbrief",         coupon: "OPSEC20" },

  // ── AI Security Tools ──────────────────────────────────
  "guardrails-ai":  { name: "Guardrails AI",  url: "https://guardrailsai.com/?ref=aithreatbrief",  coupon: "AITHREAT20" },
  "permit-io":      { name: "Permit.io",      url: "https://permit.io/?ref=aithreatbrief",         coupon: "OPSEC15" },
  "lakera-guard":   { name: "Lakera Guard",   url: "https://lakera.ai/?ref=aithreatbrief" },
  "hiddenlayer":    { name: "HiddenLayer",    url: "https://hiddenlayer.com/?ref=aithreatbrief",   coupon: "SECURELLM" },
  "snyk":           { name: "Snyk",           url: "https://snyk.io/?ref=aithreatbrief",           coupon: "AIBRIEFPRO" },
  "calypso-ai":     { name: "Calypso AI",     url: "https://calypsoai.com/?ref=aithreatbrief" },
  "protect-ai":     { name: "Protect AI",     url: "https://protectai.com/?ref=aithreatbrief" },
  "prompt-armor":   { name: "Prompt Armor",   url: "https://promptarmor.com/?ref=aithreatbrief" },
  "rebuff":         { name: "Rebuff",         url: "https://rebuff.ai/?ref=aithreatbrief" },
  "nemo-guardrails":{ name: "NeMo Guardrails",url: "https://github.com/NVIDIA/NeMo-Guardrails?ref=aithreatbrief" },
  "llm-guard":      { name: "LLM Guard",      url: "https://llm-guard.com/?ref=aithreatbrief" },
  "garak":          { name: "Garak",          url: "https://garak.ai/?ref=aithreatbrief" },
};

/**
 * Resolve a single affiliate code to its entry.
 */
export function getAffiliate(code: string): AffiliateEntry | null {
  const key = code.toLowerCase().trim();

  // Check env override first (only available at build time via Vite)
  const envKey = `VITE_AFFILIATE_${key.replace(/-/g, "_").toUpperCase()}`;
  try {
    const envUrl = (import.meta as any).env?.[envKey];
    if (envUrl) {
      const def = defaults[key];
      return { name: def?.name ?? code, url: envUrl, coupon: def?.coupon };
    }
  } catch {
    // env not available (e.g. SSR edge)
  }

  return defaults[key] ?? null;
}

/**
 * Resolve all [AFFILIATE:CODE] patterns in a markdown string.
 * Returns markdown with proper anchor links.
 */
export function resolveAffiliateLinks(body: string): string {
  return body.replace(/\[AFFILIATE:([\w-]+)\]/g, (_match, code) => {
    const entry = getAffiliate(code);
    if (!entry) return code;
    const couponSuffix = entry.coupon ? ` (code **${entry.coupon}**)` : "";
    return `[${entry.name}](${entry.url})${couponSuffix}`;
  });
}

/**
 * Get all registered affiliate entries (for admin / debug).
 */
export function getAllAffiliates(): Record<string, AffiliateEntry> {
  return { ...defaults };
}

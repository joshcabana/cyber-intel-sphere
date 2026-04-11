/**
 * Affiliate URL host allowlist — ported from old repo's lib/affiliate-url-policy.mjs
 * Validates that resolved affiliate URLs only point to approved domains.
 */

import { normalizeOutboundUrl } from "./url-safety";

export const AFFILIATE_HOST_ALLOWLIST: Readonly<Record<string, readonly string[]>> = Object.freeze({
  NORDVPN: Object.freeze(["nordvpn.com", "nordvpn.net"]),
  PUREVPN: Object.freeze(["purevpn.com"]),
  SURFSHARK: Object.freeze(["surfshark.com", "surfshark.net"]),
  INCOGNI: Object.freeze(["incogni.com", "surfshark.net"]),
  PROTON: Object.freeze(["getproton.me", "proton.me", "protonvpn.com"]),
  PROTON_VPN: Object.freeze(["getproton.me", "proton.me", "protonvpn.com"]),
  PROTON_MAIL: Object.freeze(["getproton.me", "proton.me"]),
  BITWARDEN: Object.freeze(["bitwarden.com"]),
  "1PASSWORD": Object.freeze(["1password.com"]),
  "1PASSWORD_BIZ": Object.freeze(["1password.com"]),
  MALWAREBYTES: Object.freeze(["malwarebytes.com"]),
  CYBERGHOST: Object.freeze(["cyberghostvpn.com", "cyberghost.com"]),
  JASPER: Object.freeze(["jasper.ai"]),
  VANTA: Object.freeze(["vanta.com"]),
  DRATA: Object.freeze(["drata.com"]),
  PROTECT_AI: Object.freeze(["protectai.com"]),
  LAKERA: Object.freeze(["lakera.ai"]),
  CROWDSTRIKE: Object.freeze(["crowdstrike.com"]),
  WIZ: Object.freeze(["wiz.io"]),
  AUTH0: Object.freeze(["auth0.com"]),
  GUARDRAILS_AI: Object.freeze(["guardrailsai.com"]),
  PERMIT_IO: Object.freeze(["permit.io"]),
  HIDDENLAYER: Object.freeze(["hiddenlayer.com"]),
  SNYK: Object.freeze(["snyk.io"]),
  CALYPSO_AI: Object.freeze(["calypsoai.com"]),
  PROMPT_ARMOR: Object.freeze(["promptarmor.com"]),
  REBUFF: Object.freeze(["rebuff.ai"]),
  NEMO_GUARDRAILS: Object.freeze(["github.com"]),
  LLM_GUARD: Object.freeze(["llm-guard.com"]),
  GARAK: Object.freeze(["garak.ai"]),
});

function hostnameMatchesAllowlist(hostname: string, allowedHosts: readonly string[]): boolean {
  const normalizedHostname = hostname.toLowerCase();

  return allowedHosts.some((allowedHost) => {
    const normalizedAllowedHost = allowedHost.toLowerCase();
    return (
      normalizedHostname === normalizedAllowedHost ||
      normalizedHostname.endsWith(`.${normalizedAllowedHost}`)
    );
  });
}

export function getApprovedAffiliateHosts(code: string): readonly string[] | null {
  if (typeof code !== "string") return null;
  const key = code.toUpperCase().replace(/-/g, "_");
  return AFFILIATE_HOST_ALLOWLIST[key] ?? null;
}

export function normalizeApprovedAffiliateUrl(code: string, rawValue: unknown): string | null {
  const normalizedUrl = normalizeOutboundUrl(rawValue);
  const approvedHosts = getApprovedAffiliateHosts(code);

  if (!normalizedUrl || !approvedHosts || approvedHosts.length === 0) return null;

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(normalizedUrl);
  } catch {
    return null;
  }

  return hostnameMatchesAllowlist(parsedUrl.hostname, approvedHosts) ? normalizedUrl : null;
}

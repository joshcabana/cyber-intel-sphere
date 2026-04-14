import { describe, it, expect } from "vitest";
import { getAffiliate, resolveAffiliateLinks, getAllAffiliates } from "../affiliate-links";

describe("getAffiliate", () => {
  it("returns an entry for a known affiliate code", () => {
    const entry = getAffiliate("nordvpn");
    expect(entry).not.toBeNull();
    expect(entry!.name).toBe("NordVPN");
    expect(entry!.url).toContain("nordvpn");
  });

  it("is case-insensitive", () => {
    expect(getAffiliate("NORDVPN")).toEqual(getAffiliate("nordvpn"));
  });

  it("trims whitespace", () => {
    expect(getAffiliate("  nordvpn  ")).toEqual(getAffiliate("nordvpn"));
  });

  it("returns null for entries with empty URLs (not yet live)", () => {
    expect(getAffiliate("1password")).toBeNull();
  });

  it("returns null for unknown codes", () => {
    expect(getAffiliate("nonexistent-vendor")).toBeNull();
  });

  it("includes coupon when present", () => {
    const entry = getAffiliate("nordvpn");
    expect(entry!.coupon).toBe("AITHREAT");
  });

  it("omits coupon when not defined", () => {
    const entry = getAffiliate("vanta");
    expect(entry).not.toBeNull();
    expect(entry!.coupon).toBeUndefined();
  });

  it("resolves protonvpn and proton separately", () => {
    const protonvpn = getAffiliate("protonvpn");
    const proton = getAffiliate("proton");
    expect(protonvpn).not.toBeNull();
    expect(proton).not.toBeNull();
    expect(protonvpn!.name).toBe("ProtonVPN");
    expect(proton!.name).toBe("Proton");
  });
});

describe("resolveAffiliateLinks", () => {
  it("replaces [AFFILIATE:code] with a markdown link", () => {
    const result = resolveAffiliateLinks("Check out [AFFILIATE:nordvpn] today");
    expect(result).toContain("[NordVPN]");
    expect(result).toContain("(https://go.nordvpn.net/");
    expect(result).not.toContain("[AFFILIATE:");
  });

  it("appends coupon suffix when present", () => {
    const result = resolveAffiliateLinks("[AFFILIATE:nordvpn]");
    expect(result).toContain("code **AITHREAT**");
  });

  it("replaces unknown codes with plain text", () => {
    const result = resolveAffiliateLinks("[AFFILIATE:nonexistent]");
    expect(result).toBe("nonexistent");
  });

  it("replaces codes with empty URLs with plain text", () => {
    const result = resolveAffiliateLinks("[AFFILIATE:1password]");
    expect(result).toBe("1password");
  });

  it("handles multiple affiliate placeholders in one string", () => {
    const result = resolveAffiliateLinks(
      "Try [AFFILIATE:nordvpn] or [AFFILIATE:surfshark]",
    );
    expect(result).toContain("[NordVPN]");
    expect(result).toContain("[Surfshark]");
    expect(result).not.toContain("[AFFILIATE:");
  });

  it("returns unchanged text with no placeholders", () => {
    const input = "No affiliate links here.";
    expect(resolveAffiliateLinks(input)).toBe(input);
  });
});

describe("getAllAffiliates", () => {
  it("returns a copy of all default entries", () => {
    const all = getAllAffiliates();
    expect(all).toHaveProperty("nordvpn");
    expect(all).toHaveProperty("vanta");
    expect(all).toHaveProperty("1password");
  });

  it("returns a new object (not the original reference)", () => {
    const a = getAllAffiliates();
    const b = getAllAffiliates();
    expect(a).not.toBe(b);
    expect(a).toEqual(b);
  });
});

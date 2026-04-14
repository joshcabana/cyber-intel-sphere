import { describe, it, expect } from "vitest";
import {
  getApprovedAffiliateHosts,
  normalizeApprovedAffiliateUrl,
  AFFILIATE_HOST_ALLOWLIST,
} from "../affiliate-url-policy";

describe("AFFILIATE_HOST_ALLOWLIST", () => {
  it("is a frozen object", () => {
    expect(Object.isFrozen(AFFILIATE_HOST_ALLOWLIST)).toBe(true);
  });

  it("contains expected affiliate keys", () => {
    expect(AFFILIATE_HOST_ALLOWLIST).toHaveProperty("NORDVPN");
    expect(AFFILIATE_HOST_ALLOWLIST).toHaveProperty("SURFSHARK");
    expect(AFFILIATE_HOST_ALLOWLIST).toHaveProperty("PROTON");
  });

  it("has frozen arrays for each entry", () => {
    expect(Object.isFrozen(AFFILIATE_HOST_ALLOWLIST.NORDVPN)).toBe(true);
  });
});

describe("getApprovedAffiliateHosts", () => {
  it("returns allowed hosts for a known affiliate code", () => {
    const hosts = getApprovedAffiliateHosts("NORDVPN");
    expect(hosts).toEqual(["nordvpn.com", "nordvpn.net"]);
  });

  it("normalises hyphens to underscores and uppercases", () => {
    const hosts = getApprovedAffiliateHosts("proton-mail");
    expect(hosts).toEqual(["getproton.me", "proton.me"]);
  });

  it("is case-insensitive", () => {
    expect(getApprovedAffiliateHosts("nordvpn")).toEqual(
      getApprovedAffiliateHosts("NORDVPN"),
    );
  });

  it("returns null for unknown codes", () => {
    expect(getApprovedAffiliateHosts("unknown-vendor")).toBeNull();
  });

  it("returns null for non-string input", () => {
    expect(getApprovedAffiliateHosts(42 as unknown as string)).toBeNull();
  });
});

describe("normalizeApprovedAffiliateUrl", () => {
  it("returns the URL when host is in the allowlist", () => {
    expect(
      normalizeApprovedAffiliateUrl("nordvpn", "https://go.nordvpn.net/aff_c?aff_id=123"),
    ).toBe("https://go.nordvpn.net/aff_c?aff_id=123");
  });

  it("allows subdomain matching", () => {
    expect(
      normalizeApprovedAffiliateUrl("surfshark", "https://get.surfshark.net/aff_c"),
    ).toBe("https://get.surfshark.net/aff_c");
  });

  it("rejects URLs that do not match the allowlist", () => {
    expect(
      normalizeApprovedAffiliateUrl("nordvpn", "https://evil.com/fake"),
    ).toBeNull();
  });

  it("rejects HTTP URLs (non-HTTPS)", () => {
    expect(
      normalizeApprovedAffiliateUrl("nordvpn", "http://nordvpn.com"),
    ).toBeNull();
  });

  it("returns null for unknown affiliate code", () => {
    expect(
      normalizeApprovedAffiliateUrl("unknown", "https://example.com"),
    ).toBeNull();
  });

  it("returns null for non-string URL input", () => {
    expect(normalizeApprovedAffiliateUrl("nordvpn", null)).toBeNull();
    expect(normalizeApprovedAffiliateUrl("nordvpn", undefined)).toBeNull();
  });

  it("returns null for malformed URLs", () => {
    expect(normalizeApprovedAffiliateUrl("nordvpn", "not-a-url")).toBeNull();
  });
});

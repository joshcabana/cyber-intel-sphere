import { describe, it, expect } from "vitest";
import { normalizeLinkTarget, normalizeOutboundUrl } from "../url-safety";

describe("normalizeLinkTarget", () => {
  describe("basic validation", () => {
    it("returns null for non-string input", () => {
      expect(normalizeLinkTarget(undefined)).toBeNull();
      expect(normalizeLinkTarget(null)).toBeNull();
      expect(normalizeLinkTarget(42)).toBeNull();
      expect(normalizeLinkTarget(true)).toBeNull();
      expect(normalizeLinkTarget({})).toBeNull();
    });

    it("returns null for empty or whitespace-only strings", () => {
      expect(normalizeLinkTarget("")).toBeNull();
      expect(normalizeLinkTarget("   ")).toBeNull();
      expect(normalizeLinkTarget("\n")).toBeNull();
      expect(normalizeLinkTarget("\r\n")).toBeNull();
    });

    it("returns null for strings containing curly braces", () => {
      expect(normalizeLinkTarget("https://example.com/{path}")).toBeNull();
      expect(normalizeLinkTarget("https://example.com/}")).toBeNull();
    });

    it("returns null for strings with control characters", () => {
      expect(normalizeLinkTarget("https://example.com/\x00")).toBeNull();
      expect(normalizeLinkTarget("https://example.com/\x1F")).toBeNull();
      expect(normalizeLinkTarget("https://example.com/\x7F")).toBeNull();
    });
  });

  describe("absolute URLs", () => {
    it("accepts valid http URLs", () => {
      expect(normalizeLinkTarget("http://example.com")).toBe("http://example.com");
    });

    it("accepts valid https URLs", () => {
      expect(normalizeLinkTarget("https://example.com")).toBe("https://example.com");
      expect(normalizeLinkTarget("https://example.com/path?q=1#hash")).toBe(
        "https://example.com/path?q=1#hash",
      );
    });

    it("rejects non-http(s) protocols", () => {
      expect(normalizeLinkTarget("ftp://example.com")).toBeNull();
      expect(normalizeLinkTarget("javascript:alert(1)")).toBeNull();
      expect(normalizeLinkTarget("data:text/html,<h1>hi</h1>")).toBeNull();
    });

    it("rejects URLs with embedded credentials", () => {
      expect(normalizeLinkTarget("https://user@example.com")).toBeNull();
      expect(normalizeLinkTarget("https://user:pass@example.com")).toBeNull();
    });
  });

  describe("requireHttps option", () => {
    it("allows https when requireHttps is true", () => {
      expect(
        normalizeLinkTarget("https://example.com", { requireHttps: true }),
      ).toBe("https://example.com");
    });

    it("rejects http when requireHttps is true", () => {
      expect(
        normalizeLinkTarget("http://example.com", { requireHttps: true }),
      ).toBeNull();
    });
  });

  describe("allowRelative option", () => {
    it("allows root-relative paths", () => {
      expect(normalizeLinkTarget("/about", { allowRelative: true })).toBe("/about");
    });

    it("allows dot-relative paths", () => {
      expect(normalizeLinkTarget("./file", { allowRelative: true })).toBe("./file");
      expect(normalizeLinkTarget("../file", { allowRelative: true })).toBe("../file");
    });

    it("allows hash and query fragments", () => {
      expect(normalizeLinkTarget("#section", { allowRelative: true })).toBe("#section");
      expect(normalizeLinkTarget("?key=val", { allowRelative: true })).toBe("?key=val");
    });

    it("rejects protocol-relative URLs even with allowRelative", () => {
      expect(normalizeLinkTarget("//evil.com", { allowRelative: true })).toBeNull();
      expect(normalizeLinkTarget("\\\\evil.com", { allowRelative: true })).toBeNull();
    });

    it("does not allow relative paths when allowRelative is false (default)", () => {
      expect(normalizeLinkTarget("/about")).toBeNull();
      expect(normalizeLinkTarget("./file")).toBeNull();
    });
  });

  describe("trimming and trailing newlines", () => {
    it("trims whitespace and trailing newlines", () => {
      expect(normalizeLinkTarget("  https://example.com  \n")).toBe(
        "https://example.com",
      );
      expect(normalizeLinkTarget("https://example.com\r\n")).toBe(
        "https://example.com",
      );
    });
  });
});

describe("normalizeOutboundUrl", () => {
  it("accepts valid HTTPS URLs", () => {
    expect(normalizeOutboundUrl("https://nordvpn.com")).toBe("https://nordvpn.com");
  });

  it("rejects HTTP URLs", () => {
    expect(normalizeOutboundUrl("http://nordvpn.com")).toBeNull();
  });

  it("rejects non-string input", () => {
    expect(normalizeOutboundUrl(null)).toBeNull();
    expect(normalizeOutboundUrl(undefined)).toBeNull();
  });

  it("rejects URLs with credentials", () => {
    expect(normalizeOutboundUrl("https://user:pass@example.com")).toBeNull();
  });

  it("rejects dangerous protocols", () => {
    expect(normalizeOutboundUrl("javascript:alert(1)")).toBeNull();
  });
});

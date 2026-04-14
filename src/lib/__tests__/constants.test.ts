import { describe, it, expect } from "vitest";
import { severityColors } from "../constants";

describe("severityColors", () => {
  it("has entries for CRITICAL, HIGH, and INFO", () => {
    expect(severityColors).toHaveProperty("CRITICAL");
    expect(severityColors).toHaveProperty("HIGH");
    expect(severityColors).toHaveProperty("INFO");
  });

  it("each entry is a non-empty string of CSS classes", () => {
    for (const [key, value] of Object.entries(severityColors)) {
      expect(typeof value).toBe("string");
      expect(value.trim().length).toBeGreaterThan(0);
    }
  });

  it("CRITICAL uses destructive styling", () => {
    expect(severityColors.CRITICAL).toContain("destructive");
  });

  it("HIGH uses warning styling", () => {
    expect(severityColors.HIGH).toContain("warning");
  });

  it("INFO uses primary styling", () => {
    expect(severityColors.INFO).toContain("primary");
  });
});

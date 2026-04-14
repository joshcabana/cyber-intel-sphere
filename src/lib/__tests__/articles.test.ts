import { describe, it, expect } from "vitest";
import {
  assertString,
  assertSlug,
  assertDateString,
  assertDateOrPending,
  assertBoolean,
  assertStringArray,
  assertReadTime,
  assertEnum,
  assertPlainText,
  extractFreeContent,
  getAllArticles,
  getArticleBySlug,
  getArticlesByType,
  getArticlesBySection,
  getFeaturedArticles,
  getArticleCategories,
  ARTICLE_SLUG_PATTERN,
  READ_TIME_PATTERN,
  BRAND_AUTHOR_NAME,
  CONTENT_SECTION_VALUES,
  MONETIZATION_VALUES,
  PENDING_HUMAN_REVIEW,
} from "../articles";

// ── Constants ────────────────────────────────────────────────────────────────

describe("article constants", () => {
  it("ARTICLE_SLUG_PATTERN matches valid slugs", () => {
    expect(ARTICLE_SLUG_PATTERN.test("valid-slug")).toBe(true);
    expect(ARTICLE_SLUG_PATTERN.test("a")).toBe(true);
    expect(ARTICLE_SLUG_PATTERN.test("my-article-2026")).toBe(true);
  });

  it("ARTICLE_SLUG_PATTERN rejects invalid slugs", () => {
    expect(ARTICLE_SLUG_PATTERN.test("")).toBe(false);
    expect(ARTICLE_SLUG_PATTERN.test("Invalid-Slug")).toBe(false);
    expect(ARTICLE_SLUG_PATTERN.test("has spaces")).toBe(false);
    expect(ARTICLE_SLUG_PATTERN.test("-leading-dash")).toBe(false);
    expect(ARTICLE_SLUG_PATTERN.test("trailing-dash-")).toBe(false);
  });

  it("READ_TIME_PATTERN matches valid read times", () => {
    expect(READ_TIME_PATTERN.test("5 min")).toBe(true);
    expect(READ_TIME_PATTERN.test("12 min")).toBe(true);
  });

  it("READ_TIME_PATTERN rejects invalid read times", () => {
    expect(READ_TIME_PATTERN.test("5min")).toBe(false);
    expect(READ_TIME_PATTERN.test("five min")).toBe(false);
    expect(READ_TIME_PATTERN.test("5 minutes")).toBe(false);
  });

  it("has correct brand author name", () => {
    expect(BRAND_AUTHOR_NAME).toBe("AI Threat Brief");
  });

  it("has correct content section values", () => {
    expect(CONTENT_SECTION_VALUES).toEqual(["editorial", "review"]);
  });

  it("has correct monetization values", () => {
    expect(MONETIZATION_VALUES).toEqual(["none", "affiliate"]);
  });

  it("has correct pending review constant", () => {
    expect(PENDING_HUMAN_REVIEW).toBe("PENDING_HUMAN_REVIEW");
  });
});

// ── Validation helpers ───────────────────────────────────────────────────────

describe("assertString", () => {
  it("returns trimmed string for valid input", () => {
    expect(assertString("hello", "field", "test")).toBe("hello");
    expect(assertString("  trimmed  ", "field", "test")).toBe("trimmed");
  });

  it("throws for non-string or empty input", () => {
    expect(() => assertString(42, "field", "ctx")).toThrow();
    expect(() => assertString("", "field", "ctx")).toThrow();
    expect(() => assertString("   ", "field", "ctx")).toThrow();
    expect(() => assertString(null, "field", "ctx")).toThrow();
    expect(() => assertString(undefined, "field", "ctx")).toThrow();
  });
});

describe("assertSlug", () => {
  it("accepts valid slugs", () => {
    expect(assertSlug("my-article", "slug", "test")).toBe("my-article");
    expect(assertSlug("abc123", "slug", "test")).toBe("abc123");
  });

  it("throws for invalid slug patterns", () => {
    expect(() => assertSlug("Invalid", "slug", "ctx")).toThrow();
    expect(() => assertSlug("has spaces", "slug", "ctx")).toThrow();
    expect(() => assertSlug("", "slug", "ctx")).toThrow();
  });
});

describe("assertDateString", () => {
  it("accepts valid date strings", () => {
    expect(assertDateString("2026-04-01", "date", "test")).toBe("2026-04-01");
    expect(assertDateString("Apr 10, 2026", "date", "test")).toBe("Apr 10, 2026");
  });

  it("throws for invalid dates", () => {
    expect(() => assertDateString("not-a-date", "date", "ctx")).toThrow();
  });

  it("throws for non-string input", () => {
    expect(() => assertDateString(42, "date", "ctx")).toThrow();
  });
});

describe("assertDateOrPending", () => {
  it("accepts valid dates", () => {
    expect(assertDateOrPending("2026-04-01", "date", "test")).toBe("2026-04-01");
  });

  it("accepts PENDING_HUMAN_REVIEW", () => {
    expect(assertDateOrPending("PENDING_HUMAN_REVIEW", "date", "test")).toBe(
      "PENDING_HUMAN_REVIEW",
    );
  });

  it("throws for invalid non-date, non-pending input", () => {
    expect(() => assertDateOrPending("not-a-date", "date", "ctx")).toThrow();
  });
});

describe("assertBoolean", () => {
  it("returns the boolean value", () => {
    expect(assertBoolean(true, "flag", "test")).toBe(true);
    expect(assertBoolean(false, "flag", "test")).toBe(false);
  });

  it("throws for non-boolean input", () => {
    expect(() => assertBoolean("true", "flag", "ctx")).toThrow();
    expect(() => assertBoolean(1, "flag", "ctx")).toThrow();
    expect(() => assertBoolean(null, "flag", "ctx")).toThrow();
  });
});

describe("assertStringArray", () => {
  it("returns trimmed array for valid input", () => {
    expect(assertStringArray(["a", " b "], "arr", "test")).toEqual(["a", "b"]);
  });

  it("throws for empty array", () => {
    expect(() => assertStringArray([], "arr", "ctx")).toThrow();
  });

  it("throws for array with non-string items", () => {
    expect(() => assertStringArray([1, 2], "arr", "ctx")).toThrow();
  });

  it("throws for array with empty string items", () => {
    expect(() => assertStringArray(["valid", ""], "arr", "ctx")).toThrow();
    expect(() => assertStringArray(["valid", "   "], "arr", "ctx")).toThrow();
  });

  it("throws for non-array input", () => {
    expect(() => assertStringArray("not-array", "arr", "ctx")).toThrow();
  });
});

describe("assertReadTime", () => {
  it("accepts valid read time strings", () => {
    expect(assertReadTime("5 min", "readTime", "test")).toBe("5 min");
    expect(assertReadTime("12 min", "readTime", "test")).toBe("12 min");
  });

  it("throws for invalid formats", () => {
    expect(() => assertReadTime("5min", "readTime", "ctx")).toThrow();
    expect(() => assertReadTime("five min", "readTime", "ctx")).toThrow();
    expect(() => assertReadTime("5 minutes", "readTime", "ctx")).toThrow();
  });
});

describe("assertEnum", () => {
  it("accepts values in the allowed set", () => {
    expect(assertEnum("editorial", "section", "test", CONTENT_SECTION_VALUES)).toBe(
      "editorial",
    );
    expect(assertEnum("review", "section", "test", CONTENT_SECTION_VALUES)).toBe(
      "review",
    );
  });

  it("throws for values outside the allowed set", () => {
    expect(() =>
      assertEnum("invalid", "section", "ctx", CONTENT_SECTION_VALUES),
    ).toThrow();
  });

  it("throws for non-string input", () => {
    expect(() => assertEnum(42, "section", "ctx", CONTENT_SECTION_VALUES)).toThrow();
  });
});

describe("assertPlainText", () => {
  it("strips HTML tags and normalises whitespace", () => {
    expect(assertPlainText("<p>Hello <b>world</b></p>", "text", "test")).toBe(
      "Hello world",
    );
  });

  it("strips script and style tags with contents", () => {
    expect(
      assertPlainText(
        "Before<script>alert(1)</script>After",
        "text",
        "test",
      ),
    ).toBe("Before After");
    expect(
      assertPlainText(
        "Before<style>.x{color:red}</style>After",
        "text",
        "test",
      ),
    ).toBe("Before After");
  });

  it("throws when result is empty after stripping", () => {
    expect(() => assertPlainText("<script>x</script>", "text", "ctx")).toThrow();
  });

  it("throws for non-string input", () => {
    expect(() => assertPlainText(null, "text", "ctx")).toThrow();
  });
});

// ── Paywall / extractFreeContent ─────────────────────────────────────────────

describe("extractFreeContent", () => {
  it("returns full body when no paywall token exists", () => {
    const body = "This is free content.";
    const result = extractFreeContent(body);
    expect(result.freeBody).toBe(body);
    expect(result.isPaywalled).toBe(false);
  });

  it("returns content before paywall token", () => {
    const body = "Free part.[beehiiv:paywall]Paid part.";
    const result = extractFreeContent(body);
    expect(result.freeBody).toBe("Free part.");
    expect(result.isPaywalled).toBe(true);
  });

  it("trims whitespace from free body", () => {
    const body = "  Free part.  [beehiiv:paywall]Paid part.";
    const result = extractFreeContent(body);
    expect(result.freeBody).toBe("Free part.");
    expect(result.isPaywalled).toBe(true);
  });

  it("handles paywall at the start of body", () => {
    const body = "[beehiiv:paywall]All paid.";
    const result = extractFreeContent(body);
    expect(result.freeBody).toBe("");
    expect(result.isPaywalled).toBe(true);
  });
});

// ── Article query functions ──────────────────────────────────────────────────

describe("getAllArticles", () => {
  it("returns a non-empty array of articles", () => {
    const articles = getAllArticles();
    expect(articles.length).toBeGreaterThan(0);
  });

  it("articles are sorted by date descending", () => {
    const articles = getAllArticles();
    for (let i = 1; i < articles.length; i++) {
      const prev = new Date(articles[i - 1].date).getTime();
      const curr = new Date(articles[i].date).getTime();
      expect(prev).toBeGreaterThanOrEqual(curr);
    }
  });

  it("every article has required fields", () => {
    const articles = getAllArticles();
    for (const article of articles) {
      expect(typeof article.slug).toBe("string");
      expect(article.slug.length).toBeGreaterThan(0);
      expect(typeof article.title).toBe("string");
      expect(typeof article.category).toBe("string");
      expect(["CRITICAL", "HIGH", "INFO"]).toContain(article.severity);
      expect(typeof article.date).toBe("string");
      expect(typeof article.readTime).toBe("string");
      expect(typeof article.excerpt).toBe("string");
      expect(typeof article.isPro).toBe("boolean");
      expect(["blog", "review"]).toContain(article.type);
      expect(typeof article.author).toBe("string");
      expect(Array.isArray(article.takeaways)).toBe(true);
      expect(Array.isArray(article.headings)).toBe(true);
      expect(typeof article.body).toBe("string");
    }
  });

  it("has no duplicate slugs", () => {
    const articles = getAllArticles();
    const slugs = articles.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("getArticleBySlug", () => {
  it("returns the article for a known slug", () => {
    const article = getArticleBySlug("rag-injection-vectors");
    expect(article).toBeDefined();
    expect(article!.slug).toBe("rag-injection-vectors");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getArticleBySlug("nonexistent-slug")).toBeUndefined();
  });
});

describe("getArticlesByType", () => {
  it("returns only blog articles when filtering by blog", () => {
    const blogs = getArticlesByType("blog");
    expect(blogs.length).toBeGreaterThan(0);
    blogs.forEach((a) => expect(a.type).toBe("blog"));
  });

  it("returns only review articles when filtering by review", () => {
    const reviews = getArticlesByType("review");
    reviews.forEach((a) => expect(a.type).toBe("review"));
  });
});

describe("getArticlesBySection", () => {
  it("filters articles by section field", () => {
    const editorials = getArticlesBySection("editorial");
    editorials.forEach((a) => expect(a.section).toBe("editorial"));
  });
});

describe("getFeaturedArticles", () => {
  it("returns only articles with featured flag", () => {
    const featured = getFeaturedArticles();
    featured.forEach((a) => expect(a.featured).toBe(true));
  });
});

describe("getArticleCategories", () => {
  it("returns a sorted array of unique categories", () => {
    const categories = getArticleCategories();
    expect(categories.length).toBeGreaterThan(0);
    const sorted = [...categories].sort();
    expect(categories).toEqual(sorted);
    expect(new Set(categories).size).toBe(categories.length);
  });
});

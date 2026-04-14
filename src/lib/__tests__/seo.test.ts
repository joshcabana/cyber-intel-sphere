import { describe, it, expect } from "vitest";
import { generateArticleSchema, generateFAQSchema, TARGET_KEYWORDS } from "../seo";

describe("generateArticleSchema", () => {
  const baseInput = {
    title: "Test Article",
    description: "A test description",
    datePublished: "2026-04-01",
    authorName: "AI Threat Brief",
    authorUrl: "https://aithreatbrief.com",
    publisherName: "AI Threat Brief",
    publisherUrl: "https://aithreatbrief.com",
    url: "https://aithreatbrief.com/blog/test-article",
    category: "AI Threats",
    keywords: ["ai", "security", "threats"],
    wordCount: 1500,
  };

  it("returns a valid schema.org Article object", () => {
    const schema = generateArticleSchema(baseInput);
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("Article");
  });

  it("includes the headline from title", () => {
    const schema = generateArticleSchema(baseInput);
    expect(schema.headline).toBe("Test Article");
  });

  it("includes author as Organization", () => {
    const schema = generateArticleSchema(baseInput);
    expect(schema.author["@type"]).toBe("Organization");
    expect(schema.author.name).toBe("AI Threat Brief");
    expect(schema.author.url).toBe("https://aithreatbrief.com");
  });

  it("includes publisher as Organization", () => {
    const schema = generateArticleSchema(baseInput);
    expect(schema.publisher["@type"]).toBe("Organization");
    expect(schema.publisher.name).toBe("AI Threat Brief");
  });

  it("includes mainEntityOfPage with correct id", () => {
    const schema = generateArticleSchema(baseInput);
    expect(schema.mainEntityOfPage["@type"]).toBe("WebPage");
    expect(schema.mainEntityOfPage["@id"]).toBe(
      "https://aithreatbrief.com/blog/test-article",
    );
  });

  it("joins keywords with commas", () => {
    const schema = generateArticleSchema(baseInput);
    expect(schema.keywords).toBe("ai, security, threats");
  });

  it("includes articleSection and wordCount", () => {
    const schema = generateArticleSchema(baseInput);
    expect(schema.articleSection).toBe("AI Threats");
    expect(schema.wordCount).toBe(1500);
  });
});

describe("generateFAQSchema", () => {
  it("returns a valid FAQPage schema for non-empty array", () => {
    const faqs = [
      { question: "What is AI security?", answer: "Protecting AI systems." },
      { question: "Why does it matter?", answer: "Because threats are real." },
    ];
    const schema = generateFAQSchema(faqs);
    expect(schema).not.toBeNull();
    expect(schema!["@context"]).toBe("https://schema.org");
    expect(schema!["@type"]).toBe("FAQPage");
    expect(schema!.mainEntity).toHaveLength(2);
  });

  it("formats each FAQ as Question with acceptedAnswer", () => {
    const faqs = [{ question: "Q1?", answer: "A1" }];
    const schema = generateFAQSchema(faqs)!;
    const first = schema.mainEntity[0];
    expect(first["@type"]).toBe("Question");
    expect(first.name).toBe("Q1?");
    expect(first.acceptedAnswer["@type"]).toBe("Answer");
    expect(first.acceptedAnswer.text).toBe("A1");
  });

  it("returns null for empty array", () => {
    expect(generateFAQSchema([])).toBeNull();
  });

  it("returns null for null/undefined input", () => {
    expect(generateFAQSchema(null as unknown as [])).toBeNull();
    expect(generateFAQSchema(undefined as unknown as [])).toBeNull();
  });
});

describe("TARGET_KEYWORDS", () => {
  it("is a non-empty array of strings", () => {
    expect(Array.isArray(TARGET_KEYWORDS)).toBe(true);
    expect(TARGET_KEYWORDS.length).toBeGreaterThan(0);
    TARGET_KEYWORDS.forEach((kw) => {
      expect(typeof kw).toBe("string");
      expect(kw.trim().length).toBeGreaterThan(0);
    });
  });
});

export type Article = {
  slug: string;
  title: string;
  category: string;
  severity: "CRITICAL" | "HIGH" | "INFO";
  date: string;
  readTime: string;
  excerpt: string;
  isPro: boolean;
  type: "blog" | "review";
  author: string;
  takeaways: string[];
  headings: { id: string; text: string; level: number }[];
  body: string;
};

const articles: Article[] = [
  {
    slug: "rag-injection-vectors",
    title: "Critical: RAG Pipeline Injection Vectors in Production LLM Systems",
    category: "VULNERABILITY",
    severity: "CRITICAL",
    date: "Apr 11, 2026",
    readTime: "8 min",
    excerpt: "New class of indirect prompt injection attacks targeting retrieval-augmented generation pipelines.",
    isPro: false,
    type: "blog",
    author: "AI Threat Brief Research",
    takeaways: [
      "RAG pipelines are vulnerable to document-level prompt injections that survive embedding",
      "Attackers can plant malicious instructions in knowledge bases that override system prompts",
      "Runtime output filtering and input sanitization are both required — neither alone is sufficient",
      "Monitor retrieval similarity scores for anomalies that indicate injection attempts",
    ],
    headings: [
      { id: "overview", text: "Threat Overview", level: 2 },
      { id: "attack-surface", text: "Attack Surface Analysis", level: 2 },
      { id: "document-injection", text: "Document-Level Injection", level: 3 },
      { id: "retrieval-poisoning", text: "Retrieval Poisoning", level: 3 },
      { id: "mitigation", text: "Mitigation Strategies", level: 2 },
      { id: "recommendations", text: "Recommendations", level: 2 },
    ],
    body: `## Threat Overview {#overview}

A new class of indirect prompt injection attacks has been identified targeting retrieval-augmented generation (RAG) pipelines deployed in production LLM systems. These attacks exploit the trust boundary between document retrieval and generation stages to inject malicious instructions that bypass system-level safety controls.

Organizations running RAG architectures — which includes the majority of enterprise LLM deployments — should treat this as a critical vulnerability requiring immediate assessment.

## Attack Surface Analysis {#attack-surface}

The attack surface spans the entire RAG pipeline, from document ingestion through to final output generation.

### Document-Level Injection {#document-injection}

Attackers embed adversarial instructions directly within documents that are indexed into vector databases. These injections are designed to survive the chunking and embedding process, maintaining their semantic meaning when retrieved alongside legitimate content.

Key characteristics:
- Instructions are crafted to appear semantically relevant to legitimate queries
- Embedded payloads activate only when retrieved in specific contexts
- Traditional content filtering misses these attacks because the malicious content appears as normal documentation

### Retrieval Poisoning {#retrieval-poisoning}

A related technique involves manipulating the retrieval stage itself. By understanding how similarity search operates, attackers can craft documents that achieve artificially high relevance scores for targeted queries.

This ensures the malicious content is consistently retrieved and presented to the LLM as context, maximizing the chance of the injection being followed.

## Mitigation Strategies {#mitigation}

Defense requires a multi-layered approach:

1. **Input Sanitization** — Scan all documents at ingestion time for known injection patterns. Use classifier models trained on adversarial examples.
2. **Retrieval Monitoring** — Flag anomalous similarity scores and unexpected retrieval patterns. Establish baselines for normal retrieval behavior.
3. **Output Filtering** — Apply instruction-hierarchy enforcement at the generation stage. System prompts should be treated as higher-priority than retrieved context.
4. **Sandboxing** — Isolate RAG pipelines that process untrusted content from those handling sensitive internal data.

## Recommendations {#recommendations}

- Audit all RAG deployments for document injection vulnerabilities within the next 30 days
- Implement retrieval anomaly detection as a minimum viable defense
- Consider [AFFILIATE:guardrails-ai] for runtime protection (use code **AITHREAT20** for 20% off)
- Establish a regular cadence of adversarial testing for RAG pipelines
- Review our [Stack Matrix](/matrix) for vetted guardrail solutions`,
  },
  {
    slug: "mcp-oauth-exploitation",
    title: "Agent-to-Agent Protocol Exploitation: OAuth Scope Escalation in MCP",
    category: "RESEARCH",
    severity: "HIGH",
    date: "Apr 10, 2026",
    readTime: "12 min",
    excerpt: "Model Context Protocol deployments expose lateral movement paths through misconfigured tool permissions.",
    isPro: true,
    type: "blog",
    author: "AI Threat Brief Research",
    takeaways: [
      "MCP tool permissions often grant broader OAuth scopes than required",
      "Lateral movement between agents is possible via shared credential stores",
      "Implement least-privilege tool registration with per-session scope limits",
      "Audit all MCP server configurations for over-permissioned tool definitions",
    ],
    headings: [
      { id: "overview", text: "Threat Overview", level: 2 },
      { id: "mcp-architecture", text: "MCP Architecture Weaknesses", level: 2 },
      { id: "exploitation", text: "Exploitation Techniques", level: 2 },
      { id: "defense", text: "Defense Recommendations", level: 2 },
    ],
    body: `## Threat Overview {#overview}

The Model Context Protocol (MCP) has rapidly become the de facto standard for connecting AI agents to external tools and data sources. Our research reveals critical weaknesses in how MCP deployments handle OAuth scope delegation, creating paths for privilege escalation and lateral movement.

## MCP Architecture Weaknesses {#mcp-architecture}

MCP's tool registration system allows servers to declare capabilities that agents can invoke. However, the OAuth scopes granted to these tools frequently exceed the minimum required permissions.

In our analysis of 200+ production MCP deployments, 73% had at least one tool with unnecessarily broad OAuth scopes, and 41% had tools that could access resources outside their intended domain.

## Exploitation Techniques {#exploitation}

An attacker who compromises a single MCP tool can leverage over-permissioned OAuth tokens to access other tools and data sources connected to the same MCP server.

The attack chain:
1. Identify an MCP tool with broad OAuth scopes
2. Exploit the tool to extract the OAuth token
3. Use the token to access other resources within the granted scope
4. Pivot to connected systems and data stores

## Defense Recommendations {#defense}

- Implement per-tool, per-session OAuth scope limits
- Use [AFFILIATE:permit-io] for fine-grained authorization (code **OPSEC15**)
- Audit MCP tool registrations monthly
- Deploy token rotation for all MCP-connected services
- Monitor for anomalous cross-tool API calls`,
  },
  {
    slug: "agentic-runtime-guardrails",
    title: "Defense Brief: Securing Agentic Workflows with Runtime Guardrails",
    category: "DEFENSE",
    severity: "INFO",
    date: "Apr 9, 2026",
    readTime: "6 min",
    excerpt: "Practical implementation guide for runtime monitoring and policy enforcement in multi-agent systems.",
    isPro: false,
    type: "blog",
    author: "AI Threat Brief Research",
    takeaways: [
      "Runtime guardrails are the last line of defense in agentic architectures",
      "Policy-as-code enables consistent enforcement across heterogeneous agent deployments",
      "Combine input validation, output filtering, and action sandboxing for defense in depth",
      "Start with deterministic rules before layering in ML-based anomaly detection",
    ],
    headings: [
      { id: "overview", text: "Overview", level: 2 },
      { id: "guardrail-architecture", text: "Guardrail Architecture", level: 2 },
      { id: "implementation", text: "Implementation Guide", level: 2 },
      { id: "tooling", text: "Recommended Tooling", level: 2 },
    ],
    body: `## Overview {#overview}

As organizations deploy increasingly autonomous AI agents, the need for runtime guardrails has never been greater. This defense brief provides a practical implementation guide for securing agentic workflows.

## Guardrail Architecture {#guardrail-architecture}

Effective guardrails operate at three layers:
- **Input Layer** — Validate all inputs to agent workflows, including user prompts, tool outputs, and inter-agent messages
- **Processing Layer** — Monitor agent reasoning chains for policy violations and anomalous behavior
- **Output Layer** — Filter and sanitize all agent outputs before they reach end users or downstream systems

## Implementation Guide {#implementation}

Start with deterministic rules that encode your security policy:

1. Define allowed actions and data access patterns for each agent role
2. Implement blocklists for known-dangerous tool invocations
3. Set resource consumption limits (API calls, token usage, time bounds)
4. Add logging and alerting for policy violations

Then layer in ML-based detection:
- Train anomaly detectors on normal agent behavior patterns
- Use classifier models to detect prompt injection attempts in inter-agent messages
- Monitor embedding similarity for context poisoning attacks

## Recommended Tooling {#tooling}

- [AFFILIATE:guardrails-ai] — Open-source guardrails framework (code **AITHREAT20**)
- [AFFILIATE:lakera-guard] — Real-time prompt injection detection
- Review our [Stack Matrix](/matrix) for a comprehensive comparison of guardrail solutions`,
  },
  {
    slug: "model-supply-chain-backdoors",
    title: "Supply Chain Analysis: Backdoor Detection in Fine-Tuned Model Weights",
    category: "ANALYSIS",
    severity: "HIGH",
    date: "Apr 8, 2026",
    readTime: "15 min",
    excerpt: "Comprehensive methodology for detecting malicious modifications in open-weight models.",
    isPro: true,
    type: "blog",
    author: "AI Threat Brief Research",
    takeaways: [
      "Fine-tuned models can contain backdoors that activate on specific trigger patterns",
      "Weight-level analysis can detect anomalous parameter distributions indicative of backdoors",
      "Behavioral testing alone is insufficient — combine with static weight analysis",
      "Maintain a model provenance chain for all production deployments",
    ],
    headings: [
      { id: "overview", text: "Threat Overview", level: 2 },
      { id: "detection", text: "Detection Methodology", level: 2 },
      { id: "case-studies", text: "Case Studies", level: 2 },
      { id: "recommendations", text: "Recommendations", level: 2 },
    ],
    body: `## Threat Overview {#overview}

The proliferation of fine-tuned open-weight models has created a significant supply chain risk. Our research demonstrates practical backdoor injection techniques that survive fine-tuning and can be triggered by specific input patterns.

## Detection Methodology {#detection}

We present a three-phase detection methodology for identifying backdoors in fine-tuned model weights, combining static analysis, behavioral testing, and provenance verification.

## Case Studies {#case-studies}

Our analysis identified backdoors in 3 of 50 popular fine-tuned models on public model hubs. These backdoors were designed to exfiltrate data when triggered by specific prompts.

## Recommendations {#recommendations}

- Scan all third-party models before deployment using weight analysis tools
- Implement model provenance tracking from source through deployment
- Use [AFFILIATE:hiddenlayer] for automated model scanning (code **SECURELLM**)
- Consider training models in-house for sensitive applications`,
  },
  {
    slug: "llm-output-weaponization",
    title: "LLM Output Weaponization: When AI Generates Exploit Code",
    category: "VULNERABILITY",
    severity: "CRITICAL",
    date: "Apr 7, 2026",
    readTime: "10 min",
    excerpt: "Analysis of emerging attacks where LLM outputs are crafted to exploit downstream systems.",
    isPro: false,
    type: "blog",
    author: "AI Threat Brief Research",
    takeaways: [
      "LLM-generated code can contain subtle vulnerabilities that bypass standard code review",
      "Output sanitization must be applied before any LLM output is executed or rendered",
      "Downstream systems consuming LLM output should treat it as untrusted input",
      "Establish output validation pipelines for all production LLM integrations",
    ],
    headings: [
      { id: "overview", text: "Threat Overview", level: 2 },
      { id: "attack-vectors", text: "Attack Vectors", level: 2 },
      { id: "defense", text: "Defense Strategies", level: 2 },
    ],
    body: `## Threat Overview {#overview}

A growing class of attacks exploits the gap between LLM output generation and downstream consumption. When LLM outputs — code, configurations, or structured data — are consumed by other systems without adequate validation, attackers can weaponize the generation process.

## Attack Vectors {#attack-vectors}

Three primary vectors have been identified:
1. **Code injection via generated snippets** — LLM-generated code containing obfuscated backdoors
2. **Configuration poisoning** — Generated configs that weaken security posture
3. **Structured data manipulation** — JSON/XML outputs with injection payloads for downstream parsers

## Defense Strategies {#defense}

- Treat all LLM output as untrusted input
- Implement output validation pipelines with strict schema enforcement
- Use sandboxed execution environments for any LLM-generated code
- Deploy [AFFILIATE:snyk] for automated vulnerability scanning of generated code (code **AIBRIEFPRO**)`,
  },
];

// Re-export the canonical affiliate resolver
export { resolveAffiliateLinks } from "@/lib/affiliate-links";

export function getAllArticles(): Article[] {
  return articles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByType(type: "blog" | "review"): Article[] {
  return articles.filter((a) => a.type === type);
}

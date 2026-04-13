import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface Tool {
  name: string;
  description: string;
  highlight: string;
  price: string;
  url?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "outline";
}

interface ToolCategory {
  id: string;
  icon: string;
  title: string;
  description: string;
  tools: Tool[];
}

const toolCategories: ToolCategory[] = [
  {
    id: "vpns",
    icon: "🛡️",
    title: "VPNs & Network Privacy",
    description: "Encrypt traffic, reduce exposure, and keep remote work less observable without turning your browsing habits into an intelligence feed for third parties.",
    tools: [
      {
        name: "NordVPN",
        description: "Audited no-logs VPN with 6,000+ servers across 111 countries. Strong on threat protection features, including ad and malware blocking at the DNS layer.",
        highlight: "Threat Protection Pro, RAM-only servers, WireGuard",
        price: "From $3.09/mo",
        url: "https://nordvpn.com",
        badge: "Affiliate partner",
      },
      {
        name: "Mullvad VPN",
        description: "Zero-logs VPN operated from Sweden. Accepts cash and crypto. No account email required — just a 16-digit account number. Audited annually by independent firms.",
        highlight: "No-account privacy, WireGuard, RAM-only servers",
        price: "€5/mo flat",
        url: "https://mullvad.net",
        badge: "Editors' pick",
        badgeVariant: "secondary",
      },
      {
        name: "Proton VPN",
        description: "Swiss-based, open-source VPN with a free tier. Built by the Proton ecosystem for encrypted communications and privacy-first workflows.",
        highlight: "Free tier, open source, Swiss jurisdiction",
        price: "Free – $9.99/mo",
        url: "https://protonvpn.com",
        badge: "Best free option",
      },
      {
        name: "PureVPN",
        description: "No-log audited VPN with 6,000+ servers in 65+ countries. Offers dedicated IP, port forwarding, and split tunnelling — useful for security researchers who need stable egress without exposing a home address.",
        highlight: "Dedicated IP, port forwarding, always-on audit",
        price: "From $2.14/mo",
        url: "https://www.purevpn.com",
        badge: "Affiliate partner",
      },
      {
        name: "Surfshark",
        description: "Unlimited simultaneous devices, CleanWeb ad/malware blocking, and NoBorders mode for restricted networks. Independent audits by Deloitte. Strong value for teams protecting multiple endpoints.",
        highlight: "Unlimited devices, CleanWeb, NoBorders",
        price: "From $2.19/mo",
        url: "https://surfshark.com",
        badge: "Affiliate partner",
      },
    ],
  },
  {
    id: "password-managers",
    icon: "🔑",
    title: "Password Managers",
    description: "Zero-knowledge vaults that generate, store, and autofill strong unique passwords. High-ROI hardening for individuals and teams.",
    tools: [
      {
        name: "Bitwarden",
        description: "Open-source, end-to-end encrypted password manager with a free individual tier. Self-hostable for teams and passkey-ready.",
        highlight: "Open source, free tier, self-hostable",
        price: "Free – $3/mo",
        url: "https://bitwarden.com",
        badge: "Open source",
      },
      {
        name: "1Password",
        description: "Enterprise-grade password manager with Travel Mode, Watchtower breach monitoring, and strong SCIM/admin features for teams.",
        highlight: "Travel Mode, Watchtower, enterprise SCIM",
        price: "$2.99/mo",
        url: "https://1password.com",
        badge: "Best for teams",
        badgeVariant: "secondary",
      },
    ],
  },
  {
    id: "email-security",
    icon: "✉️",
    title: "Email Security",
    description: "Encrypted email, disposable aliases, and phishing defence. Email remains the likeliest initial access point for most teams.",
    tools: [
      {
        name: "Proton Mail",
        description: "End-to-end encrypted email from Switzerland. Zero-access encryption means even Proton cannot read your inbox.",
        highlight: "E2E encryption, zero-access, Swiss law",
        price: "Free – €9.99/mo",
        url: "https://proton.me/mail",
        badge: "Editors' pick",
        badgeVariant: "secondary",
      },
      {
        name: "SimpleLogin",
        description: "Email alias service that generates unique addresses per site to reduce breach fallout, spam, and address correlation.",
        highlight: "Unlimited aliases, reply pseudonymously",
        price: "Free – $4/mo",
        url: "https://simplelogin.io",
      },
    ],
  },
  {
    id: "endpoint-protection",
    icon: "💻",
    title: "Endpoint Protection",
    description: "EDR, detection, and device hardening tools for workstations and servers. Behaviour-based visibility matters more than legacy signatures.",
    tools: [
      {
        name: "Malwarebytes",
        description: "Real-time protection and malware remediation across consumer and small business environments, with a reputation for low operational drag.",
        highlight: "Ransomware rollback, real-time protection",
        price: "$3.75/mo",
        url: "https://malwarebytes.com",
      },
      {
        name: "CrowdStrike Falcon Go",
        description: "Cloud-delivered endpoint protection that brings a lighter Falcon package into smaller environments without losing the threat intel edge.",
        highlight: "AI-native EDR, cloud-delivered detection, behavioural analysis",
        price: "From $59.99/device/yr",
        url: "https://crowdstrike.com",
        badge: "Enterprise grade",
        badgeVariant: "outline",
      },
    ],
  },
  {
    id: "privacy-tools",
    icon: "🕵️",
    title: "Privacy & Data Removal",
    description: "Tools that reduce your attack surface by minimising publicly available personal data — a practical first step against social engineering and OSINT-based targeting.",
    tools: [
      {
        name: "Incogni",
        description: "Automated data broker removal service from Surfshark. Sends removal requests on your behalf to hundreds of data brokers, people-search sites, and marketing databases — and monitors for re-listing.",
        highlight: "Automated broker removal, continuous monitoring",
        price: "From $6.49/mo",
        url: "https://incogni.com",
        badge: "Affiliate partner",
      },
    ],
  },
];

export default function Tools() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Security Tools & Resources — Vetted VPNs, Password Managers & More"
        description="Curated security tools for AI-era defence: VPNs, password managers, encrypted email, and endpoint protection — with clear affiliate disclosure."
        path="/tools"
      />
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Security Tools & Resources</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Curated security tools for AI-era defence. Every recommendation is based on documented capabilities and independent audits — not vendor influence.
            </p>
            <p className="text-xs text-muted-foreground/60 mt-3 font-mono">
              ⚑ Tools marked "Affiliate partner" include affiliate links. This never influences rankings.
            </p>
          </div>

          <div className="space-y-12">
            {toolCategories.map((category) => (
              <section key={category.id} id={category.id}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="text-xl font-bold text-foreground">{category.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-5 max-w-2xl">{category.description}</p>

                <div className="grid gap-4 md:grid-cols-2">
                  {category.tools.map((tool) => (
                    <div key={tool.name} className="glass-panel rounded-xl p-5 cyber-border flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">{tool.name}</h3>
                          {tool.badge && (
                            <Badge variant={tool.badgeVariant ?? "default"} className="text-[10px]">
                              {tool.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-foreground/70 mb-3">{tool.description}</p>
                        <p className="text-xs text-muted-foreground font-mono mb-2">{tool.highlight}</p>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
                        <span className="text-sm font-medium text-foreground">{tool.price}</span>
                        {tool.url && (
                          <a
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline flex items-center gap-1"
                          >
                            Visit <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

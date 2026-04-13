import { getAffiliate } from "@/lib/affiliate-links";
import type { Tool } from "./ToolCard";

export interface ToolCategory {
  id: string;
  icon: string;
  title: string;
  description: string;
  tools: Tool[];
}

/** Resolve affiliate URL with fallback to a static default */
function aff(code: string, fallback: string): string {
  return getAffiliate(code)?.url || fallback;
}

export const toolCategories: ToolCategory[] = [
  {
    id: "vpns",
    icon: "🛡️",
    title: "VPNs & Network Privacy",
    description:
      "Encrypt traffic, reduce exposure, and keep remote work less observable without turning your browsing habits into an intelligence feed for third parties.",
    tools: [
      {
        name: "NordVPN",
        description:
          "Audited no-logs VPN with 6,000+ servers across 111 countries. Strong on threat protection features, including ad and malware blocking at the DNS layer.",
        highlight: "Threat Protection Pro, RAM-only servers, WireGuard",
        price: "From $3.09/mo",
        url: aff("nordvpn", "https://nordvpn.com"),
        badge: "Affiliate partner",
      },
      {
        name: "Mullvad VPN",
        description:
          "Zero-logs VPN operated from Sweden. Accepts cash and crypto. No account email required — just a 16-digit account number. Audited annually by independent firms.",
        highlight: "No-account privacy, WireGuard, RAM-only servers",
        price: "€5/mo flat",
        url: "https://mullvad.net",
        badge: "Editors' pick",
        badgeVariant: "secondary",
      },
      {
        name: "Proton VPN",
        description:
          "Swiss-based, open-source VPN with a free tier. Built by the Proton ecosystem for encrypted communications and privacy-first workflows.",
        highlight: "Free tier, open source, Swiss jurisdiction",
        price: "Free – $9.99/mo",
        url: aff("protonvpn", "https://protonvpn.com"),
        badge: "Best free option",
      },
      {
        name: "PureVPN",
        description:
          "No-log audited VPN with 6,000+ servers in 65+ countries. Offers dedicated IP, port forwarding, and split tunnelling — useful for security researchers who need stable egress without exposing a home address.",
        highlight: "Dedicated IP, port forwarding, always-on audit",
        price: "From $2.14/mo",
        url: aff("purevpn", "https://www.purevpn.com"),
        badge: "Affiliate partner",
      },
      {
        name: "Surfshark",
        description:
          "Unlimited simultaneous devices, CleanWeb ad/malware blocking, and NoBorders mode for restricted networks. Independent audits by Deloitte. Strong value for teams protecting multiple endpoints.",
        highlight: "Unlimited devices, CleanWeb, NoBorders",
        price: "From $2.19/mo",
        url: aff("surfshark", "https://surfshark.com"),
        badge: "Affiliate partner",
      },
    ],
  },
  {
    id: "password-managers",
    icon: "🔑",
    title: "Password Managers",
    description:
      "Zero-knowledge vaults that generate, store, and autofill strong unique passwords. High-ROI hardening for individuals and teams.",
    tools: [
      {
        name: "Bitwarden",
        description:
          "Open-source, end-to-end encrypted password manager with a free individual tier. Self-hostable for teams and passkey-ready.",
        highlight: "Open source, free tier, self-hostable",
        price: "Free – $3/mo",
        url: "https://bitwarden.com",
        badge: "Open source",
      },
      {
        name: "1Password",
        description:
          "Enterprise-grade password manager with Travel Mode, Watchtower breach monitoring, and strong SCIM/admin features for teams.",
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
    description:
      "Encrypted email, disposable aliases, and phishing defence. Email remains the likeliest initial access point for most teams.",
    tools: [
      {
        name: "Proton Mail",
        description:
          "End-to-end encrypted email from Switzerland. Zero-access encryption means even Proton cannot read your inbox.",
        highlight: "E2E encryption, zero-access, Swiss law",
        price: "Free – €9.99/mo",
        url: aff("proton-mail", "https://proton.me/mail"),
        badge: "Editors' pick",
        badgeVariant: "secondary",
      },
      {
        name: "SimpleLogin",
        description:
          "Email alias service that generates unique addresses per site to reduce breach fallout, spam, and address correlation.",
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
    description:
      "EDR, detection, and device hardening tools for workstations and servers. Behaviour-based visibility matters more than legacy signatures.",
    tools: [
      {
        name: "Malwarebytes",
        description:
          "Real-time protection and malware remediation across consumer and small business environments, with a reputation for low operational drag.",
        highlight: "Ransomware rollback, real-time protection",
        price: "$3.75/mo",
        url: "https://malwarebytes.com",
      },
      {
        name: "CrowdStrike Falcon Go",
        description:
          "Cloud-delivered endpoint protection that brings a lighter Falcon package into smaller environments without losing the threat intel edge.",
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
    description:
      "Tools that reduce your attack surface by minimising publicly available personal data — a practical first step against social engineering and OSINT-based targeting.",
    tools: [
      {
        name: "Incogni",
        description:
          "Automated data broker removal service from Surfshark. Sends removal requests on your behalf to hundreds of data brokers, people-search sites, and marketing databases — and monitors for re-listing.",
        highlight: "Automated broker removal, continuous monitoring",
        price: "From $6.49/mo",
        url: aff("incogni", "https://incogni.com"),
        badge: "Affiliate partner",
      },
    ],
  },
];

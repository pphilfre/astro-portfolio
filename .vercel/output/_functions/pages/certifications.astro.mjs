import { c as createComponent, r as renderTemplate, a as renderComponent, b as renderHead, d as addAttribute, e as createAstro } from '../chunks/astro/server_DfsTNRNX.mjs';
import 'piccolore';
/* empty css                                         */
import { N as Navbar } from '../chunks/Navbar_KjT06Vy-.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { Building2, Server, Cloud, Network, Award, Star, CalendarCheck, Shield, ExternalLink } from 'lucide-react';
import { SiCisco } from 'react-icons/si';
import { D as DetailSheet } from '../chunks/DetailSheet_-bMrLFds.mjs';
export { renderers } from '../renderers.mjs';

function ForageLogo({ className }) {
  return /* @__PURE__ */ jsxs("svg", { className, viewBox: "0 0 170 170", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", "aria-label": "Forage Logo", children: [
    /* @__PURE__ */ jsx("path", { d: "M159.968 41.48C159.968 41.48 152.955 31.7987 145.935 22.4293C137.085 24.6413 127.541 29.644 119.391 35.6867C111.781 41.3293 104.864 48.0053 97.5391 55.0733C92.0834 60.3387 86.4933 65.7133 80.5454 70.6867C94.5261 76.0587 107.138 89.0667 115.897 102.521C117.752 105.371 119.456 108.315 121.104 111.287C137.641 89.264 155.503 65.516 159.968 60.1627C167.995 50.54 159.968 41.48 159.968 41.48Z" }),
    /* @__PURE__ */ jsx("path", { d: "M82.714 48.176C82.5625 47.8853 82.4161 47.5907 82.2995 47.2747C77.4631 34.1333 55.7792 29.6467 36.4156 31.036C26.9677 31.712 17.5459 33.632 7.56926 35.6653C7.41406 35.696 7.25729 35.728 7.10208 35.76C5.03541 38.4813 3.23593 41.008 1.93385 43.1053C-3.26146 51.4773 3.65625 60.1627 3.65625 60.1627C3.65625 60.1627 9.84218 68.6333 18.4344 80.408C33.7568 79.736 49.3552 74.5733 62.9937 65.0053C69.9088 60.1547 76.2421 54.364 82.714 48.176Z" }),
    /* @__PURE__ */ jsx("path", { d: "M35.3292 15.8293C57.7251 14.2227 83.9735 19.1667 94.2984 37.108C99.3912 32.328 104.66 27.6307 110.309 23.4413C117.982 17.7533 126.88 12.6947 135.981 9.48933C135.951 9.45067 135.919 9.41067 135.888 9.372C129.175 1.084 116.032 2.19067 116.032 2.19067C116.032 2.19067 53.8151 2.624 43.9547 2.69334C34.0937 2.76134 31.0912 7.30268 31.0912 7.30268C31.0912 7.30268 27.2088 11.5867 22.1807 17.404C26.5364 16.7107 30.9245 16.1453 35.3292 15.8293Z" }),
    /* @__PURE__ */ jsx("path", { d: "M103.12 110.838C92.5348 94.576 75.8608 79.9947 62.4635 84.0773C61.7764 84.2867 61.0868 84.36 60.4029 84.3746C50.316 89.6493 39.6045 93.0493 28.8149 94.6386C47.1353 119.76 68.9275 149.681 69.9832 151.321C70.9639 152.845 82.4379 162.092 91.5291 150.476C94.5009 146.679 101.997 136.725 111.008 124.73C108.544 119.906 105.991 115.25 103.12 110.838Z" })
  ] });
}
const ciscoCertifications = [
  {
    name: "Endpoint Security",
    issuer: "Cisco",
    date: "Feb 2026",
    credentialId: "ca4e6574-c9fa-4659-a304-81892d9f6159",
    credentialUrl: "https://www.credly.com/badges/ca4e6574-c9fa-4659-a304-81892d9f6159/public_url",
    description: "This certification covers endpoint security fundamentals including threat prevention, detection, and response strategies. Topics include malware analysis, host-based security solutions, endpoint detection and response (EDR), and securing devices against modern cyber threats.",
    tags: ["Endpoint Protection", "Malware Analysis", "EDR", "Threat Prevention"]
  },
  {
    name: "Network Defense",
    issuer: "Cisco",
    date: "Feb 2026",
    credentialId: "01c39b81-fb15-494d-9b44-6626c50f3156",
    credentialUrl: "https://www.credly.com/badges/01c39b81-fb15-494d-9b44-6626c50f3156/public_url",
    description: "Network Defense certification demonstrates knowledge of network security monitoring, intrusion detection, and security operations. Covers network traffic analysis, security event correlation, and implementing defensive measures to protect network infrastructure.",
    tags: ["Network Security", "Intrusion Detection", "Traffic Analysis", "SOC"]
  },
  {
    name: "Introduction to IoT",
    issuer: "Cisco",
    date: "Jul 2024",
    credentialId: "ccce8102-43f9-4d1e-90cd-9983457e756f",
    credentialUrl: "https://www.credly.com/badges/ccce8102-43f9-4d1e-90cd-9983457e756f/public_url",
    description: "Introduction to the Internet of Things (IoT) covering the fundamentals of connected devices, IoT architecture, and the security considerations for IoT deployments. Explores how IoT is transforming industries and the importance of securing IoT ecosystems.",
    tags: ["IoT", "Connected Devices", "IoT Security", "Smart Systems"]
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco",
    date: "Jul 2024",
    credentialId: "298659f6-54ff-4143-9a7d-62d555f88271",
    credentialUrl: "https://www.credly.com/badges/298659f6-54ff-4143-9a7d-62d555f88271/public_url",
    description: "Foundational cybersecurity certification covering core security concepts, common threats, and basic defensive strategies. Introduces key topics such as confidentiality, integrity, availability, and the fundamentals of protecting digital assets.",
    tags: ["Security Fundamentals", "Threat Awareness", "CIA Triad", "Digital Protection"]
  }
];
const forageCertifications = [
  {
    name: "Tata - Cybersecurity Analyst Job Simulation",
    issuer: "Forage",
    date: "Feb 2026",
    credentialId: "gJkaK49gtYXJoqkox",
    credentialUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/gJkaK49gtYXJoqkox",
    description: "Completed a virtual job simulation as a Cybersecurity Analyst at Tata Consultancy Services. Gained hands-on experience with Identity and Access Management (IAM), security strategy development, and protecting enterprise systems against cyber threats.",
    tags: ["IAM", "Security Strategy", "Enterprise Security", "TCS"]
  },
  {
    name: "Datacom - Cyber Security Operations Job Simulation",
    issuer: "Forage",
    date: "Feb 2026",
    credentialId: "hAhPowXmA6LgzKZnp",
    credentialUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/hAhPowXmA6LgzKZnp",
    description: "Participated in a Security Operations Centre (SOC) simulation at Datacom. Practiced analyzing security alerts, investigating potential incidents, and developing response strategies for real-world cyber threats in an operational environment.",
    tags: ["SOC Operations", "Incident Response", "Security Alerts", "Threat Analysis"]
  },
  {
    name: "AIG - Shields Up: Cybersecurity Job Simulation",
    issuer: "Forage",
    date: "Feb 2026",
    credentialId: "kyHAiM9Ryyr3fehem",
    credentialUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/kyHAiM9Ryyr3fehem",
    description: "Completed AIG's Shields Up cybersecurity simulation focusing on responding to zero-day vulnerabilities and ransomware threats. Developed skills in vulnerability assessment, incident communication, and implementing security controls.",
    tags: ["Zero-Day Response", "Ransomware", "Vulnerability Assessment", "Incident Communication"]
  }
];
function CertificationCard({ cert, onCardClick }) {
  const handleLinkClick = (e) => {
    e.stopPropagation();
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick: onCardClick,
      className: "group flex items-start gap-4 p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors duration-200 cursor-pointer",
      children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0", children: cert.issuer === "Cisco" ? /* @__PURE__ */ jsx(SiCisco, { className: "w-6 h-6 text-foreground" }) : /* @__PURE__ */ jsx(ForageLogo, { className: "w-6 h-6 text-foreground" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium text-sm leading-tight", children: cert.name }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            cert.issuer,
            " • Issued ",
            cert.date
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: cert.credentialUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            onClick: handleLinkClick,
            className: "w-8 h-8 rounded-lg border border-border bg-background hover:bg-muted flex items-center justify-center shrink-0 transition-colors",
            title: "View credential",
            children: /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" })
          }
        )
      ]
    }
  );
}
function BentoCard({ children, onClick, className = "", clickable = true }) {
  if (!clickable) {
    return /* @__PURE__ */ jsx("article", { className, children });
  }
  return /* @__PURE__ */ jsx(
    "article",
    {
      onClick,
      className: `${className} cursor-pointer`,
      children
    }
  );
}
const cardDetails = {
  enterprise: {
    title: "Enterprise Cyber Security Exposure",
    subtitle: "Tesco Head Office",
    description: "I was invited back for a second week in Cyber Security after strong performance during a Software Development placement at Tesco's Head Office.\n\nDuring this experience, I gained hands-on exposure to enterprise-level security operations and practices. This included observing how large organisations approach threat detection, incident response, and security architecture. I learned about the scale and complexity of protecting critical business systems and customer data.\n\nThis placement reinforced my interest in pursuing cyber security as a career and gave me valuable insight into the day-to-day work of security professionals in a corporate environment.",
    tags: ["Enterprise Security", "SOC Exposure", "Corporate Environment", "Incident Response", "Security Operations"],
    icon: /* @__PURE__ */ jsx(Building2, { className: "w-8 h-8 text-foreground" })
  },
  homeLab: {
    title: "Home Lab Infrastructure",
    subtitle: "Self-directed project",
    description: "I built and manage a comprehensive Linux-based home lab environment that serves as my primary platform for learning and experimentation.\n\nThe infrastructure includes:\n• Multiple Docker containers running various services\n• VPN configurations for secure remote access\n• DNS server for internal name resolution\n• Reverse proxy setup with SSL termination\n• Cloud-hosted VPS instances for external services\n\nThis hands-on experience has given me practical skills in system administration, networking, and security that complement my theoretical knowledge.",
    tags: ["Linux", "Docker", "VPN", "DNS", "Nginx", "Self-hosted", "Infrastructure"],
    icon: /* @__PURE__ */ jsx(Server, { className: "w-8 h-8 text-foreground" })
  },
  cloudIdentity: {
    title: "Cloud & Identity-Based Access",
    subtitle: "Hands-on learning",
    description: "I have implemented Azure-based single sign-on (SSO) and secure remote access solutions for my personal infrastructure.\n\nThis project involved:\n• Setting up Azure AD for identity management\n• Configuring SSO for internal applications\n• Implementing conditional access policies\n• Securing remote access to internal services\n\nThrough this work, I gained practical experience with modern identity and access management concepts that are essential for enterprise security.",
    tags: ["Azure AD", "SSO", "Identity Management", "Conditional Access", "Zero Trust"],
    icon: /* @__PURE__ */ jsx(Cloud, { className: "w-8 h-8 text-foreground" })
  },
  networking: {
    title: "Networking & Security Knowledge",
    subtitle: "Independent study",
    description: "Through coursework and practical experimentation, I have covered material equivalent to CCNA and CompTIA A+ certifications.\n\nMy knowledge includes:\n• Network fundamentals (OSI model, TCP/IP)\n• Routing and switching concepts\n• Network security principles\n• Operating system fundamentals\n• Hardware and troubleshooting\n\nI apply this theoretical knowledge through hands-on projects in my home lab, ensuring I understand both the concepts and their real-world implementation.",
    tags: ["CCNA Concepts", "A+ Concepts", "TCP/IP", "Network Security", "Troubleshooting"],
    icon: /* @__PURE__ */ jsx(Network, { className: "w-8 h-8 text-foreground" })
  }
};
function AchievementsBento() {
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [selectedCert, setSelectedCert] = React.useState(null);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
    setSelectedCert(null);
    setSheetOpen(true);
  };
  const handleCertClick = (cert) => {
    setSelectedCert(cert);
    setSelectedCard(null);
    setSheetOpen(true);
  };
  const handleSheetClose = (open) => {
    setSheetOpen(open);
    if (!open) {
      setTimeout(() => {
        setSelectedCard(null);
        setSelectedCert(null);
      }, 300);
    }
  };
  const getCertSheetData = (cert) => ({
    title: cert.name,
    subtitle: `${cert.issuer} • Issued ${cert.date}`,
    description: cert.description,
    tags: cert.tags,
    icon: cert.issuer === "Cisco" ? /* @__PURE__ */ jsx(SiCisco, { className: "w-8 h-8 text-foreground" }) : /* @__PURE__ */ jsx(ForageLogo, { className: "w-8 h-8 text-foreground" }),
    link: cert.credentialUrl,
    linkLabel: "View Credential"
  });
  const currentSheetData = selectedCard ? cardDetails[selectedCard] : selectedCert ? getCertSheetData(selectedCert) : null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]", children: [
      /* @__PURE__ */ jsxs(
        BentoCard,
        {
          onClick: () => handleCardClick("enterprise"),
          className: "md:col-span-2 lg:row-span-2 p-8 bg-secondary rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx(Building2, { className: "w-6 h-6 text-foreground" }) }),
            /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-accent uppercase tracking-wider mb-3", children: "Tesco Head Office" }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl lg:text-3xl font-bold mb-4", children: "Enterprise Cyber Security Exposure" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground flex-1", children: "Invited back for a second week in Cyber Security after strong performance during a Software Development placement. Gained hands-on exposure to enterprise-level security operations." }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-accent mt-4", children: "Click to read more →" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        BentoCard,
        {
          onClick: () => handleCardClick("homeLab"),
          className: "lg:col-span-2 p-6 bg-secondary rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Server, { className: "w-5 h-5 text-foreground" }) }),
            /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-accent uppercase tracking-wider mb-2", children: "Self-directed project" }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-3", children: "Home Lab Infrastructure" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm flex-1", children: "Built and managed Linux-based services using Docker, VPNs, DNS, reverse proxies, and cloud-hosted infrastructure." }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-accent mt-3", children: "Click to read more →" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        BentoCard,
        {
          onClick: () => handleCardClick("cloudIdentity"),
          className: "p-6 bg-secondary rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Cloud, { className: "w-5 h-5 text-foreground" }) }),
            /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-accent uppercase tracking-wider mb-2", children: "Hands-on learning" }),
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: "Cloud & Identity Access" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm flex-1", children: "Implemented Azure-based single sign-on and secure remote access." }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-accent mt-3", children: "Click for details →" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        BentoCard,
        {
          onClick: () => handleCardClick("networking"),
          className: "p-6 bg-secondary rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Network, { className: "w-5 h-5 text-foreground" }) }),
            /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-accent uppercase tracking-wider mb-2", children: "Independent study" }),
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: "Networking & Security" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm flex-1", children: "CCNA and A+ level concepts through coursework and experimentation." }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-accent mt-3", children: "Click for details →" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("article", { className: "md:col-span-2 lg:col-span-4 p-6 bg-secondary rounded-2xl border border-border", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-6", children: "Other Achievements" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-4 bg-muted/50 rounded-xl", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Award, { className: "w-5 h-5 text-foreground" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium text-sm", children: "Duke of Edinburgh" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Bronze Award" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-4 bg-muted/50 rounded-xl", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Star, { className: "w-5 h-5 text-foreground" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium text-sm", children: "Headteacher Awards" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Multiple recognitions" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-4 bg-muted/50 rounded-xl", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(CalendarCheck, { className: "w-5 h-5 text-foreground" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium text-sm", children: "Attendance" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "100% recognition" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("article", { className: "md:col-span-2 lg:col-span-4 p-6 bg-secondary rounded-2xl border border-border", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsx(Shield, { className: "w-5 h-5 text-foreground" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Licenses & Certifications" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsx(SiCisco, { className: "w-5 h-5 text-foreground" }),
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider", children: "Cisco" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: ciscoCertifications.map((cert) => /* @__PURE__ */ jsx(CertificationCard, { cert, onCardClick: () => handleCertClick(cert) }, cert.credentialId)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsx(ForageLogo, { className: "w-5 h-5 text-foreground" }),
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider", children: "Forage" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: forageCertifications.map((cert) => /* @__PURE__ */ jsx(CertificationCard, { cert, onCardClick: () => handleCertClick(cert) }, cert.credentialId)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("article", { className: "md:col-span-2 lg:col-span-4 p-6 bg-muted/30 rounded-2xl border border-border/50", children: [
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center mb-4", children: "Additional certifications will be pursued through structured training or degree apprenticeship programmes." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "px-3 py-1.5 text-sm rounded-lg bg-muted/50 text-muted-foreground/60 border border-border/30", children: "CCNA" }),
          /* @__PURE__ */ jsx("span", { className: "px-3 py-1.5 text-sm rounded-lg bg-muted/50 text-muted-foreground/60 border border-border/30", children: "CISSP" }),
          /* @__PURE__ */ jsx("span", { className: "px-3 py-1.5 text-sm rounded-lg bg-muted/50 text-muted-foreground/60 border border-border/30", children: "CCISO" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      DetailSheet,
      {
        open: sheetOpen,
        onOpenChange: handleSheetClose,
        data: currentSheetData
      }
    )
  ] });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Certifications = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Certifications;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', `><meta name="description" content="Achievements and certifications by Freddie Philpot. Enterprise cybersecurity experience, home lab projects, cloud identity setup, and networking knowledge."><title>Achievements | Freddie Philpot</title><script>
			(function() {
				const theme = localStorage.getItem('theme') || 'system';
				const root = document.documentElement;
				if (theme === 'system') {
					const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
					root.classList.add(systemDark ? 'dark' : 'light');
				} else {
					root.classList.add(theme);
				}
			})();
		<\/script><!-- PostHog Analytics --><script>
			!function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init rs ls wi ns us ts ss capture calculateEventProperties vs register register_once register_for_session unregister unregister_for_session gs getFeatureFlag getFeatureFlagPayload getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty fs ds createPersonProfile setInternalOrTestUser ps Qr opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing hs debug M cs getPageViewId captureTraceFeedback captureTraceMetric Kr".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
			posthog.init('phc_kHZWuiUzdGkjQ7OvXfER2jygjMyTK9oyFfjVeg5vuAg', {
				api_host: 'https://us.i.posthog.com',
				defaults: '2025-11-30',
				person_profiles: 'identified_only',
			})
		<\/script>`, '</head> <body class="bg-background text-foreground min-h-screen"> ', ' <main class="pt-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto pb-16"> <div class="mb-12"> <h1 class="text-4xl md:text-5xl font-bold mb-4">Achievements</h1> <p class="text-muted-foreground text-lg">Experience and learning progress</p> </div> ', ' </main> <article class="md:col-span-2 lg:col-span-4 p-6 bg-muted/30 rounded-2xl border border-border/50"> <p class="text-muted-foreground text-center">\nFormal certifications will be pursued through structured training or degree apprenticeship programmes.\n</p> </article> </body></html><!-- Future Certifications Note -->'])), addAttribute(Astro2.generator, "content"), renderHead(), renderComponent($$result, "Navbar", Navbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/workspaces/astro-portfolio/src/components/Navbar.tsx", "client:component-export": "default" }), renderComponent($$result, "AchievementsBento", AchievementsBento, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/workspaces/astro-portfolio/src/components/AchievementsBento.tsx", "client:component-export": "AchievementsBento" }));
}, "/workspaces/astro-portfolio/src/pages/certifications.astro", void 0);

const $$file = "/workspaces/astro-portfolio/src/pages/certifications.astro";
const $$url = "/certifications";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Certifications,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

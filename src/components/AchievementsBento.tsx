import * as React from "react";
import { Building2, Server, Cloud, Network, Award, Star, CalendarCheck, ExternalLink, Shield } from "lucide-react";
import { SiCisco } from "react-icons/si";
import { DetailSheet, type DetailSheetData } from "./DetailSheet";

// Forage Logo Component (fox icon only for better visibility in small sizes)
function ForageLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 170 170" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Forage Logo">
      <path d="M159.968 41.48C159.968 41.48 152.955 31.7987 145.935 22.4293C137.085 24.6413 127.541 29.644 119.391 35.6867C111.781 41.3293 104.864 48.0053 97.5391 55.0733C92.0834 60.3387 86.4933 65.7133 80.5454 70.6867C94.5261 76.0587 107.138 89.0667 115.897 102.521C117.752 105.371 119.456 108.315 121.104 111.287C137.641 89.264 155.503 65.516 159.968 60.1627C167.995 50.54 159.968 41.48 159.968 41.48Z" />
      <path d="M82.714 48.176C82.5625 47.8853 82.4161 47.5907 82.2995 47.2747C77.4631 34.1333 55.7792 29.6467 36.4156 31.036C26.9677 31.712 17.5459 33.632 7.56926 35.6653C7.41406 35.696 7.25729 35.728 7.10208 35.76C5.03541 38.4813 3.23593 41.008 1.93385 43.1053C-3.26146 51.4773 3.65625 60.1627 3.65625 60.1627C3.65625 60.1627 9.84218 68.6333 18.4344 80.408C33.7568 79.736 49.3552 74.5733 62.9937 65.0053C69.9088 60.1547 76.2421 54.364 82.714 48.176Z" />
      <path d="M35.3292 15.8293C57.7251 14.2227 83.9735 19.1667 94.2984 37.108C99.3912 32.328 104.66 27.6307 110.309 23.4413C117.982 17.7533 126.88 12.6947 135.981 9.48933C135.951 9.45067 135.919 9.41067 135.888 9.372C129.175 1.084 116.032 2.19067 116.032 2.19067C116.032 2.19067 53.8151 2.624 43.9547 2.69334C34.0937 2.76134 31.0912 7.30268 31.0912 7.30268C31.0912 7.30268 27.2088 11.5867 22.1807 17.404C26.5364 16.7107 30.9245 16.1453 35.3292 15.8293Z" />
      <path d="M103.12 110.838C92.5348 94.576 75.8608 79.9947 62.4635 84.0773C61.7764 84.2867 61.0868 84.36 60.4029 84.3746C50.316 89.6493 39.6045 93.0493 28.8149 94.6386C47.1353 119.76 68.9275 149.681 69.9832 151.321C70.9639 152.845 82.4379 162.092 91.5291 150.476C94.5009 146.679 101.997 136.725 111.008 124.73C108.544 119.906 105.991 115.25 103.12 110.838Z" />
    </svg>
  );
}

// Certification data
interface Certification {
  name: string;
  issuer: "Cisco" | "Forage";
  date: string;
  credentialId: string;
  credentialUrl: string;
  description: string;
  tags: string[];
}

const ciscoCertifications: Certification[] = [
  {
    name: "Endpoint Security",
    issuer: "Cisco",
    date: "Feb 2026",
    credentialId: "ca4e6574-c9fa-4659-a304-81892d9f6159",
    credentialUrl: "https://www.credly.com/badges/ca4e6574-c9fa-4659-a304-81892d9f6159/public_url",
    description: "This certification covers endpoint security fundamentals including threat prevention, detection, and response strategies. Topics include malware analysis, host-based security solutions, endpoint detection and response (EDR), and securing devices against modern cyber threats.",
    tags: ["Endpoint Protection", "Malware Analysis", "EDR", "Threat Prevention"],
  },
  {
    name: "Network Defense",
    issuer: "Cisco",
    date: "Feb 2026",
    credentialId: "01c39b81-fb15-494d-9b44-6626c50f3156",
    credentialUrl: "https://www.credly.com/badges/01c39b81-fb15-494d-9b44-6626c50f3156/public_url",
    description: "Network Defense certification demonstrates knowledge of network security monitoring, intrusion detection, and security operations. Covers network traffic analysis, security event correlation, and implementing defensive measures to protect network infrastructure.",
    tags: ["Network Security", "Intrusion Detection", "Traffic Analysis", "SOC"],
  },
  {
    name: "Introduction to IoT",
    issuer: "Cisco",
    date: "Jul 2024",
    credentialId: "ccce8102-43f9-4d1e-90cd-9983457e756f",
    credentialUrl: "https://www.credly.com/badges/ccce8102-43f9-4d1e-90cd-9983457e756f/public_url",
    description: "Introduction to the Internet of Things (IoT) covering the fundamentals of connected devices, IoT architecture, and the security considerations for IoT deployments. Explores how IoT is transforming industries and the importance of securing IoT ecosystems.",
    tags: ["IoT", "Connected Devices", "IoT Security", "Smart Systems"],
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco",
    date: "Jul 2024",
    credentialId: "298659f6-54ff-4143-9a7d-62d555f88271",
    credentialUrl: "https://www.credly.com/badges/298659f6-54ff-4143-9a7d-62d555f88271/public_url",
    description: "Foundational cybersecurity certification covering core security concepts, common threats, and basic defensive strategies. Introduces key topics such as confidentiality, integrity, availability, and the fundamentals of protecting digital assets.",
    tags: ["Security Fundamentals", "Threat Awareness", "CIA Triad", "Digital Protection"],
  },
];

const forageCertifications: Certification[] = [
  {
    name: "Tata - Cybersecurity Analyst Job Simulation",
    issuer: "Forage",
    date: "Feb 2026",
    credentialId: "gJkaK49gtYXJoqkox",
    credentialUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/gJkaK49gtYXJoqkox",
    description: "Completed a virtual job simulation as a Cybersecurity Analyst at Tata Consultancy Services. Gained hands-on experience with Identity and Access Management (IAM), security strategy development, and protecting enterprise systems against cyber threats.",
    tags: ["IAM", "Security Strategy", "Enterprise Security", "TCS"],
  },
  {
    name: "Datacom - Cyber Security Operations Job Simulation",
    issuer: "Forage",
    date: "Feb 2026",
    credentialId: "hAhPowXmA6LgzKZnp",
    credentialUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/hAhPowXmA6LgzKZnp",
    description: "Participated in a Security Operations Centre (SOC) simulation at Datacom. Practiced analyzing security alerts, investigating potential incidents, and developing response strategies for real-world cyber threats in an operational environment.",
    tags: ["SOC Operations", "Incident Response", "Security Alerts", "Threat Analysis"],
  },
  {
    name: "AIG - Shields Up: Cybersecurity Job Simulation",
    issuer: "Forage",
    date: "Feb 2026",
    credentialId: "kyHAiM9Ryyr3fehem",
    credentialUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/kyHAiM9Ryyr3fehem",
    description: "Completed AIG's Shields Up cybersecurity simulation focusing on responding to zero-day vulnerabilities and ransomware threats. Developed skills in vulnerability assessment, incident communication, and implementing security controls.",
    tags: ["Zero-Day Response", "Ransomware", "Vulnerability Assessment", "Incident Communication"],
  },
];

function CertificationCard({ cert, onCardClick }: { cert: Certification; onCardClick: () => void }) {
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  return (
    <div
      onClick={onCardClick}
      className="group flex items-start gap-4 p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors duration-200 cursor-pointer"
    >
      <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0">
        {cert.issuer === "Cisco" ? (
          <SiCisco className="w-6 h-6 text-foreground" />
        ) : (
          <ForageLogo className="w-6 h-6 text-foreground" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm leading-tight">{cert.name}</p>
        <p className="text-xs text-muted-foreground mt-1">{cert.issuer} • Issued {cert.date}</p>
      </div>
      <a
        href={cert.credentialUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleLinkClick}
        className="w-8 h-8 rounded-lg border border-border bg-background hover:bg-muted flex items-center justify-center shrink-0 transition-colors"
        title="View credential"
      >
        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      </a>
    </div>
  );
}

interface BentoCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  clickable?: boolean;
}

function BentoCard({ children, onClick, className = "", clickable = true }: BentoCardProps) {
  if (!clickable) {
    return <article className={className}>{children}</article>;
  }
  
  return (
    <article 
      onClick={onClick}
      className={`${className} cursor-pointer`}
    >
      {children}
    </article>
  );
}

// Card data with full descriptions for the sheet
const cardDetails: Record<string, DetailSheetData> = {
  enterprise: {
    title: "Enterprise Cyber Security Exposure",
    subtitle: "Tesco Head Office",
    description: "I was invited back for a second week in Cyber Security after strong performance during a Software Development placement at Tesco's Head Office.\n\nDuring this experience, I gained hands-on exposure to enterprise-level security operations and practices. This included observing how large organisations approach threat detection, incident response, and security architecture. I learned about the scale and complexity of protecting critical business systems and customer data.\n\nThis placement reinforced my interest in pursuing cyber security as a career and gave me valuable insight into the day-to-day work of security professionals in a corporate environment.",
    tags: ["Enterprise Security", "SOC Exposure", "Corporate Environment", "Incident Response", "Security Operations"],
    icon: <Building2 className="w-8 h-8 text-foreground" />,
  },
  homeLab: {
    title: "Home Lab Infrastructure",
    subtitle: "Self-directed project",
    description: "I built and manage a comprehensive Linux-based home lab environment that serves as my primary platform for learning and experimentation.\n\nThe infrastructure includes:\n• Multiple Docker containers running various services\n• VPN configurations for secure remote access\n• DNS server for internal name resolution\n• Reverse proxy setup with SSL termination\n• Cloud-hosted VPS instances for external services\n\nThis hands-on experience has given me practical skills in system administration, networking, and security that complement my theoretical knowledge.",
    tags: ["Linux", "Docker", "VPN", "DNS", "Nginx", "Self-hosted", "Infrastructure"],
    icon: <Server className="w-8 h-8 text-foreground" />,
  },
  cloudIdentity: {
    title: "Cloud & Identity-Based Access",
    subtitle: "Hands-on learning",
    description: "I have implemented Azure-based single sign-on (SSO) and secure remote access solutions for my personal infrastructure.\n\nThis project involved:\n• Setting up Azure AD for identity management\n• Configuring SSO for internal applications\n• Implementing conditional access policies\n• Securing remote access to internal services\n\nThrough this work, I gained practical experience with modern identity and access management concepts that are essential for enterprise security.",
    tags: ["Azure AD", "SSO", "Identity Management", "Conditional Access", "Zero Trust"],
    icon: <Cloud className="w-8 h-8 text-foreground" />,
  },
  networking: {
    title: "Networking & Security Knowledge",
    subtitle: "Independent study",
    description: "Through coursework and practical experimentation, I have covered material equivalent to CCNA and CompTIA A+ certifications.\n\nMy knowledge includes:\n• Network fundamentals (OSI model, TCP/IP)\n• Routing and switching concepts\n• Network security principles\n• Operating system fundamentals\n• Hardware and troubleshooting\n\nI apply this theoretical knowledge through hands-on projects in my home lab, ensuring I understand both the concepts and their real-world implementation.",
    tags: ["CCNA Concepts", "A+ Concepts", "TCP/IP", "Network Security", "Troubleshooting"],
    icon: <Network className="w-8 h-8 text-foreground" />,
  },
};

export function AchievementsBento() {
  const [selectedCard, setSelectedCard] = React.useState<string | null>(null);
  const [selectedCert, setSelectedCert] = React.useState<Certification | null>(null);
  const [sheetOpen, setSheetOpen] = React.useState(false);

  const handleCardClick = (cardId: string) => {
    setSelectedCard(cardId);
    setSelectedCert(null);
    setSheetOpen(true);
  };

  const handleCertClick = (cert: Certification) => {
    setSelectedCert(cert);
    setSelectedCard(null);
    setSheetOpen(true);
  };

  const handleSheetClose = (open: boolean) => {
    setSheetOpen(open);
    if (!open) {
      setTimeout(() => {
        setSelectedCard(null);
        setSelectedCert(null);
      }, 300);
    }
  };

  // Convert certification to DetailSheetData
  const getCertSheetData = (cert: Certification): DetailSheetData => ({
    title: cert.name,
    subtitle: `${cert.issuer} • Issued ${cert.date}`,
    description: cert.description,
    tags: cert.tags,
    icon: cert.issuer === "Cisco" ? <SiCisco className="w-8 h-8 text-foreground" /> : <ForageLogo className="w-8 h-8 text-foreground" />,
    link: cert.credentialUrl,
    linkLabel: "View Credential",
  });

  const currentSheetData = selectedCard 
    ? cardDetails[selectedCard] 
    : selectedCert 
      ? getCertSheetData(selectedCert) 
      : null;

  return (
    <>
      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
        
        {/* Large Feature Card - Enterprise Experience */}
        <BentoCard
          onClick={() => handleCardClick("enterprise")}
          className="md:col-span-2 lg:row-span-2 p-8 bg-secondary rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col"
        >
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-6">
            <Building2 className="w-6 h-6 text-foreground" />
          </div>
          <div className="text-xs font-medium text-accent uppercase tracking-wider mb-3">Tesco Head Office</div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Enterprise Cyber Security Exposure</h2>
          <p className="text-muted-foreground flex-1">
            Invited back for a second week in Cyber Security after strong performance during a Software Development placement. Gained hands-on exposure to enterprise-level security operations.
          </p>
          <span className="text-xs text-accent mt-4">Click to read more →</span>
        </BentoCard>

        {/* Home Lab */}
        <BentoCard
          onClick={() => handleCardClick("homeLab")}
          className="lg:col-span-2 p-6 bg-secondary rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col"
        >
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-4">
            <Server className="w-5 h-5 text-foreground" />
          </div>
          <div className="text-xs font-medium text-accent uppercase tracking-wider mb-2">Self-directed project</div>
          <h2 className="text-xl font-semibold mb-3">Home Lab Infrastructure</h2>
          <p className="text-muted-foreground text-sm flex-1">
            Built and managed Linux-based services using Docker, VPNs, DNS, reverse proxies, and cloud-hosted infrastructure.
          </p>
          <span className="text-xs text-accent mt-3">Click to read more →</span>
        </BentoCard>

        {/* Cloud & Identity */}
        <BentoCard
          onClick={() => handleCardClick("cloudIdentity")}
          className="p-6 bg-secondary rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col"
        >
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-4">
            <Cloud className="w-5 h-5 text-foreground" />
          </div>
          <div className="text-xs font-medium text-accent uppercase tracking-wider mb-2">Hands-on learning</div>
          <h2 className="text-lg font-semibold mb-2">Cloud & Identity Access</h2>
          <p className="text-muted-foreground text-sm flex-1">
            Implemented Azure-based single sign-on and secure remote access.
          </p>
          <span className="text-xs text-accent mt-3">Click for details →</span>
        </BentoCard>

        {/* Networking */}
        <BentoCard
          onClick={() => handleCardClick("networking")}
          className="p-6 bg-secondary rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col"
        >
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-4">
            <Network className="w-5 h-5 text-foreground" />
          </div>
          <div className="text-xs font-medium text-accent uppercase tracking-wider mb-2">Independent study</div>
          <h2 className="text-lg font-semibold mb-2">Networking & Security</h2>
          <p className="text-muted-foreground text-sm flex-1">
            CCNA and A+ level concepts through coursework and experimentation.
          </p>
          <span className="text-xs text-accent mt-3">Click for details →</span>
        </BentoCard>

        {/* Other Achievements - Horizontal layout */}
        <article className="md:col-span-2 lg:col-span-4 p-6 bg-secondary rounded-2xl border border-border">
          <h2 className="text-lg font-semibold mb-6">Other Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="font-medium text-sm">Duke of Edinburgh</p>
                <p className="text-xs text-muted-foreground">Bronze Award</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="font-medium text-sm">Headteacher Awards</p>
                <p className="text-xs text-muted-foreground">Multiple recognitions</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0">
                <CalendarCheck className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="font-medium text-sm">Attendance</p>
                <p className="text-xs text-muted-foreground">100% recognition</p>
              </div>
            </div>
          </div>
        </article>

        {/* Certifications Section */}
        <article className="md:col-span-2 lg:col-span-4 p-6 bg-secondary rounded-2xl border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <Shield className="w-5 h-5 text-foreground" />
            </div>
            <h2 className="text-xl font-semibold">Licenses & Certifications</h2>
          </div>
          
          {/* Cisco Certifications */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <SiCisco className="w-5 h-5 text-foreground" />
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Cisco</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ciscoCertifications.map((cert) => (
                <CertificationCard key={cert.credentialId} cert={cert} onCardClick={() => handleCertClick(cert)} />
              ))}
            </div>
          </div>
          
          {/* Forage Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ForageLogo className="w-5 h-5 text-foreground" />
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Forage</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {forageCertifications.map((cert) => (
                <CertificationCard key={cert.credentialId} cert={cert} onCardClick={() => handleCertClick(cert)} />
              ))}
            </div>
          </div>
        </article>

        {/* Future Certifications Note */}
        <article className="md:col-span-2 lg:col-span-4 p-6 bg-muted/30 rounded-2xl border border-border/50">
          <p className="text-muted-foreground text-center mb-4">
            Additional certifications will be pursued through structured training or degree apprenticeship programmes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-3 py-1.5 text-sm rounded-lg bg-muted/50 text-muted-foreground/60 border border-border/30">
              CCNA
            </span>
            <span className="px-3 py-1.5 text-sm rounded-lg bg-muted/50 text-muted-foreground/60 border border-border/30">
              CISSP
            </span>
            <span className="px-3 py-1.5 text-sm rounded-lg bg-muted/50 text-muted-foreground/60 border border-border/30">
              CCISO
            </span>
          </div>
        </article>
      </div>

      {/* Detail Sheet */}
      <DetailSheet
        open={sheetOpen}
        onOpenChange={handleSheetClose}
        data={currentSheetData}
      />
    </>
  );
}

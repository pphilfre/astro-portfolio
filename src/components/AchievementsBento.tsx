import * as React from "react";
import { Building2, Server, Cloud, Network, Award, Star, CalendarCheck } from "lucide-react";
import { DetailSheet, type DetailSheetData } from "./DetailSheet";

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
    icon: <Building2 className="w-6 h-6 text-foreground" />,
  },
  homeLab: {
    title: "Home Lab Infrastructure",
    subtitle: "Self-directed project",
    description: "I built and manage a comprehensive Linux-based home lab environment that serves as my primary platform for learning and experimentation.\n\nThe infrastructure includes:\n• Multiple Docker containers running various services\n• VPN configurations for secure remote access\n• DNS server for internal name resolution\n• Reverse proxy setup with SSL termination\n• Cloud-hosted VPS instances for external services\n\nThis hands-on experience has given me practical skills in system administration, networking, and security that complement my theoretical knowledge.",
    tags: ["Linux", "Docker", "VPN", "DNS", "Nginx", "Self-hosted", "Infrastructure"],
    icon: <Server className="w-6 h-6 text-foreground" />,
  },
  cloudIdentity: {
    title: "Cloud & Identity-Based Access",
    subtitle: "Hands-on learning",
    description: "I have implemented Azure-based single sign-on (SSO) and secure remote access solutions for my personal infrastructure.\n\nThis project involved:\n• Setting up Azure AD for identity management\n• Configuring SSO for internal applications\n• Implementing conditional access policies\n• Securing remote access to internal services\n\nThrough this work, I gained practical experience with modern identity and access management concepts that are essential for enterprise security.",
    tags: ["Azure AD", "SSO", "Identity Management", "Conditional Access", "Zero Trust"],
    icon: <Cloud className="w-6 h-6 text-foreground" />,
  },
  networking: {
    title: "Networking & Security Knowledge",
    subtitle: "Independent study",
    description: "Through coursework and practical experimentation, I have covered material equivalent to CCNA and CompTIA A+ certifications.\n\nMy knowledge includes:\n• Network fundamentals (OSI model, TCP/IP)\n• Routing and switching concepts\n• Network security principles\n• Operating system fundamentals\n• Hardware and troubleshooting\n\nI apply this theoretical knowledge through hands-on projects in my home lab, ensuring I understand both the concepts and their real-world implementation.",
    tags: ["CCNA Concepts", "A+ Concepts", "TCP/IP", "Network Security", "Troubleshooting"],
    icon: <Network className="w-6 h-6 text-foreground" />,
  },
};

export function AchievementsBento() {
  const [selectedCard, setSelectedCard] = React.useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = React.useState(false);

  const handleCardClick = (cardId: string) => {
    setSelectedCard(cardId);
    setSheetOpen(true);
  };

  const handleSheetClose = (open: boolean) => {
    setSheetOpen(open);
    if (!open) {
      setTimeout(() => setSelectedCard(null), 300);
    }
  };

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

        {/* Future Certifications Note */}
        <article className="md:col-span-2 lg:col-span-4 p-6 bg-muted/30 rounded-2xl border border-border/50">
          <p className="text-muted-foreground text-center mb-4">
            Formal certifications will be pursued through structured training or degree apprenticeship programmes.
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
        data={selectedCard ? cardDetails[selectedCard] : null}
      />
    </>
  );
}

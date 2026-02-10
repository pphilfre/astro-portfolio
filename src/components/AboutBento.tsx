import * as React from "react";
import { User, Monitor, Cloud, Shield, Code, Target, Compass, GraduationCap } from "lucide-react";
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
  whoIAm: {
    title: "Who Am I?",
    description: "I am currently completing my GCSEs and will be studying Maths, Further Maths, Physics, and Economics at A-level. Outside of formal education, I spend time working with Linux systems, cloud infrastructure, and maintaining a home lab environment. Through placements at Tesco's Head Office, I have gained early exposure to enterprise technology operations and cyber security practices in a corporate setting.\n\nI have a strong interest in understanding how complex systems work, identifying potential vulnerabilities, and building reliable infrastructure. My approach combines academic study with practical experimentation.",
    tags: ["Student", "Linux Enthusiast", "Self-taught", "Enterprise Experience"],
    icon: <User className="w-6 h-6 text-foreground" />,
  },
  direction: {
    title: "Direction",
    subtitle: "Career Goals",
    description: "Working towards a technology degree apprenticeship in financial services, with a long-term focus on cyber security and infrastructure risk.\n\nI'm particularly interested in the intersection of technology and finance, where security is paramount and the stakes are high. My goal is to develop expertise in protecting critical systems while continuing to build practical skills through hands-on experience.",
    tags: ["Degree Apprenticeship", "Financial Services", "Cyber Security", "Infrastructure Risk"],
    icon: <Compass className="w-6 h-6 text-foreground" />,
  },
  approach: {
    title: "Approach",
    subtitle: "Philosophy",
    description: "My focus is on security, reliability, and usability. I prioritise understanding how systems are designed, where they can fail, and how risk can be reduced—rather than simply learning tools in isolation.\n\nI believe in building a strong foundation of fundamentals before specialising, and in learning by doing. Every project in my home lab serves as an opportunity to understand real-world challenges and develop practical problem-solving skills.",
    tags: ["Security-First", "Systems Thinking", "Risk Management", "Practical Learning"],
    icon: <Target className="w-6 h-6 text-foreground" />,
  },
  operatingSystems: {
    title: "Operating Systems",
    subtitle: "Technical Skills",
    description: "I have advanced experience with Linux, using it as my daily driver for both personal and development work. This includes server administration, shell scripting, package management, and system configuration.\n\nI also have enterprise exposure to Windows environments through my placement work, including Active Directory, Group Policy, and Windows Server administration.",
    tags: ["Linux", "Ubuntu", "Debian", "Windows Server", "Active Directory", "Shell Scripting"],
    icon: <Monitor className="w-6 h-6 text-foreground" />,
  },
  cloudInfra: {
    title: "Cloud & Infrastructure",
    subtitle: "Technical Skills",
    description: "I have hands-on experience with multiple cloud platforms including Microsoft Azure, Google Cloud Platform, and Oracle Cloud. My work includes deploying and managing virtual machines, configuring networking, and implementing cloud-native services.\n\nI'm proficient with Docker containerisation for deploying applications, and have experience configuring reverse proxies (Nginx, Traefik) for routing and SSL termination.",
    tags: ["Azure", "GCP", "Oracle Cloud", "Docker", "Nginx", "Traefik", "Containers", "VMs"],
    icon: <Cloud className="w-6 h-6 text-foreground" />,
  },
  networkingSecurity: {
    title: "Networking & Security",
    subtitle: "Technical Skills",
    description: "My networking knowledge covers VPN configuration and management, DNS administration, and network security fundamentals. I've implemented identity-based access controls and have exposure to various security tooling.\n\nThrough self-study and practical application, I've covered material equivalent to CCNA and CompTIA A+ certifications, focusing on both theoretical understanding and hands-on implementation.",
    tags: ["VPN", "DNS", "WireGuard", "Identity Management", "CCNA Concepts", "Network Security"],
    icon: <Shield className="w-6 h-6 text-foreground" />,
  },
  development: {
    title: "Development",
    subtitle: "Technical Skills",
    description: "I use Python for automation tasks, scripting, and building small tools. My development workflow includes Git version control for all projects, and I have exposure to PowerShell for Windows automation.\n\nI'm comfortable with web technologies and have built projects using various frameworks. I believe in writing clean, maintainable code and documenting my work thoroughly.",
    tags: ["Python", "Git", "GitHub", "PowerShell", "Automation", "Scripting", "Web Development"],
    icon: <Code className="w-6 h-6 text-foreground" />,
  },
};

export function AboutBento() {
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
      {/* Bio / Direction / Approach — equal 3-column row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

        {/* Bio */}
        <BentoCard
          onClick={() => handleCardClick("whoIAm")}
          className="p-5 bg-secondary rounded-xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-foreground" />
            </div>
            <h2 className="font-semibold">Who Am I?</h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed flex-1">
            Currently completing my GCSEs, studying Maths, Further Maths, Physics &amp; Economics at A-level. Outside of school I work with Linux systems, cloud infrastructure, and maintain a home lab environment.
          </p>
          <span className="text-xs text-accent mt-2">Click to read more →</span>
        </BentoCard>

        {/* Direction */}
        <BentoCard
          onClick={() => handleCardClick("direction")}
          className="p-5 bg-secondary rounded-xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4 text-foreground" />
            </div>
            <h2 className="font-semibold">Direction</h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed flex-1">
            Working towards a technology degree apprenticeship in financial services, with a long-term focus on cyber security and infrastructure risk.
          </p>
          <span className="text-xs text-accent mt-2">Click to read more →</span>
        </BentoCard>

        {/* Approach */}
        <BentoCard
          onClick={() => handleCardClick("approach")}
          className="p-5 bg-secondary rounded-xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <Target className="w-4 h-4 text-foreground" />
            </div>
            <h2 className="font-semibold">Approach</h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed flex-1">
            Focus on security, reliability, and usability. Understanding how systems are designed, where they can fail, and how risk can be reduced.
          </p>
          <span className="text-xs text-accent mt-2">Click to read more →</span>
        </BentoCard>
      </div>

      {/* Skills row */}
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-3">Skills</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <BentoCard
            onClick={() => handleCardClick("operatingSystems")}
            className="p-4 bg-secondary rounded-xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <Monitor className="w-4 h-4 text-foreground" />
              </div>
              <h3 className="font-semibold text-sm">Operating Systems</h3>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1 flex-1">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>Linux (advanced)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>Windows (enterprise)</li>
            </ul>
          </BentoCard>

          <BentoCard
            onClick={() => handleCardClick("cloudInfra")}
            className="p-4 bg-secondary rounded-xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <Cloud className="w-4 h-4 text-foreground" />
              </div>
              <h3 className="font-semibold text-sm">Cloud & Infra</h3>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1 flex-1">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>Azure, GCP, Oracle</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>Docker & containers</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>Reverse proxy</li>
            </ul>
          </BentoCard>

          <BentoCard
            onClick={() => handleCardClick("networkingSecurity")}
            className="p-4 bg-secondary rounded-xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4 text-foreground" />
              </div>
              <h3 className="font-semibold text-sm">Network & Security</h3>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1 flex-1">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>VPN & DNS</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>Identity access</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>Security tooling</li>
            </ul>
          </BentoCard>

          <BentoCard
            onClick={() => handleCardClick("development")}
            className="p-4 bg-secondary rounded-xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <Code className="w-4 h-4 text-foreground" />
              </div>
              <h3 className="font-semibold text-sm">Development</h3>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1 flex-1">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>Python</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>Git & GitHub</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>PowerShell</li>
            </ul>
          </BentoCard>
        </div>
      </div>

      {/* Education Note */}
      <article className="mt-4 p-4 bg-muted/30 rounded-xl border border-border/50 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
          <GraduationCap className="w-4 h-4 text-foreground" />
        </div>
        <p className="text-muted-foreground text-sm">
          <span className="font-medium text-foreground">Next Steps:</span> A-levels in Maths, Further Maths, Physics, and Economics — then pursuing a degree apprenticeship in technology.
        </p>
      </article>

      {/* Detail Sheet */}
      <DetailSheet
        open={sheetOpen}
        onOpenChange={handleSheetClose}
        data={selectedCard ? cardDetails[selectedCard] : null}
      />
    </>
  );
}

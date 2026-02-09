import * as React from "react";
import { Building2, Server, Cloud, Network, Award, Star, CalendarCheck, ExternalLink, Shield, Lock } from "lucide-react";
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

// Locked future certification card
interface LockedCertification {
  name: string;
  issuer: string;
  shortDescription: string;
  fullDescription: string;
  tags: string[];
}

const futureCertifications: LockedCertification[] = [
  {
    name: "CCNA",
    issuer: "Cisco",
    shortDescription: "Cisco Certified Network Associate",
    fullDescription: "The CCNA certification validates the ability to install, configure, operate, and troubleshoot medium-size routed and switched networks. This includes implementing and verifying connections to remote sites in a WAN, basic network security, and understanding of network fundamentals and access.\n\nThis certification is a key goal as it provides industry-recognized validation of networking skills and opens doors to network engineering roles.",
    tags: ["Networking", "Routing", "Switching", "Network Security", "Cisco"],
  },
  {
    name: "CISSP",
    issuer: "ISC²",
    shortDescription: "Certified Information Systems Security Professional",
    fullDescription: "The CISSP is an advanced-level certification for IT professionals serious about careers in information security. It covers eight domains including Security and Risk Management, Asset Security, Security Architecture and Engineering, and more.\n\nThis is a long-term goal requiring significant experience and expertise in the cybersecurity field. It represents a commitment to the highest standards of professional security practice.",
    tags: ["Security Management", "Risk Assessment", "Security Architecture", "Governance", "Advanced"],
  },
  {
    name: "CCISO",
    issuer: "EC-Council",
    shortDescription: "Certified Chief Information Security Officer",
    fullDescription: "The CCISO certification is designed for executive-level information security professionals. It focuses on the application of information security management principles from an executive management perspective.\n\nThis represents an aspirational career goal, combining technical knowledge with business acumen and leadership skills required at the C-suite level.",
    tags: ["Leadership", "Security Strategy", "Executive Management", "Governance", "Enterprise"],
  },
];

// Modal for inspecting locked certification cards
function LockedCertModal({ cert, isOpen, onClose }: { cert: LockedCertification | null; isOpen: boolean; onClose: () => void }) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [transform, setTransform] = React.useState({ rotateX: 0, rotateY: 0 });
  const [isHovering, setIsHovering] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      // Trigger animation
      setIsAnimating(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else {
      setIsVisible(false);
      const timeout = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timeout);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Gyroscope support for mobile
  React.useEffect(() => {
    if (!isOpen) return;
    
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      
      // Clamp values and calculate rotation (increased sensitivity for mobile)
      const rotateX = Math.max(-20, Math.min(20, (e.beta - 45) * 0.8));
      const rotateY = Math.max(-20, Math.min(20, e.gamma * 0.8));
      
      setTransform({ rotateX: -rotateX, rotateY });
    };

    // Request permission on iOS 13+
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      // iOS 13+ requires permission
      (DeviceOrientationEvent as any).requestPermission()
        .then((permissionState: string) => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        })
        .catch(console.error);
    } else {
      // Non iOS 13+ devices
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [isOpen]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setTransform({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!isAnimating && !isOpen) return null;
  if (!cert) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
      />

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
        aria-label="Close"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      {/* Card */}
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 transition-all duration-300 ease-out max-h-[85vh] overflow-y-auto"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.8)',
        }}
      >
        <div
          className="relative overflow-hidden rounded-3xl border border-border/50 p-6 sm:p-10 bg-muted/40 backdrop-blur-md w-[min(300px,90vw)] sm:w-[450px]"
          style={{
            transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${isHovering ? 1.02 : 1})`,
            transformStyle: 'preserve-3d',
            transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
          }}
        >
          {/* Subtle hover highlight */}
          <div 
            className="absolute inset-0 rounded-3xl pointer-events-none bg-foreground/20"
            style={{
              opacity: isHovering ? 0.2 : 0,
              transition: 'opacity 0.3s ease-out',
            }}
          />
          
          {/* Lock badge */}
          <div className="absolute top-4 right-4 z-20" style={{ transform: 'translateZ(50px)' }}>
            <div className="w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center border border-border/50 backdrop-blur-sm">
              <Lock className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
          
          {/* Card content */}
          <div className="relative z-10 flex flex-col" style={{ transform: 'translateZ(40px)' }}>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-muted/60 flex items-center justify-center border border-border/30 backdrop-blur-sm">
                {cert.issuer === "Cisco" ? (
                  <SiCisco className="w-8 h-8 text-muted-foreground" />
                ) : (
                  <Shield className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
            </div>
            
            {/* Title section */}
            <h2 className="text-3xl font-bold text-foreground/90 mb-1">{cert.name}</h2>
            <p className="text-base text-muted-foreground mb-2">{cert.issuer}</p>
            <p className="text-xs text-accent uppercase tracking-wider mb-6">Future Goal</p>
            
            {/* Description */}
            <div>
              <p className="text-base text-muted-foreground/80 leading-relaxed whitespace-pre-line">
                {cert.fullDescription}
              </p>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border/30">
              {cert.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 text-sm bg-muted/50 rounded-full text-muted-foreground border border-border/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Decorative pattern */}
          <div className="absolute -bottom-8 -right-8 w-32 h-32 opacity-[0.03]" style={{ transform: 'translateZ(20px)' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-foreground">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Close hint */}
      <p 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-muted-foreground transition-opacity duration-300 delay-150"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        Click anywhere or press Esc to close
      </p>
    </div>
  );
}

function LockedCertCard({ cert, onClick }: { cert: LockedCertification; onClick?: () => void }) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [transform, setTransform] = React.useState({ rotateX: 0, rotateY: 0 });
  const [pointer, setPointer] = React.useState({ x: 50, y: 50, fromCenter: 0 });
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (subtle effect)
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    // Calculate pointer position as percentage
    const pointerX = (x / rect.width) * 100;
    const pointerY = (y / rect.height) * 100;
    
    // Calculate distance from center (0-1)
    const fromCenter = Math.min(
      Math.sqrt(
        Math.pow((pointerY - 50) / 50, 2) + Math.pow((pointerX - 50) / 50, 2)
      ),
      1
    );
    
    setTransform({ rotateX, rotateY });
    setPointer({ x: pointerX, y: pointerY, fromCenter });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setPointer({ x: 50, y: 50, fromCenter: 0 });
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      className="relative"
    >
      <div
        className="group relative overflow-hidden rounded-2xl border border-border/50 p-6 cursor-pointer bg-muted/30"
        style={{
          transform: `perspective(800px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${isHovering ? 1.02 : 1})`,
          transformStyle: 'preserve-3d',
          transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
      >
      {/* Subtle hover highlight */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none bg-foreground/20"
        style={{
          opacity: isHovering ? 0.25 : 0,
          transition: 'opacity 0.3s ease-out',
        }}
      />
      
      {/* Lock icon in corner */}
      <div className="absolute top-4 right-4 z-20" style={{ transform: 'translateZ(40px)' }}>
        <div className="w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center border border-border/50 backdrop-blur-sm">
          <Lock className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
      
      {/* Card content */}
      <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
        <div className="w-12 h-12 rounded-xl bg-muted/60 flex items-center justify-center mb-4 border border-border/30 backdrop-blur-sm">
          {cert.issuer === "Cisco" ? (
            <SiCisco className="w-6 h-6 text-muted-foreground" />
          ) : (
            <Shield className="w-6 h-6 text-muted-foreground" />
          )}
        </div>
        
        <h3 className="text-xl font-bold text-muted-foreground/80 mb-1">{cert.name}</h3>
        <p className="text-sm text-muted-foreground/60 mb-3">{cert.issuer}</p>
        <p className="text-xs text-muted-foreground/50">{cert.shortDescription}</p>
        <span className="text-xs text-accent mt-3 block">Click to learn more →</span>
      </div>
      
      {/* Decorative pattern */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 opacity-[0.03]" style={{ transform: 'translateZ(10px)' }}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-foreground">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
        </svg>
      </div>
      </div>
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
  const [selectedLockedCert, setSelectedLockedCert] = React.useState<LockedCertification | null>(null);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [cardModalOpen, setCardModalOpen] = React.useState(false);

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

  const handleLockedCertClick = (cert: LockedCertification) => {
    setSelectedLockedCert(cert);
    setCardModalOpen(true);
  };

  const handleCardModalClose = () => {
    setCardModalOpen(false);
    setTimeout(() => {
      setSelectedLockedCert(null);
    }, 300);
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

        {/* Future Certifications - Locked Cards */}
        <article className="md:col-span-2 lg:col-span-4 p-6 bg-secondary rounded-2xl border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <Lock className="w-5 h-5 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">Future Certifications</h2>
          </div>
          <p className="text-muted-foreground text-sm mb-6">
            Certifications to be pursued through structured training or degree apprenticeship programmes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {futureCertifications.map((cert) => (
              <LockedCertCard key={cert.name} cert={cert} onClick={() => handleLockedCertClick(cert)} />
            ))}
          </div>
        </article>
      </div>

      {/* Locked Cert Card Modal */}
      <LockedCertModal 
        cert={selectedLockedCert} 
        isOpen={cardModalOpen} 
        onClose={handleCardModalClose} 
      />

      {/* Detail Sheet */}
      <DetailSheet
        open={sheetOpen}
        onOpenChange={handleSheetClose}
        data={currentSheetData}
      />
    </>
  );
}

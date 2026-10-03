import * as React from "react";
import { Server, Shield, Cpu, Network, HardDrive, Container, Globe, Lock, Wifi, Activity, Database, FileCode } from "lucide-react";
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
    <article onClick={onClick} className={`${className} cursor-pointer`}>
      {children}
    </article>
  );
}

const cardDetails: Record<string, DetailSheetData> = {
  proxmox: {
    title: "Proxmox Server",
    subtitle: "Virtualisation Host",
    description:
      "The core of the home lab is a Proxmox VE hypervisor used to isolate services into virtual machines and LXC containers, ensuring strict separation between workloads and controlled resource allocation.\n\nThe design prioritises isolation to reduce blast radius in the event of compromise, with different services running in dedicated environments rather than sharing a single host.\n\nA dedicated Docker VM hosts containerised services, alongside a Windows Server instance for Active Directory experimentation and multiple Debian containers for infrastructure workloads such as tooling and monitoring.\n\nBackups are automated to a local NAS to enable recovery from VM corruption, misconfiguration, or accidental deletion.",
    tags: ["Proxmox VE", "KVM", "LXC", "Virtualisation", "Backups"],
    icon: <Server className="w-6 h-6 text-foreground" />,
  },
  firewall: {
    title: "Firewall & Network",
    subtitle: "OPNsense / pfSense",
    description:
      "Network traffic is enforced through an OPNsense firewall acting as the central security boundary for inspection, segmentation, and policy control.\n\nThe network is divided into VLANs (Trusted, Lab, IoT, Guest) to reduce lateral movement risk and isolate devices with different trust levels. Inter-VLAN routing is strictly allow-listed rather than implicitly trusted.\n\nSuricata is deployed for intrusion detection to identify suspicious or malicious traffic patterns at the network level.\n\nDNS over TLS and Pi-hole are used to enforce encrypted and filtered DNS resolution, reducing exposure to DNS-based tracking and manipulation. WireGuard provides secure remote access without exposing internal services directly to the public internet.",
    tags: ["OPNsense", "VLANs", "Suricata IDS", "WireGuard", "Firewall Rules", "DNS over TLS"],
    icon: <Shield className="w-6 h-6 text-foreground" />,
  },
  raspberryPi: {
    title: "Raspberry Pi Fleet",
    subtitle: "Edge & DNS Services",
    description:
       "Multiple Raspberry Pi devices provide always-on edge services supporting network resilience and remote access.\n\nThe primary Pi runs Pi-hole for network-wide DNS filtering and local resolution, reducing unwanted traffic and improving visibility into DNS queries.\n\nA second Pi operates as a Tailscale subnet router, enabling secure mesh VPN access into the home lab without requiring direct port exposure. A third handles uptime monitoring and lightweight log collection for service availability tracking.",
    tags: ["Raspberry Pi", "Pi-hole", "Tailscale", "Uptime Kuma", "ARM", "24/7 Uptime"],
    icon: <Cpu className="w-6 h-6 text-foreground" />,
  },
  services: {
    title: "Self-Hosted Services",
    subtitle: "Docker Stack",
    description:
       "A range of self-hosted services are deployed via Docker Compose on a dedicated Proxmox VM, providing internal tooling, automation, and infrastructure services.\n\nServices are exposed through a reverse proxy (Traefik) with TLS termination, and external access is restricted through Tailscale or Cloudflare Tunnel rather than direct port forwarding.\n\nKey services include container management, monitoring, password storage, version control, and game server infrastructure, each deployed with isolation and access control considerations in mind.",
    tags: ["Docker", "Traefik", "Portainer", "Vaultwarden", "Cloudflare Tunnel", "Gitea"],
    icon: <Container className="w-6 h-6 text-foreground" />,
  },
  networking: {
    title: "Network Architecture",
    subtitle: "VLANs & Segmentation",
    description:
  "The network is segmented into multiple VLANs (Trusted, Lab, IoT, Guest) to enforce separation between personal devices, infrastructure services, and untrusted or externally managed devices.\n\nA managed switch provides 802.1Q VLAN tagging across all wired connections, while wireless access points map SSIDs to corresponding VLANs.\n\nInter-VLAN communication is strictly controlled through firewall rules, and all DNS traffic is forced through internal filtering regardless of client configuration to maintain visibility and policy enforcement.",
    tags: ["VLANs", "802.1Q", "Managed Switch", "Network Segmentation", "DNS Enforcement"],
    icon: <Network className="w-6 h-6 text-foreground" />,
  },
  monitoring: {
    title: "Monitoring & Logging",
    subtitle: "Observability Stack",
    description:
      "System observability is implemented through uptime monitoring, infrastructure metrics, and network-level traffic visibility.\n\nUptime Kuma tracks service availability and triggers alerting via Discord webhooks on service disruption.\n\nProxmox provides host-level resource monitoring for virtual machines and containers, while the firewall dashboard exposes real-time traffic flows, blocked requests, and intrusion detection alerts via Suricata.\n\nThis setup enables rapid identification of failures, misconfigurations, and potential security anomalies across the environment.",
    tags: ["Uptime Kuma", "Discord Alerts", "Proxmox Metrics", "Suricata Logs", "Traffic Analysis"],
    icon: <Activity className="w-6 h-6 text-foreground" />,
  },
};

export function HomelabBento() {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Proxmox Server */}
        <BentoCard
          onClick={() => handleCardClick("proxmox")}
          className="p-5 bg-secondary rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
              <Server className="w-4 h-4 text-purple-500 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-sm leading-tight">Proxmox Server</h3>
              <p className="text-xs text-muted-foreground">Virtualisation Host</p>
            </div>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed flex-1">
            KVM/LXC hypervisor running Docker host, Windows Server for AD testing, and Debian containers.
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className="px-1.5 py-0.5 text-[10px] bg-muted rounded">Proxmox VE</span>
            <span className="px-1.5 py-0.5 text-[10px] bg-muted rounded">KVM</span>
            <span className="px-1.5 py-0.5 text-[10px] bg-muted rounded">LXC</span>
          </div>
        </BentoCard>

        {/* Firewall */}
        <BentoCard
          onClick={() => handleCardClick("firewall")}
          className="p-5 bg-secondary rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-red-500 dark:text-red-400" />
            </div>
            <div>
              <h3 className="font-semibold text-sm leading-tight">Firewall</h3>
              <p className="text-xs text-muted-foreground">OPNsense</p>
            </div>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed flex-1">
            VLAN segmentation, Suricata IDS, DNS over TLS, and WireGuard site-to-site tunnels.
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className="px-1.5 py-0.5 text-[10px] bg-muted rounded">OPNsense</span>
            <span className="px-1.5 py-0.5 text-[10px] bg-muted rounded">Suricata</span>
            <span className="px-1.5 py-0.5 text-[10px] bg-muted rounded">WireGuard</span>
          </div>
        </BentoCard>

        {/* Raspberry Pi */}
        <BentoCard
          onClick={() => handleCardClick("raspberryPi")}
          className="p-5 bg-secondary rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center shrink-0">
              <Cpu className="w-4 h-4 text-pink-500 dark:text-pink-400" />
            </div>
            <div>
              <h3 className="font-semibold text-sm leading-tight">Raspberry Pi Fleet</h3>
              <p className="text-xs text-muted-foreground">Edge Services</p>
            </div>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed flex-1">
            Pi-hole DNS filtering, Tailscale subnet routing, and Uptime Kuma monitoring.
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className="px-1.5 py-0.5 text-[10px] bg-muted rounded">Pi-hole</span>
            <span className="px-1.5 py-0.5 text-[10px] bg-muted rounded">Tailscale</span>
            <span className="px-1.5 py-0.5 text-[10px] bg-muted rounded">Uptime Kuma</span>
          </div>
        </BentoCard>

        {/* Network Architecture */}
        <BentoCard
          onClick={() => handleCardClick("networking")}
          className="p-5 bg-secondary rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Network className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-sm leading-tight">Network Architecture</h3>
              <p className="text-xs text-muted-foreground">VLANs & Segmentation</p>
            </div>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed flex-1">
            Trusted, Lab, IoT, and Guest VLANs with managed switching and enforced DNS filtering.
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className="px-1.5 py-0.5 text-[10px] bg-muted rounded">VLANs</span>
            <span className="px-1.5 py-0.5 text-[10px] bg-muted rounded">802.1Q</span>
          </div>
        </BentoCard>

        {/* Self-Hosted Services */}
        <BentoCard
          onClick={() => handleCardClick("services")}
          className="p-5 bg-secondary rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Container className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-sm leading-tight">Self-Hosted Services</h3>
              <p className="text-xs text-muted-foreground">Docker Stack</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 flex-1 content-start">
            {["Traefik", "Portainer", "Vaultwarden", "Cloudflare Tunnel", "Gitea", "Pterodactyl"].map((name) => (
              <span key={name} className="px-1.5 py-0.5 text-[10px] bg-muted rounded text-muted-foreground">{name}</span>
            ))}
          </div>
        </BentoCard>

        {/* Monitoring */}
        <BentoCard
          onClick={() => handleCardClick("monitoring")}
          className="p-5 bg-secondary rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Activity className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-sm leading-tight">Monitoring & Logging</h3>
              <p className="text-xs text-muted-foreground">Observability</p>
            </div>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed flex-1">
            Uptime Kuma alerts via Discord, Proxmox metrics, and Suricata IDS log analysis.
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className="px-1.5 py-0.5 text-[10px] bg-muted rounded">Uptime Kuma</span>
            <span className="px-1.5 py-0.5 text-[10px] bg-muted rounded">Discord</span>
          </div>
        </BentoCard>
      </div>

      <DetailSheet
        open={sheetOpen}
        onOpenChange={handleSheetClose}
        data={selectedCard ? cardDetails[selectedCard] : null}
      />
    </>
  );
}

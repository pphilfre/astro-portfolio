import * as React from "react";
import { Server, Shield, Cloud, Network, Monitor, Building2, Award, GraduationCap, Cpu } from "lucide-react";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const events: TimelineEvent[] = [
  {
    date: "2023",
    title: "Home Lab Started",
    description: "Built first Linux server, began learning system administration and networking fundamentals.",
    icon: <Server className="w-4 h-4" />,
    color: "text-purple-500 dark:text-purple-400 bg-purple-500/10 border-purple-500/30",
  },
  {
    date: "Early 2024",
    title: "Pi-hole & DNS",
    description: "Deployed network-wide ad blocking and custom DNS on Raspberry Pi.",
    icon: <Cpu className="w-4 h-4" />,
    color: "text-pink-500 dark:text-pink-400 bg-pink-500/10 border-pink-500/30",
  },
  {
    date: "Mid 2024",
    title: "Cisco Certifications",
    description: "Completed Introduction to Cybersecurity and Introduction to IoT certifications.",
    icon: <Award className="w-4 h-4" />,
    color: "text-blue-500 dark:text-blue-400 bg-blue-500/10 border-blue-500/30",
  },
  {
    date: "Late 2024",
    title: "Cloud Infrastructure",
    description: "Deployed Pterodactyl on Oracle Cloud with Docker, Traefik, and Cloudflare.",
    icon: <Cloud className="w-4 h-4" />,
    color: "text-orange-500 dark:text-orange-400 bg-orange-500/10 border-orange-500/30",
  },
  {
    date: "2024–25",
    title: "VPN & Zero Trust",
    description: "Configured Tailscale mesh VPN and Twingate private access for layered security.",
    icon: <Network className="w-4 h-4" />,
    color: "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  },
  {
    date: "2025",
    title: "Tesco Placement",
    description: "Enterprise cybersecurity exposure at Tesco Head Office — Splunk, Active Directory, SOC operations.",
    icon: <Building2 className="w-4 h-4" />,
    color: "text-red-500 dark:text-red-400 bg-red-500/10 border-red-500/30",
  },
  {
    date: "Feb 2026",
    title: "Advanced Certs",
    description: "Endpoint Security, Network Defense (Cisco) and Forage job simulations completed.",
    icon: <Shield className="w-4 h-4" />,
    color: "text-cyan-500 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
  },
  {
    date: "Sep 2026",
    title: "A-Levels Begin",
    description: "Maths, Further Maths, Physics, and Economics — targeting a degree apprenticeship.",
    icon: <GraduationCap className="w-4 h-4" />,
    color: "text-amber-500 dark:text-amber-400 bg-amber-500/10 border-amber-500/30",
  },
];

export function Timeline() {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScroll = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Scroll buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/90 border border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Scroll left"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/90 border border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Scroll right"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
        </button>
      )}

      {/* Fade edges */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-[5] pointer-events-none" />
      )}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-[5] pointer-events-none" />
      )}

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex items-start gap-0 min-w-max px-6">
          {events.map((event, i) => (
            <div key={i} className="flex items-start">
              {/* Event card */}
              <div className="flex flex-col items-center w-[200px] shrink-0">
                {/* Icon circle */}
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${event.color}`}>
                  {event.icon}
                </div>
                {/* Date */}
                <span className="text-xs font-semibold text-muted-foreground mt-2">{event.date}</span>
                {/* Title */}
                <h3 className="text-sm font-semibold mt-1 text-center leading-tight">{event.title}</h3>
                {/* Description */}
                <p className="text-xs text-muted-foreground mt-1 text-center leading-relaxed px-2">
                  {event.description}
                </p>
              </div>
              {/* Connector line (not after last) */}
              {i < events.length - 1 && (
                <div className="flex items-center mt-[18px] -mx-2">
                  <div className="w-8 h-[2px] bg-border" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

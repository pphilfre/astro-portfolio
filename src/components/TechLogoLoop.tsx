import LogoLoop from './LogoLoop.jsx';
import { 
  SiDocker, 
  SiLinux, 
  SiSplunk, 
  SiTailscale, 
  SiCloudflare 
} from 'react-icons/si';
import { AiFillWindows } from 'react-icons/ai';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TypedLogoLoop = LogoLoop as any;

// Twingate doesn't have a simple-icons entry, so we'll use a custom SVG
const TwingateIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[1em] h-[1em]">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7.2 3.6L12 11.4 4.8 7.78 12 4.18zM4 16.35V9.24l7 3.5v7.11l-7-3.5zm9 3.5v-7.11l7-3.5v7.11l-7 3.5z"/>
  </svg>
);

const techLogos = [
  { 
    node: (
      <span className="flex items-center gap-2">
        <SiDocker />
        <span className="text-sm font-medium">Docker</span>
      </span>
    ), 
    title: "Docker",
    href: "https://docker.com" 
  },
  { 
    node: (
      <span className="flex items-center gap-2">
        <SiLinux />
        <span className="text-sm font-medium">Linux</span>
      </span>
    ), 
    title: "Linux",
    href: "https://linux.org" 
  },
  { 
    node: (
      <span className="flex items-center gap-2">
        <AiFillWindows />
        <span className="text-sm font-medium">Windows</span>
      </span>
    ), 
    title: "Windows",
    href: "https://microsoft.com/windows" 
  },
  { 
    node: (
      <span className="flex items-center gap-2">
        <SiSplunk />
        <span className="text-sm font-medium">Splunk</span>
      </span>
    ), 
    title: "Splunk",
    href: "https://splunk.com" 
  },
  { 
    node: (
      <span className="flex items-center gap-2">
        <SiTailscale />
        <span className="text-sm font-medium">Tailscale</span>
      </span>
    ), 
    title: "Tailscale",
    href: "https://tailscale.com" 
  },
  { 
    node: (
      <span className="flex items-center gap-2">
        <TwingateIcon />
        <span className="text-sm font-medium">Twingate</span>
      </span>
    ), 
    title: "Twingate",
    href: "https://twingate.com" 
  },
  { 
    node: (
      <span className="flex items-center gap-2">
        <SiCloudflare />
        <span className="text-sm font-medium">Cloudflare</span>
      </span>
    ), 
    title: "Cloudflare",
    href: "https://cloudflare.com" 
  },
];

export default function TechLogoLoop() {
  return (
    <div className="w-full" style={{ height: '60px', position: 'relative', overflow: 'hidden' }}>
      <TypedLogoLoop
        logos={techLogos}
        speed={60}
        direction="left"
        logoHeight={48}
        gap={48}
        hoverSpeed={0}
        fadeOut={false}
        ariaLabel="Technologies I work with"
      />
    </div>
  );
}

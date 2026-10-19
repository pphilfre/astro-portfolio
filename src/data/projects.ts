import markup from '../assets/markup-1.png';
import dispatch from '../assets/projects/dispatch-inbox.png';
import dispatchReader from '../assets/projects/dispatch-reader.png';
import waypoint from '../assets/projects/waypoint-detail.jpg';
import glyph from '../assets/projects/glyph.png';
import portfolio from '../assets/projects/portfolio.jpg';
import homelab from '../assets/projects/homelab.svg';

// Shared ordering and short captions for the collection and home-page selection.
export const projects = [
  {
    id: 'markup',
    name: 'Markup',
    description: 'Markdown workspace for web & desktop',
    type: 'Web & desktop',
    href: '/projects/markup',
    icon: '/projects/icons/markup.svg',
    image: markup,
    alt: 'Markup workspace with folders, note tabs and a rendered Markdown document',
  },
  {
    id: 'dispatch',
    name: 'Dispatch',
    description: 'Native iOS email, developed from Windows',
    type: 'Native iOS',
    href: '/projects/dispatch',
    icon: null,
    image: dispatch,
    alt: 'Dispatch’s native iOS inbox displaying the app’s sample messages',
    secondaryImage: dispatchReader,
  },
  {
    id: 'waypoint',
    name: 'Waypoint',
    description: 'Career opportunities & application tracking',
    type: 'Web application',
    href: '/projects/waypoint',
    icon: '/projects/icons/waypoint.svg',
    image: waypoint,
    alt: 'Waypoint’s application tracker and detail panel, shown with illustrative example records',
  },
  {
    id: 'glyph',
    name: 'Glyph',
    description: 'Private notes & mathematical publishing',
    type: 'Web application',
    href: '/projects/glyph',
    icon: '/projects/icons/glyph.svg',
    image: glyph,
    alt: 'Glyph public reader displaying a mechanics note and mathematical equations',
  },
  {
    id: 'portfolio',
    name: 'Personal Portfolio',
    description: 'This website, built with Astro',
    type: 'Website',
    href: '/projects/portfolio',
    icon: '/favicon.svg',
    image: portfolio,
    alt: 'Freddie Philpot portfolio home page with its selected project cards',
  },
  {
    id: 'homelab',
    name: 'Home Lab',
    description: 'Linux, networking, DNS & monitoring',
    type: 'Infrastructure & cybersecurity',
    href: '/projects/homelab',
    icon: null,
    image: homelab,
    alt: 'Home Lab service overview: Proxmox and Pi-hole at home; Oracle Cloud, Linux, Docker Compose and Traefik in the cloud; Tailscale remote access; Wazuh, Prometheus and Grafana monitoring',
  },
];

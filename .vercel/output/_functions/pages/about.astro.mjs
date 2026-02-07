import { c as createComponent, r as renderTemplate, a as renderComponent, b as renderHead, d as addAttribute, e as createAstro } from '../chunks/astro/server_DfsTNRNX.mjs';
import 'piccolore';
/* empty css                                         */
import { N as Navbar } from '../chunks/Navbar_KjT06Vy-.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { memo, useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { User, Compass, Target, Monitor, Cloud, Shield, Code, GraduationCap } from 'lucide-react';
import { D as DetailSheet } from '../chunks/DetailSheet_-bMrLFds.mjs';
/* empty css                                 */
import { SiDocker, SiLinux, SiSplunk, SiTailscale, SiCloudflare } from 'react-icons/si';
import { AiFillWindows } from 'react-icons/ai';
export { renderers } from '../renderers.mjs';

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
  whoIAm: {
    title: "Who I Am",
    description: "I am currently completing my GCSEs and will be studying Maths, Further Maths, Physics, and Economics at A-level. Outside of formal education, I spend time working with Linux systems, cloud infrastructure, and maintaining a home lab environment. Through placements at Tesco's Head Office, I have gained early exposure to enterprise technology operations and cyber security practices in a corporate setting.\n\nI have a strong interest in understanding how complex systems work, identifying potential vulnerabilities, and building reliable infrastructure. My approach combines academic study with practical experimentation.",
    tags: ["Student", "Linux Enthusiast", "Self-taught", "Enterprise Experience"],
    icon: /* @__PURE__ */ jsx(User, { className: "w-6 h-6 text-foreground" })
  },
  direction: {
    title: "Direction",
    subtitle: "Career Goals",
    description: "Working towards a technology degree apprenticeship in financial services, with a long-term focus on cyber security and infrastructure risk.\n\nI'm particularly interested in the intersection of technology and finance, where security is paramount and the stakes are high. My goal is to develop expertise in protecting critical systems while continuing to build practical skills through hands-on experience.",
    tags: ["Degree Apprenticeship", "Financial Services", "Cyber Security", "Infrastructure Risk"],
    icon: /* @__PURE__ */ jsx(Compass, { className: "w-6 h-6 text-foreground" })
  },
  approach: {
    title: "Approach",
    subtitle: "Philosophy",
    description: "My focus is on security, reliability, and usability. I prioritise understanding how systems are designed, where they can fail, and how risk can be reduced—rather than simply learning tools in isolation.\n\nI believe in building a strong foundation of fundamentals before specialising, and in learning by doing. Every project in my home lab serves as an opportunity to understand real-world challenges and develop practical problem-solving skills.",
    tags: ["Security-First", "Systems Thinking", "Risk Management", "Practical Learning"],
    icon: /* @__PURE__ */ jsx(Target, { className: "w-6 h-6 text-foreground" })
  },
  operatingSystems: {
    title: "Operating Systems",
    subtitle: "Technical Skills",
    description: "I have advanced experience with Linux, using it as my daily driver for both personal and development work. This includes server administration, shell scripting, package management, and system configuration.\n\nI also have enterprise exposure to Windows environments through my placement work, including Active Directory, Group Policy, and Windows Server administration.",
    tags: ["Linux", "Ubuntu", "Debian", "Windows Server", "Active Directory", "Shell Scripting"],
    icon: /* @__PURE__ */ jsx(Monitor, { className: "w-6 h-6 text-foreground" })
  },
  cloudInfra: {
    title: "Cloud & Infrastructure",
    subtitle: "Technical Skills",
    description: "I have hands-on experience with multiple cloud platforms including Microsoft Azure, Google Cloud Platform, and Oracle Cloud. My work includes deploying and managing virtual machines, configuring networking, and implementing cloud-native services.\n\nI'm proficient with Docker containerisation for deploying applications, and have experience configuring reverse proxies (Nginx, Traefik) for routing and SSL termination.",
    tags: ["Azure", "GCP", "Oracle Cloud", "Docker", "Nginx", "Traefik", "Containers", "VMs"],
    icon: /* @__PURE__ */ jsx(Cloud, { className: "w-6 h-6 text-foreground" })
  },
  networkingSecurity: {
    title: "Networking & Security",
    subtitle: "Technical Skills",
    description: "My networking knowledge covers VPN configuration and management, DNS administration, and network security fundamentals. I've implemented identity-based access controls and have exposure to various security tooling.\n\nThrough self-study and practical application, I've covered material equivalent to CCNA and CompTIA A+ certifications, focusing on both theoretical understanding and hands-on implementation.",
    tags: ["VPN", "DNS", "WireGuard", "Identity Management", "CCNA Concepts", "Network Security"],
    icon: /* @__PURE__ */ jsx(Shield, { className: "w-6 h-6 text-foreground" })
  },
  development: {
    title: "Development",
    subtitle: "Technical Skills",
    description: "I use Python for automation tasks, scripting, and building small tools. My development workflow includes Git version control for all projects, and I have exposure to PowerShell for Windows automation.\n\nI'm comfortable with web technologies and have built projects using various frameworks. I believe in writing clean, maintainable code and documenting my work thoroughly.",
    tags: ["Python", "Git", "GitHub", "PowerShell", "Automation", "Scripting", "Web Development"],
    icon: /* @__PURE__ */ jsx(Code, { className: "w-6 h-6 text-foreground" })
  }
};
function AboutBento() {
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
    setSheetOpen(true);
  };
  const handleSheetClose = (open) => {
    setSheetOpen(open);
    if (!open) {
      setTimeout(() => setSelectedCard(null), 300);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(140px,auto)]", children: [
      /* @__PURE__ */ jsxs(
        BentoCard,
        {
          onClick: () => handleCardClick("whoIAm"),
          className: "md:col-span-2 lg:row-span-2 p-8 bg-secondary rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx(User, { className: "w-6 h-6 text-foreground" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Who I Am" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed flex-1", children: "I am currently completing my GCSEs and will be studying Maths, Further Maths, Physics, and Economics at A-level. Outside of formal education, I spend time working with Linux systems, cloud infrastructure, and maintaining a home lab environment." }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-accent mt-4", children: "Click to read more →" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        BentoCard,
        {
          onClick: () => handleCardClick("direction"),
          className: "lg:col-span-2 p-6 bg-secondary rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Compass, { className: "w-5 h-5 text-foreground" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: "Direction" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm flex-1", children: "Working towards a technology degree apprenticeship in financial services, with a long-term focus on cyber security and infrastructure risk." }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-accent mt-3", children: "Click to read more →" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        BentoCard,
        {
          onClick: () => handleCardClick("approach"),
          className: "lg:col-span-2 p-6 bg-secondary rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Target, { className: "w-5 h-5 text-foreground" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: "Approach" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm flex-1", children: "Focus on security, reliability, and usability. Understanding how systems are designed, where they can fail, and how risk can be reduced." }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-accent mt-3", children: "Click to read more →" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Skills" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxs(
          BentoCard,
          {
            onClick: () => handleCardClick("operatingSystems"),
            className: "p-6 bg-secondary rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Monitor, { className: "w-5 h-5 text-foreground" }) }),
              /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-3", children: "Operating Systems" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-sm text-muted-foreground space-y-1.5 flex-1", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent" }),
                  "Linux (advanced, daily use)"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent" }),
                  "Windows (enterprise exposure)"
                ] })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-accent mt-3", children: "Click for details →" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          BentoCard,
          {
            onClick: () => handleCardClick("cloudInfra"),
            className: "p-6 bg-secondary rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Cloud, { className: "w-5 h-5 text-foreground" }) }),
              /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-3", children: "Cloud & Infrastructure" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-sm text-muted-foreground space-y-1.5 flex-1", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent" }),
                  "Azure, GCP, Oracle Cloud"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent" }),
                  "Docker containerisation"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent" }),
                  "Reverse proxy config"
                ] })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-accent mt-3", children: "Click for details →" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          BentoCard,
          {
            onClick: () => handleCardClick("networkingSecurity"),
            className: "p-6 bg-secondary rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Shield, { className: "w-5 h-5 text-foreground" }) }),
              /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-3", children: "Networking & Security" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-sm text-muted-foreground space-y-1.5 flex-1", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent" }),
                  "VPN and DNS management"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent" }),
                  "Identity-based access"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent" }),
                  "Security tooling exposure"
                ] })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-accent mt-3", children: "Click for details →" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          BentoCard,
          {
            onClick: () => handleCardClick("development"),
            className: "p-6 bg-secondary rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Code, { className: "w-5 h-5 text-foreground" }) }),
              /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-3", children: "Development" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-sm text-muted-foreground space-y-1.5 flex-1", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent" }),
                  "Python (automation)"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent" }),
                  "Git version control"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent" }),
                  "PowerShell (exposure)"
                ] })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-accent mt-3", children: "Click for details →" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("article", { className: "mt-4 p-6 bg-muted/30 rounded-2xl border border-border/50 flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(GraduationCap, { className: "w-5 h-5 text-foreground" }) }),
      /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: "Next Steps:" }),
        " A-levels in Maths, Further Maths, Physics, and Economics — then pursuing a degree apprenticeship in technology."
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      DetailSheet,
      {
        open: sheetOpen,
        onOpenChange: handleSheetClose,
        data: selectedCard ? cardDetails[selectedCard] : null
      }
    )
  ] });
}

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };
const toCssLength = (value) => typeof value === "number" ? `${value}px` : value ?? void 0;
const useResizeObserver = (callback, elements, dependencies) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener("resize", handleResize);
      callback();
      return () => window.removeEventListener("resize", handleResize);
    }
    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });
    callback();
    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [callback, elements, dependencies]);
};
const useImageLoader = (seqRef, onLoad, dependencies) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll("img") ?? [];
    if (images.length === 0) {
      onLoad();
      return;
    }
    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) onLoad();
    };
    images.forEach((img) => {
      const htmlImg = img;
      if (htmlImg.complete) {
        handleImageLoad();
      } else {
        htmlImg.addEventListener("load", handleImageLoad, { once: true });
        htmlImg.addEventListener("error", handleImageLoad, { once: true });
      }
    });
    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
        img.removeEventListener("error", handleImageLoad);
      });
    };
  }, [onLoad, seqRef, dependencies]);
};
const useAnimationLoop = (trackRef, targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical) => {
  const rafRef = useRef(null);
  const lastTimestampRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const seqSize = isVertical ? seqHeight : seqWidth;
    if (seqSize > 0) {
      offsetRef.current = (offsetRef.current % seqSize + seqSize) % seqSize;
      const transformValue = isVertical ? `translate3d(0, ${-offsetRef.current}px, 0)` : `translate3d(${-offsetRef.current}px, 0, 0)`;
      track.style.transform = transformValue;
    }
    const animate = (timestamp) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }
      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1e3;
      lastTimestampRef.current = timestamp;
      const target = isHovered && hoverSpeed !== void 0 ? hoverSpeed : targetVelocity;
      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;
      if (seqSize > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = (nextOffset % seqSize + seqSize) % seqSize;
        offsetRef.current = nextOffset;
        const transformValue = isVertical ? `translate3d(0, ${-offsetRef.current}px, 0)` : `translate3d(${-offsetRef.current}px, 0, 0)`;
        track.style.transform = transformValue;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef]);
};
const LogoLoop = memo(
  ({
    logos,
    speed = 120,
    direction = "left",
    width = "100%",
    logoHeight = 28,
    gap = 32,
    pauseOnHover,
    hoverSpeed,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    renderItem,
    ariaLabel = "Partner logos",
    className,
    style
  }) => {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const seqRef = useRef(null);
    const [seqWidth, setSeqWidth] = useState(0);
    const [seqHeight, setSeqHeight] = useState(0);
    const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState(false);
    const effectiveHoverSpeed = useMemo(() => {
      if (hoverSpeed !== void 0) return hoverSpeed;
      if (pauseOnHover === true) return 0;
      if (pauseOnHover === false) return void 0;
      return 0;
    }, [hoverSpeed, pauseOnHover]);
    const isVertical = direction === "up" || direction === "down";
    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed);
      let directionMultiplier;
      if (isVertical) {
        directionMultiplier = direction === "up" ? 1 : -1;
      } else {
        directionMultiplier = direction === "left" ? 1 : -1;
      }
      const speedMultiplier = speed < 0 ? -1 : 1;
      return magnitude * directionMultiplier * speedMultiplier;
    }, [speed, direction, isVertical]);
    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const sequenceRect = seqRef.current?.getBoundingClientRect?.();
      const sequenceWidth = sequenceRect?.width ?? 0;
      const sequenceHeight = sequenceRect?.height ?? 0;
      if (isVertical) {
        const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
        if (containerRef.current && parentHeight > 0) {
          const targetHeight = Math.ceil(parentHeight);
          if (containerRef.current.style.height !== `${targetHeight}px`)
            containerRef.current.style.height = `${targetHeight}px`;
        }
        if (sequenceHeight > 0) {
          setSeqHeight(Math.ceil(sequenceHeight));
          const viewport = containerRef.current?.clientHeight ?? parentHeight ?? sequenceHeight;
          const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
          setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
        }
      } else if (sequenceWidth > 0) {
        setSeqWidth(Math.ceil(sequenceWidth));
        const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
      }
    }, [isVertical]);
    useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, isVertical]);
    useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, isVertical]);
    useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical);
    const cssVariables = useMemo(
      () => ({
        "--logoloop-gap": `${gap}px`,
        "--logoloop-logoHeight": `${logoHeight}px`,
        ...fadeOutColor && { "--logoloop-fadeColor": fadeOutColor }
      }),
      [gap, logoHeight, fadeOutColor]
    );
    const rootClassName = useMemo(
      () => [
        "logoloop",
        isVertical ? "logoloop--vertical" : "logoloop--horizontal",
        fadeOut && "logoloop--fade",
        scaleOnHover && "logoloop--scale-hover",
        className
      ].filter(Boolean).join(" "),
      [isVertical, fadeOut, scaleOnHover, className]
    );
    const handleMouseEnter = useCallback(() => {
      if (effectiveHoverSpeed !== void 0) setIsHovered(true);
    }, [effectiveHoverSpeed]);
    const handleMouseLeave = useCallback(() => {
      if (effectiveHoverSpeed !== void 0) setIsHovered(false);
    }, [effectiveHoverSpeed]);
    const renderLogoItem = useCallback(
      (item, key) => {
        if (renderItem) {
          return /* @__PURE__ */ jsx("li", { className: "logoloop__item", role: "listitem", children: renderItem(item, key) }, key);
        }
        const isNodeItem = "node" in item;
        const content = isNodeItem ? /* @__PURE__ */ jsx("span", { className: "logoloop__node", "aria-hidden": !!item.href && !item.ariaLabel, children: item.node }) : /* @__PURE__ */ jsx(
          "img",
          {
            src: item.src,
            srcSet: item.srcSet,
            sizes: item.sizes,
            width: item.width,
            height: item.height,
            alt: item.alt ?? "",
            title: item.title,
            loading: "lazy",
            decoding: "async",
            draggable: false
          }
        );
        const itemAriaLabel = isNodeItem ? item.ariaLabel ?? item.title : item.alt ?? item.title;
        const itemContent = item.href ? /* @__PURE__ */ jsx(
          "a",
          {
            className: "logoloop__link",
            href: item.href,
            "aria-label": itemAriaLabel || "logo link",
            target: "_blank",
            rel: "noreferrer noopener",
            children: content
          }
        ) : content;
        return /* @__PURE__ */ jsx("li", { className: "logoloop__item", role: "listitem", children: itemContent }, key);
      },
      [renderItem]
    );
    const logoLists = useMemo(
      () => Array.from({ length: copyCount }, (_, copyIndex) => /* @__PURE__ */ jsx(
        "ul",
        {
          className: "logoloop__list",
          role: "list",
          "aria-hidden": copyIndex > 0,
          ref: copyIndex === 0 ? seqRef : void 0,
          children: logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))
        },
        `copy-${copyIndex}`
      )),
      [copyCount, logos, renderLogoItem]
    );
    const containerStyle = useMemo(
      () => ({
        width: isVertical ? toCssLength(width) === "100%" ? void 0 : toCssLength(width) : toCssLength(width) ?? "100%",
        ...cssVariables,
        ...style
      }),
      [width, cssVariables, style, isVertical]
    );
    return /* @__PURE__ */ jsx("div", { ref: containerRef, className: rootClassName, style: containerStyle, role: "region", "aria-label": ariaLabel, children: /* @__PURE__ */ jsx("div", { className: "logoloop__track", ref: trackRef, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: logoLists }) });
  }
);
LogoLoop.displayName = "LogoLoop";

const TypedLogoLoop = LogoLoop;
const TwingateIcon = () => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "w-[1em] h-[1em]", children: /* @__PURE__ */ jsx("path", { d: "M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7.2 3.6L12 11.4 4.8 7.78 12 4.18zM4 16.35V9.24l7 3.5v7.11l-7-3.5zm9 3.5v-7.11l7-3.5v7.11l-7 3.5z" }) });
const techLogos = [
  {
    node: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(SiDocker, {}),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Docker" })
    ] }),
    title: "Docker",
    href: "https://docker.com"
  },
  {
    node: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(SiLinux, {}),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Linux" })
    ] }),
    title: "Linux",
    href: "https://linux.org"
  },
  {
    node: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(AiFillWindows, {}),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Windows" })
    ] }),
    title: "Windows",
    href: "https://microsoft.com/windows"
  },
  {
    node: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(SiSplunk, {}),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Splunk" })
    ] }),
    title: "Splunk",
    href: "https://splunk.com"
  },
  {
    node: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(SiTailscale, {}),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Tailscale" })
    ] }),
    title: "Tailscale",
    href: "https://tailscale.com"
  },
  {
    node: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(TwingateIcon, {}),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Twingate" })
    ] }),
    title: "Twingate",
    href: "https://twingate.com"
  },
  {
    node: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(SiCloudflare, {}),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Cloudflare" })
    ] }),
    title: "Cloudflare",
    href: "https://cloudflare.com"
  }
];
function TechLogoLoop() {
  return /* @__PURE__ */ jsx("div", { className: "w-full", style: { height: "60px", position: "relative", overflow: "hidden" }, children: /* @__PURE__ */ jsx(
    TypedLogoLoop,
    {
      logos: techLogos,
      speed: 60,
      direction: "left",
      logoHeight: 48,
      gap: 48,
      hoverSpeed: 0,
      fadeOut: false,
      ariaLabel: "Technologies I work with"
    }
  ) });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$About = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', `><meta name="description" content="About Freddie Philpot - GCSE student with enterprise cybersecurity experience. Skills in Linux, cloud infrastructure, networking, and security."><title>About | Freddie Philpot</title><script>
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
		<\/script>`, '</head> <body class="bg-background text-foreground min-h-screen"> ', ' <main class="pt-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto pb-16"> <div class="mb-12"> <h1 class="text-4xl md:text-5xl font-bold mb-4">About</h1> <p class="text-muted-foreground text-lg">Background and skills</p> </div> ', ' <!-- Tech Stack Logo Loop --> <div class="mt-16"> <h2 class="text-2xl font-bold mb-6">Tech Stack</h2> ', " </div> </main> </body></html>"])), addAttribute(Astro2.generator, "content"), renderHead(), renderComponent($$result, "Navbar", Navbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/workspaces/astro-portfolio/src/components/Navbar.tsx", "client:component-export": "default" }), renderComponent($$result, "AboutBento", AboutBento, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/workspaces/astro-portfolio/src/components/AboutBento.tsx", "client:component-export": "AboutBento" }), renderComponent($$result, "TechLogoLoop", TechLogoLoop, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/workspaces/astro-portfolio/src/components/TechLogoLoop.tsx", "client:component-export": "default" }));
}, "/workspaces/astro-portfolio/src/pages/about.astro", void 0);

const $$file = "/workspaces/astro-portfolio/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

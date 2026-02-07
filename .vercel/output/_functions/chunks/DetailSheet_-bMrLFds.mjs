import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { S as Sheet, a as SheetContent, b as SheetHeader, d as SheetTitle, e as SheetDescription, f as SheetFooter, g as SheetClose } from './Navbar_KjT06Vy-.mjs';

function DetailSheet({ open, onOpenChange, data }) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  React.useEffect(() => {
    setCurrentImageIndex(0);
  }, [data]);
  React.useEffect(() => {
    if (open) {
      document.documentElement.classList.add("sheet-open");
    } else {
      document.documentElement.classList.remove("sheet-open");
    }
    return () => {
      document.documentElement.classList.remove("sheet-open");
    };
  }, [open]);
  if (!data) return null;
  const hasImages = data.images && data.images.length > 0;
  const hasMultipleImages = data.images && data.images.length > 1;
  return /* @__PURE__ */ jsx(Sheet, { open, onOpenChange, children: /* @__PURE__ */ jsxs(
    SheetContent,
    {
      side: "right",
      showCloseButton: false,
      className: "w-full sm:max-w-lg bg-background border-border flex flex-col h-full max-h-screen",
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => onOpenChange(false),
            className: "absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center transition-colors",
            children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-foreground" })
          }
        ),
        /* @__PURE__ */ jsxs(SheetHeader, { className: "pt-8 px-6 shrink-0", children: [
          data.icon && /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-4", children: data.icon }),
          data.subtitle && /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-accent uppercase tracking-wider", children: data.subtitle }),
          /* @__PURE__ */ jsx(SheetTitle, { className: "text-2xl font-bold", children: data.title })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 px-6 py-4 overflow-y-auto min-h-0", children: [
          hasImages && /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "relative aspect-video rounded-xl overflow-hidden bg-muted", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: data.images[currentImageIndex],
                alt: `${data.title} image ${currentImageIndex + 1}`,
                className: "w-full h-full object-cover"
              }
            ) }),
            hasMultipleImages && /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-2 mt-3", children: data.images.map((_, index) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setCurrentImageIndex(index),
                className: `w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`
              },
              index
            )) })
          ] }),
          /* @__PURE__ */ jsx(SheetDescription, { className: "text-base leading-relaxed text-muted-foreground whitespace-pre-line", children: data.description }),
          data.tags && data.tags.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mt-6", children: data.tags.map((tag) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground",
              children: tag
            },
            tag
          )) })
        ] }),
        /* @__PURE__ */ jsxs(SheetFooter, { className: "px-6 py-6 shrink-0 border-t border-border flex flex-col gap-3", children: [
          data.link && /* @__PURE__ */ jsxs(
            "a",
            {
              href: data.link,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "w-full py-3 px-4 bg-accent text-accent-foreground font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2",
              children: [
                /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4" }),
                data.linkLabel || "View Credential"
              ]
            }
          ),
          /* @__PURE__ */ jsx(SheetClose, { asChild: true, children: /* @__PURE__ */ jsx("button", { className: "w-full py-3 px-4 bg-foreground text-background font-medium rounded-xl hover:opacity-90 transition-opacity", children: "Close" }) })
        ] })
      ]
    }
  ) });
}

export { DetailSheet as D };

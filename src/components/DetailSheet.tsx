import * as React from "react";
import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "./ui/sheet";

export interface DetailSheetData {
  title: string;
  subtitle?: string;
  description: string;
  images?: string[];
  tags?: string[];
  icon?: React.ReactNode;
}

interface DetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: DetailSheetData | null;
}

export function DetailSheet({ open, onOpenChange, data }: DetailSheetProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    setCurrentImageIndex(0);
  }, [data]);

  // Prevent body scroll and navbar shift when sheet is open
  React.useEffect(() => {
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [open]);

  if (!data) return null;

  const hasImages = data.images && data.images.length > 0;
  const hasMultipleImages = data.images && data.images.length > 1;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        showCloseButton={false}
        className="w-full sm:max-w-lg bg-background border-border flex flex-col h-full max-h-screen"
      >
        {/* Custom close button at top right */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>

        <SheetHeader className="pt-8 px-6 shrink-0">
          {data.icon && (
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
              {data.icon}
            </div>
          )}
          {data.subtitle && (
            <p className="text-xs font-medium text-accent uppercase tracking-wider">
              {data.subtitle}
            </p>
          )}
          <SheetTitle className="text-2xl font-bold">{data.title}</SheetTitle>
        </SheetHeader>

        <div className="flex-1 px-6 py-4 overflow-y-auto min-h-0">
          {/* Image Carousel */}
          {hasImages && (
            <div className="mb-6">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                <img
                  src={data.images![currentImageIndex]}
                  alt={`${data.title} image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {hasMultipleImages && (
                <div className="flex justify-center gap-2 mt-3">
                  {data.images!.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex
                          ? "bg-foreground"
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <SheetDescription className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">
            {data.description}
          </SheetDescription>

          {/* Tags */}
          {data.tags && data.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {data.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer with close button */}
        <SheetFooter className="px-6 py-6 shrink-0 border-t border-border">
          <SheetClose asChild>
            <button className="w-full py-3 px-4 bg-foreground text-background font-medium rounded-xl hover:opacity-90 transition-opacity">
              Close
            </button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

import * as React from "react";
import { Mail, Linkedin, Github, MessageSquare } from "lucide-react";

interface ContactCardProps {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  className?: string;
}

function ContactCard({ children, href, external = false, className = "" }: ContactCardProps) {
  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`block bg-secondary rounded-lg border border-border hover:border-foreground/20 transition-all hover:scale-[1.02] ${className}`}
      >
        {children}
      </a>
    );
  }
  
  return (
    <article className={`bg-secondary rounded-lg border border-border ${className}`}>
      {children}
    </article>
  );
}

export function ContactBento() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      
      {/* Email - Primary Contact */}
      <ContactCard 
        href="mailto:contact@freddiephilpot.dev"
        className="col-span-2 p-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-background/50 rounded-lg shrink-0">
            <Mail className="w-5 h-5 text-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground">Email</h3>
            <p className="text-foreground/80 text-sm truncate">contact@freddiephilpot.dev</p>
          </div>
        </div>
      </ContactCard>

      {/* LinkedIn */}
      <ContactCard 
        href="#LINKEDIN_URL"
        external
        className="p-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-background/50 rounded-lg shrink-0">
            <Linkedin className="w-5 h-5 text-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">LinkedIn</h3>
            <p className="text-xs text-muted-foreground">Professional</p>
          </div>
        </div>
      </ContactCard>

      {/* Message Card - Not clickable */}
      <ContactCard className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-background/50 rounded-lg shrink-0">
            <MessageSquare className="w-5 h-5 text-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">Open to</h3>
            <p className="text-xs text-muted-foreground">Apprenticeships & collabs</p>
          </div>
        </div>
      </ContactCard>

      {/* GitHub - Personal */}
      <ContactCard 
        href="https://github.com/pphilfre"
        external
        className="col-span-2 p-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-background/50 rounded-lg shrink-0">
            <Github className="w-5 h-5 text-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <h3 className="text-lg font-semibold text-foreground">GitHub</h3>
              <span className="text-xs text-accent font-medium">Personal</span>
            </div>
            <p className="text-sm text-muted-foreground">@pphilfre · Projects & school work</p>
          </div>
        </div>
      </ContactCard>

      {/* GitHub - Production */}
      <ContactCard 
        href="https://github.com/philfreddie"
        external
        className="col-span-2 p-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-background/50 rounded-lg shrink-0">
            <Github className="w-5 h-5 text-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <h3 className="text-lg font-semibold text-foreground">GitHub</h3>
              <span className="text-xs text-accent font-medium">Production</span>
            </div>
            <p className="text-sm text-muted-foreground">@philfreddie · Production code & writeups</p>
          </div>
        </div>
      </ContactCard>

    </div>
  );
}
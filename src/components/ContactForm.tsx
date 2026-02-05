import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: {
        sitekey: string;
        callback: (token: string) => void;
        'expired-callback'?: () => void;
        theme?: 'light' | 'dark' | 'auto';
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface ContactFormProps {
  turnstileSiteKey?: string;
}

export function ContactForm({ 
  turnstileSiteKey = "0x4AAAAAACYIXwKzjELumsak" 
}: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

  // Load Turnstile script
  useEffect(() => {
    if (document.querySelector('script[src*="turnstile"]')) return;
    
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  // Render Turnstile widget
  useEffect(() => {
    const renderWidget = () => {
      if (!window.turnstile || !turnstileRef.current) return;
      
      // Remove existing widget if any
      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // Widget might already be removed
        }
      }
      
      // Clear the container
      turnstileRef.current.innerHTML = '';
      
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: turnstileSiteKey,
        callback: (token: string) => {
          setCaptchaToken(token);
        },
        'expired-callback': () => {
          setCaptchaToken(null);
        },
        theme: isDark ? 'dark' : 'light',
      });
    };

    // Wait for Turnstile to load
    const checkTurnstile = setInterval(() => {
      if (window.turnstile) {
        clearInterval(checkTurnstile);
        renderWidget();
      }
    }, 100);

    return () => {
      clearInterval(checkTurnstile);
    };
  }, [turnstileSiteKey, isDark]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaToken) {
      setError("Please complete the CAPTCHA verification");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          captchaToken,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      setCaptchaToken(null);
      
      // Reset success state after animation
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
      
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = name.trim() && email.trim() && message.trim() && captchaToken;

  return (
    <div className="bg-secondary rounded-lg border border-border p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div 
            ref={turnstileRef} 
            className="cf-turnstile"
          />
          
          <Button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`min-w-[140px] transition-all duration-300 ${
              isSuccess 
                ? 'bg-green-600 hover:bg-green-600' 
                : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 animate-[scale-in_0.3s_ease-out]" />
                Sent!
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </Button>
        </div>
        
        {error && (
          <p className="text-destructive text-sm">{error}</p>
        )}
      </form>
      
      <style>{`
        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

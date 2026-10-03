import { useEffect, useRef, useState, type SyntheticEvent } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'expired-callback': () => void;
          'error-callback': () => void;
          theme: 'light' | 'dark';
          size: 'flexible';
        },
      ) => string;
      reset: (id: string) => void;
      remove: (id: string) => void;
    };
  }
}

export function ContactForm({
  turnstileSiteKey = '0x4AAAAAACYIXwKzjELumsak',
}: {
  turnstileSiteKey?: string;
}) {
  const slot = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const [token, setToken] = useState('');
  const [captchaState, setCaptchaState] = useState<
    'loading' | 'ready' | 'error'
  >('loading');
  const [attempt, setAttempt] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const syncTheme = () =>
      setTheme(
        document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      );
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let stopped = false;
    setToken('');
    setCaptchaState('loading');
    const fail = () => {
      if (!stopped) {
        setToken('');
        setCaptchaState('error');
      }
    };
    let script = document.querySelector<HTMLScriptElement>(
      'script[data-turnstile]',
    );
    if (script?.dataset.failed === 'true') {
      script.remove();
      script = null;
    }
    if (!script) {
      script = document.createElement('script');
      script.src =
        'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.dataset.turnstile = 'true';
      document.head.appendChild(script);
    }
    const scriptError = () => {
      if (script) script.dataset.failed = 'true';
      fail();
    };
    script.addEventListener('error', scriptError);
    const deadline = window.setTimeout(() => {
      window.clearInterval(poll);
      fail();
    }, 15000);
    const poll = window.setInterval(() => {
      if (!window.turnstile || !slot.current || stopped) return;
      window.clearInterval(poll);
      try {
        window.clearTimeout(deadline);
        setCaptchaState('ready');
        widget.current = window.turnstile.render(slot.current, {
          sitekey: turnstileSiteKey,
          theme,
          size: 'flexible',
          callback: (value) => {
            if (!stopped) {
              window.clearTimeout(deadline);
              setToken(value);
              setCaptchaState('ready');
            }
          },
          'expired-callback': () => {
            if (!stopped) {
              setToken('');
              setCaptchaState('ready');
            }
          },
          'error-callback': fail,
        });
      } catch {
        fail();
      }
    }, 100);
    return () => {
      stopped = true;
      window.clearInterval(poll);
      window.clearTimeout(deadline);
      script?.removeEventListener('error', scriptError);
      if (widget.current) {
        try {
          window.turnstile?.remove(widget.current);
        } catch {}
        widget.current = null;
      }
    };
  }, [turnstileSiteKey, attempt, theme]);

  async function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token || pending) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    setPending(true);
    setStatus('Sending your message…');
    setSuccess(false);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.get('name'),
          email: values.get('email'),
          message: values.get('message'),
          captchaToken: token,
        }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error ||
            'The message could not be sent. Please use the email link.',
        );
      setSuccess(true);
      setStatus('Message sent. Thanks for getting in touch.');
      form.reset();
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : 'The message could not be sent. Please use the email link.',
      );
    } finally {
      setToken('');
      if (widget.current) {
        try {
          window.turnstile?.reset(widget.current);
        } catch {
          setCaptchaState('error');
        }
      }
      setPending(false);
    }
  }

  return (
    <section className="contact-form" aria-labelledby="form-title">
      <h2 id="form-title">Or leave a message.</h2>
      <form onSubmit={submit}>
        <div className="form-pair">
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              disabled={pending}
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              disabled={pending}
            />
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            maxLength={5000}
            disabled={pending}
          />
        </div>
        <div className="captcha-slot" ref={slot} />
        <div className="captcha-status" aria-live="polite">
          {captchaState === 'loading' && (
            <p>
              Loading verification. You can also{' '}
              <a href="mailto:contact@freddiephilpot.dev">
                send an email directly
              </a>
              .
            </p>
          )}
          {captchaState === 'error' && (
            <p>
              Verification is unavailable.{' '}
              <button
                className="text-link"
                type="button"
                onClick={() => setAttempt((value) => value + 1)}
              >
                Try again
              </button>{' '}
              or{' '}
              <a href="mailto:contact@freddiephilpot.dev">
                send an email directly
              </a>
              .
            </p>
          )}
          {captchaState === 'ready' && !token && (
            <p>Please complete verification before sending.</p>
          )}
        </div>
        <button className="button" type="submit" disabled={!token || pending}>
          {pending ? 'Sending…' : 'Send message'}
        </button>
        <p
          className={'form-status' + (success ? ' success' : '')}
          role="status"
          aria-live="polite"
        >
          {status}
        </p>
        <noscript>
          This form needs JavaScript for verification. Please use the email link
          instead.
        </noscript>
      </form>
    </section>
  );
}

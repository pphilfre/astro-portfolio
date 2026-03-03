import * as React from "react";

// ── Physics constants (tuned for ~1.2s snappy bounce) ──
const GRAVITY = 4500;   // px/s²
const RESTITUTION = 0.48;
const BALL_RADIUS = 20;
const MAX_BOUNCES = 4;
const PARTICLE_COUNT = 50;

const BG = "#000000";
const FG = "#ffffff";

export function LoadingScreen() {
  // Check synchronously on first render — never show canvas for returning visitors
  const isFirstVisit = typeof window !== "undefined"
    && !sessionStorage.getItem("portfolio-visited");

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = React.useState(isFirstVisit);

  React.useEffect(() => {
    if (!isFirstVisit) {
      document.documentElement.classList.remove("first-visit");
      document.documentElement.classList.add("reveal-content");
      document.getElementById("loading-overlay-fallback")?.remove();
      return;
    }

    sessionStorage.setItem("portfolio-visited", "true");

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    // Size to viewport
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Remove fallback AFTER canvas is sized and will paint this frame
    document.getElementById("loading-overlay-fallback")?.remove();

    const cx = canvas.width / 2;
    const floor = canvas.height * 0.55;
    const w = canvas.width;
    const h = canvas.height;

    // ── Ball state ──
    let ballY = -BALL_RADIUS;
    let ballVy = 0;
    let bounces = 0;
    let squashT = 0;
    let phase: "bounce" | "hold" | "explode" | "wipe" | "done" = "bounce";

    // ── Particles ──
    type P = {
      x: number; y: number;
      vx: number; vy: number;
      r: number; alpha: number; decay: number;
    };
    let particles: P[] = [];
    let explodeElapsed = 0;

    // ── Wipe ──
    let wipeProgress = 0;
    let holdTimer = 0;
    let last = 0;

    function tick(now: number) {
      if (last === 0) last = now;
      const dt = Math.min((now - last) / 1000, 0.04);
      last = now;

      // ── BOUNCE ──
      if (phase === "bounce") {
        ctx.fillStyle = BG;
        ctx.fillRect(0, 0, w, h);

        ballVy += GRAVITY * dt;
        ballY += ballVy * dt;

        if (squashT > 0) squashT = Math.max(0, squashT - dt * 8);

        if (ballY + BALL_RADIUS >= floor) {
          ballY = floor - BALL_RADIUS;
          ballVy = -Math.abs(ballVy) * RESTITUTION;
          bounces++;
          squashT = 1;

          if (bounces >= MAX_BOUNCES || Math.abs(ballVy) < 50) {
            ballY = floor - BALL_RADIUS;
            phase = "hold";
            holdTimer = 0;
          }
        }

        drawBall(ctx, cx, ballY, squashT, floor);
        requestAnimationFrame(tick);
        return;
      }

      // ── HOLD (tiny pause before explosion) ──
      if (phase === "hold") {
        ctx.fillStyle = BG;
        ctx.fillRect(0, 0, w, h);
        drawBall(ctx, cx, ballY, 0, floor);

        holdTimer += dt;
        if (holdTimer >= 0.12) {
          phase = "explode";
          spawnParticles(cx, ballY, particles);
        }
        requestAnimationFrame(tick);
        return;
      }

      // ── EXPLODE ──
      if (phase === "explode") {
        ctx.fillStyle = BG;
        ctx.fillRect(0, 0, w, h);

        explodeElapsed += dt;
        let alive = false;
        for (const p of particles) {
          p.vy += 900 * dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.alpha -= p.decay * dt;
          if (p.alpha > 0) {
            alive = true;
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = FG;
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;

        if (!alive || explodeElapsed > 0.45) {
          phase = "wipe";
          // Reveal page content behind the canvas
          document.documentElement.classList.remove("first-visit");
          document.documentElement.classList.add("reveal-content");
        }
        requestAnimationFrame(tick);
        return;
      }

      // ── WIPE UP (black slides up to reveal site) ──
      if (phase === "wipe") {
        // Clear entire canvas to transparent first
        ctx.clearRect(0, 0, w, h);

        wipeProgress += dt * 3;
        const t = 1 - Math.pow(1 - Math.min(wipeProgress, 1), 3); // ease-out cubic
        // Draw black only on the portion that hasn't wiped yet (shrinks upward)
        const wipeH = h * (1 - t);
        if (wipeH > 0) {
          ctx.fillStyle = BG;
          ctx.fillRect(0, 0, w, wipeH);
        }

        if (wipeProgress >= 1) {
          setVisible(false);
          return;
        }
        requestAnimationFrame(tick);
      }
    }

    // Start animation on next paint frame
    requestAnimationFrame(tick);
  }, []);

  if (!visible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[100000]"
      style={{ background: "#000", pointerEvents: "all" }}
    />
  );
}

/* ── Draw ball with squash-and-stretch + shadow ── */
function drawBall(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  squash: number,
  floor: number
) {
  const sq = squash * 0.35;
  const sx = 1 + sq;
  const sy = 1 - sq;

  // Shadow
  const proximity = Math.max(0, 1 - (floor - y - BALL_RADIUS) / (floor + BALL_RADIUS));
  ctx.save();
  ctx.globalAlpha = proximity * 0.25;
  ctx.beginPath();
  ctx.ellipse(x, floor + 3, BALL_RADIUS * (0.4 + proximity * 0.6), 3 + proximity * 2, 0, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.restore();

  // Ball
  ctx.save();
  ctx.translate(x, y + BALL_RADIUS * (1 - sy));
  ctx.scale(sx, sy);
  ctx.beginPath();
  ctx.arc(0, 0, BALL_RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = FG;
  ctx.fill();
  ctx.restore();
}

/* ── Spawn explosion particles ── */
function spawnParticles(
  cx: number, cy: number,
  out: { x: number; y: number; vx: number; vy: number; r: number; alpha: number; decay: number }[]
) {
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + (Math.random() - 0.5) * 0.5;
    const speed = 350 + Math.random() * 600;
    out.push({
      x: cx, y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed * 0.8 - 300,
      r: 2 + Math.random() * 5,
      alpha: 1,
      decay: 2 + Math.random() * 2,
    });
  }
}

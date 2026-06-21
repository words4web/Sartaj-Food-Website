"use client";

import { useEffect, useRef, useState, memo } from "react";
import { ParticleCanvasProps } from "@/types/common.types";
import dynamic from "next/dynamic";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false },
);

// ── Theme character sets
const CHARACTERS: Record<string, string[]> = {
  sakura: ["🌸"],
  snowflake: ["❄"],
  "diwali-light": ["✨"],
};

const GLOW: Record<string, string> = {
  sakura: "drop-shadow(0 0 1px rgba(249,168,212,0.08))",
  snowflake: "drop-shadow(0 0 1px rgba(255,255,255,0.08))",
  "diwali-light": "drop-shadow(0 0 1px rgba(253,230,138,0.08))",
};

// ── Inject keyframes once
const STYLE_ID = "cf-keyframes";

function ensureKeyframes() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = STYLE_ID;
  s.textContent = `
    /* Fall: top → bottom — 8000px ensures particles reach footer on any screen height */
    @keyframes cf-fall {
      from { transform: translateY(-2em) rotate(0deg); opacity: 0; }
      6%   { opacity: 1; }
      92%  { opacity: 0.85; }
      to   { transform: translateY(8000px) rotate(var(--cf-spin,180deg)); opacity: 0; }
    }
    /* Asymmetric wind sway with prevailing bias (Sakura - drifts right mostly) */
    @keyframes cf-wind-gentle {
      0%, 100% { transform: translateX(0px); }
      25%      { transform: translateX(var(--cf-wind-amp, 60px)); }
      50%      { transform: translateX(calc(var(--cf-wind-amp, 60px) * -0.4)); }
      75%      { transform: translateX(calc(var(--cf-wind-amp, 60px) * 0.8)); }
    }
    /* Asymmetric wind sway with prevailing bias (Snowflake - stronger gusts) */
    @keyframes cf-wind-strong {
      0%, 100% { transform: translateX(0px); }
      30%      { transform: translateX(var(--cf-wind-amp, 120px)); }
      60%      { transform: translateX(calc(var(--cf-wind-amp, 120px) * -0.6)); }
      80%      { transform: translateX(calc(var(--cf-wind-amp, 120px) * 0.5)); }
    }
    /* Diwali sparkle (opacity + scale pulse with glow, stationary) */
    @keyframes cf-twinkle {
      0%, 100% { opacity: 0; transform: scale(0.5); filter: drop-shadow(0 0 0px rgba(253,230,138,0)); }
      50%      { opacity: 1; transform: scale(1.1); filter: drop-shadow(0 0 8px rgba(253,230,138,0.7)); }
    }
  `;
  document.head.appendChild(s);
}

// ── Flake data interfaces
interface BaseFlake {
  id: number;
  char: string;
  left: string;
  size: string;
  delay: string;
  opacity: number;
}

interface FallingFlake extends BaseFlake {
  duration: string;
  windDuration: string;
  windAmp: string;
  spin: string;
}

interface TwinkleFlake extends BaseFlake {
  top: string;
  duration: string;
}

// Stratified positions to prevent clumping
function buildLeftPositions(count: number): string[] {
  const binWidth = 100 / count;
  return Array.from({ length: count }, (_, i) => {
    const binStart = i * binWidth;
    const jitter = Math.random() * binWidth;
    return `${(binStart + jitter).toFixed(1)}%`;
  }).sort(() => Math.random() - 0.5);
}

function buildFallingParticles(type: string, count: number): FallingFlake[] {
  const chars = CHARACTERS[type] ?? CHARACTERS["snowflake"];
  const lefts = buildLeftPositions(count);

  return Array.from({ length: count }, (_, i) => {
    // Generate scale/size first so we can tie wind speeds/amplitudes to weight
    const scale =
      type === "snowflake"
        ? Math.random() * 0.8 + 1.6 // 1.6em - 2.4em
        : Math.random() * 1.2 + 1.6; // 1.6em - 2.8em

    // Determine weight factor (larger scale = heavier, falls faster, sways less)
    const normalizedScale = (scale - 1.6) / 1.2; // 0 (lightest) to 1 (heaviest)

    // MUCH Slower Durations: lighter falls slower (18-28s), heavier falls faster (12-18s)
    const baseDuration = type === "snowflake" ? 12 : 14;
    const durationVal = baseDuration + (1 - normalizedScale) * 10 + Math.random() * 4;

    // Wind sway: wider range for drifting curves (up to 140px sway)
    let windAmpVal = 0;
    if (type === "snowflake") {
      const maxWind = 60 + (1 - normalizedScale) * 80;
      windAmpVal = i % 2 === 0 ? maxWind : -maxWind;
    } else {
      const maxWind = 40 + (1 - normalizedScale) * 60;
      windAmpVal = i % 2 === 0 ? maxWind : -maxWind; // alternate sakura sways too
    }

    const windDurationVal = 6 + (1 - normalizedScale) * 6 + Math.random() * 3; // 6-15s cycle

    const spinDir = i % 2 === 0 ? 1 : -1;
    const spinVal = spinDir * (360 + Math.random() * 720);

    return {
      id: i,
      char: chars[i % chars.length],
      left: lefts[i],
      size: `${scale.toFixed(2)}em`,
      duration: `${durationVal.toFixed(1)}s`,
      delay: `${(-(Math.random() * 25)).toFixed(1)}s`, // broader delay range
      windDuration: `${windDurationVal.toFixed(1)}s`,
      windAmp: `${windAmpVal.toFixed(0)}px`,
      spin: `${spinVal.toFixed(0)}deg`,
      opacity: 0.7 + Math.random() * 0.3,
    };
  });
}

function buildTwinkles(count: number): TwinkleFlake[] {
  const chars = CHARACTERS["diwali-light"];
  const lefts = buildLeftPositions(count);

  return Array.from({ length: count }, (_, i) => {
    const scale = Math.random() * 0.8 + 0.8; // 0.8em - 1.6em

    return {
      id: i,
      char: chars[i % chars.length],
      left: lefts[i],
      top: `${(Math.random() * 90 + 5).toFixed(1)}%`, // keep slightly away from absolute edges
      size: `${scale.toFixed(2)}em`,
      duration: `${(6 + Math.random() * 6).toFixed(1)}s`, // 6-12s glow pulse
      delay: `${(-(Math.random() * 20)).toFixed(1)}s`, // wider desync delay up to 20s
      opacity: 0.75 + Math.random() * 0.25,
    };
  });
}

export const ParticleCanvas = memo(function ParticleCanvas({
  type,
  className = "",
  density = 1,
}: ParticleCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fallingFlakes, setFallingFlakes] = useState<FallingFlake[]>([]);
  const [twinkleFlakes, setTwinkleFlakes] = useState<TwinkleFlake[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Diwali Firework states
  const [firework, setFirework] = useState<{
    left: string;
    top: string;
    size: string;
    key: number;
  } | null>(null);

  // 1. Hook for responsive density scales and accessibility preferences
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced motion settings at system level
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMotionChange);
    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  // 2. Generate particles adaptively based on screens/density settings
  useEffect(() => {
    if (type === "none" || reducedMotion) {
      setFallingFlakes([]);
      setTwinkleFlakes([]);
      setFirework(null);
      return;
    }

    ensureKeyframes();

    // Scale particle count dynamically for smaller screens (e.g. mobile)
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const countMultiplier = isMobile ? 0.45 : 1.0;

    if (type === "diwali-light") {
      const baseCount = 15;
      const count = Math.min(Math.round(baseCount * density * countMultiplier), 25);
      setTwinkleFlakes(buildTwinkles(count));
      setFallingFlakes([]);

      // Start the interval to show a random firework every 6-10 seconds
      const triggerFirework = () => {
        const left = `${(10 + Math.random() * 80).toFixed(1)}%`;
        const top = `${(15 + Math.random() * 50).toFixed(1)}%`; // Keep in middle-top areas
        const size = `${(100 + Math.random() * 80).toFixed(0)}px`;
        setFirework({ left, top, size, key: Date.now() });

        // Auto remove firework after 4 seconds (duration of its loop)
        setTimeout(() => {
          setFirework(null);
        }, 4000);
      };

      // Initial firework trigger
      const initialTimer = setTimeout(triggerFirework, 1500);

      const interval = setInterval(() => {
        triggerFirework();
      }, 8000); // Trigger every 8 seconds

      return () => {
        clearTimeout(initialTimer);
        clearInterval(interval);
      };
    } else {
      const baseCount = type === "snowflake" ? 60 : 40;
      const count = Math.min(
        Math.round(baseCount * density * countMultiplier),
        type === "snowflake" ? 90 : 60,
      );
      setFallingFlakes(buildFallingParticles(type, count));
      setTwinkleFlakes([]);
      setFirework(null);
    }
  }, [type, density, reducedMotion]);

  // 3. Pause via IntersectionObserver + Page Visibility API
  useEffect(() => {
    const el = containerRef.current;
    const particleCount = fallingFlakes.length + twinkleFlakes.length;
    if (!el || particleCount === 0) return;

    const setPlaying = (playing: boolean) => {
      const state = playing && !document.hidden ? "running" : "paused";
      el.querySelectorAll<HTMLElement>(".cf-item").forEach((n) => {
        n.style.animationPlayState = state;
        const inner = n.querySelector<HTMLElement>(".cf-item-inner");
        if (inner) inner.style.animationPlayState = state;
      });
    };

    const io = new IntersectionObserver(([entry]) => setPlaying(entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);

    const onVis = () => setPlaying(!document.hidden);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [fallingFlakes, twinkleFlakes]);

  if (type === "none" || reducedMotion) return null;

  const isDiwali = type === "diwali-light";
  const animName = "cf-fall";
  const windAnimName = type === "snowflake" ? "cf-wind-strong" : "cf-wind-gentle";
  const glow = GLOW[type] ?? "";

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none ${className || "fixed inset-0 z-10"}`}
    >
      {/* DIWALI: Cheaper single-span stationary twinkling field */}
      {isDiwali &&
        twinkleFlakes.map((f) => (
          <span
            key={f.id}
            className="cf-item absolute select-none leading-none block"
            style={{
              left: f.left,
              top: f.top,
              fontSize: f.size,
              opacity: f.opacity,
              filter: glow,
              animation: `cf-twinkle ${f.duration} ${f.delay} infinite ease-in-out`,
            }}
          >
            {f.char}
          </span>
        ))}

      {/* DIWALI: Rare, random position background fireworks */}
      {isDiwali && firework && (
        <span
          key={firework.key}
          className="absolute select-none leading-none block overflow-visible"
          style={{
            left: firework.left,
            top: firework.top,
            width: firework.size,
            height: firework.size,
            transform: "translate(-50%, -50%)",
            animation: "cf-twinkle 4s ease-in-out forwards",
          }}
        >
          <DotLottieReact
            src="/animations/Fireworks.json"
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        </span>
      )}

      {/* SAKURA / SNOWFLAKE: Decoupled nested wind/fall structure */}
      {!isDiwali &&
        fallingFlakes.map((f) => (
          <span
            key={f.id}
            className="cf-item cf-flake-outer absolute select-none leading-none"
            style={{
              left: f.left,
              top: "-2em",
              fontSize: f.size,
              animation: `${windAnimName} ${f.windDuration} ${f.delay} infinite ease-in-out`,
              ["--cf-wind-amp" as string]: f.windAmp,
            }}
          >
            <span
              className="cf-item-inner cf-flake-inner block"
              style={{
                opacity: f.opacity,
                filter: glow,
                color: type === "snowflake" ? "#93c5fd" : undefined,
                fontWeight: type === "snowflake" ? "900" : undefined,
                animation: `${animName} ${f.duration} ${f.delay} infinite linear`,
                ["--cf-spin" as string]: f.spin,
              }}
            >
              {f.char}
            </span>
          </span>
        ))}
    </div>
  );
});

ParticleCanvas.displayName = "ParticleCanvas";

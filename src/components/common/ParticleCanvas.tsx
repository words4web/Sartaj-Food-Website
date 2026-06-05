"use client";

import { useEffect, useRef } from "react";
import { Particle, ParticleCanvasProps } from "@/types/common.types";

// Theme colour palettes for ambient orbs
const PALETTE: Record<string, string[]> = {
  sakura: ["#f9a8d4", "#f472b6", "#fda4af", "#fbcfe8"],
  snowflake: ["#bae6fd", "#93c5fd", "#c7d2fe", "#e0f2fe"],
  "diwali-light": ["#fde68a", "#fb923c", "#f87171", "#fbbf24"],
};

export function ParticleCanvas({ type, className = "" }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (type === "none") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = PALETTE[type] ?? PALETTE["snowflake"];

    // Create a small number of ambient orbs spread across the screen
    const COUNT = 18;
    particlesRef.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      // Very slow drift
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.2,
      life: Math.random() * 300, // stagger start phases
      maxLife: Math.random() * 300 + 400,
      size: Math.random() * 60 + 30, // large soft glow radius
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const animate = () => {
      // Full clear each frame — no smearing
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesRef.current) {
        p.life++;
        if (p.life > p.maxLife) {
          // Reset to a random position at end of life
          p.life = 0;
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
          p.color = colors[Math.floor(Math.random() * colors.length)];
        }

        // Gentle sine-wave drift
        p.x += p.vx + Math.sin(p.life * 0.008) * 0.15;
        p.y += p.vy + Math.cos(p.life * 0.006) * 0.1;

        // Wrap around edges
        if (p.x < -p.size) p.x = canvas.width + p.size;
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = canvas.height + p.size;
        if (p.y > canvas.height + p.size) p.y = -p.size;

        // Breathing opacity — peaks at mid-life, fades in/out
        const progress = p.life / p.maxLife;
        const breath = Math.sin(progress * Math.PI); // 0 → 1 → 0
        const opacity = breath * 0.12; // max 12% opacity — very subtle

        // Soft radial glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, hexAlpha(p.color!, opacity));
        grad.addColorStop(1, hexAlpha(p.color!, 0));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      particlesRef.current = [];
    };
  }, [type]);

  if (type === "none") return null;

  return (
    <canvas ref={canvasRef} className={`fixed inset-0 pointer-events-none z-10 ${className}`} />
  );
}

/** Convert hex colour + 0–1 opacity to rgba string */
function hexAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

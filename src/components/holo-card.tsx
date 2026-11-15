"use client";

import { useEffect, useRef } from "react";

/**
 * Incline la carte vers le pointeur et déplace le reflet holographique.
 * Le mouvement est lissé (la carte « rattrape » le pointeur) pour garder de la matière.
 * Sans effet au toucher ni si l'utilisateur a demandé moins d'animations.
 */
export function HoloCard({ shiny, children, className = "" }: { shiny: boolean; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: 0.5, y: 0.5, on: 0 };
    const now = { x: 0.5, y: 0.5, on: 0 };
    let frame = 0;

    const tick = () => {
      now.x += (target.x - now.x) * 0.14;
      now.y += (target.y - now.y) * 0.14;
      now.on += (target.on - now.on) * 0.14;
      el.style.transform = `perspective(900px) rotateY(${(now.x - 0.5) * 16 * now.on}deg) rotateX(${(0.5 - now.y) * 16 * now.on}deg)`;
      el.style.setProperty("--mx", now.x.toFixed(3));
      el.style.setProperty("--my", now.y.toFixed(3));
      el.style.setProperty("--glare", shiny ? (now.on * 0.85).toFixed(3) : "0");
      const settled = Math.abs(target.x - now.x) + Math.abs(target.y - now.y) + Math.abs(target.on - now.on) < 0.002;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = (e.clientY - r.top) / r.height;
      target.on = 1;
      frame ||= requestAnimationFrame(tick);
    };
    const leave = () => {
      target.x = target.y = 0.5;
      target.on = 0;
      frame ||= requestAnimationFrame(tick);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frame);
    };
  }, [shiny]);

  return (
    <div ref={ref} className={`holo rounded-[4.2%/3%] ${className}`}>
      {children}
    </div>
  );
}

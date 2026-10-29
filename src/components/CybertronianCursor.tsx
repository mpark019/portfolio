"use client";

import { useEffect, useRef } from "react";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const randomGlyph = () => alphabet[Math.floor(Math.random() * alphabet.length)];

export function CybertronianCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lastMove = 0;
    let lastFrame = 0;
    let lastScramble = 0;
    let fontReady = false;
    let disposed = false;
    let pointerX = 0;
    let pointerY = 0;
    let centerX = 0;
    let centerY = 0;
    const radius = 110;
    const spacing = 23;
    const glyphs = new Map<string, string>();

    function clear() {
      context!.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    function stop() {
      window.cancelAnimationFrame(frame);
      frame = 0;
      clear();
    }

    function resize() {
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(window.innerWidth * scale);
      canvas!.height = Math.round(window.innerHeight * scale);
      context!.setTransform(scale, 0, 0, scale, 0, 0);
    }

    function draw(now: number) {
      const idle = now - lastMove;
      clear();
      if (idle >= 550) {
        frame = 0;
        return;
      }

      const elapsed = Math.min(now - lastFrame, 50);
      lastFrame = now;
      const scramble = now - lastScramble >= 60;
      if (scramble) lastScramble = now;
      const opacity = 0.38 * Math.max(0, 1 - Math.max(0, idle - 100) / 450);
      const follow = 1 - Math.exp(-elapsed / 65);
      centerX += (pointerX - centerX) * follow;
      centerY += (pointerY - centerY) * follow;
      context!.font = "18px Cybertronian";
      context!.textAlign = "center";
      context!.textBaseline = "middle";

      // Anchor letters to document coordinates; only the reveal follows the mouse.
      const column = Math.floor((centerX + window.scrollX) / spacing);
      const row = Math.floor((centerY + window.scrollY) / spacing);
      const reach = Math.ceil(radius / spacing);
      for (let y = row - reach; y <= row + reach; y++) {
        for (let x = column - reach; x <= column + reach; x++) {
          const screenX = x * spacing - window.scrollX;
          const screenY = y * spacing - window.scrollY;
          const distance = Math.hypot(screenX - centerX, screenY - centerY) / radius;
          if (distance >= 1) continue;
          const key = `${x},${y}`;
          let character = glyphs.get(key);
          if (!character || (scramble && Math.random() < 0.35)) {
            character = randomGlyph();
            glyphs.set(key, character);
          }

          const falloff = (1 - distance * distance) ** 2;
          context!.fillStyle = `rgba(240, 160, 107, ${opacity * falloff})`;
          context!.fillText(character, screenX, screenY);
        }
      }
      frame = window.requestAnimationFrame(draw);
    }

    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse" || motion.matches || !fontReady) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      lastMove = performance.now();
      if (!frame) {
        centerX = pointerX;
        centerY = pointerY;
        lastFrame = lastMove;
        frame = window.requestAnimationFrame(draw);
      }
    }

    function leave(event: PointerEvent) {
      if (!event.relatedTarget) stop();
    }

    resize();
    void document.fonts.load("16px Cybertronian").then(
      () => { if (!disposed) fontReady = true; },
      () => {},
    );
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leave);
    window.addEventListener("blur", stop);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", stop);
    motion.addEventListener("change", stop);

    return () => {
      disposed = true;
      stop();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", stop);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", stop);
      motion.removeEventListener("change", stop);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}

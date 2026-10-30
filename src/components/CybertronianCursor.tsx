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
    let lastScramble = 0;
    let fontReady = false;
    let disposed = false;
    let pointerX = 0;
    let pointerY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let directionX = 1;
    let directionY = 0;
    let touchActive = false;
    const radius = 90;
    const spacing = 23;
    const hexagonSlope = Math.sqrt(3);
    const glyphs = new Map<string, string>();

    function clear() {
      context!.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    function stop() {
      window.cancelAnimationFrame(frame);
      frame = 0;
      velocityX = 0;
      velocityY = 0;
      lastMove = 0;
      clear();
    }

    function resize() {
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(window.innerWidth * scale);
      canvas!.height = Math.round(window.innerHeight * scale);
      context!.setTransform(scale, 0, 0, scale, 0, 0);
    }

    function draw(now: number) {
      const idle = touchActive ? 0 : now - lastMove;
      clear();
      if (idle >= 750) {
        frame = 0;
        return;
      }

      const scramble = now - lastScramble >= 60;
      if (scramble) lastScramble = now;
      const opacity = 0.38 * Math.max(0, 1 - Math.max(0, idle - 100) / 650);
      velocityX *= 0.9;
      velocityY *= 0.9;
      const speed = Math.hypot(velocityX, velocityY);
      const stretch = Math.min(speed / 1.2, 1);
      if (speed > 0.001) {
        directionX = velocityX / speed;
        directionY = velocityY / speed;
      }
      const sideRadius = radius * (1 - 0.18 * stretch);
      context!.font = "18px Cybertronian";
      context!.textAlign = "center";
      context!.textBaseline = "middle";

      // Anchor letters to document coordinates; only the reveal follows the mouse.
      const column = Math.floor((pointerX + window.scrollX) / spacing);
      const row = Math.floor((pointerY + window.scrollY) / spacing);
      const reach = Math.ceil((radius * (1 + 0.55 * stretch)) / spacing);
      for (let y = row - reach; y <= row + reach; y++) {
        for (let x = column - reach; x <= column + reach; x++) {
          const screenX = x * spacing - window.scrollX;
          const screenY = y * spacing - window.scrollY;
          const offsetX = screenX - pointerX;
          const offsetY = screenY - pointerY;
          const along = offsetX * directionX + offsetY * directionY;
          const across = offsetY * directionX - offsetX * directionY;
          const lengthRadius = radius * (1 + (along < 0 ? 0.55 : -0.08) * stretch);
          const length = Math.abs(along / lengthRadius);
          const width = Math.abs(across / sideRadius);
          const distance = Math.max((2 * width) / hexagonSlope, length + width / hexagonSlope);
          if (distance >= 1) continue;
          const key = `${x},${y}`;
          let character = glyphs.get(key);
          if (!character || (scramble && Math.random() < 0.35)) {
            character = randomGlyph();
            glyphs.set(key, character);
          }

          const falloff = (1 - distance ** 4) ** 2;
          context!.fillStyle = `rgba(240, 160, 107, ${opacity * falloff})`;
          context!.fillText(character, screenX, screenY);
        }
      }
      frame = window.requestAnimationFrame(draw);
    }

    function updatePosition(x: number, y: number) {
      if (motion.matches || !fontReady) return;
      const now = performance.now();
      if (lastMove) {
        const elapsed = Math.max(now - lastMove, 8);
        velocityX = velocityX * 0.45 + ((x - pointerX) / elapsed) * 0.55;
        velocityY = velocityY * 0.45 + ((y - pointerY) / elapsed) * 0.55;
      }
      pointerX = x;
      pointerY = y;
      lastMove = now;
      if (!frame) {
        frame = window.requestAnimationFrame(draw);
      }
    }

    function move(event: PointerEvent) {
      if (event.pointerType === "mouse") updatePosition(event.clientX, event.clientY);
    }

    function touchMove(event: TouchEvent) {
      const touch = event.touches[0];
      if (!touch) return;
      touchActive = true;
      updatePosition(touch.clientX, touch.clientY);
    }

    function touchEnd(event: TouchEvent) {
      if (event.touches.length) {
        touchMove(event);
        return;
      }
      touchActive = false;
      lastMove = performance.now();
    }

    function leave(event: PointerEvent) {
      if (event.pointerType === "mouse" && !event.relatedTarget) stop();
    }

    resize();
    void document.fonts.load("16px Cybertronian").then(
      () => { if (!disposed) fontReady = true; },
      () => {},
    );
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("touchstart", touchMove, { passive: true });
    window.addEventListener("touchmove", touchMove, { passive: true });
    window.addEventListener("touchend", touchEnd, { passive: true });
    window.addEventListener("touchcancel", touchEnd, { passive: true });
    window.addEventListener("pointerout", leave);
    window.addEventListener("blur", stop);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", stop);
    motion.addEventListener("change", stop);

    return () => {
      disposed = true;
      stop();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("touchstart", touchMove);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", touchEnd);
      window.removeEventListener("touchcancel", touchEnd);
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

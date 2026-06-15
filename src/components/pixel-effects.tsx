"use client";

export function Scanlines() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.04]"
      aria-hidden
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
      }}
    />
  );
}

export function PixelGrid() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
      aria-hidden
      style={{
        backgroundImage: `
          linear-gradient(rgba(94,234,212,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(94,234,212,0.5) 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px",
      }}
    />
  );
}

export function FloatingPixels() {
  const pixels = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${8 + (i * 7.5) % 85}%`,
    delay: `${i * 0.7}s`,
    duration: `${4 + (i % 4)}s`,
    size: i % 3 === 0 ? 3 : 2,
    color: i % 2 === 0 ? "var(--glhf-mint)" : "var(--glhf-purple)",
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pixels.map((p) => (
        <span
          key={p.id}
          className="animate-float-pixel absolute rounded-[1px] opacity-40"
          style={{
            left: p.left,
            bottom: "-8px",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}

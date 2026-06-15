"use client";

/** Falling ember/spark streaks from the GLHFers volcanic PFP aesthetic */
export function FallingEmbers() {
  const embers = [
    { left: "6%", delay: "0s", dur: "7s", w: 2, h: 8, rot: -35 },
    { left: "14%", delay: "1.2s", dur: "9s", w: 3, h: 10, rot: -28 },
    { left: "22%", delay: "0.4s", dur: "8s", w: 2, h: 6, rot: -40 },
    { left: "78%", delay: "0.8s", dur: "7.5s", w: 2, h: 9, rot: 35 },
    { left: "86%", delay: "2s", dur: "10s", w: 3, h: 7, rot: 42 },
    { left: "92%", delay: "1.5s", dur: "8.5s", w: 2, h: 8, rot: 38 },
    { left: "48%", delay: "3s", dur: "11s", w: 2, h: 5, rot: -15 },
    { left: "55%", delay: "2.5s", dur: "9.5s", w: 2, h: 6, rot: 20 },
    { left: "32%", delay: "1.8s", dur: "8s", w: 2, h: 7, rot: -32 },
    { left: "68%", delay: "0.6s", dur: "7s", w: 3, h: 8, rot: 30 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {embers.map((e, i) => (
        <span
          key={i}
          className="animate-ember-fall absolute opacity-70"
          style={{
            left: e.left,
            top: "-20px",
            width: e.w,
            height: e.h,
            // @ts-expect-error CSS custom property for ember rotation
            ["--rot" as string]: `${e.rot}deg`,
            background: "linear-gradient(180deg, #ffd700, #ff8c00)",
            animationDelay: e.delay,
            animationDuration: e.dur,
            boxShadow: "0 0 4px rgba(255, 215, 0, 0.6)",
          }}
        />
      ))}
    </div>
  );
}

/** Pixel mountain silhouettes — dark red/brown volcanic terrain */
function PixelMountains() {
  return (
    <svg
      className="absolute bottom-[18%] left-0 w-full"
      viewBox="0 0 400 120"
      preserveAspectRatio="none"
      aria-hidden
      style={{ height: "28%", minHeight: 140 }}
    >
      {/* Back range */}
      <polygon
        points="0,120 0,70 40,45 80,65 120,30 160,55 200,25 240,50 280,35 320,60 360,40 400,65 400,120"
        fill="#6b1a1a"
      />
      {/* Mid range */}
      <polygon
        points="0,120 0,85 60,60 100,80 150,50 200,75 260,45 310,70 360,55 400,80 400,120"
        fill="#8b0000"
      />
      {/* Front range — chunky pixels */}
      <polygon
        points="0,120 0,95 50,85 90,100 130,80 170,95 220,75 270,90 320,80 370,95 400,85 400,120"
        fill="#4a0e0e"
      />
      {/* Pixel blocks on peaks */}
      <rect x="118" y="28" width="8" height="8" fill="#5c1010" />
      <rect x="198" y="23" width="8" height="8" fill="#5c1010" />
      <rect x="278" y="33" width="8" height="8" fill="#5c1010" />
      <rect x="358" y="38" width="8" height="8" fill="#5c1010" />
    </svg>
  );
}

/** Purple/magenta pixel ground from PFP */
function PixelGround() {
  return (
    <div
      className="absolute inset-x-0 bottom-0"
      style={{ height: "22%" }}
      aria-hidden
    >
      <div
        className="h-full w-full"
        style={{
          background: `
            linear-gradient(180deg, #5a1578 0%, #3d0f52 40%, #2a0838 100%)
          `,
        }}
      />
      {/* Pixel grass/terrain blocks */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 400 40"
        preserveAspectRatio="none"
        style={{ height: 24 }}
      >
        {Array.from({ length: 50 }, (_, i) => {
          const h = 4 + (i % 3) * 4;
          const x = i * 8;
          const shade = i % 2 === 0 ? "#6b2090" : "#4a1068";
          return (
            <rect key={i} x={x} y={40 - h} width={8} height={h} fill={shade} />
          );
        })}
      </svg>
    </div>
  );
}

/** Full-page GLHFers volcanic sunset scene */
export function GlhfSceneBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Sky gradient — orange to gold */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              #ff8c00 0%,
              #fbae3c 25%,
              #ffd700 45%,
              #f57c00 65%,
              #c44d00 80%,
              #1a0528 95%
            )
          `,
        }}
      />

      {/* Sun glow */}
      <div
        className="animate-sun-pulse absolute left-1/2 top-[18%] -translate-x-1/2 rounded-full"
        style={{
          width: 120,
          height: 120,
          background:
            "radial-gradient(circle, rgba(255,215,0,0.9) 0%, rgba(255,140,0,0.4) 50%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />

      <PixelMountains />
      <PixelGround />
      <FallingEmbers />

      {/* Dark vignette so content stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 50% 40%, transparent 0%, rgba(10, 5, 20, 0.55) 100%),
            linear-gradient(180deg, transparent 0%, rgba(10, 5, 20, 0.7) 85%, rgba(7, 7, 15, 0.95) 100%)
          `,
        }}
      />
    </div>
  );
}

export function Scanlines() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.035]"
      aria-hidden
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
      }}
    />
  );
}

/** Subtle pixel grid overlay */
export function PixelGrid() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.04]"
      aria-hidden
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,215,0,0.6) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,215,0,0.6) 1px, transparent 1px)
        `,
        backgroundSize: "8px 8px",
      }}
    />
  );
}

import Image from "next/image";
import { FallingEmbers } from "./pixel-effects";

export function HeroBanner() {
  return (
    <section className="glhf-panel glhf-panel--hero relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
      {/* Mini scene inside hero */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background: `
            linear-gradient(180deg, #ff8c00 0%, #fbae3c 40%, #5a1578 100%)
          `,
        }}
      />
      <FallingEmbers />

      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-4">
          <p className="font-pixel text-[10px] tracking-[0.35em] text-glhf-gold sm:text-xs">
            GIGA-NAME MARKETPLACE
          </p>
          <h1 className="font-pixel text-lg leading-relaxed text-foreground sm:text-xl md:text-2xl">
            TRADE GIGAVERSE
            <br />
            <span className="text-glhf-gold">USERNAMES</span>
          </h1>
          <p className="max-w-md font-retro text-xl text-foreground/80 sm:text-2xl">
            Nostalgic pixel identities for the on-chain RPG. Each name is a
            tradable NFT on Abstract.
          </p>
        </div>

        {/* Gigaverse mascot from @playgigaverse */}
        <div className="relative mx-auto shrink-0 sm:mx-0">
          <div
            className="animate-mascot-bob absolute -inset-3 rounded-sm opacity-60"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,215,0,0.3), rgba(255,140,0,0.1))",
              filter: "blur(8px)",
            }}
          />
          <div className="glhf-mascot-frame relative">
            <Image
              src="/assets/gigaverse-pfp.png"
              alt="Gigaverse"
              width={140}
              height={140}
              className="pixel-art h-[120px] w-[120px] sm:h-[140px] sm:w-[140px]"
              priority
            />
          </div>
          <p className="mt-2 text-center font-pixel text-[7px] tracking-widest text-glhf-gold">
            GIGAVERSE
          </p>
        </div>
      </div>
    </section>
  );
}

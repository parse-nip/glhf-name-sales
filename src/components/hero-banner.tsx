import { FloatingPixels } from "./pixel-effects";

export function HeroBanner() {
  return (
    <section className="glhf-panel relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12">
      <FloatingPixels />
      <div className="relative z-10 space-y-4">
        <p className="font-pixel text-[10px] tracking-[0.35em] text-glhf-mint sm:text-xs">
          GIGA-NAME MARKETPLACE
        </p>
        <h1 className="font-pixel text-xl leading-relaxed text-foreground sm:text-2xl md:text-3xl">
          TRADE GIGAVERSE
          <br />
          <span className="text-glhf-mint">USERNAMES</span>
        </h1>
        <p className="max-w-xl font-retro text-lg text-muted-foreground sm:text-xl">
          Nostalgic pixel identities for the on-chain RPG. Each name is a
          tradable NFT on Abstract — your in-game flex, onchain forever.
        </p>
      </div>
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 animate-pulse-glow rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--glhf-mint)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 animate-pulse-glow rounded-full opacity-15 blur-3xl"
        style={{ background: "var(--glhf-purple)", animationDelay: "1s" }}
      />
    </section>
  );
}

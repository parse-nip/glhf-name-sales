import { cn } from "@/lib/utils";

export function StatPill({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "glhf-stat-pill flex flex-col gap-1 px-4 py-3",
        highlight && "glhf-stat-pill--highlight"
      )}
    >
      <span className="font-pixel text-[8px] tracking-widest text-muted-foreground uppercase">
        {label}
      </span>
      <span
        className={cn(
          "font-retro text-2xl tabular-nums",
          highlight ? "text-glhf-gold" : "text-foreground"
        )}
      >
        {value}
      </span>
    </div>
  );
}

import CursorSVG from "@root/public/assets/CursorSVG";

type CursorProps = {
  color: string;
  x: number;
  y: number;
  message: string;
};

export default function Cursor({ color, x, y, message }: CursorProps) {
  return (
    <div
      className="pointer-events-none absolute left-0 top-0"
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
    >
      <CursorSVG color={color} />
      {message && (
        <div
          className={`absolute left-3 top-5 h-auto w-auto rounded-md border-border px-4 py-2 shadow-lg ring-2 ring-inset ring-white/30 shadow-[${color}]/30`}
          style={{
            backgroundColor: color,
          }}
        >
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-relaxed text-foreground">
            {message}
          </p>
        </div>
      )}
    </div>
  );
}

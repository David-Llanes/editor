import { COLORS } from "@/constants";
import { useOther } from "@root/liveblocks.config";

export default function Cursor({ connectionId }: { connectionId: number }) {
  const { cursor, message } = useOther(connectionId, (other) => {
    return { cursor: other.presence.cursor, message: other.presence.message };
  });
  const color = COLORS[connectionId % COLORS.length];

  // console.log(`Cursor ${connectionId} moviendose`);

  if (cursor === null) return null;
  return (
    <div
      className="pointer-events-none absolute left-0 top-0"
      style={{
        // transition: "transform 0.2s ease-out",
        transform: `translateX(${cursor?.x}px) translateY(${cursor?.y}px)`,
      }}
    >
      <svg
        className="relative"
        width="24"
        height="36"
        viewBox="0 0 24 36"
        fill="none"
        stroke="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
        />
      </svg>
      {message && (
        <div
          className={`absolute left-3 top-5 h-auto w-auto rounded-md px-4 py-2 shadow-lg ring-2 ring-inset ring-white/30 shadow-[${color}]/30`}
          style={{
            backgroundColor: color,
          }}
        >
          <p className="max-w-96 overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-relaxed text-white/80">
            {message}
          </p>
        </div>
      )}
    </div>
  );
}

// transition: "transform 0.2s ease-out",

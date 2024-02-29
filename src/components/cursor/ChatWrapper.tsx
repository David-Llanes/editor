import { useSelf } from "@root/liveblocks.config";

export default function ChatWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const cursor = useSelf((me) => me.presence.cursor);

  if (cursor === null) return null;
  return (
    <div
      className="absolute left-0 top-0"
      style={{
        transform: `translateX(${cursor?.x}px) translateY(${cursor?.y}px)`,
      }}
    >
      {children}
    </div>
  );
}

import { Room } from "@/components/Room";

export default function CanvasLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Room>{children}</Room>;
}

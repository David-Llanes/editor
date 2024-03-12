import { Room } from "@/components/Room";
import CursorStateProvider from "@/store/Provider";
import { CursorMode } from "@/types/type";

export default function CanvasLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-screen">
      <CursorStateProvider
        cursorState={{
          mode: CursorMode.Hidden,
        }}
      >
        <Room>{children}</Room>
      </CursorStateProvider>
    </div>
  );
}

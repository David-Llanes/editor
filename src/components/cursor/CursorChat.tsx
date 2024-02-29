import { CursorChatProps, CursorMode } from "@/types/type";
import { useCallback } from "react";

export default function CursorChat({
  cursor,
  cursorState,
  setCursorState,
  updateMyPresence,
}: CursorChatProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(cursorState.mode);
    updateMyPresence({ message: e.target.value });
    if (cursorState.mode === CursorMode.Chat) {
      setCursorState({
        mode: CursorMode.Chat,
        message: e.target.value,
        previousMessage: null,
      });
    }
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (cursorState.mode === CursorMode.Chat) {
        setCursorState({
          mode: CursorMode.Chat,
          message: "",
          previousMessage: cursorState.message,
        });
      }
    } else if (e.key === "Escape") {
      console.log("Cerraste el CHAT");
      updateMyPresence({ message: "" });
      setCursorState({
        mode: CursorMode.Hidden,
      });
    }
  };

  return (
    <div
      className="absolute left-0 top-0"
      style={{
        transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`,
      }}
    >
      {cursorState.mode === CursorMode.Chat && (
        <div
          className="absolute left-4 top-6 flex h-auto w-48 flex-col rounded-md bg-primary px-4 py-2 text-sm leading-relaxed text-white/80 shadow-lg shadow-primary/30 ring-2 ring-inset ring-white/30"
          onKeyUp={(e) => e.stopPropagation()}
        >
          {cursorState.previousMessage && (
            <p className="text-white/60">{cursorState.previousMessage}</p>
          )}
          <input
            className="block h-auto w-full resize-none border-none bg-transparent placeholder-white/60 outline-none"
            autoFocus={true}
            onChange={handleChange}
            onKeyDown={handleKeydown}
            placeholder={cursorState.previousMessage ? "" : " ¿Qué piensas?"}
            value={cursorState.message}
            maxLength={40}
          />
        </div>
      )}
    </div>
  );
}

// form-sizing: content para qye crezca el textarea

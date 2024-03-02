import { useCursorState } from "@/store/Provider";
import { CursorMode, CursorState } from "@/types/type";
import { useUpdateMyPresence } from "@root/liveblocks.config";

type ChatProps = {
  cursorState: CursorState;
  setCursorState: (cursorState: CursorState) => void;
};

export default function Chat() {
  const [cursorState, setCursorState] = useCursorState()((state) => [
    state.cursorState,
    state.setCursosState,
  ]);
  const updateMyPresence = useUpdateMyPresence();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <>
      {cursorState.mode === CursorMode.Reaction && (
        <div className="absolute left-3 top-4 animate-pulse select-none">
          {cursorState.reaction}
        </div>
      )}
      {cursorState.mode === CursorMode.Chat && (
        <div
          className="absolute left-4 top-6 flex h-auto w-48 flex-col rounded-md bg-primary px-4 py-2 text-sm leading-relaxed text-white/80 shadow-lg shadow-primary/30 ring-2 ring-inset ring-white/30"
          onKeyUp={(e) => e.stopPropagation()}
        >
          {cursorState.previousMessage && (
            <p className="pointer text-white/60">
              {cursorState.previousMessage}
            </p>
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
    </>
  );
}

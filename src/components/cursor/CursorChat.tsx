import { CursorChatProps, CursorMode } from "@/types/type";
import ChatWrapper from "./ChatWrapper";
import Chat from "./Chat";

export default function CursorChat({
  cursorState,
  setCursorState,
}: CursorChatProps) {
  console.log("Rerender cursorChat");

  return (
    <ChatWrapper>
      <Chat cursorState={cursorState} setCursorState={setCursorState} />
    </ChatWrapper>
  );
}

// form-sizing: content para qye crezca el textarea

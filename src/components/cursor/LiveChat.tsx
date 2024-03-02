import ChatWrapper from "./ChatWrapper";
import Chat from "./Chat";

export default function LiveChat() {
  console.log("Rerender cursorChat");

  return (
    <ChatWrapper>
      <Chat />
    </ChatWrapper>
  );
}

// form-sizing: content para qye crezca el textarea

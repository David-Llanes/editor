import { Reaction } from "@/types/type";
import { useState } from "react";
import ReactionsWrapper from "./ReactionsWrapper";
import Reactions from "./Reactions";

export default function LiveReactions() {
  const [reactions, setReactions] = useState<Reaction[]>([]);

  return (
    <ReactionsWrapper reactions={reactions} setReactions={setReactions}>
      <Reactions reactions={reactions} />
    </ReactionsWrapper>
  );
}

// Falta tener el estado manejado con zustand para que Flying reacion renderice las reacciones basadas en el store.

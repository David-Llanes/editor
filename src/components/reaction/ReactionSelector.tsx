import React from "react";

type Props = {
  setReaction: (reaction: string) => void;
};

export default function ReactionSelector({ setReaction }: Props) {
  return (
    <div
      className="ring-inset-2 absolute bottom-20 left-0 right-0 z-10 mx-auto flex w-fit flex-wrap items-center justify-center rounded-full bg-background px-4 py-2 align-middle shadow-sm shadow-foreground/10 ring-1 ring-inset ring-foreground/5 dark:shadow-foreground/10"
      onPointerMove={(e) => e.stopPropagation()}
    >
      <ReactionButton reaction="👍" onSelect={setReaction} />
      <ReactionButton reaction="🔥" onSelect={setReaction} />
      <ReactionButton reaction="😍" onSelect={setReaction} />
      <ReactionButton reaction="👀" onSelect={setReaction} />
      <ReactionButton reaction="😱" onSelect={setReaction} />
      <ReactionButton reaction="🙁" onSelect={setReaction} />
      <ReactionButton reaction="💩" onSelect={setReaction} />
    </div>
  );
}

function ReactionButton({
  reaction,
  onSelect,
}: {
  reaction: string;
  onSelect: (reaction: string) => void;
}) {
  return (
    <button
      className="transform select-none p-2 text-xl transition-transform hover:scale-150 focus:scale-150 focus:outline-none"
      onPointerDown={() => onSelect(reaction)}
    >
      {reaction}
    </button>
  );
}

"use client";

import { useState, createContext, useContext } from "react";
import { create } from "zustand";
import { CursorState, Reaction, SetCursorState } from "@/types/type";

type State = {
  cursorState: CursorState;
  setCursosState: (cursorState: CursorState) => void;
};

const createCursorStore = (cursorState: CursorState) =>
  create<State>((set) => ({
    cursorState,
    setCursosState: (cursorState) => set({ cursorState }),
  }));

// Creando un contexto para el estado del cursor
const CursorStateContext = createContext<ReturnType<
  typeof createCursorStore
> | null>(null);

// Custom hook para acceder al valor del contexto
export const useCursorState = () => {
  const context = useContext(CursorStateContext);

  if (!context) {
    throw new Error(
      "useCursorState debe ser usado dentro de un CursorStateProvider",
    );
  }

  return context;
};

// Creando un provider para el estado del cursor
function CursorStateProvider({
  cursorState,
  children,
}: {
  cursorState: CursorState;
  children: React.ReactNode;
}) {
  const [store] = useState(() => createCursorStore(cursorState));
  return (
    <CursorStateContext.Provider value={store}>
      {children}
    </CursorStateContext.Provider>
  );
}

export default CursorStateProvider;

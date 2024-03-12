import { ActiveTool } from "@/types/type";
import {
  Dispatch,
  MutableRefObject,
  RefObject,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

type State = {
  activeTool: string;
  setActiveTool: Dispatch<SetStateAction<string>>;
  canvasRef: RefObject<HTMLCanvasElement>;
  fabricRef: MutableRefObject<fabric.Canvas | null>;
  shapeRef: React.MutableRefObject<fabric.Object | null>;
  selectedShapeRef: MutableRefObject<string | null>;
  activeObjectRef: React.MutableRefObject<fabric.Object | null>;
  isEditingRef: MutableRefObject<boolean>;
  isDrawing: MutableRefObject<boolean>;
};

const editorContext = createContext<State | null>(null);

export default function EditorStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTool, setActiveTool] = useState<string>(ActiveTool.Select);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef(false);
  const shapeRef = useRef<fabric.Object | null>(null);
  const selectedShapeRef = useRef<string | null>(null);
  const activeObjectRef = useRef<fabric.Object | null>(null);
  const isEditingRef = useRef(false);
  return (
    <editorContext.Provider
      value={useMemo(
        () => ({
          activeTool,
          setActiveTool,
          canvasRef,
          fabricRef,
          isDrawing,
          shapeRef,
          selectedShapeRef,
          activeObjectRef,
          isEditingRef,
        }),
        [activeTool],
      )}
    >
      {children}
    </editorContext.Provider>
  );
}

export const useEditorState = () => {
  const editorState = useContext(editorContext);
  if (!editorState) {
    throw new Error("useEditorState must be used within a EditorStateProvider");
  }
  return editorState;
};

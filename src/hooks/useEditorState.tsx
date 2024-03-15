import { ActiveTool } from "@/types/type";

import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

export enum ShapeToDraw {
  rectangle = "rect",
  circle = "circle",
  triangle = "triangle",
  text = "text",
  line = "line",
  image = "image",
}

export enum Modes {
  isDrawing = "isDrawing",
  isEditing = "isEditing",
  isFreeForm = "isFreeForm",
  isSelecting = "isSelecting",
  isMoving = "isMoving",
  // isInteracting = "isInteracting",
}

export enum Tools {
  select = "select",
  move = "move",
  text = "text",
  comments = "comments",
  pen = "pen",
  rect = "rect",
  circle = "circle",
  triangle = "triangle",
  line = "line",
  image = "image",
}

export type ActiveToolType = string | null;
export type SetActiveToolType = Dispatch<SetStateAction<string>>;
export type ModeType = MutableRefObject<Modes>;
export type CanvasType = MutableRefObject<HTMLCanvasElement | null>;
export type FabricCanvasType = MutableRefObject<fabric.Canvas | null>;
export type NewShapeType = MutableRefObject<fabric.Object | null>;
// export type ShapeToDrawType = MutableRefObject<string | null>;
export type ShapeToDrawType = MutableRefObject<ShapeToDraw | null>;
export type ActiveObjectType = MutableRefObject<fabric.Object | null>;

type State = {
  activeTool: ActiveToolType;
  setActiveTool: SetActiveToolType;
  canvasRef: CanvasType;
  fabricRef: FabricCanvasType;
  newShapeRef: NewShapeType;
  shapeToDrawRef: ShapeToDrawType;
  activeObjectRef: ActiveObjectType;
  modeRef: ModeType;
};

const editorContext = createContext<State | null>(null);

export default function EditorStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTool, setActiveTool] = useState<string>(ActiveTool.Select);
  const modeRef = useRef(Modes.isSelecting);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const newShapeRef = useRef<fabric.Object | null>(null);
  const shapeToDrawRef = useRef<ShapeToDraw | null>(null);
  const activeObjectRef = useRef<fabric.Object | null>(null);
  return (
    <editorContext.Provider
      value={{
        activeTool,
        setActiveTool,
        canvasRef,
        fabricRef,
        modeRef,
        newShapeRef,
        shapeToDrawRef,
        activeObjectRef,
      }}
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

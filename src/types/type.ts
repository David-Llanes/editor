import { BaseUserMeta, User } from "@liveblocks/client";
import { Gradient, Pattern } from "fabric/fabric-impl";
import { Dispatch, SetStateAction } from "react";

export enum CursorMode {
  Hidden,
  Chat,
  ReactionSelector,
  Reaction,
}

export enum ActiveTool {
  Select = "select",
  Move = "move",
  Text = "text",
  Comments = "comments",
  Pen = "pen",
  Rectangle = "rectangle",
  Circle = "circle",
  Triangle = "triangle",
  Line = "line",
  Image = "image",
}

export enum CanvasActions {
  Undo = "undo",
  Redo = "redo",
  Reset = "reset",
  Delete = "delete",
  Save = "save",
}

export type CursorHidden = {
  mode: CursorMode.Hidden;
};

export type CursorChat = {
  mode: CursorMode.Chat;
  message: string;
  previousMessage: string | null;
};

export type CursorReactionSelector = {
  mode: CursorMode.ReactionSelector;
};

export type CursorReaction = {
  mode: CursorMode.Reaction;
  reaction: string;
  isPressed: boolean;
};

export type CursorState =
  | CursorHidden
  | CursorChat
  | CursorReactionSelector
  | CursorReaction;

export type SetCursorState = Dispatch<SetStateAction<CursorState>>;

export type Reaction = {
  value: string;
  timestamp: number;
  point: { x: number; y: number };
};
export type SetReaction = Dispatch<SetStateAction<Reaction[]>>;

export type ReactionEvent = {
  x: number;
  y: number;
  value: string;
};

export type ShapeData = {
  type: string;
  width: number;
  height: number;
  fill: string | Pattern | Gradient;
  left: number;
  top: number;
  objectId: string | undefined;
};

export type Attributes = {
  width: string;
  height: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  fill: string;
  stroke: string;
};

export type ActiveElement = {
  name: string;
  value: string;
  icon: string;
} | null;

export interface CustomFabricObject<T extends fabric.Object>
  extends fabric.Object {
  objectId?: string;
}

export type ModifyShape = {
  canvas: fabric.Canvas;
  property: string;
  value: any;
  activeObjectRef: React.MutableRefObject<fabric.Object | null>;
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type ElementDirection = {
  canvas: fabric.Canvas;
  direction: string;
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type ImageUpload = {
  file: File;
  canvas: React.MutableRefObject<fabric.Canvas>;
  shapeRef: React.MutableRefObject<fabric.Object | null>;
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type RightSidebarProps = {
  elementAttributes: Attributes;
  setElementAttributes: React.Dispatch<React.SetStateAction<Attributes>>;
  fabricRef: React.RefObject<fabric.Canvas | null>;
  activeObjectRef: React.RefObject<fabric.Object | null>;
  isEditingRef: React.MutableRefObject<boolean>;
  syncShapeInStorage: (obj: any) => void;
};

export type NavbarProps = {
  activeElement: ActiveElement;
  imageInputRef: React.MutableRefObject<HTMLInputElement | null>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleActiveElement: (element: ActiveElement) => void;
};

export type ShapesMenuProps = {
  item: {
    name: string;
    icon: string;
    value: Array<ActiveElement>;
  };
  activeElement: any;
  handleActiveElement: any;
  handleImageUpload: any;
  imageInputRef: any;
};

export type Presence = any;

export type LiveCursorProps = {
  others: readonly User<Presence, BaseUserMeta>[];
};

export type CanvasMouseDown = {
  options: fabric.IEvent;
  canvas: fabric.Canvas;
  selectedShapeRef: any;
  isDrawing: React.MutableRefObject<boolean>;
  shapeRef: React.MutableRefObject<fabric.Object | null>;
};

export type CanvasMouseMove = {
  options: fabric.IEvent;
  canvas: fabric.Canvas;
  isDrawing: React.MutableRefObject<boolean>;
  selectedShapeRef: any;
  shapeRef: any;
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type CanvasMouseUp = {
  canvas: fabric.Canvas;
  isDrawing: React.MutableRefObject<boolean>;
  shapeRef: any;
  activeObjectRef: React.MutableRefObject<fabric.Object | null>;
  selectedShapeRef: any;
  syncShapeInStorage: (shape: fabric.Object) => void;
  setActiveTool: any;
};

export type CanvasObjectModified = {
  options: fabric.IEvent;
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type CanvasPathCreated = {
  options: (fabric.IEvent & { path: CustomFabricObject<fabric.Path> }) | any;
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type CanvasSelectionCreated = {
  options: fabric.IEvent;
  isEditingRef: React.MutableRefObject<boolean>;
  setElementAttributes: React.Dispatch<React.SetStateAction<Attributes>>;
};

export type CanvasObjectScaling = {
  options: fabric.IEvent;
  setElementAttributes: React.Dispatch<React.SetStateAction<Attributes>>;
};

export type RenderCanvas = {
  fabricRef: React.MutableRefObject<fabric.Canvas | null>;
  canvasObjects: any;
  activeObjectRef: any;
};

export type CursorChatProps = {
  cursor?: { x: number; y: number };
  cursorState: CursorState;
  setCursorState: (cursorState: CursorState) => void;
  updateMyPresence?: (
    presence: Partial<{
      cursor: { x: number; y: number };
      cursorColor: string;
      message: string;
    }>,
  ) => void;
};

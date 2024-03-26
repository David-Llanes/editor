import { fabric } from "fabric";
import { v4 as uuidv4 } from "uuid";

import {
  ActiveTool,
  CustomFabricObject,
  ElementDirection,
  ImageUpload,
  ModifyShape,
} from "@/types/type";
import { Modes, ShapeToDraw, ShapeToDrawType } from "@/hooks/useEditorState";

const width = 50;
const height = 50;
const radius = 25;

export const createRectangle = (pointer: PointerEvent) => {
  const rect = new fabric.Rect({
    left: pointer.x,
    top: pointer.y,
    width: width,
    height: width,
    fill: "#aabbcc",
    objectId: uuidv4(),
  } as CustomFabricObject<fabric.Rect>);

  return rect;
};

export const createTriangle = (pointer: PointerEvent) => {
  return new fabric.Triangle({
    left: pointer.x,
    top: pointer.y,
    width: width,
    height: width,
    fill: "#aabbcc",
    objectId: uuidv4(),
  } as CustomFabricObject<fabric.Triangle>);
};

export const createCircle = (pointer: PointerEvent) => {
  return new fabric.Circle({
    left: pointer.x,
    top: pointer.y,
    radius: radius,
    fill: "#aabbcc",
    objectId: uuidv4(),
  } as any);
};

export const createLine = (pointer: PointerEvent) => {
  return new fabric.Line([pointer.x, pointer.y, pointer.x + 100, pointer.y], {
    stroke: "#aabbcc",
    strokeWidth: 2,
    objectId: uuidv4(),
  } as CustomFabricObject<fabric.Line>);
};

export const createText = (pointer: PointerEvent, text: string) => {
  return new fabric.IText(text, {
    left: pointer.x,
    top: pointer.y,
    fill: "#aabbcc",
    fontFamily: "Helvetica",
    fontSize: 36,
    fontWeight: "400",
    objectId: uuidv4(),
  } as fabric.ITextOptions);
};

export const createSpecificShape = (
  shapeType: ShapeToDraw,
  pointer: PointerEvent,
) => {
  switch (shapeType) {
    case "rect":
      return createRectangle(pointer);

    case "triangle":
      return createTriangle(pointer);

    case "circle":
      return createCircle(pointer);

    case "line":
      return createLine(pointer);

    case "text":
      return createText(pointer, "Tap to Type");

    default:
      return null;
  }
};

export const handleImageUpload = ({
  file,
  fabricCanvas,
  modeRef,
  activeObjectRef,
  syncShapeInStorage,
  setActiveTool,
}: ImageUpload) => {
  const reader = new FileReader();

  reader.onload = () => {
    fabric.Image.fromURL(reader.result as string, (img) => {
      console.log(img);
      img.scaleToWidth(200);
      img.scaleToHeight(200);
      img.originX = "center";
      img.originY = "center";
      fabricCanvas.current?.centerObject(img);

      // @ts-ignore
      img.objectId = uuidv4();

      activeObjectRef.current = img;
      fabricCanvas.current?.add(img);
      fabricCanvas.current?.setActiveObject(img);
      fabricCanvas.current?.requestRenderAll();
      modeRef.current = Modes.isSelecting; // Talvez debe ser edit?
      setActiveTool(ActiveTool.Select);
      syncShapeInStorage(img);
    });
  };

  try {
    reader.readAsDataURL(file);
  } catch (error) {
    console.error(`No se pudo cargar la imagen. Error: ${error}`);
  }
};

export const createShape = (
  canvas: fabric.Canvas,
  pointer: PointerEvent,
  shapeType: ShapeToDraw,
) => {
  // if (shapeType === "freeform") {
  //   canvas.isDrawingMode = true;
  //   return null;
  // }

  return createSpecificShape(shapeType, pointer);
};

export const modifyShape = ({
  canvas,
  property,
  value,
  activeObjectRef,
  syncShapeInStorage,
}: ModifyShape) => {
  const selectedElement = canvas.getActiveObject();

  if (!selectedElement || selectedElement?.type === "activeSelection") return;

  // if  property is width or height, set the scale of the selected element
  if (property === "width") {
    selectedElement.set("scaleX", 1);
    selectedElement.set("width", value);
  } else if (property === "height") {
    selectedElement.set("scaleY", 1);
    selectedElement.set("height", value);
  } else {
    if (selectedElement[property as keyof object] === value) return;
    selectedElement.set(property as keyof object, value);
  }

  // set selectedElement to activeObjectRef
  activeObjectRef.current = selectedElement;

  syncShapeInStorage(selectedElement);
};

export const bringElement = ({
  canvas,
  direction,
  syncShapeInStorage,
}: ElementDirection) => {
  if (!canvas) return;

  // get the selected element. If there is no selected element or there are more than one selected element, return
  const selectedElement = canvas.getActiveObject();

  if (!selectedElement || selectedElement?.type === "activeSelection") return;

  // bring the selected element to the front
  if (direction === "front") {
    canvas.bringToFront(selectedElement);
  } else if (direction === "back") {
    canvas.sendToBack(selectedElement);
  }

  syncShapeInStorage(selectedElement);

  // re-render all objects on the canvas
  // canvas.renderAll();
};

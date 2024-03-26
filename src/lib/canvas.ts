import { fabric } from "fabric";
import { v4 as uuid4 } from "uuid";

import {
  ActiveTool,
  CanvasMouseDown,
  CanvasMouseDownBefore,
  CanvasMouseMove,
  CanvasMouseUp,
  CanvasObjectModified,
  CanvasObjectScaling,
  CanvasPathCreated,
  CanvasSelectionCreated,
  RenderCanvas,
} from "@/types/type";
import { createSpecificShape } from "./shapes";
import { Modes, ShapeToDraw } from "@/hooks/useEditorState";

const rotateIcon = document.createElement("img");
rotateIcon.src = "../../assets/editor/rotateControl.png";

function renderIcon(icon: HTMLImageElement) {
  return function renderIcon(
    ctx: CanvasRenderingContext2D,
    left: number,
    top: number,
    styleOverride: any,
    fabricObject: fabric.Object,
  ) {
    var size = 30;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle!));
    ctx.drawImage(icon, -size / 2, -size / 2, size, size);
    ctx.restore();
  };
}

// initialize fabric canvas
// export const initializeFabricWithTemplate = ({
//   fabricRef,
//   canvasRef,
//   templateRef,
//   syncShapeInStorage,
// }: {
//   fabricRef: React.MutableRefObject<fabric.Canvas | null>;
//   canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
//   templateRef: React.MutableRefObject<fabric.Object | null>;
//   syncShapeInStorage: (shape: fabric.Object) => void;
// }) => {
//   // get element container
//   const element = document.getElementById("canvas");

//   // create fabric canvas
//   const canvas = new fabric.Canvas(canvasRef.current, {
//     width: element?.clientWidth,
//     height: element?.clientHeight,
//   });

//   //Modify the canvas for customizing the canvas
//   canvas.selectionDashArray = [5, 5];
//   canvas.selectionBorderColor = "#0094FF"; // Azul
//   canvas.selectionColor = "#0094FF10"; // Azul con opacidad baja

//   //Modificar los los controles
//   console.log(fabric.Object.prototype.controls);

//   fabric.Object.prototype.transparentCorners = false;
//   fabric.Object.prototype.cornerColor = "#FFFFFF";
//   fabric.Object.prototype.cornerStyle = "circle";
//   fabric.Object.prototype.cornerStrokeColor = "#BBBBBB"; // Gris bajito
//   fabric.Object.prototype.cornerSize = 12;
//   fabric.Object.prototype.borderColor = "#0094FF"; // Azul
//   fabric.Object.prototype.borderScaleFactor = 2;
//   fabric.Object.prototype.hoverCursor = "default";

//   const controls = fabric.Object.prototype.controls;
//   controls.mtr = new fabric.Control({
//     ...controls.mtr,
//     cursorStyle: "move",
//   });
//   fabric.Object.prototype.controls = controls;

//   fabric.Image.fromURL("../../../assets/mocks/casePNG.png", function (img) {
//     img.scale(0.5).set({
//       absolutePositioned: true,
//       originX: "center",
//       originY: "center",
//     });
//     // canvas.add(img);
//     // console.log(img);
//     templateRef.current = img;
//     img.objectId = uuid4();
//     syncShapeInStorage(img);
//   });

//   // set canvas reference to fabricRef so we can use it later anywhere outside canvas listener
//   fabricRef.current = canvas;

//   return canvas;
// };

// initialize fabric canvas
export const initializeFabric = ({
  fabricRef,
  canvasRef,
}: {
  fabricRef: React.MutableRefObject<fabric.Canvas | null>;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}) => {
  // get element container
  const element = document.getElementById("canvas");

  // const rect = new fabric.Rect({
  //   width: 500,
  //   height: 500,
  //   absolutePositioned: true,
  // });

  // create fabric canvas
  const canvas = new fabric.Canvas(canvasRef.current, {
    width: element?.clientWidth,
    height: element?.clientHeight,
    selectionDashArray: [5, 5],
    selectionBorderColor: "#0094FF",
    selectionColor: "#0094FF10",
    // clipPath: rect,
    controlsAboveOverlay: true,
    fireRightClick: true,
    stopContextMenu: true,
    imageSmoothingEnabled: true,
  });

  // canvas.add(rect);
  // canvas.centerObject(rect);

  //Modificar los los controles
  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerColor = "#FFFFFF";
  fabric.Object.prototype.cornerStyle = "circle";
  fabric.Object.prototype.cornerStrokeColor = "#BBBBBB"; // Gris bajito
  fabric.Object.prototype.cornerSize = 12;
  fabric.Object.prototype.borderColor = "#0094FF"; // Azul
  fabric.Object.prototype.borderScaleFactor = 2;
  fabric.Object.prototype.hoverCursor = "default";
  fabric.Object.prototype.padding = 0;

  const controls = fabric.Object.prototype.controls;
  controls.mtr = new fabric.Control({
    ...controls.mtr,
    cursorStyle: "move",
    withConnection: false,
    sizeX: 25,
    sizeY: 25,
    y: 0.5,
    offsetY: 50,
    render: renderIcon(rotateIcon),
  });
  fabric.Object.prototype.controls = controls;

  // set canvas reference to fabricRef so we can use it later anywhere outside canvas listener
  fabricRef.current = canvas;

  return canvas;
};

// Aqui se van a cambiar las propiedades de los objetos antes de dibujarlos
export const handleCanvasMouseDownBefore = ({
  fabricCanvas,
  modeRef,
}: CanvasMouseDownBefore) => {
  if (modeRef.current === Modes.isFreeForm) {
    fabricCanvas.freeDrawingBrush.width = 5;
    return;
  }

  if (modeRef.current === Modes.isDrawing) {
    fabricCanvas.selection = false;
    return;
  }

  if (modeRef.current === Modes.isMoving) {
    return;
  }
  fabricCanvas.selection = true;
};

// instantiate creation of custom fabric object/shape and add it to canvas
export const handleCanvasMouseDown = ({
  options,
  fabricCanvas,
  shapeToDrawRef,
  activeObjectRef,
  modeRef,
  newShapeRef,
}: CanvasMouseDown) => {
  if (modeRef.current === Modes.isFreeForm) return;

  // findtarget() returns the object that is clicked
  // findTarget: http://fabricjs.com/docs/fabric.Canvas.html#findTarget
  const target = fabricCanvas.findTarget(options.e, false);

  // get pointer coordinates
  const pointer = fabricCanvas.getPointer(options.e);

  if (modeRef.current === Modes.isMoving) {
    // TODO: Implementar el movimiento DEL CANVAS
  }

  if (modeRef.current === Modes.isSelecting) {
    if (target) {
      activeObjectRef.current = target;
      activeObjectRef.current.set({
        fill: "#0094FF",
        strokeWidth: 0,
      });
      fabricCanvas.setActiveObject(target);
      console.log("Objeto activo", activeObjectRef.current);
      // target.setCoords();
      fabricCanvas.requestRenderAll();
    }
    return;
  }
};

// handle mouse move event on canvas to draw shapes with different dimensions
export const handleCanvasMouseMove = ({
  options,
  fabricCanvas,
  modeRef,
  shapeToDrawRef,
  newShapeRef,
  syncShapeInStorage,
}: CanvasMouseMove) => {
  // if selected shape is freeform, return
  if (modeRef.current === Modes.isFreeForm) {
    fabricCanvas.freeDrawingBrush.width = 5;
    return;
  }

  const pointer = fabricCanvas.getPointer(options.e);

  if (modeRef.current === Modes.isMoving) {
    // TODO Implementar el movimiento del canvas
  }

  // if (modeRef.current === Modes.isDrawing) {
  //   // get w, h and r
  //   const width = pointer.x - (newShapeRef.current?.left || 0);
  //   const height = pointer.y - (newShapeRef.current?.top || 0);
  //   const radius = Math.abs(pointer.x - (newShapeRef.current?.left || 0)) / 2;

  //   switch (shapeToDrawRef?.current) {
  //     case "rect":
  //       newShapeRef.current?.set({
  //         width: width,
  //         height: height,
  //       } as fabric.Rect);
  //       break;
  //     case "circle":
  //       newShapeRef.current?.set({
  //         radius: radius,
  //       } as fabric.Circle);
  //       break;
  //     case "triangle":
  //       newShapeRef.current?.set({
  //         width: width,
  //         height: height,
  //       } as fabric.Triangle);
  //       break;
  //     case "line":
  //       newShapeRef.current?.set({
  //         x2: pointer.x,
  //         y2: pointer.y,
  //       } as fabric.Line);
  //       break;
  //     default:
  //       break;
  //   }

  //   // render objects on canvas
  //   // renderAll: http://fabricjs.com/docs/fabric.Canvas.html#renderAll
  //   fabricCanvas.renderAll();
  // }

  // sync shape in storage
  // if (newShapeRef.current?.objectId) {
  //   syncShapeInStorage(shapeRef.current);
  // }
};

// handle mouse up event on canvas to stop drawing shapes
export const handleCanvasMouseUp = ({
  options,
  fabricCanvas,
  modeRef,
  newShapeRef,
  shapeToDrawRef,
  activeObjectRef,
  syncShapeInStorage,
  setActiveTool,
}: CanvasMouseUp) => {
  if (modeRef.current === Modes.isFreeForm) return;

  const pointer = fabricCanvas.getPointer(options.e);

  if (modeRef.current === Modes.isDrawing && shapeToDrawRef.current) {
    newShapeRef.current = createSpecificShape(
      shapeToDrawRef.current,
      pointer as any, // TODO arreglar estos tipos
    );

    // if shapeRef is not null, add it to canvas
    if (newShapeRef.current) {
      console.log("La forma creada es la siguiente: ", newShapeRef.current);
      fabricCanvas.add(newShapeRef.current);
      activeObjectRef.current = newShapeRef.current;
      activeObjectRef.current?.set({ fill: "blue", strokeWidth: 0 });
      fabricCanvas.setActiveObject(newShapeRef.current);

      // sync shape in storage as drawing is stopped
      syncShapeInStorage(newShapeRef.current);
    }

    modeRef.current = Modes.isSelecting;
    setActiveTool(ActiveTool.Select);
  }

  newShapeRef.current = null;
  shapeToDrawRef.current = null;
  fabricCanvas.requestRenderAll();
};

// update shape in storage when object is modified
export const handleCanvasObjectModified = ({
  options,
  syncShapeInStorage,
}: CanvasObjectModified) => {
  const target = options.target;
  if (!target) return;

  if (target?.type == "activeSelection") {
    // fix this
  } else {
    syncShapeInStorage(target);
  }
};

// update shape in storage when path is created when in freeform mode
export const handlePathCreated = ({
  options,
  syncShapeInStorage,
}: CanvasPathCreated) => {
  // get path object
  const path = options.path;
  if (!path) return;

  // set unique id to path object
  path.set({
    objectId: uuid4(),
  });

  //TODO: Talvez se deba hacer que se seleccione y se marque como activeObject??

  // sync shape in storage
  syncShapeInStorage(path);
};

// check how object is moving on canvas and restrict it to canvas boundaries
export const handleCanvasObjectMoving = ({
  options,
}: {
  options: fabric.IEvent;
}) => {
  // get target object which is moving
  const target = options.target as fabric.Object;

  // target.canvas is the canvas on which the object is moving
  const canvas = target.canvas as fabric.Canvas;

  // set coordinates of target object
  target.setCoords();

  // restrict object to canvas boundaries (horizontal)
  if (target && target.left) {
    target.left = Math.max(
      0,
      Math.min(
        target.left,
        (canvas.width || 0) - (target.getScaledWidth() || target.width || 0),
      ),
    );
  }

  // restrict object to canvas boundaries (vertical)
  if (target && target.top) {
    target.top = Math.max(
      0,
      Math.min(
        target.top,
        (canvas.height || 0) - (target.getScaledHeight() || target.height || 0),
      ),
    );
  }
};

// set element attributes when element is selected
export const handleCanvasSelectionCreated = ({
  options,
  isEditingRef,
  setElementAttributes,
}: CanvasSelectionCreated) => {
  // if user is editing manually, return
  if (isEditingRef.current) return;

  // if no element is selected, return
  if (!options?.selected) return;

  // get the selected element
  const selectedElement = options?.selected[0] as fabric.Object;

  // if only one element is selected, set element attributes
  if (selectedElement && options.selected.length === 1) {
    // calculate scaled dimensions of the object
    const scaledWidth = selectedElement?.scaleX
      ? selectedElement?.width! * selectedElement?.scaleX
      : selectedElement?.width;

    const scaledHeight = selectedElement?.scaleY
      ? selectedElement?.height! * selectedElement?.scaleY
      : selectedElement?.height;

    setElementAttributes({
      width: scaledWidth?.toFixed(0).toString() || "",
      height: scaledHeight?.toFixed(0).toString() || "",
      fill: selectedElement?.fill?.toString() || "",
      stroke: selectedElement?.stroke || "",
      // @ts-ignore
      fontSize: selectedElement?.fontSize || "",
      // @ts-ignore
      fontFamily: selectedElement?.fontFamily || "",
      // @ts-ignore
      fontWeight: selectedElement?.fontWeight || "",
    });
  }
};

// update element attributes when element is scaled
export const handleCanvasObjectScaling = ({
  options,
  setElementAttributes,
}: CanvasObjectScaling) => {
  const selectedElement = options.target;

  // calculate scaled dimensions of the object
  const scaledWidth = selectedElement?.scaleX
    ? selectedElement?.width! * selectedElement?.scaleX
    : selectedElement?.width;

  const scaledHeight = selectedElement?.scaleY
    ? selectedElement?.height! * selectedElement?.scaleY
    : selectedElement?.height;

  setElementAttributes((prev) => ({
    ...prev,
    width: scaledWidth?.toFixed(0).toString() || "",
    height: scaledHeight?.toFixed(0).toString() || "",
  }));
};

// render canvas objects coming from storage on canvas
export const renderCanvas = ({
  fabricRef,
  canvasObjects,
  activeObjectRef,
}: RenderCanvas) => {
  // clear canvas
  fabricRef.current?.clear();

  // render all objects on canvas
  Array.from(canvasObjects, ([objectId, objectData]) => {
    /**
     * enlivenObjects() is used to render objects on canvas.
     * It takes two arguments:
     * 1. objectData: object data to render on canvas
     * 2. callback: callback function to execute after rendering objects
     * on canvas
     *
     * enlivenObjects: http://fabricjs.com/docs/fabric.util.html#.enlivenObjectEnlivables
     */
    fabric.util.enlivenObjects(
      [objectData],
      (enlivenedObjects: fabric.Object[]) => {
        enlivenedObjects.forEach((enlivenedObj) => {
          // if element is active, keep it in active state so that it can be edited further
          if (activeObjectRef.current?.objectId === objectId) {
            console.log("Objeto activo enliven", enlivenedObj);
            fabricRef.current?.setActiveObject(enlivenedObj);
          }

          // add object to canvas
          fabricRef.current?.add(enlivenedObj);
        });
      },
      /**
       * specify namespace of the object for fabric to render it on canvas
       * A namespace is a string that is used to identify the type of
       * object.
       *
       * Fabric Namespace: http://fabricjs.com/docs/fabric.html
       */
      "fabric",
    );
  });

  fabricRef.current?.renderAll();
};

// resize canvas dimensions on window resize
export const handleResize = ({ canvas }: { canvas: fabric.Canvas | null }) => {
  const canvasElement = document.getElementById("canvas");
  if (!canvasElement) return;

  if (!canvas) return;
  console.log(
    `width: ${canvasElement.clientWidth}, height: ${canvasElement.clientHeight}`,
  );

  if (canvas) {
    canvas.setDimensions({
      width: canvasElement.clientWidth,
      height: canvasElement.clientHeight,
    });
  }
};

// zoom canvas on mouse scroll
export const handleCanvasZoom = ({
  options,
  canvas,
}: {
  options: fabric.IEvent & { e: WheelEvent };
  canvas: fabric.Canvas;
}) => {
  const delta = options.e?.deltaY;
  let zoom = canvas.getZoom();

  // allow zooming to min 20% and max 100%
  const minZoom = 0.2;
  const maxZoom = 1;
  const zoomStep = 0.001;

  // calculate zoom based on mouse scroll wheel with min and max zoom
  zoom = Math.min(Math.max(minZoom, zoom + delta * zoomStep), maxZoom);

  // set zoom to canvas
  // zoomToPoint: http://fabricjs.com/docs/fabric.Canvas.html#zoomToPoint
  canvas.zoomToPoint({ x: options.e.offsetX, y: options.e.offsetY }, zoom);

  options.e.preventDefault();
  options.e.stopPropagation();
};

"use client";

import { useEffect, useRef, useState } from "react";
import {
  handleCanvasMouseDown,
  handleCanvasMouseUp,
  handleCanvasMouseMove,
  handleResize,
  initializeFabric,
  renderCanvas,
  handleCanvasObjectModified,
} from "@/lib/canvas";
import { ActiveElement, ActiveTool, CanvasActions } from "@/types/type";
import Navbar from "@/components/editor/Navbar";
import {
  useMutation,
  useRedo,
  useStorage,
  useUndo,
} from "@root/liveblocks.config";
import { defaultNavElement } from "@/constants";
import { handleDelete, handleKeyDown } from "@/lib/key-events";
import Herramientas2 from "./Toolbar";
import Overlay from "./Overlay";
import Toolbar from "./Toolbar";
import { useEditorState } from "@/hooks/useEditorState";

export default function LiveEditor() {
  const undo = useUndo();
  const redo = useRedo();
  const {
    activeTool,
    setActiveTool,
    fabricRef,
    canvasRef,
    shapeRef,
    selectedShapeRef,
    activeObjectRef,
    isDrawing,
    isEditingRef,
  } = useEditorState();

  const canvasObjects = useStorage((root) => root.canvasObjects);

  const syncShapeInStorage = useMutation(({ storage }, object) => {
    if (!object) return;

    const { objectId } = object;

    const shapeData = object.toJSON();
    shapeData.objectId = objectId;

    const canvasObjects = storage.get("canvasObjects");
    canvasObjects.set(objectId, shapeData);
  }, []);

  // const [activeElement, setActiveElement] = useState<ActiveElement>({
  //   name: "",
  //   value: "",
  //   icon: "",
  // });

  const deleteAllShapes = useMutation(({ storage }) => {
    const canvasObjects = storage.get("canvasObjects");

    if (!canvasObjects || canvasObjects.size === 0) return true;

    for (const [key, value] of canvasObjects.entries() as any) {
      canvasObjects.delete(key);
    }

    return canvasObjects.size === 0;
  }, []);

  const deleteShapeFromStorage = useMutation(({ storage }, objectId) => {
    const canvasObjects = storage.get("canvasObjects");
    canvasObjects.delete(objectId);
  }, []);

  const handleAction = (action: string) => {
    setActiveTool(action);

    switch (action) {
      case CanvasActions.Undo:
        undo();
        break;
      case CanvasActions.Redo:
        redo();
        break;
      case CanvasActions.Reset:
        deleteAllShapes();
        fabricRef.current?.clear();
        setActiveTool(ActiveTool.Select);
        break;
      case CanvasActions.Delete:
        handleDelete(
          fabricRef.current as fabric.Canvas,
          deleteShapeFromStorage,
        );
        break;
    }

    // selectedShapeRef.current = element?.value as string;
  };

  useEffect(() => {
    // initialize the fabric canvas
    const canvas = initializeFabric({
      canvasRef,
      fabricRef,
    });

    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        selectedShapeRef,
        isDrawing,
        shapeRef,
      });
    });

    canvas.on("mouse:up", (options) => {
      handleCanvasMouseUp({
        canvas,
        selectedShapeRef,
        isDrawing,
        shapeRef,
        syncShapeInStorage,
        activeObjectRef,
        setActiveTool,
      });
    });

    // Cambiar el nombre de la funcion
    canvas.on("mouse:move", (options) => {
      handleCanvasMouseMove({
        options,
        canvas,
        selectedShapeRef,
        isDrawing,
        shapeRef,
        syncShapeInStorage,
      });
    });

    canvas.on("object:modified", (options) => {
      handleCanvasObjectModified({
        options,
        syncShapeInStorage,
      });
    });

    window.addEventListener("resize", () => {
      console.log(fabricRef.current);
      handleResize({
        canvas: fabricRef.current,
      });
    });

    window.addEventListener("keydown", (e) => {
      handleKeyDown({
        e,
        canvas: fabricRef.current,
        undo,
        redo,
        syncShapeInStorage,
        deleteShapeFromStorage,
      });
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    renderCanvas({ fabricRef, canvasObjects, activeObjectRef });
  }, [canvasObjects]);

  return (
    <div className="relative flex h-full flex-col">
      {/* Barra de herramientas */}
      <div className="shrink-0">
        <Toolbar />
      </div>

      <div
        id="canvas"
        className="relative flex-1 select-none bg-muted-foreground"
      >
        <Overlay handleAction={handleAction} />
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

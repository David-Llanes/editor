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
  handlePathCreated,
} from "@/lib/canvas";
import {
  useMutation,
  useRedo,
  useStorage,
  useUndo,
} from "@root/liveblocks.config";

import { handleDelete, handleKeyDown } from "@/lib/key-events";

import Overlay from "./Overlay";
import Toolbar from "./Toolbar";
import { useEditorState } from "@/hooks/useEditorState";
import useDeleteObject from "@/hooks/useDeleteObject";
import OverlayOptions from "./OverlayOptions";

export default function LiveEditor() {
  const undo = useUndo();
  const redo = useRedo();
  const deleteObject = useDeleteObject();

  const {
    activeTool,
    setActiveTool,
    canvasRef,
    fabricRef,
    modeRef,
    newShapeRef,
    shapeToDrawRef,
    activeObjectRef,
  } = useEditorState();

  const imageInputRef = useRef<HTMLInputElement>(null);
  const canvasObjects = useStorage((root) => root.canvasObjects);

  const syncShapeInStorage = useMutation(({ storage }, object) => {
    if (!object) return;

    const { objectId } = object;

    const shapeData = object.toJSON();
    shapeData.objectId = objectId;

    const canvasObjects = storage.get("canvasObjects");
    canvasObjects.set(objectId, shapeData);
  }, []);

  const deleteShapeFromStorage = deleteObject;

  useEffect(() => {
    // initialize the fabric canvas
    const fabricCanvas = initializeFabric({
      canvasRef,
      fabricRef,
    });

    fabricCanvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        fabricCanvas,
        selectedShapeRef,
        activeObjectRef,
        isDrawing,
        shapeRef,
        isMoving,
      });
    });

    fabricCanvas.on("mouse:up", (options) => {
      handleCanvasMouseUp({
        fabricCanvas,
        selectedShapeRef,
        isDrawing,
        shapeRef,
        syncShapeInStorage,
        activeObjectRef,
        setActiveTool,
      });
    });

    // Cambiar el nombre de la funcion
    fabricCanvas.on("mouse:move", (options) => {
      handleCanvasMouseMove({
        options,
        fabricCanvas,
        selectedShapeRef,
        isDrawing,
        shapeRef,
        syncShapeInStorage,
      });
    });

    fabricCanvas.on("object:modified", (options) => {
      handleCanvasObjectModified({
        options,
        syncShapeInStorage,
      });
    });

    fabricCanvas.on("mouse:wheel", function (options) {
      var delta = options.e.deltaY;
      var zoom = fabricCanvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 10) zoom = 10;
      if (zoom < 0.25) zoom = 0.25;
      fabricCanvas.zoomToPoint(
        { x: options.e.offsetX, y: options.e.offsetY },
        zoom,
      );
      options.e.preventDefault();
      options.e.stopPropagation();
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

    canvas.on("path:created", (options) => {
      handlePathCreated({ options, syncShapeInStorage });
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
        <Toolbar
          imageInputRef={imageInputRef}
          syncShapeInStorage={syncShapeInStorage}
        />
      </div>

      <div
        id="canvas"
        className="relative flex-1 select-none bg-muted-foreground"
      >
        <Overlay />
        {/* <OverlayOptions /> */}
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

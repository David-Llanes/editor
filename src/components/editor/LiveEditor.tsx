"use client";
import debounce from "debounce";
import { v4 as uuid4 } from "uuid";
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
  handleCanvasMouseDownBefore,
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

import { useSyncInStorage } from "@/hooks/useSyncInStorage";

import Controls from "./Overlay";
import TopBar from "./TopBar";
import Properties from "./Properties";

export default function LiveEditor() {
  const canvasObjects = useStorage((root) => root.canvasObjects);
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

  const undo = useUndo();
  const redo = useRedo();
  const { syncShapeInStorage } = useSyncInStorage();
  const deleteObject = useDeleteObject();
  const deleteShapeFromStorage = deleteObject;

  const clipboard = useRef<fabric.Object | null>(null);

  useEffect(() => {
    console.log("Active tool:", activeTool);
  }, [activeTool]);

  useEffect(() => {
    const fabricCanvas = initializeFabric({
      canvasRef,
      fabricRef,
    });

    fabricCanvas.on("mouse:down:before", (options) => {
      handleCanvasMouseDownBefore({
        fabricCanvas,
        modeRef,
      });
    });

    fabricCanvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        fabricCanvas,
        shapeToDrawRef,
        activeObjectRef,
        modeRef,
        newShapeRef,
      });
    });

    fabricCanvas.on("mouse:up", (options) => {
      handleCanvasMouseUp({
        options,
        fabricCanvas,
        newShapeRef,
        shapeToDrawRef,
        modeRef,
        activeObjectRef,
        syncShapeInStorage,
        setActiveTool,
      });
    });

    // // Cambiar el nombre de la funcion
    fabricCanvas.on("mouse:move", (options) => {
      handleCanvasMouseMove({
        options,
        fabricCanvas,
        modeRef,
        shapeToDrawRef,
        newShapeRef,
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

    fabricCanvas.on("path:created", (options) => {
      handlePathCreated({ options, syncShapeInStorage });
    });

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  useEffect(() => {
    renderCanvas({ fabricRef, canvasObjects, activeObjectRef });
  }, [canvasObjects, fabricRef, activeObjectRef]);

  const handleClone = () => {
    function Copy() {
      if (fabricRef.current) {
        fabricRef.current.getActiveObject()?.clone(function (
          cloned: fabric.Object,
        ) {
          clipboard.current = cloned;
        });
      }
    }

    function Paste() {
      // clone again, so you can do multiple copies.
      clipboard.current?.clone(function (clonedObj: fabric.Object) {
        activeObjectRef.current = null;
        fabricRef.current?.discardActiveObject();
        clonedObj.set({
          left: clonedObj.left! + 10,
          top: clonedObj.top! + 10,
          //@ts-ignore
          objectId: uuid4(),
          evented: true,
        });

        // Agregarlo al canvas
        fabricRef.current?.add(clonedObj);
        fabricRef.current?.setActiveObject(clonedObj);
        activeObjectRef.current = clonedObj;
        fabricRef.current?.requestRenderAll();
        syncShapeInStorage(clonedObj);
      });
    }

    Copy();
    Paste();
  };

  return (
    <div className="relative flex h-full flex-col">
      <div
        id="canvas"
        className="relative flex-1 select-none bg-muted dark:bg-muted-foreground"
      >
        {/* Barra de arriba */}
        <TopBar />

        {/* Toolbar */}
        <div className="absolute inset-y-0 left-2 z-50 my-auto flex h-fit flex-col gap-4">
          <Toolbar syncShapeInStorage={syncShapeInStorage} />
          <Controls handleClone={handleClone} />
        </div>

        {/* Propiedades */}
        <Properties />

        {/* <OverlayOptions /> */}
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

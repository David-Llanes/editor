"use client";
// este use clie t lo puse por seguir el tutoria. Mi idea prjncipal es dejar toda la logica relacionada al canvas en el componente canvas

import Workspace from "@/components/Workspace";

import LeftNavbar from "@/components/editor/LeftNavbar";
import RightNavbar from "@/components/editor/RightNavbar";
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
import { ActiveElement } from "@/types/type";
import Navbar from "@/components/editor/Navbar";
import {
  useMutation,
  useRedo,
  useStorage,
  useUndo,
} from "@root/liveblocks.config";
import { defaultNavElement } from "@/constants";
import { handleDelete, handleKeyDown } from "@/lib/key-events";
import EditorHeader from "@/components/editor/EditorHeader";

export default function Page() {
  // const undo = useUndo();
  // const redo = useRedo();
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  // const fabricRef = useRef<fabric.Canvas | null>(null);
  // const isDrawing = useRef(false);
  // const shapeRef = useRef<fabric.Object | null>(null);
  // const selectedShapeRef = useRef<string | null>(null);
  // const activeObjectRef = useRef<fabric.Object | null>(null);
  // const isEditingRef = useRef(false);

  // const canvasObjects = useStorage((root) => root.canvasObjects);

  // const syncShapeInStorage = useMutation(({ storage }, object) => {
  //   if (!object) return;

  //   const { objectId } = object;

  //   const shapeData = object.toJSON();
  //   shapeData.objectId = objectId;

  //   const canvasObjects = storage.get("canvasObjects");
  //   canvasObjects.set(objectId, shapeData);
  // }, []);

  // const [activeElement, setActiveElement] = useState<ActiveElement>({
  //   name: "",
  //   value: "",
  //   icon: "",
  // });

  // const deleteAllShapes = useMutation(({ storage }) => {
  //   const canvasObjects = storage.get("canvasObjects");

  //   if (!canvasObjects || canvasObjects.size === 0) return true;

  //   for (const [key, value] of canvasObjects.entries()) {
  //     canvasObjects.delete(key);
  //   }

  //   return canvasObjects.size === 0;
  // }, []);

  // const deleteShapeFromStorage = useMutation(({ storage }, objectId) => {
  //   const canvasObjects = storage.get("canvasObjects");
  //   canvasObjects.delete(objectId);
  // }, []);

  // const handelActiveElement = (element: ActiveElement) => {
  //   setActiveElement(element);

  //   switch (element?.value) {
  //     case "reset":
  //       deleteAllShapes();
  //       fabricRef.current?.clear();
  //       setActiveElement(defaultNavElement);
  //       break;
  //     case "delete":
  //       handleDelete(
  //         fabricRef.current as fabric.Canvas,
  //         deleteShapeFromStorage,
  //       );
  //       break;
  //   }

  //   selectedShapeRef.current = element?.value as string;
  // };

  // useEffect(() => {
  //   // initialize the fabric canvas
  //   const canvas = initializeFabric({
  //     canvasRef,
  //     fabricRef,
  //   });

  //   canvas.on("mouse:down", (options) => {
  //     handleCanvasMouseDown({
  //       options,
  //       canvas,
  //       selectedShapeRef,
  //       isDrawing,
  //       shapeRef,
  //     });
  //   });

  //   canvas.on("mouse:up", (options) => {
  //     handleCanvasMouseUp({
  //       canvas,
  //       selectedShapeRef,
  //       isDrawing,
  //       shapeRef,
  //       syncShapeInStorage,
  //       activeObjectRef,
  //       setActiveElement,
  //     });
  //   });

  //   // Cambiar el nombre de la funcion
  //   canvas.on("mouse:move", (options) => {
  //     handleCanvasMouseMove({
  //       options,
  //       canvas,
  //       selectedShapeRef,
  //       isDrawing,
  //       shapeRef,
  //       syncShapeInStorage,
  //     });
  //   });

  //   canvas.on("object:modified", (options) => {
  //     handleCanvasObjectModified({
  //       options,
  //       syncShapeInStorage,
  //     });
  //   });

  //   window.addEventListener("resize", () => {
  //     handleResize({
  //       canvas: fabricRef.current,
  //     });
  //   });

  //   window.addEventListener("keydown", (e) => {
  //     handleKeyDown({
  //       e,
  //       canvas: fabricRef.current,
  //       undo,
  //       redo,
  //       syncShapeInStorage,
  //       deleteShapeFromStorage,
  //     });
  //   });

  //   return () => {
  //     canvas.dispose();
  //   };
  // }, [canvasRef]);

  // useEffect(() => {
  //   renderCanvas({ fabricRef, canvasObjects, activeObjectRef });
  // }, [canvasObjects]);

  return (
    <section className="h-full">
      <Workspace />
    </section>
  );
}
//<Workspace canvasRef={canvasRef} />
// Falta poner un loading en este nivel

/* 
<main className="flex h-svh flex-col">
  <Navbar
    activeElement={activeElement}
    handleActiveElement={handelActiveElement}
  />
  <section className="flex h-full flex-row">
    <LeftNavbar />
    <Workspace canvasRef={canvasRef} />
    <RightNavbar />
  </section>
</main>
*/

import { useMutation } from "@root/liveblocks.config";

export function useSyncInStorage() {
  const syncShapeInStorage = useMutation(({ storage }, object) => {
    if (Array.isArray(object)) {
      object.forEach((obj) => {
        if (!obj) return;

        const { objectId } = obj;

        const shapeData = obj.toJSON();
        shapeData.objectId = objectId;

        const canvasObjects = storage.get("canvasObjects");
        canvasObjects.set(objectId, shapeData);
      });
      return;
    } else {
      if (!object) return;

      const { objectId } = object;

      const shapeData = object.toJSON();
      shapeData.objectId = objectId;

      const canvasObjects = storage.get("canvasObjects");
      canvasObjects.set(objectId, shapeData);
    }
  }, []);
  return { syncShapeInStorage };
}

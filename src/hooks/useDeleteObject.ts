import { useMutation } from "@root/liveblocks.config";

export default function useDeleteObject() {
  return useMutation(({ storage }, objectId) => {
    const canvasObjects = storage.get("canvasObjects");
    canvasObjects.delete(objectId);
  }, []);
}

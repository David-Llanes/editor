import { useMutation, useStorage } from "@root/liveblocks.config";

export default function useDeleteAll() {
  return useMutation(({ storage }) => {
    const canvasObjects = storage.get("canvasObjects");

    if (!canvasObjects || canvasObjects.size === 0) return true;

    for (const [key, value] of canvasObjects.entries() as any) {
      canvasObjects.delete(key);
    }

    return canvasObjects.size === 0;
  }, []);
}

export function useCanDeleteAll() {
  const canDeleteAll = useStorage((root) => root.canvasObjects.size > 0);

  return canDeleteAll;
}

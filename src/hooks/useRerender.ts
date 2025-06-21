import { useCallback, useState } from "react";

export function useRerender() {
  const [, setDummyState] = useState<object>();

  const rerender = useCallback(() => setDummyState({}), []);

  return rerender;
}

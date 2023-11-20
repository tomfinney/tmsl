import { useEffect, useState } from "react";
import { TmslStore } from ".";

export function useTmsl<T>(store: TmslStore<T>) {
  const [state, _setState] = useState(store.value);

  useEffect(() => {
    const unsubscribe = store.addListener(_setState);

    return unsubscribe;
  }, []);

  const setState = (v: T) => {
    store.setValue(v);
  };

  return { state, setState };
}

/**
 * ideal state thingy would be like
 * 1. create store
 * const b = createStore(1 | "b" | ["b"] | { "b": "b" })
 * 2. consume store
 * const { state, setState } = useStore(b)
 * - hooked into updates to the store from anywhere
 * 3. can just read from store anywhere and trust its up to date
 */

export class TmslStore<T> {
  constructor(v: T) {
    this.value = v;
  }

  public value: T;
  private listeners: ((nextV: T) => void)[] = [];

  public setValue(v: T) {
    this.value = v;

    this.listeners.forEach((l) => {
      l(v);
    });
  }

  public addListener(cb: (v: T) => void) {
    const callback = (v: T) => {
      cb(v);
    };

    callback._key = Symbol();

    this.listeners.push(callback);

    const unsubscribe = () => {
      this.listeners = this.listeners.filter((c) => c._key !== callback._key);
    };

    return unsubscribe;
  }
}

export function createTmsl<T>(value: T): TmslStore<T> {
  const store = new TmslStore(value);

  return store;
}

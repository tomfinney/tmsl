import { createTmsl } from "./tsml";
import { useTmsl } from "./tsml/useTmsl";

const store = createTmsl(0);

function Button(props: Omit<React.ComponentProps<"button">, "className">) {
  return (
    <button
      className="py-1 px-2 rounded-md bg-slate-600 text-zinc-200 text-sm"
      {...props}
    />
  );
}

function App() {
  const counter = useTmsl(store);
  return (
    <main className="p-4">
      <h1 className="text-lg font-bold">tmsl!</h1>
      <div className="flex flex-col gap-4 items-start">
        <Button onClick={() => counter.setState(counter.state + 1)}>
          click ({counter.state})
        </Button>
        <p>decoupled count ({store.value})</p>
        <ChildReactSubscriber />
        <ChildRawSubscriber />
      </div>
    </main>
  );
}

function ChildReactSubscriber() {
  const counter = useTmsl(store);
  return (
    <>
      <Button onClick={() => counter.setState(counter.state + 1)}>
        click ({counter.state})
      </Button>
    </>
  );
}

function ChildRawSubscriber() {
  return (
    <>
      <Button onClick={() => store.setValue(store.value + 1)}>
        click ({store.value})
      </Button>
    </>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import * as Icons from "./components/icons";
import { Table } from "./components/table/table";

function App() {
  const [numOfPrevWeeks, setNumofPreWeeks] = useState<number>(0);
  return (
    <div className=" m-auto w-full">
      <div className="flex w-full justify-between items-center">
        <button
          type="button"
          title="Go to previous week"
          className="w-12 h-12 p-3 flex justify-center items-center hover:bg-slate-500 overflow-hidden"
          onClick={() => setNumofPreWeeks((prev) => prev - 1)}
        >
          <Icons.ArrowLeft />
        </button>
        <h1 className="text-3xl font-bold underline uppercase px-3 py-2">
          Awesome To-Do App
        </h1>
        <button
          title="Go to next week"
          type="button"
          className="w-12 h-12 p-3 flex justify-center items-center hover:bg-slate-500 overflow-hidden"
          onClick={() => setNumofPreWeeks((prev) => prev + 1)}
        >
          <Icons.ArrowRight />
        </button>
      </div>
      <Table numOfPrevWeeks={numOfPrevWeeks} />
    </div>
  );
}

export default App;

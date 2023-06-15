import { FC } from "react";
import ToDoItem from "../../types/toDoItem";
import * as Icons from "../icons";

type TodoItemProps = {
  markDone: (id: string) => void;
  deleteItem: (id: string) => void;
} & ToDoItem;

export const TodoItem: FC<TodoItemProps> = ({
  title,
  state,
  id,
  markDone,
  deleteItem,
}: TodoItemProps) => {
  return (
    <div
      key={id}
      className={`group relative flex w-full rounded-lg font-semibold h-10 items-center justify-start cursor-pointer ${
        state === "done"
          ? "bg-green-300 text-gray-700 px-10"
          : " bg-slate-700 text-white"
      }`}
    >
      {state === "todo" && (
        <button
          type="button"
          title="Mark as done"
          className="flex h-10 w-10 p-3 justify-center items-center hover:bg-slate-500 overflow-hidden"
          onClick={() => markDone(id)}
        >
          <Icons.Done />
        </button>
      )}
      <p
        className="w-40 text-ellipsis text-xs overflow-hidden whitespace-nowrap text-left"
        title={title}
      >
        {title}
      </p>
      <button
        type="button"
        title="Delete this item"
        className="hidden absolute h-10 w-10 p-1 top-0 right-0 justify-center items-center hover:bg-red-300 group-hover:flex overflow-hidden"
        onClick={() => deleteItem(id)}
      >
        <Icons.Trash />
      </button>
    </div>
  );
};

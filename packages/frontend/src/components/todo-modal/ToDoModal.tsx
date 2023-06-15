import moment from "moment";
import { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";

type TodoModalProps = {
  hidden: boolean;
  initDate?: string;
  onSave: ({ title, id }: { title: string; id: string }) => void;
  onClose: () => void;
};

export const Modal: React.FC<TodoModalProps> = ({
  hidden = true,
  initDate = moment().format("YYYY-MM-DD"),
  onClose,
  onSave,
}: TodoModalProps) => {
  const [todo, setTodo] = useState<{ title: string; id: string }>({
    title: "",
    id: initDate,
  });

  useEffect(() => {
    setTodo({
      title: "",
      id: initDate,
    });
  }, [initDate, hidden]);

  return (
    <div
      className={`z-10 fixed top-0 w-full left-0 ${hidden ? "hidden" : ""}`}
      id="modal"
    >
      <div className="flex z-10 items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-900 opacity-75" />
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>
        <div
          className="inline-block align-center bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <label htmlFor="fname">Title</label>
            <input
              id="fname"
              autoFocus={!hidden}
              placeholder="What do you want to do?"
              type="text"
              className="my-3 transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-gray-300 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-blue-500 focus:ring-blue-500/20"
              onChange={(e) => {
                setTodo({ ...todo, title: e.target.value });
              }}
              value={todo.title}
            />
            <Datepicker
              value={{ startDate: todo.id, endDate: todo.id }}
              onChange={(value) => {
                if (value?.startDate) {
                  setTodo({
                    ...todo,
                    id: value.startDate.toString(),
                  });
                }
              }}
              asSingle={true}
              useRange={false}
              popoverDirection="down"
              displayFormat={"DD/MM/YYYY"}
              minDate={moment().subtract(1, "days").toDate()}
            />
          </div>
          <div className="bg-gray-200 px-4 py-3 text-right">
            <button
              type="button"
              className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
              onClick={() => {
                onClose();
              }}
            >
              <i className="fas fa-times"></i> Cancel
            </button>
            <button
              type="button"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2 disabled:bg-slate-400 disabled:cursor-not-allowed"
              onClick={() => {
                if (todo.id && todo.title) {
                  onSave(todo);
                }
              }}
              disabled={!todo.title || !todo.id}
            >
              <i className="fas fa-plus"></i> Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

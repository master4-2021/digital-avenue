import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import ToDoItem from "../../types/toDoItem";
import { Modal } from "../todo-modal/ToDoModal";
import { TodoItem } from "../todo-item/ToDoItem";
import axios from "axios";

interface ITableHeaderItem {
  date: string;
  dateOfWeek: string;
  dateValue: string;
}

interface ToDoList {
  [key: string]: ToDoItem[];
}

export const Table = ({ numOfPrevWeeks = 0 }: { numOfPrevWeeks: number }) => {
  const [todos, setTodos] = useState<ToDoList>({});
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [initDate, setInitDate] = useState<string>();

  const today = useMemo(() => moment(), []);

  const tableHeaders = useMemo<ITableHeaderItem[]>(() => {
    const startOfWeek = moment().startOf("week").add(numOfPrevWeeks, "weeks");
    const days: ITableHeaderItem[] = [];
    for (let i = 0; i <= 6; i++) {
      const d = moment(startOfWeek).add(i, "days");
      days.push({
        date: d.format("D"),
        dateOfWeek: d.format("ddd"),
        dateValue: d.format("YYYY-MM-DD"),
      });
    }
    return days;
  }, [numOfPrevWeeks]);

  const maxRows: number[] = useMemo(() => {
    let max = 4;
    Object.keys(todos).forEach((dateInWeek) => {
      max = todos[dateInWeek].length > max ? todos[dateInWeek].length : max;
    });

    return [...Array(max).keys()];
  }, [todos]);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  const updateTodo = async (updatedTodos: ToDoList) => {
    await axios
      .post(
        `http://localhost:3000/api/v1/todo/${moment()
          .add(numOfPrevWeeks, "weeks")
          .week()}-${moment().add(numOfPrevWeeks, "weeks").year()}`,
        updatedTodos
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/api/v1/todo/${moment()
          .add(numOfPrevWeeks, "weeks")
          .week()}-${moment().add(numOfPrevWeeks, "weeks").year()}`
      )
      .then(({ data }) => {
        const { results } = data;
        if (results) {
          setTodos({ ...results });
        }
      })
      .catch((err) => {
        console.error(err);
        setTodos({});
      });
  }, [numOfPrevWeeks]);

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onSaveModal = ({ title, id }: { title: string; id: string }) => {
    setOpenModal(false);
    console.log({ title, id });
    const newItem: ToDoItem = {
      title,
      id: moment(id).add(moment().get("seconds"), "seconds").toISOString(true),
      state: "todo",
    };
    setTodos((prev) => ({
      ...prev,
      [id]: prev[id] ? [...prev[id], newItem] : [newItem],
    }));

    updateTodo({
      ...todos,
      [id]: todos[id] ? [...todos[id], newItem] : [newItem],
    });
  };

  const markItemDone = (id: string) => {
    const [date] = id.split("T");
    if (todos[date]) {
      setTodos((prev) => ({
        ...prev,
        [date]: [
          ...prev[date].map((item) => {
            if (item.id === id) {
              item.state = "done";
            }
            return item;
          }),
        ],
      }));

      updateTodo({
        ...todos,
        [date]: [
          ...todos[date].map((item) => {
            if (item.id === id) {
              item.state = "done";
            }
            return item;
          }),
        ],
      });
    }
  };

  const deleteItem = (id: string) => {
    console.log("delelteID ", id);
    const [date] = id.split("T");
    if (todos[date]) {
      setTodos((prev) => ({
        ...prev,
        [date]: [...prev[date].filter((item) => item.id !== id)],
      }));

      updateTodo({
        ...todos,
        [date]: [...todos[date].filter((item) => item.id !== id)],
      });
    }
  };

  return (
    <div>
      <Modal
        hidden={!openModal}
        onClose={onCloseModal}
        onSave={onSaveModal}
        initDate={initDate}
      />
      <table className="table-auto w-full text-center text-sm text-gray-500 dark:text-gray-400">
        <thead className="flex w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="flex w-full justify-around h-20">
            {tableHeaders.map(({ date, dateOfWeek, dateValue }) => (
              <th scope="col" key={dateValue} className="flex w-60">
                <div className="w-full flex flex-col justify-center items-center">
                  <span className="py-1">{dateOfWeek}</span>
                  <span
                    className={`h-10 w-10 flex justify-center items-center text-white text-lg ${
                      today.isSame(dateValue, "date")
                        ? "bg-blue-400 rounded-full"
                        : ""
                    }`}
                  >
                    {date}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="w-full max-h-64 flex flex-col items-center justify-between overflow-y-auto">
          {maxRows.map((rowNumber) => (
            <tr
              key={rowNumber}
              className="flex w-full justify-between min-h-[64px] border-b border-sky-400 py-[8px]"
            >
              {tableHeaders.map(({ dateValue }) => (
                <td
                  key={`${rowNumber}-${dateValue}`}
                  scope="row"
                  className="flex items-center justify-center w-60"
                >
                  {todos[dateValue] && todos[dateValue][rowNumber] && (
                    <TodoItem
                      {...todos[dateValue][rowNumber]}
                      markDone={markItemDone}
                      deleteItem={deleteItem}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className="flex w-full h-16 bg-gray-50 dark:bg-gray-700 dark:text-gray-400  p-2">
          <tr className="flex w-full justify-between items-center">
            {tableHeaders.map(({ dateValue }) => (
              <td key={`footer-${dateValue}`} scope="row" className="w-40">
                <button
                  type="button"
                  className="font-semibold text-white hover:bg-slate-800 disabled:text-gray-900 disabled:cursor-not-allowed"
                  disabled={!moment(dateValue).isSameOrAfter(today, "date")}
                  onClick={() => {
                    console.log(dateValue);
                    setInitDate(dateValue);
                    setOpenModal(true);
                  }}
                >
                  Add new
                </button>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

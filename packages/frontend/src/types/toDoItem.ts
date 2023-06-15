interface ToDoItem {
    id: string;
    title: string;
    state: 'done' | 'todo';
}

export default ToDoItem;
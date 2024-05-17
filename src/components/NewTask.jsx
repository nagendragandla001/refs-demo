import { useState } from "react";

export default function NewTask({ onAddTask }) {
  const [task, setTask] = useState();

  function handleTaskChange(event) {
    setTask(event.target.value);
  }

  function handleAddTask() {
    onAddTask(task);

    setTask("");
  }

  return (
    <div className="flex flex-row gap-4 items-center">
      <input
        type="text"
        value={task}
        onChange={handleTaskChange}
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
      />
      <button
        onClick={handleAddTask}
        className="text-stone-700 hover:text-stone-950"
      >
        Add Task
      </button>
    </div>
  );
}

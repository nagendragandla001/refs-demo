import NewTask from "./NewTask";

export default function Tasks({ onAddTask, onDeleteTask, tasks }) {
  let content;

  if (tasks && tasks.length > 0) {
    content = (
      <ul className="p-4 mt-8 rounded-md bg-stone-100 ">
        {tasks.map((task) => (
          <li key={task.id} className="flex flex-row justify-between my-4">
            <span>{task.text}</span>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="text-stone-700 hover:text-red-500"
            >
              Clear
            </button>
          </li>
        ))}
      </ul>
    );
  } else {
    content = (
      <p className="text-stone-800 my-4">This Project doesn't have nay tasks</p>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAddTask={onAddTask} />
      {content}
    </section>
  );
}

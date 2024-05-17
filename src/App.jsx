import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  function handleStartAddProject() {
    setProjectState((old) => ({
      ...old,
      selectedProjectId: null,
    }));
  }

  function handleAddProject(project) {
    setProjectState((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { ...project, id: Math.floor(Math.random() * 1000) },
      ],
      selectedProjectId: undefined,
    }));
  }

  function handleCancelAddProject() {
    setProjectState((prev) => ({
      ...prev,
      selectedProjectId: undefined,
    }));
  }

  function handleSelectProject(id) {
    setProjectState((prev) => ({
      ...prev,
      selectedProjectId: id,
    }));
  }

  function handleProjectDelete() {
    setProjectState((prev) => ({
      projects: prev.projects.filter(
        (project) => project.id !== prev.selectedProjectId
      ),
      selectedProjectId: undefined,
    }));
  }

  function handleAddTask(text) {
    setProjectState((prev) => {
      const taskId = Math.random();

      const newTask = {
        text,
        projectId: prev.selectedProjectId,
        id: taskId,
      };

      const projects = [...prev.projects];

      const currentProject = projects.find(
        (project) => project.id === prev.selectedProjectId
      );

      currentProject.tasks = currentProject.tasks
        ? [newTask, ...currentProject.tasks]
        : [newTask];

      return {
        ...prev,
        projects: projects,
      };
    });
  }

  function handleDeleteTask(taskId) {
    setProjectState((prev) => {
      const projects = [...prev.projects];

      const currentProject = projects.find(
        (project) => project.id === prev.selectedProjectId
      );

      currentProject.tasks = currentProject.tasks.filter(
        (task) => task.id !== taskId
      );

      return {
        ...prev,
        projects: projects,
      };
    });
  }

  console.log(projectState);

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleProjectDelete}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
    />
  );

  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;

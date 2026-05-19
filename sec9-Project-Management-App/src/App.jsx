import { useState } from 'react';

import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SelectedProject from './components/SelectedProject.jsx';

function App() {
  const [ projectsState, setProjectsState ] = useState({
        selectedProjectId: undefined,   // will store either the ID of the selected project, or null if we wanna add a new project or undefined if we're not adding a new project and did not select any project.
        projects: [], // will be an array of objects
        tasks: []
    });

  function handleAddTask(text) {
    setProjectsState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId
      }

      return {
        ...prevState,
        tasks: [newTask,...prevState.tasks]
      }
    })
  }

  function handleDeleteTask() {

  }

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    })
  }  

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    })
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id
      }
    })
  }

  function handleAddProject(projectData) {
    setProjectsState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId
      }

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
      }
    })
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = <SelectedProject tasks={projectsState.tasks} onAddTask={handleAddTask} onDelete={handleDeleteTask} project={selectedProject} onDelete={handleDeleteProject} />;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
    <ProjectsSidebar onSelectProject={handleSelectProject} onStartAddProject={handleStartAddProject} projects={projectsState.projects} selectedProjectId={projectsState.selectedProjectId} />
    {content}
    </main>
  );
}

export default App;

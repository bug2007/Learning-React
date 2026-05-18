import { useState } from 'react';

import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";

function App() {
  const [ projectsState, setProjectsState ] = useState({
        selectedProjectId: undefined,   // will store either the ID of the selected project, or null if we wanna add a new project or undefined if we're not adding a new project and did not select any project.
        projects: []
    });

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    })
  }  

  let content;
  if (projectsState.selectedProjectId === null) {
    content = <NewProject />
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
    <ProjectsSidebar onStartAddProject={handleStartAddProject} />
    {content}
    </main>
  );
}

export default App;

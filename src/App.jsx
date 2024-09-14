import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar  from "./components/ProjectsSidebar";

function App() {
  const [ projectState,setProjectState ] = useState({
    selectedProjectId: undefined,
    projects: []
  });  

  //CreateFunc  
  function handleStartAddProject(){
    setProjectState((prevState) => {
      return{
        ...prevState,
        selectedProjectId: null,
      };
    });
  };

  //cancelFunc
  function handleCancelAddProject(){
    setProjectState((prevState) => {
      return{
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }
  
  function handleAddProject(projectData){
    setProjectState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId
      };
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects,newProject]
      };
    })
  }

  console.log(projectState);

  let content;

  if(projectState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>;
  }else if(projectState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>;
  }

  return (
    <main className="h-screen my-8 flex gap-8 ">
      <ProjectsSidebar 
      onStartAddProject={handleStartAddProject} 
      projects={projectState.projects}/>
      {/* <NoProjectSelected  onStartAddProject={handleStartAddProject}/> */}
      {content}
    </main>
  );
}

export default App;

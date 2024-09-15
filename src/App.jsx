import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar  from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [ projectState,setProjectState ] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });  

  //taskAddFunc
  function handleAddTask(text){
    setProjectState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId, 
        id: taskId
      };
      return{
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      };
    });
  }

  function handleDeleteTask(id){
    setProjectState((prevState) => {
      return{
        ...prevState,
        tasks: prevState.tasks.filter(
          (task) => task.id !== id
        )
      };
    });
  }

  function handleSelectProject(id){
    setProjectState((prevState) => {
      return{
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  //projectAddFunc  
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

  //projectDeleteFunc
  function handleDeleteProject(){
    setProjectState((prevState) => {
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        )
      };
    });
  }

  // console.log(projectState);

  //projectをfindするためのメソッド 
  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);

  let content = (
  <SelectedProject 
  project={selectedProject} 
  onDelete={handleDeleteProject} 
  onAddTask={handleAddTask}
  onDeleteTask={handleDeleteTask}
  tasks={projectState.tasks}
  />);

  if(projectState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>;
  }else if(projectState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>;
  }

  return (
    <main className="h-screen my-8 flex gap-8 ">
      <ProjectsSidebar 
      onStartAddProject={handleStartAddProject} 
      projects={projectState.projects}
      onSelectProject={handleSelectProject}
      />
      {/* <NoProjectSelected  onStartAddProject={handleStartAddProject}/> */}
      {content}
    </main>
  );
}

export default App;

import React from "react";
import Titles from "./Titles";


export default function TitlesIni({ 
  state,
  handleDelete,
      }) {
   
  // Filtrar objetos duplicados
  const uniqueTasks = state.lista.reduce((unique, task) => {
    const existingTask = unique.find((item) => item.status === task.status);
    if (!existingTask) {
      unique.push(task);
    }
    return unique;
  }, []);


  return (
    <div className="">
      <Titles
       data={uniqueTasks} 
       state={state}
       handleDelete={handleDelete}
       />
    </div>
  );
}
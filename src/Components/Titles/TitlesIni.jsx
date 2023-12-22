import React from "react";
import Titles from "./Titles";
import TitlesDrppable from "./TitleDroppable";


export default function TitlesIni({ 
  state,
  handleDelete,
  uniqueLabels,
  handleUpdate
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
    <div className="w-full">
      <Titles
       data={uniqueTasks} 
       state={state}
       handleDelete={handleDelete}
       uniqueLabels={uniqueLabels}
       handleUpdate={handleUpdate}
       />
       {/* <TitlesDrppable
              data={uniqueTasks} 
              state={state}
              handleDelete={handleDelete}
              uniqueLabels={uniqueLabels}
              handleUpdate={handleUpdate}
              /> */}
    </div>
  );
}
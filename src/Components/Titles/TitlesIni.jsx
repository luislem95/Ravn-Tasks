import React from "react";
import Titles from "./Titles";


export default function TitlesIni({ 
  state,
      }) {
   
  // Filtrar objetos duplicados
  const uniqueTasks = state.lista.reduce((unique, task) => {
    // Comprobar si el estado de la tarea ya está en el array único
    const existingTask = unique.find((item) => item.status === task.status);

    // Si no se encuentra, agregar la tarea al array único
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
       />
    </div>
  );
}
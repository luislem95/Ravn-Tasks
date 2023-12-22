import React from "react";
import DraggableTask from "../Home/Tasks/DraggableTask";


export default function Titles({ data, state, handleDelete, uniqueLabels, handleUpdate }) {
  // Función para mover tareas
  const moveTask = (dragIndex, hoverIndex) => {
    // Lógica para mover las tareas (actualiza el estado, etc.)
    // ... (Asegúrate de tener la lógica adecuada para tu aplicación)
  };

  return (
    <div className="flex flex-row mx-6 my-4">
      {data.map((task, index) => (
        <div key={index} className="flex flex-col items-center w-full mb-4">
          <div>
            <h4 className="text-white">{task.status} </h4>
          </div>
          <div className="w-full">
            <DraggableTask
              task={task}
              index={index}
              moveTask={moveTask}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              uniqueLabels={uniqueLabels}
              state={state}
              status={task.status}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

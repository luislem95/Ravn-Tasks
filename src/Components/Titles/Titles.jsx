import React from "react";
import Tasks from "../Home/Tasks/Task";

export default function Titles({ data, state, handleDelete, uniqueLabels, handleUpdate }) {
  return (
    <div className="flex flex-row mx-6 my-4 ">
      {data.map((taskStatus, index) => {
        const tasksForStatus = state.lista.filter((task) => task.status === taskStatus.status);
        const taskCount = tasksForStatus.length.toString().length == 1 ? `0${tasksForStatus.length}` : tasksForStatus.length.toString();

        return (
          <div key={index} className="flex flex-col items-center w-full mb-4">
            <div>
              <h4 className="text-white font-bold">
                {taskStatus.status} ({taskCount})
              </h4>
            </div>
            <div className="w-full">
              <Tasks state={state} status={taskStatus.status} handleDelete={handleDelete} uniqueLabels={uniqueLabels} handleUpdate={handleUpdate} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

import React from "react";
import Tasks from "../Home/Tasks/Task";

export default function Titles({ data, state,handleDelete,uniqueLabels }) {

  return (
    <div className="flex flex-row mx-6 my-4 ">
      {data.map((task, index) => (
        <div key={index} className="flex flex-col items-center w-full mb-4 ">
          <div>
          <h4 className="text-white">{task.status} </h4>
          </div>
          <div className="w-full">
            <Tasks state={state} status={task.status} handleDelete={handleDelete}    uniqueLabels={uniqueLabels}/>
          </div>
        </div>
      ))}
    </div>
  );
}

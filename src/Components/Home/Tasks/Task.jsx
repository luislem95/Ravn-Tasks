import React from "react";
import DateDisplay from './DateDisplay';
import Convert from "./Convert";
import TagDisplay from './TagDisplay';
import ModalDots from "./ModalDots";



export default function Tasks({ state,status,handleDelete,uniqueLabels,handleUpdate}) {
  const getStatus = (status) => {
    return state.lista.filter(task => task.status === status)
}

  return (
    <div className="grid grid-rows gap-3 m-1">
         {getStatus(status).map((task, index) => (
            <div className="h-52 px-5 py-2 bg-neutral4 rounded-md text-white overflow-auto" key={task.id} style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
           <div className="flex justify-between items-center">
                 <div className="w-8/12 text-base mt-3 font-bold">    {task.name}  </div>
                 <div className="mt-3">
                  <ModalDots task={task} handleDelete={handleDelete} uniqueLabels={uniqueLabels}state={state} handleUpdate={handleUpdate}/>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg> */}
                  </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                  <div className="font-semibo">   <Convert task={task.pointEstimate} /> </div>
                 <div className="">   <DateDisplay dueDate={task.dueDate} /> </div>
                  </div>

                 <div className="mt-3">   <TagDisplay tags={task.tags} /> </div>
                 {/* <div className="overflow-hidden mt-4">  <img src={task.creator.avatar}  alt={`profile photo ${task.creator.fullName}`} /> </div> */}
                 <div className="overflow-hidden mt-4 rounded-full w-10 h-10">  <img src="https://www.educima.com/imagen-pensar-dl30340.jpg"  alt={`profile photo ${task.creator.fullName}`} /> </div>
              </div>
             
          ))}
    </div>

  );
}
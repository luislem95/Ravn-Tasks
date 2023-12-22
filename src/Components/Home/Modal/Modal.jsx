import React, { useState } from "react";
import DatePicker from 'react-datepicker';  
import 'react-datepicker/dist/react-datepicker.css';  
import { format } from 'date-fns';
import InsertUpdate from "../InsertUpdate.js/InsertUpdate";

export default function Modal({
  state,
  dataUser,
  setSelectedContent,
  selectedContent,
  openModal,
  isModalOpen,
  closeModal,
  uniqueLabels,
  handleSetTask
}) {

  const handleDashboardClick = () => {
    setSelectedContent("Dashboard");
  };

  const handleMyTasksClick = () => {
    setSelectedContent("MyTasks");
  };
const insert= true
  return (
    <div className=" flex justify-between items-center ml-6 mr-6 ">
    <div className="flex ">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className={`w-10 h-10 hover-gradientsvg ${
    selectedContent == "MyTasks" ? "selectedSvg" : ""
    }`}   onClick={handleMyTasksClick}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white"  className={`w-10 h-10 hover-gradientsvg ${
    selectedContent == "Dashboard" ? "selectedSvg" : ""
    }`}  onClick={handleDashboardClick}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
                </div>
    
                <div className="">
    <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="white"
    className="w-10 h-10 p-1 bg-primary4 rounded-md cursor-pointer"
    onClick={openModal}
    >
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
    </div>
    
    {/* Modal overlay */}
    <div
    className={`${
    isModalOpen ? "fixed" : "hidden"
    } top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center `}
    >
    {/* Modal content */}
    <div className="relative p-4 w-3/4 max-w-md max-h-full rounded-lg">
    {/* ... (tu contenido modal actual) */}
   
<InsertUpdate  state={state}
  dataUser={dataUser}
  closeModal={closeModal}
  uniqueLabels={uniqueLabels}
  handleSetTask={handleSetTask}
  insert={insert}
  />

</div>
</div>
</div>
  );
}

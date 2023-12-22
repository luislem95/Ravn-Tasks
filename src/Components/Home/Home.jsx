import React, { useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import Tasks from "./Tasks/Task";
import Aside from "./Aside/Aside";
import TitlesIni from "../Titles/TitlesIni";
import MyTasksIni from "./MyTasks/MyTasksIni";
import Modal from "./Modal/Modal";


export default function Home({ state , selectedUser, uniqueLabels,handleSetTask, handleDelete,handleUpdate,handleSearch}) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDashboardClick = () => {
    setSelectedContent("Dashboard");
  };

  const handleMyTasksClick = () => {
    setSelectedContent("MyTasks");
  };
  const [selectedContent, setSelectedContent] = useState("Dashboard");

  return (
    <div className="w-full h-full flex direction-row justify-center" >
            <div className=" w-56">
              <Aside state={state} dataUser={selectedUser} setSelectedContent={setSelectedContent} selectedContent={selectedContent}/>
            </div>


        <div className="w-full ">
          <div className="h-min ">
            <SearchBar dataUser={selectedUser} handleSearch={handleSearch}/>
          </div>
        <Modal openModal={openModal} isModalOpen={isModalOpen} closeModal={closeModal} state={state} setSelectedContent={setSelectedContent} selectedContent={selectedContent} uniqueLabels={uniqueLabels} handleSetTask={handleSetTask}/>
     {/* Contenido dinámico según selectedContent */}
     {selectedContent === "Dashboard" ? (
          <div className="min-w-min">
            <TitlesIni state={state} handleDelete={handleDelete} uniqueLabels={uniqueLabels} handleUpdate={handleUpdate}/>
          </div>
        ) : (
          <div className="">
            <MyTasksIni selectedUser={selectedUser} />
          </div>
        )}
          {/* <section className="flex content-end">
            <div className="">
              <Tasks state={state}/>
            </div>

          </section> */}
        </div>
     


    </div>
  );
}
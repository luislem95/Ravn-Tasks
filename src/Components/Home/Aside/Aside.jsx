import React from "react";
import ravn from "../../../Resources/3x/ravn.png";
import { Link } from "react-router-dom";

export default function Aside({ state, dataUser,setSelectedContent,selectedContent}) {
  console.log("selectedContent Aside", selectedContent);
  const handleDashboardClick = () => {
    setSelectedContent("Dashboard");
  };

  const handleMyTasksClick = () => {
    setSelectedContent("MyTasks");
  };
  return (
    <div className="w-56 bg-neutral4 mt-6 rounded-3xl" style={{height:'800px'}}>
      <div className="w-56 bg-neutral4 pt-2 rounded-3xl flex flex-col items-center justify-center">
        <img src={ravn} alt="" className="h-16" />
      </div>
      <div
        className={`mt-12 h-12 hover-gradient hover-text flex items-center justify-start  ${
          selectedContent == "Dashboard" ? "selected selected-text" : "text-white"
        }`}
        onClick={handleDashboardClick}
      >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white"  className={`w-10 h-10 hoverselectedSvgAside ${
            selectedContent == "Dashboard" ? "selectedSvgAside" : ""
        }`}  onClick={handleDashboardClick}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
        <h1 className="ml-6">DASHBOARD</h1>
      </div>
      <div
        className={`h-12 hover-gradient hover-text flex items-center justify-start  ${
          selectedContent == "MyTasks" ? "selected" : "text-white"
        }`}
        onClick={handleMyTasksClick}
      >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className={`w-10 h-10 hoverselectedSvgAside ${
           selectedContent == "MyTasks" ? "selectedSvgAside" : ""
          }`}   onClick={handleMyTasksClick}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
              <h1 className="ml-6">MY TASK</h1>
      </div>
    </div>
  );
}

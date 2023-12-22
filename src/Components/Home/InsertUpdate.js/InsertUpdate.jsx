import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

export default function InsertUpdate({  
  state,
  dataUser,
  setSelectedContent,
  selectedContent,
  openModal,
  isModalOpen,
  closeModal,
  uniqueLabels,
  handleSetTask,
  insert,
  handleUpdate,
task}) {



//asignacion a mis variables tanto para cuando es un nuevo task o edicion 
  const [taskTitle, setTaskTitle] = useState(task && task.name ? task.name : "");
  const [assignee, setAssignee] = useState(task && task.assignee ? task.assignee : "");
  const [estimate, setEstimate] = useState(task && task.pointEstimate ? task.pointEstimate : "");
  const reverseMappings = {
    'ZERO': 0,
    'ONE': 1,
    'TWO': 2,
    'FOUR': 4,
    'EIGHT': 8,
  };

  const estimateNumber = estimate ? reverseMappings[estimate] || '0' : '';




  const [selectedLabels, setSelectedLabels] = useState(task && task.tags ? task.tags : []);
  const [status, setStatus] = useState(task && task.status ? task.status : "");

  const initialDueDate = task && task.dueDate ? new Date(task.dueDate) : null;
  const [selectedDate, setSelectedDate] = useState(initialDueDate);
  const formattedDate = selectedDate instanceof Date ? format(selectedDate, "dd/MM/yyyy") : "";

  const [isEstimateDropdownOpen, setEstimateDropdownOpen] = useState(false);
  const [isAssigneeDropdownOpen, setAssigneeDropdownOpen] = useState(false);
  const [isLabelDropdownOpen, setLabelDropdownOpen] = useState(false);
  const [isDueDateDropdownOpen, setDueDateDropdownOpen] = useState(false);
console.log('selectedLabels',selectedLabels)
  const handleDropdownToggle = (dropdownType) => {
    switch (dropdownType) {
      case "estimate":
        setEstimateDropdownOpen(!isEstimateDropdownOpen);
        break;
      case "assignee":
        setAssigneeDropdownOpen(!isAssigneeDropdownOpen);
        break;
      case "label":
        setLabelDropdownOpen(!isLabelDropdownOpen);
        break;
      case "dueDate":
        setDueDateDropdownOpen(!isDueDateDropdownOpen);
        break;
      default:
        break;
    }
  };
  const handleLabelSelection = (label) => {
    const isSelected = selectedLabels.includes(label);
  
    if (isSelected) {
      setSelectedLabels(selectedLabels.filter((selected) => selected != label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };
  const handleEstimateSelection = (selectedEstimate) => {
    setEstimate(selectedEstimate);
  };
  const handleAssigneeSelection = (selectedAssignee) => {
    setAssignee(selectedAssignee);
  };

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
const handleCreateClick = () => {
  const formattedDate = format(selectedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

   console.log('send to api', taskTitle, 'BACKLOG', formattedDate, assignee.id, estimate, selectedLabels);

  handleSetTask(taskTitle, 'BACKLOG', formattedDate, assignee.id, estimate, selectedLabels);
  closeModal()
};

const handleUpdateClick =()=>{ 
  const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") : null;

  console.log('send to api',task.id,taskTitle, formattedDate, status, assignee.id, estimate,selectedLabels);
  handleUpdate(task.id,taskTitle, status,formattedDate, assignee.id, estimate,selectedLabels)
}
const handleCancel=()=>{
setTaskTitle('')
setAssignee('')
setEstimate('')
setSelectedDate('')
setSelectedLabels('')
closeModal()
}
  return  <form className="w-99 h-full bg-neutral4 rounded-lg">
  <input
    type="text"
    id="TaskTitle"
    className=" mt-6 pb-6 mb-4 text-gray-900 text-sm rounded-lg border-none block w-full p-2.5 dark:bg-neutral4 dark:placeholder-gray-400 dark:text-white outline-0"
    placeholder="Task Title"
    value={taskTitle}
    onChange={(e) => setTaskTitle(e.target.value)}
    required
  />
  <div className="flex justify-between ml-8 mr-8 ">
    <button
      id="dropdown-button-estimate"
      className={`flex-shrink-0  w-44 z-10 inline-flex items-center justify-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 dark:text-white rounded-lg hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700 ${
        isEstimateDropdownOpen ? "border-b border-gray-500" : ""
      }`}
      type="button"
      required
      onClick={() => handleDropdownToggle("estimate")}
    >
<div className="flex items-center justify-between">
<div className="flex items-center">
<svg width="16" height="14" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 0H19C19.2652 0 19.5196 0.105357 19.7071 0.292893C19.8946 0.48043 20 0.734784 20 1V17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18H1C0.734784 18 0.48043 17.8946 0.292893 17.7071C0.105357 17.5196 0 17.2652 0 17V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0ZM7 8V6H5V8H3V10H5V12H7V10H9V8H7ZM11 8V10H17V8H11Z" fill="white"/>
</svg>
{/* Agrega espacio entre el SVG y el texto */}
<div className="ml-4"></div>
</div>

{/* El texto "Estimate" */}
{estimateNumber ? ` ${estimateNumber} Points ` : "Estimate"}
</div>
 
       {isEstimateDropdownOpen && (
            <div
              id="dropdown-estimate"
              className="z-90 bg-white divide-y divide-gray-100 rounded-lg shadow w-32 absolute mt-52 dark:bg-gray-700"
            >
              <ul
                className="py-4  text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown-button-estimate"
              >
                <label className="text-neutral4 text-lg">Estimate</label>
                <li onClick={() => handleEstimateSelection("ZERO")}>0 Points</li>
                <li onClick={() => handleEstimateSelection("ONE")}>1 Points</li>
                <li onClick={() => handleEstimateSelection("TWO")}>2 Points</li>
                <li onClick={() => handleEstimateSelection("FOUR")}>4 Points</li>
                <li onClick={() => handleEstimateSelection("EIGHT")}>8 Points</li>
              </ul>
            </div>
          )}
        </button>

        <button
            id="dropdown-button-assignee"
            className={`flex-shrink-0 z-10  w-44 inline-flex items-center justify-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 dark:text-white rounded-lg hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700 ${
              isAssigneeDropdownOpen ? "border-b border-gray-500" : ""
            }`}
            type="button"
            required
            onClick={() => handleDropdownToggle("assignee")}
          >
       
            <div className="flex justify-between">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 18">
<path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
</svg>    <div className="ml-4"></div>
</div>
            {assignee.fullName ? ` ${assignee.fullName}` : "Assignee"}
            </div>
            {isAssigneeDropdownOpen && (
              <div
                id="dropdown-assignee"
                className="z-90 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute mt-72 dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdown-button-assignee"
                >
                  <label className="text-neutral4 text-lg">Assign to...</label>
                  {state.assignee.map((user, index) => (
                    <li
                      key={index}
                      onClick={() => handleAssigneeSelection(user)}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <img
                        src="https://www.educima.com/imagen-pensar-dl30340.jpg"
                        alt={user.fullName}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      {user.fullName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </button>

    {/* Label Dropdown */}
    <button
id="dropdown-button-label"
required
className={`flex-shrink-0 z-10 w-44 inline-flex items-center justify-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 dark:text-white rounded-lg hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700 ${
isLabelDropdownOpen ? "border-b border-gray-500" : ""
}`}
type="button"
onClick={() => handleDropdownToggle("label")}
>
<div className="flex justify-between">
<div className="flex items-center">
        <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
          <path d="M15.045.007 9.31 0a1.965 1.965 0 0 0-1.4.585L.58 7.979a2 2 0 0 0 0 2.805l6.573 6.631a1.956 1.956 0 0 0 1.4.585 1.965 1.965 0 0 0 1.4-.585l7.409-7.477A2 2 0 0 0 18 8.479v-5.5A2.972 2.972 0 0 0 15.045.007Zm-2.452 6.438a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
        </svg>
        <div className="ml-4"></div>
</div>
        {selectedLabels ? ` ${selectedLabels}` : "Label"}
            </div>

{isLabelDropdownOpen && (
<div
  id="dropdown-label"
  className="z-90 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute mt-72 dark:bg-gray-700"
>
  <ul
    className="py-2 text-sm text-gray-700 dark:text-gray-200"
    aria-labelledby="dropdown-button-label"
  ><label className="text-neutral4 text-lg">Tag Title</label>
    {uniqueLabels.map((label, index) => (
      <li key={index} className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        <input
        required
          type="checkbox"
          id={`label-${index}`}
          checked={selectedLabels.includes(label)}
          onChange={() => handleLabelSelection(label)}
        />
        <label htmlFor={`label-${index}`} className="ml-2 z-10">{label}</label>
      </li>
    ))}
  </ul>
</div>
)}
</button>
{/* Due Date Dropdown */}
<DatePicker
required
  selected={selectedDate instanceof Date ? selectedDate : null}
  onChange={(date) => setSelectedDate(date)}
  placeholderText="Select date"
  className="bg-gray-50 border z-10 justify-center border-none text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-0"
/>
</div>
<div className="flex justify-end mt-8 mr-8 pb-4">
<button type="button"    className={`flex-shrink-0  inline-flex items-end bg-transparent py-2.5 px-4 text-sm font-medium text-center  dark:text-white rounded-lg    `} onClick={() => handleCancel()}>Cancel</button>
{
  insert ? (
<button type="button" className={`flex-shrink-0  inline-flex items-end py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-primary4 dark:text-white rounded-lg hover:bg-primary4 dark:bg-primary4 dark:hover:bg-primary4 `} onClick={() => handleCreateClick()}>Create</button>
):(
  <button type="button" className={`flex-shrink-0  inline-flex items-end py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-primary4 dark:text-white rounded-lg hover:bg-primary4 dark:bg-primary4 dark:hover:bg-primary4 `} onClick={() => handleUpdateClick()}>UpDate</button>
)}

</div>
</form>;
}

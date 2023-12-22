import React, { useState, useRef, useEffect } from "react";
import InsertUpdate from "../InsertUpdate.js/InsertUpdate";

export default function ModalDots({ task, handleDelete, uniqueLabels, state ,handleUpdate}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditClicked, setEditClicked] = useState(false);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditClicked(false); // Reset the edit clicked state
  };

  const handleEdit = () => {
    setEditClicked(true);
  };

  const handleDeleteClick = () => {
    setConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    setConfirmationOpen(false);
    handleDelete(task.id);
    closeModal();
  };

const handleCancelDelete = () => {
  setConfirmationOpen(false);
};

  return (
    <div className="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
        onClick={openModal}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>

      {isModalOpen && (
        <div>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal bg-neutral3 pl-4 pr-4 p-3 z-10 absolute border rounded-lg" ref={modalRef}>
            <div className="flex items-center justify-start cursor-pointer"    onClick={handleEdit}>
              <svg
                class="w-4 h-4 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 21 21"
             
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"
                />
              </svg>
              <div className="ml-2 cursor-pointer">Edit</div>
            </div>
            {isEditClicked && (
              <div className="absolute">
                <InsertUpdate
                  task={task}
                  state={state}
                  closeModal={closeModal}
                  uniqueLabels={uniqueLabels}
                  handleUpdate={handleUpdate}
                />
                </div>
              )}
            <div className="flex items-center justify-center cursor-pointer" onClick={() => handleDeleteClick(task.id)}>
              <svg
                class="w-4 h-4 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                />
              </svg>
              <div className="ml-2 cursor-pointer">Delete</div>
         

            </div>
          </div>
        </div>
        
      )}
        {isConfirmationOpen && (
        <div>
          <div className="modal-overlay" onClick={handleCancelDelete}></div>
          <div className="modal bg-neutral3 p-4 z-20 absolute border rounded-lg" ref={modalRef}>
            <div className="mb-4">¿Estás seguro de que quieres eliminar esta tarea?</div>
            <div className="flex justify-center space-x-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleConfirmDelete}>
                Sí
              </button>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded" onClick={handleCancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





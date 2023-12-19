import React, { useState, useRef, useEffect } from "react";

export default function ModalDots({ task, handleDelete }) {
  const [isModalOpen, setModalOpen] = useState(false);
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
  };

  const handleEdit = () => {
    closeModal();
  };

  const handleDeleteClick = (id) => {
    handleDelete(id);
    closeModal();
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
          <div className="modal" ref={modalRef}>
            <button onClick={handleEdit}>Edit</button>
            <button  onClick={() => handleDeleteClick(task.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

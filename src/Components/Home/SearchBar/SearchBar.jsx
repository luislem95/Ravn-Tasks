import React, { useEffect, useRef, useState } from "react";
import { format, parseISO } from 'date-fns';
import { useSpring, animated } from 'react-spring';


export default function SearchBar({ dataUser,handleSearch }) {
  console.log('dataUser',dataUser)
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isConfigurationModalOpen, setConfigurationModalOpen] = useState(false);
  const [isSad, setIsSad] = useState(false);
  const modalRef = useRef(null);
  const [searchCriteria, setSearchCriteria] = useState({
    assigneeId: "",
    dueDate: null,
    name: "",
    ownerId: "",
    pointEstimate: "", 
    status: "",
    tags: [],
  });
console.log('search',searchCriteria)
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleSearchClick = () => {
    handleSearch(searchCriteria);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };
  const handleConfiguration = () => {
    setConfigurationModalOpen(true);
    setMenuOpen(false);
  };

  const closeConfigurationModal = () => {
    setConfigurationModalOpen(false);
  };
  const formatDate = (dueDate) => {
    if (!dueDate) {
      return null;
    }
    
    const date = parseISO(dueDate);
    const formattedDate = format(date, 'do MMMM, yyyy');

    return formattedDate;
  };
  const handleLogout = () => {
    setIsSad(true);
    setTimeout(() => {
      setIsSad(false);
      window.location.reload();
      setMenuOpen(false);
    }, 2000); // Puedes ajustar el tiempo según tus necesidades
  };
  const handleClickOutsideModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeConfigurationModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, [modalRef]);

  const sadAnimation = useSpring({
    opacity: isSad ? 1 : 0,
    transform: `translateY(${isSad ? 0 : -50}px)`,
  });
  return (
    <div className="flex justify-end m-6 relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"  onClick={handleSearchClick}>
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"

        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search"
        value={searchCriteria.name}
        onChange={(e) => setSearchCriteria({ ...searchCriteria, name: e.target.value })}
        onKeyDown={handleKeyDown} 
        className="block w-full p-4 ps-10 text-sm text-gray-900 rounded-l-lg bg-gray-700 dark:bg-neutral4 dark:placeholder-gray-400 dark:text-white border-none"
      />
      <div className="bg-neutral4 p-2 rounded-r-2xl relative">
      <img
          src="https://scontent.fsal1-1.fna.fbcdn.net/v/t1.18169-9/24899957_1755500284755618_3962460758694462306_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7a1959&_nc_ohc=jD_WlA0d9rUAX-7yL1V&_nc_ht=scontent.fsal1-1.fna&oh=00_AfAsAPad5EB9BnhLEZHtyB8Hxn8g-9TCHtHovwF9jNzgqA&oe=65A63963"
          alt="imagen profile"
          className="w-8 h-8 rounded-full cursor-pointer"
          onClick={toggleMenu}
        />
                {/* <img
          src={dataUser.avatar}
          alt={dataUser.selectedUser.fullName}
          className="w-8 h-8 rounded-full cursor-pointer"
          onClick={toggleMenu}
        /> */}
        {isMenuOpen && (
          <div className="absolute top-8 right-0 bg-neutral4 p-2  dark:text-white rounded shadow">
            <button onClick={handleLogout} className="block w-full p-2 hover-gradient ">
              LogOut
            </button>
            <button onClick={handleConfiguration} className="block w-full p-2 hover-gradient">
              settings
            </button>
          </div>
        )}
      </div>
                        <animated.div style={sadAnimation} className="text-red-500 text-center mt-2">
        Bye...
      </animated.div>
      {isConfigurationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div ref={modalRef} className="bg-neutral4 p-4  dark:text-white rounded shadow">
            {/* Renderizar el contenido del modal con la dataUser */}
            <div className="flex justify-center">
            <img
          src="https://scontent.fsal1-1.fna.fbcdn.net/v/t1.18169-9/24899957_1755500284755618_3962460758694462306_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7a1959&_nc_ohc=jD_WlA0d9rUAX-7yL1V&_nc_ht=scontent.fsal1-1.fna&oh=00_AfAsAPad5EB9BnhLEZHtyB8Hxn8g-9TCHtHovwF9jNzgqA&oe=65A63963"
          alt="imagen profile"
          className="w-8 h-8 rounded-full animate-bounce"
        /></div>
                 {/* <img
          src={dataUser.selectedUser.avatar}
          alt={dataUser.selectedUser.fullName}
          className="w-8 h-8 rounded-full cursor-pointer"
          onClick={toggleMenu}
        /> */}
           <div className="flex justify-between"> <div className="mr-2">{dataUser.selectedUser.fullName}</div><div className="ml-2">{dataUser.selectedUser.email}</div>
         </div>
           <div className="text-xs">  {dataUser.selectedUser.type}</div>
           <div className="flex justify-between"> 
           
   <div className="mr-2" title="UpDated At">{formatDate(dataUser.selectedUser.createdAt)} </div>

   <div className="ml-2" title="Created At">{formatDate(dataUser.selectedUser.updatedAt)}</div>
   </div>
            <button className="w-fit px-4 py-1 rounded-lg border mt-4" onClick={closeConfigurationModal}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
}

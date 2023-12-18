import React from "react";


export default function SearchBar({ dataUser }) {


  return (
    <div className="flex justify-end  m-6 ">
      <div class="relative w-full">
  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
     <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
     </svg>
 </div>
      <input
        type="text"
        placeholder="Search"
        class="block w-full p-4 ps-10 text-sm text-gray-900  rounded-l-lg bg-gray-700  dark:bg-neutral4 dark:placeholder-gray-400 dark:text-white" 
        // onChange={(e) => onSearch(e.target.value)}
      />
      </div>
      <div className="bg-neutral4 p-2 rounded-r-2xl">
        {/* <img
          src={dataUser.selectedUser.avatar}
          alt={dataUser.selectedUser.avatar}
          className="w-8 h-8 rounded-full"
        />        */}
         <img
        src='https://scontent.fsal1-1.fna.fbcdn.net/v/t1.18169-9/24899957_1755500284755618_3962460758694462306_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7a1959&_nc_ohc=jD_WlA0d9rUAX-7yL1V&_nc_ht=scontent.fsal1-1.fna&oh=00_AfAsAPad5EB9BnhLEZHtyB8Hxn8g-9TCHtHovwF9jNzgqA&oe=65A63963'
        alt='imagen profile'
        className="w-8 h-8 rounded-full"
      />
      </div>
    </div>
  );
 }

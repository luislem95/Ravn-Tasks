import React from "react";
import { format, parseISO } from 'date-fns';

export default function Login({ state , handleUserClick}) {
  const formatDate = (dueDate) => {
    if (!dueDate) {
      return null;
    }
    
    const date = parseISO(dueDate);
    const formattedDate = format(date, 'do MMMM, yyyy');

    return formattedDate;
  };
  return (
    <div className="">

          {state.lista.map((user) => (
              <div key={user.id} className="flex font-sans  hover-gradient " onClick={() => handleUserClick(user)}>
              <div className="flex-none w-48 relative">
              {/* <img  src='{user.avatar} ' alt={`Avatar de ${user.fullName}`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" /> */}
              <img  src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D' alt={`Avatar de ${user.fullName}`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </div>
            <form className="flex-auto p-6">
            <div className="flex flex-wrap">
      <h1 className="flex-auto text-lg font-semibold text-slate-100">
      {user.fullName}
      </h1>
      <div className="h10font-semibold text-slate-200">
      {user.id}
      </div>
      <div className="w-full flex-none text-sm font-medium text-slate-400 mt-2">
      {formatDate(user.createdAt)}
      </div>
      <div className="w-full flex-none text-sm font-medium text-slate-400 mt-2">
      {user.email}
      </div>
      <div className="w-full flex-none text-sm font-medium text-slate-400 mt-2">
      {user.type}
      </div>
      <div className="w-full flex-none text-sm font-medium text-slate-400 mt-2">
      {formatDate(user.updatedAt)}
      </div>
    </div>
            </form>
</div>
          ))}
</div>)
}


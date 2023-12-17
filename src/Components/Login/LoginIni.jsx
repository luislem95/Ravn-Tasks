import React, { useEffect, useState } from "react";
import Login from "./Login";
import FetchComponent from "../Config/fetch";

export default function LoginIni({handleUserClick}) {
    const [state, setState] = useState({
        lista: []
    });
    async function getData() {
        const graphqlQuery = `
          query {
            users {
              avatar
              createdAt
              email
              fullName
              id
              type
              updatedAt
            }
          }
        `;
      
        const response = await FetchComponent({ query: graphqlQuery });
      
        if (response !== undefined && response !== null && response.data) {
          // Si la respuesta contiene datos, actualiza el estado
          setState({
            ...state,
            lista: response.data.users, // Asegúrate de adaptar esto a tu estructura de datos real
          });
        }
      }
      

    useEffect(() => {
        getData(null);
    }, []);

;

  return (
    <div className="bg-background ">
      <Login state={state} handleUserClick={handleUserClick} />
    </div>
  );
}

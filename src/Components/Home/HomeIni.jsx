import Home from "./Home";
import React, { useEffect, useState } from "react";
import FetchComponent from "../Config/fetch";

export default function HomeIni(selectedUser, id) {
    const [state, setState] = useState({
        lista: []
    });
    async function getData() {
        const graphqlQuery = `
        query {
            tasks(input: {}) {
              id
              name
              creator {
                id
                fullName
                email
                avatar
              }
              assignee {
                id
                fullName
                email
                avatar
                type
              }
              createdAt
              dueDate
              status
              pointEstimate
              tags
            }
          }
        `;
      
        const response = await FetchComponent({ query: graphqlQuery });
      
        if (response !== undefined && response !== null && response.data.tasks) {
          // Si la respuesta contiene datos, actualiza el estado
          setState({
            ...state,
            lista: response.data.tasks, // Asegúrate de adaptar esto a tu estructura de datos real
          });
        }
      }
      

    useEffect(() => {
        getData(null);
    }, []);

;
   
  return (
    <div className="p-2 bg-background" style={{height:'100%'}}>
      <Home state={state} selectedUser={selectedUser}/>
    </div>
  );
}
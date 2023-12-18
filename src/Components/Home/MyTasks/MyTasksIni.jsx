import MyTasks from "./MyTasks";
import React, { useEffect, useState } from "react";
import FetchComponent from "../../Config/fetch";




export default function MyTasksIni({ selectedUser, id }) {
    
    const [state, setState] = useState({
        lista: []
    });
const id_=selectedUser.id;
    async function getData() {
        const graphqlQuery = `
          query {
            tasks(input: { assigneeId: "${id_}" }) {
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
        const query = `
        query {
          tasks(input: {}) {
            status
          }
        }
        
        `;
        const response = await FetchComponent({ query: graphqlQuery });
        const r = await FetchComponent({ query: query });
      
        if (response !== undefined && response !== null && response.data.tasks) {
          // Si la respuesta contiene datos, actualiza el estado
          setState({
            ...state,
            lista: response.data.tasks, // Asegúrate de adaptar esto a tu estructura de datos real
            data:r.data.tasks,
          });
        }
      }
     
   

useEffect(() => {
    if (id_) {
      getData();
    }
  }, [id]);
  return (
    <div className="p-2 bg-background">
      <MyTasks state={state} selectedUser={selectedUser} />
    </div>
  );
}

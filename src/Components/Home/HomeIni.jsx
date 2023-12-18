import Home from "./Home";
import React, { useEffect, useState } from "react";
import FetchComponent from "../Config/fetch";


const url = "https://syn-api-prod.herokuapp.com/graphql/";

export default function HomeIni(selectedUser, id) {
    const [state, setState] = useState({
        lista: [],
        assignee:[],
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
        const assignee = `
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
        const users = await FetchComponent({ query: assignee });
      
        if (response !== undefined && response !== null && response.data.tasks) {
          // Si la respuesta contiene datos, actualiza el estado
          setState({
            ...state,
            lista: response.data.tasks,
            assignee: users.data.users,
          });
        }
      }
      // ----------------Set Task-----------------------------------------------------------------------------------------------------------------------------
      async function setTask(name, status,dueDate , assigneeId, pointEstimate, tags) {

        const mutation = `
          mutation CreateTask($name: String!, $dueDate: DateTime!, $status: Status!, $assigneeId: String!, $pointEstimate: PointEstimate!, $tags: [TaskTag!]!) {
            createTask(input: {
              name: $name
              dueDate: $dueDate
              status: $status
              assigneeId: $assigneeId
              pointEstimate: $pointEstimate
              tags: $tags
            }) {
              id
              name
              createdAt
              dueDate
              pointEstimate
              status
              tags
              creator {
                id
                fullName
              }
              assignee {
                id
                fullName
              }
            }
          }
        `;
      

     
      
        const variables = {
          name,
          dueDate,
          status, // Asegúrate de que status sea un valor permitido (enum)
          assigneeId: assigneeId.toString(), // Asegúrate de que assigneeId sea un String
          pointEstimate, // Asegúrate de que pointEstimate sea un valor permitido (enum)
          tags, // Asegúrate de que tags sea un valor permitido (enum)
        };
        console.log('Mutation:', mutation);
        console.log('Variables:', variables);
        try {
          const response = await FetchComponent({ query: mutation, variables });

      getData()
          if (!response.ok) {
            throw new Error(`Error al realizar la solicitud: ${response.status} ${response.statusText}`);
          }
      
          const data = await response.json();
          console.log('Resultado de la mutación:', data);
        } catch (error) {
          console.error('Error al ejecutar la mutación:', error.message);
        }
      }
      
      const handleSetTask = (name, dueDate, status, assigneeId, pointEstimate, tags) => {
        setTask(name, dueDate, status, assigneeId, pointEstimate, tags);
      };
    // ---------------------------------------------DELETE TASK---------------------------------------------------------------------------------------------------------------------------------
    async function setDelete(id_) {

      const deleteTask = `
        mutation DeleteTask($id: String!) {
          deleteTask(input: {id: $id
          }) {
            id
            name
            createdAt
            dueDate
            pointEstimate
            status
            tags
            creator {
              id
              fullName
            }
            assignee {
              id
              fullName
            }
          }
        }
      `;
    
      const variables = {
        id_
      };
      console.log('Mutation:', deleteTask);
      console.log('Variables:', variables);
      try {
        const response = await FetchComponent({ query: deleteTask, variables });
    
        if (!response.ok) {
          throw new Error(`Error al realizar la solicitud: ${response.status} ${response.statusText}`);
        }
    
        const data = await response.json();
        console.log('Resultado de la mutación:', data);
      } catch (error) {
        console.error('Error al ejecutar la mutación:', error.message);
      }
    }
    
    const handleDelete = (id_) => {
      setDelete(id_);
    };
    useEffect(() => {
        getData(null);
    }, []);

const uniqueTags = [...new Set(state.lista.flatMap(task => task.tags))];


   
  return (
    <div className="p-2 bg-background" style={{height:'100%'}}>
      <Home state={state} selectedUser={selectedUser} uniqueLabels={uniqueTags} handleSetTask={handleSetTask} handleDelete={handleDelete}/>
    </div>
  );
}
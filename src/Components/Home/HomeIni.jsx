import Home from "./Home";
import React, { useEffect, useState } from "react";
import FetchComponent from "../Config/fetch";


const url = "https://syn-api-prod.herokuapp.com/graphql/";

export default function HomeIni(selectedUser, id,handleUserClick) {
    const [state, setState] = useState({
        lista: [],
        assignee:[],
    });

    const [searchCriteria, setSearchCriteria] = useState({
      assigneeId: null,
      dueDate: null,
      name: null,
      ownerId: null,
      pointEstimate: null,
      status: null,
      tags: [],
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
      handleUserClick(selectedUser)
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
      //---------------------------------------------UPDATE TASK------------------------------------------------------------------------------------------------------------------------------------------
      async function stUpdateTask(taskId,name, status,dueDate , assigneeId, pointEstimate, tags) {

        const mutation = `
        mutation UpdateTask($taskId: String!, $name: String!, $dueDate: DateTime!, $status: Status!, $pointEstimate: PointEstimate!, $tags: [TaskTag!]!, $assigneeId: String!) {
          updateTask(input: {
            id: $taskId,
            status: $status,
            tags: $tags,
            dueDate: $dueDate,
            pointEstimate: $pointEstimate,
            name: $name,
            assigneeId: $assigneeId
          }) {
            id
            status
            tags
            dueDate
            pointEstimate
            name        
            assignee {
              id
                }
          }
        }
      `;
      

     
      
        const variables = {
          taskId,
          name,
          dueDate,
          status,
          assigneeId: assigneeId.toString(), 
          pointEstimate, 
          tags, 
        };
        // console.log('Mutation:', mutation);
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
      
      const handleUpdate = (taskId,name, dueDate, status, assigneeId, pointEstimate, tags) => {
        stUpdateTask(taskId,name, dueDate, status, assigneeId, pointEstimate, tags);
      };
      //--------------------------------------------SEARCH-----------------------------------------------------------------------------------------------------------------------------------------------------
      const handleSearch = async () => {
        // Verifica y elimina las propiedades nulas o indefinidas del objeto searchCriteria
        const cleanedSearchCriteria = Object.fromEntries(
          Object.entries(searchCriteria).filter(([key, value]) => value !== null && value !== undefined)
        );
      
        // Agrega un console.log para depurar
        console.log('Criteria:', cleanedSearchCriteria);
      
        // Verifica si el objeto searchCriteria tiene valores antes de realizar la consulta
        if (Object.keys(cleanedSearchCriteria).length === 0) {
          console.log('No search criteria provided. Skipping search.');
          return;
        }
      
        const graphqlQuery = `
          query GetTasks($input: FilterTaskInput!) {
            tasks(input: $input) {
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
              }
              createdAt
              dueDate
              status
            }
          }
        `;
      
        const response = await FetchComponent({
          query: graphqlQuery,
          variables: {
            input: cleanedSearchCriteria,
          },
        });
      
        // Actualiza el estado o realiza acciones con la respuesta.
        console.log(response);
      };
      
    // ---------------------------------------------DELETE TASK---------------------------------------------------------------------------------------------------------------------------------
    async function setDelete(id) {

      const deleteTask = `
        mutation DeleteTask($id: String!) {
          deleteTask(input: {
            id:$id
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
        id
      };
      console.log('Mutation:', deleteTask);
      console.log('Variables:', variables);
      try {
        const response = await FetchComponent({ query: deleteTask, variables });
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
    
    const handleDelete = (id) => {
      setDelete(id);
    };

  useEffect(() => {
    getData();
  }, [searchCriteria]);

const uniqueTags = [...new Set(state.lista.flatMap(task => task.tags))];


   
  return (
    <div className="p-2 bg-background" style={{height:'100%'}}>
      <Home state={state} selectedUser={selectedUser} uniqueLabels={uniqueTags} handleSetTask={handleSetTask} handleDelete={handleDelete} handleUpdate={handleUpdate} handleSearch={handleSearch}/>
    </div>
  );
}
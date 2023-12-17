import React, { useEffect, useState } from "react";

const url = "https://syn-api-prod.herokuapp.com/graphql/";
const headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3NpdGlvbklkIjoiNjQ3ODEyZjgyMzIwIiwicHJvamVjdElkIjoiY2RlODc2ZjctYzA4Yy00ZGYwLWFkZDUtOGExMjc5ZjI1NmFjIiwiZnVsbE5hbWUiOiJMdWlzIFJvZHJpZ28gTGVtdXMgTWVuZG96YSIsImVtYWlsIjoicm9kcmlnb19tZW5kb3phOTVAaG90bWFpbC5jb20iLCJpYXQiOjE2NzY5MDgzMTh9.sYdT_mlDN8zwd_pY-daLxmHrpSoLelMx3SYVcL2PpxU",
  "Content-Type": "application/json",
};
export default function FetchComponent(query, controller) {
  localStorage.setItem("API", "http://208.109.214.98:8077/api/");

  const dir_API = url;
  console.log("dir_API", dir_API);
  if (dir_API !== undefined && dir_API !== null) {
    return new Promise((resolve) => {
      const apiURL = dir_API + query;
      var xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      // En lugar de devolver solo xhr.response.ds, devuelve la respuesta completa
      xhr.addEventListener("load", () => {
        const xhrResponse = xhr.response;
        if (xhrResponse.errors) {
          console.error("Error in GraphQL response:", xhrResponse.errors);
          // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
        } else {
          resolve(xhrResponse);
        }
      });

      xhr.open("POST", apiURL);
      xhr.setRequestHeader("Content-Type", "application/json");

      // Agregar el encabezado Authorization
      xhr.setRequestHeader("Authorization", headers.Authorization);

      xhr.send(JSON.stringify(query));
    });
  } else {
    return null;
  }
}

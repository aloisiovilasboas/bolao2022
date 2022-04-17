const express = require("express");
const cors = require("cors");
//const { uuid } = require('uuidv4');

// const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
// const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

//Importing Database
//const admin = require("firebase-admin");
const db = require("./db");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (request, response) => {
  return response.json( {message: "ok"})
});

app.get("/users", async (request, response) => {
  const usersRef = await db.collection('users').get()

  usersRef.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
  });

  // Create a query against the collection
  //const queryRef = usersRef.where('email', '==', 'jorge.sergipe@gmail.com').get();


  return response.json(usersRef)
});



// app.get("/repositories", (request, response) => {
//   return response.json(repositories);
// });

// app.post("/users", (request, response) => {
//   const { nome, email, foto, instagram } = request.body
//   const repo = { id: uuid(), title, url, techs, likes: 0 };
//   repositories.push(repo);
//   return response.json(repo);
// });

// app.put("/repositories/:id", (request, response) => {
//   const { id } = request.params;
//   const { title, url, techs } = request.body
//   const repoIndex = repositories.findIndex(repository => repository.id === id)
//   if (repoIndex < 0) {
//     return response.status(400).json({ message: "Repository not found" })
//   }
//   const likes = repositories[repoIndex].likes

//   const repository = { id, title, url, techs, likes }

//   repositories[repoIndex] = repository

//   return response.json(repository)

// });

// app.delete("/repositories/:id", (request, response) => {
//   const { id } = request.params;

//   const repoIndex = repositories.findIndex(r => r.id === id)
//   if (repoIndex < 0) {
//     return response.status(400).json({ message: "Repository not found" })
//   }

//   repositories.splice(repoIndex, 1)

//   return response.status(204).send()

// });

// app.post("/repositories/:id/like", (request, response) => {
//   const { id } = request.params;
//   const repoIndex = repositories.findIndex(repository => repository.id === id)
//   if (repoIndex < 0) {
//     return response.status(400).json({ likes: "Repository not found" })
//   }

//   repositories[repoIndex].likes++

//   return response.json({ likes: repositories[repoIndex].likes })

// });

module.exports = app;


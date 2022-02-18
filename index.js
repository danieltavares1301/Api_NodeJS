const express = require("express");
const crypto = require("crypto");
const { application } = require("express");

const app = express();

// midleware
app.use(express.json());

const PORT = 3000;

const users = [
  {
    id: 1,
    name: "daniel",
    city: "slz",
  },
];

// pega todos os usuários
app.get("/api/users", (request, response) => {
  response.send({ users });
});

// pega 1 usuário
app.get("/api/users/:id", (request, response) => {
  const id = request.params.id;
  const user = users.find((user) => user.id === id);

  user
    ? response.send({ user })
    : response.status(404).send({ message: "Usuário não existe" });
});

// cadastrar novo usuário
app.post("/api/users", (request, response) => {
  const { name, city } = request.body;

  const user = {
    id: crypto.randomUUID(),
    name,
    city,
  };

  users.push(user);

  response.send({ message: "usuário criado", user });
});

// atualizar informações do usuário

app.put("/api/users/:id", (request, response) => {
  const id = request.params.id;
  const { name, city } = request.body;

  const updateUser = {
    id,
    name,
    city,
  };

  const userIndex = users.findIndex((user) => user.id == id);
  users[userIndex] = updateUser;
  return response.json(updateUser);
});

app.delete("/api/users/:id", (request, response) => {
  const id = request.params.id;
  const userIndex = users.findIndex((user) => user.id == id);
  users.splice(userIndex, 1);
  return response.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

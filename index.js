const express = require("express");
const uuid = require("uuid");
const cors = require("cors");
const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());

// ✅ CORS configurado com o link do seu Vercel
app.use(cors());

const users = [];

app.post("/users", (request, response) => {
  const { name, age, email } = request.body;
  const user = { id: uuid.v4(), name, age, email };
  users.push(user);
  return response.json(user);
});

app.get("/users", (request, response) => {
  return response.json(users);
});

app.delete("/users/:id", (request, response) => {
  const { id } = request.params;
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    return response.status(200).json({ message: "Usuário deletado com sucesso!" });
  } else {
    return response.status(404).json({ message: "Usuário não encontrado" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
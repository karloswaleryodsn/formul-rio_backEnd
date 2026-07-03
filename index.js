const { middleware } = require("expres");
const express = require("express");
const uuid = require("uuid");
const port = 3001;
const cors = require("cors");
const app = express(); 
app.use(express.json());
app.use(cors());

const Verificarurl = (request, response, next) => {
  console.log(request.url, request.method, new Date());
  next();
};

app.use(Verificarurl);

const users = [];

app.post("/users", (request, response) => {
  console.log(Verificarurl);

  const { name, age, email } = request.body;
  const user = {id: uuid.v4(), name, age, email};
  users.push(user);
  return response.json(user);
});

app.get("/users/", (request, response) => {
  console.log(Verificarurl);
  return response.json(users);
});

app.put("/users/:id", (request, response) => {
  console.log(Verificarurl);
  const { id } = request.params;
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return response.status(404).json({ message: "Usuário não encontrado" });
  }

  const { order, clientName, price, status } = request.body;
  return response.json(
    (users[userIndex] = { id, order, clientName, price, status }),
  );
});

app.delete("/users/:id", (request, response) => {
  console.log(Verificarurl);
  const { id } = request.params;
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    return response
      .status(200)
      .json({ message: "Usuário deletado com sucesso!" });
  } else {
    return response.status(404).json({ message: "Usuário não encontrado" });
  }
});

  const verificarid = (request, response, next) => {
  const id = request.params.id;

  const User = users.find((User) => User.id === id);

  if (!User) {
  return response.status(404).json({ message: "Usuário não encontrado" });
  }
  return response
  .status(200)
  .json({ Message: "Usuário encontrado com sucesso!" });
  };

app.get("/users/city/:id", (request, response) => {
  console.log(Verificarurl);
  const id = request.params.id;
  const User = users.find((User) => User.id === id);
  return response.json(User);
});

app.patch("/users/:id", verificarid, (request, response) => {
  console.log(Verificarurl);
  const { id } = request.params;
  if (users.findIndex((user) => user.id === id) !== -1) {
    return response.json(
      (users[
        users.findIndex((user) => user.id === id)
      ].status = "Pronto para entrega"),
    );
  } else {
    return response.status(404).json({ message: "Usuário não encontrado" });
  }
});

//    app.delete('/users/:id', MYfunctionMiddleware, (request, response) => {
//       const index = request.userIndex
//       users.splice(index, 1)
//       return response.json({message: "Usuário deletado com sucesso!"})
//   })

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});

// const express = require("express");
// const { v4: uuidv4 } = require("uuid");

// const app = express();
// const port = 3000;

// app.use(express.json());

// // ─── Middleware de log ────────────────────────────────────────────────────────
// const logRequest = (request, response, next) => {
//   console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
//   next();
// };

// app.use(logRequest);

// // ─── "Banco de dados" em memória ──────────────────────────────────────────────
// const usuarios = [];

// // ─── Middleware: verificar se usuário existe pelo ID ──────────────────────────
// const verificarUsuario = (request, response, next) => {
//   const { id } = request.params;
//   const usuario = usuarios.find((u) => u.id === id);

//   if (!usuario) {
//     return response.status(404).json({ message: "Usuário não encontrado." });
//   }

//   request.usuario = usuario; // passa o usuário encontrado adiante
//   next();
// };

// // ─── Rotas ────────────────────────────────────────────────────────────────────

// // GET /usuarios — listar todos
// app.get("/usuarios", (request, response) => {
//   return response.status(200).json(usuarios);
// });

// // GET /usuarios/:id — buscar por ID
// app.get("/usuarios/:id", verificarUsuario, (request, response) => {
//   return response.status(200).json(request.usuario);
// });

// // POST /usuarios — criar usuário
// app.post("/usuarios", (request, response) => {
//   const { name, age, email } = request.body;

//   if (!name || !age || !email) {
//     return response
//       .status(400)
//       .json({ message: "Os campos name, age e email são obrigatórios." });
//   }

//   const emailJaCadastrado = usuarios.some((u) => u.email === email);
//   if (emailJaCadastrado) {
//     return response.status(409).json({ message: "E-mail já cadastrado." });
//   }

//   const novoUsuario = {
//     id: uuidv4(),
//     name,
//     age,
//     email,
//   };

//   usuarios.push(novoUsuario);
//   return response.status(201).json(novoUsuario);
// });

// // PUT /usuarios/:id — atualizar todos os campos
// app.put("/usuarios/:id", verificarUsuario, (request, response) => {
//   const { id } = request.params;
//   const { name, age, email } = request.body;

//   if (!name || !age || !email) {
//     return response
//       .status(400)
//       .json({ message: "Os campos name, age e email são obrigatórios." });
//   }

//   const index = usuarios.findIndex((u) => u.id === id);
//   usuarios[index] = { id, name, age, email };

//   return response.status(200).json(usuarios[index]);
// });

// // PATCH /usuarios/:id — atualizar campos parcialmente
// app.patch("/usuarios/:id", verificarUsuario, (request, response) => {
//   const { id } = request.params;
//   const { name, age, email } = request.body;

//   const index = usuarios.findIndex((u) => u.id === id);

//   if (name)  usuarios[index].name  = name;
//   if (age)   usuarios[index].age   = age;
//   if (email) usuarios[index].email = email;

//   return response.status(200).json(usuarios[index]);
// });

// // DELETE /usuarios/:id — deletar usuário
// app.delete("/usuarios/:id", verificarUsuario, (request, response) => {
//   const { id } = request.params;
//   const index = usuarios.findIndex((u) => u.id === id);
//   usuarios.splice(index, 1);

//   return response.status(200).json({ message: "Usuário deletado com sucesso!" });
// });

// // ─── Iniciar servidor ─────────────────────────────────────────────────────────
// app.listen(port, () => {
//   console.log(`🚀 Servidor rodando na porta ${port}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
  host: "localhost", // Substitua pelo host do seu banco
  user: "root",      // Substitua pelo seu usuário
  password: "mysql", // Substitua pela sua senha
  database: "Gravadora", // Substitua pelo nome do seu banco de dados
});

// Conecta ao banco de dados
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conectado ao banco de dados MySQL!");
  }
});

// Rota para registro de usuário
app.post("/register", (req, res) => {
  const { user, cpf, email, pass } = req.body;

  const sql = "INSERT INTO produtor (nome, cpf, email, password) VALUES (?, ?, ?, ?)";
  db.query(sql, [user, cpf, email, pass], (err, result) => {
    if (err) {
      console.error("Erro ao inserir dados:", err);
      res.status(500).send("Erro ao registrar o usuário.");
    } else {
      res.status(200).send("Usuário registrado com sucesso!");
    }
  });
});

app.post("/login", (req, res) => {
    const { user, pass } = req.body;

    // Aqui você pode verificar o usuário e senha no banco de dados
    // Exemplo simples de verificação (adapte para seu banco de dados)
    const query = `SELECT * FROM produtor WHERE nome = ? AND password = ?`;
    db.query(query, [user, pass], (err, result) => {
        if (err) {
            res.status(500).send({ success: false, message: "Erro interno do servidor" });
        } else if (result.length > 0) {
            // Usuário encontrado, login bem-sucedido
            res.status(200).send({ success: true });
        } else {
            // Usuário ou senha incorretos
            res.status(401).send({ success: false, message: "Usuário ou senha inválidos" });
        }
    });
});


// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

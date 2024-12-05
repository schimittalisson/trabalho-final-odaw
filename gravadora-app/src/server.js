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

// Rota para registro de artista
app.post("/add-artist", (req, res) => {
  const { name, type, extraFields } = req.body;

  // Inserir na tabela Artista
  const sqlInsertArtist = "INSERT INTO Artista (tipo_artista) VALUES (?)";

  db.query(sqlInsertArtist, [type], (err, result) => {
    if (err) {
      console.error("Erro ao inserir na tabela Artista:", err);
      res.status(500).send("Erro ao adicionar artista.");
      return;
    }

    const artistId = result.insertId; // ID gerado na tabela Artista

    // Inserir na tabela Musico ou Banda
    if (type === "Solo") {
      const sqlInsertMusico =
        "INSERT INTO Musico (id_artista, nome, rua, cidade, estado, numero, telefone) VALUES (?, ?, ?, ?, ?, ?, ?)";

      db.query(
        sqlInsertMusico,
        [
          artistId,
          name,
          extraFields.rua,
          extraFields.cidade,
          extraFields.estado,
          extraFields.numero,
          extraFields.telefone,
        ],
        (err) => {
          if (err) {
            console.error("Erro ao inserir na tabela Musico:", err);
            res.status(500).send("Erro ao adicionar músico.");
          } else {
            res.status(200).send("Músico adicionado com sucesso!");
          }
        }
      );
    } else if (type === "Banda") {
      const sqlInsertBanda =
        "INSERT INTO Banda (id_artista, nome) VALUES (?, ?)";

      db.query(sqlInsertBanda, [artistId, name], (err) => {
        if (err) {
          console.error("Erro ao inserir na tabela Banda:", err);
          res.status(500).send("Erro ao adicionar banda.");
        } else {
          res.status(200).send("Banda adicionada com sucesso!");
        }
      });
    }
  });
});

// Rota para obter todos os artistas 
app.get("/get-artists", (req, res) => {
  const sql = `
    SELECT 
  a.id_artista AS id, 
  CASE 
    WHEN a.tipo_artista = 'Solo' THEN m.nome  -- Para artistas solo, pega o nome da tabela 'musico'
    WHEN a.tipo_artista = 'Banda' THEN b.nome  -- Para bandas, pega o nome da tabela 'banda'
  END AS name,
  a.tipo_artista AS type,
  m.rua, 
  m.cidade, 
  m.estado, 
  m.numero, 
  m.telefone
FROM artista a
LEFT JOIN musico m ON a.id_artista = m.id_artista AND a.tipo_artista = 'Solo'
LEFT JOIN banda b ON a.id_artista = b.id_artista AND a.tipo_artista = 'Banda';
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Erro ao buscar artistas:", err);
      return res.status(500).json({ message: "Erro ao buscar artistas." });
    } 
    
    const artists = result.map((artist) => {
      if (artist.type === "Solo") {
        return {
          id: artist.id,
          name: artist.name,
          type: artist.type,
          extraFields: {
            rua: artist.rua,
            cidade: artist.cidade,
            estado: artist.estado,
            numero: artist.numero,
            telefone: artist.telefone,
          },
        };
      } else if (artist.type === "Banda") {
        return {
          id: artist.id,
          name: artist.name,
          type: artist.type,
          extraFields: null,
        };
      }
      return {
        id: artist.id,
        name: artist.name,
        type: artist.type,
        extraFields: null,
      };
    });

    res.status(200).json(artists);
  });
});

/*app.get("/get-artists", (req, res) => {
  res.json([{ id: 1, name: "Artista 1", type: "Solo" }, { id: 2, name: "Artista 2", type: "Banda" }]);
});*/




// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

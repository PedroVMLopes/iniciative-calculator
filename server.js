const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const FILE_PATH = "./data.json";

// Rota para salvar os dados no arquivo JSON
app.post("/save", (req, res) => {
  const newData = req.body;

  // Lê os dados existentes no arquivo JSON
  fs.readFile(FILE_PATH, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao ler o arquivo" });
    }

    const parsedData = data ? JSON.parse(data) : [];
    parsedData.push(newData);

    // Salva os novos dados no arquivo JSON
    fs.writeFile(FILE_PATH, JSON.stringify(parsedData, null, 2), (writeErr) => {
      if (writeErr) {
        return res.status(500).json({ error: "Erro ao salvar os dados" });
      }

      res.status(200).json({ message: "Dados salvos com sucesso!" });
    });
  });
});

// Inicializa o servidor na porta 5000
app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});

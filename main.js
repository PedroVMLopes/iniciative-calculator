const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const { exec } = require("child_process");

let mainWindow;
let jsonServerProcess;

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:3000");
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, "build", "index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  }
}

app.on("ready", () => {
  // Inicia o json-server
  // Certifique-se de que o comando e o caminho para o arquivo JSON estejam corretos
  const dbPath = path.join(__dirname, "data.json"); // ajuste conforme sua estrutura
  const port = 5000; // defina a porta que desejar (diferente da porta de desenvolvimento, se necessário)
  jsonServerProcess = exec(
    `json-server --watch ${dbPath} --port ${port}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao iniciar o json-server: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr do json-server: ${stderr}`);
        return;
      }
      console.log(`json-server iniciado: ${stdout}`);
    }
  );

  createWindow();
});

app.on("window-all-closed", () => {
  // Encerra o json-server ao fechar a aplicação
  if (jsonServerProcess) {
    jsonServerProcess.kill();
  }
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

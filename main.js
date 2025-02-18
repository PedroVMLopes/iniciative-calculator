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

function startJsonServer() {
  // Caminho absoluto para o arquivo de dados
  const dbPath = path.join(__dirname, "data.json");
  const port = 5000;

  // Utilize o executável do json-server a partir da pasta node_modules
  // Isso garante que ele seja encontrado mesmo que não esteja instalado globalmente
  const jsonServerExecutable = path.join(
    __dirname,
    "node_modules",
    ".bin",
    "json-server"
  );

  // Monta o comando
  const command = `"${jsonServerExecutable}" --watch "${dbPath}" --port ${port}`;

  console.log("Iniciando o json-server com o comando:", command);

  jsonServerProcess = exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao iniciar o json-server: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr do json-server: ${stderr}`);
    }
    console.log(`json-server iniciado: ${stdout}`);
  });
}

app.on("ready", () => {
  startJsonServer();
  createWindow();
});

app.on("window-all-closed", () => {
  // Finaliza o json-server ao fechar a aplicação
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

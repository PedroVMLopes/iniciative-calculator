const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const { exec } = require("child_process");

let mainWindow;
let jsonServerProcess;

function startJsonServer() {
  const dbPath = path.join(__dirname, "data.json");
  const port = 5000;

  const jsonServerExecutable = path.join(
    __dirname,
    "node_modules",
    ".bin",
    "json-server"
  );

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

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false,
    },
    frame: true, // Permite o uso da barra de título customizada
  });

  const appURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : url.format({
          pathname: path.join(__dirname, "build", "index.html"),
          protocol: "file:",
          slashes: true,
        });

  mainWindow.loadURL(appURL);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  startJsonServer();
  createWindow();

  app.on("activate", () => {
    if (mainWindow === null) createWindow();
  });
});

// IPC Handlers
ipcMain.on("window-minimize", () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on("window-maximize", () => {
  if (mainWindow) {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
  }
});

ipcMain.on("window-close", () => {
  if (mainWindow) mainWindow.close();
});

// Finalizar o json-server ao fechar a aplicação
app.on("window-all-closed", () => {
  if (jsonServerProcess) {
    jsonServerProcess.kill();
    console.log("json-server finalizado.");
  }
  if (process.platform !== "darwin") app.quit();
});

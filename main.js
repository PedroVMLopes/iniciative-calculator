const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  console.log("NODE_ENV:", process.env.NODE_ENV); // Para depurar
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
  });

  win.webContents.openDevTools();

  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:3000");
  } else {
    win.loadFile(path.join(__dirname, "build", "index.html"));
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

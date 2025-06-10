const { app, BrowserWindow } = require("electron/main");
const path = require("path");


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
     webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  // win.loadFile("src/index.html");
  // win.LoadURL("http://localhost:5173/");
  win.loadFile(path.join(__dirname, 'CCSchool-vue/dist/index.html'))

  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

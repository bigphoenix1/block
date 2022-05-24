const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
// require("electron-reload")(__dirname, {
//   // Note that the path to electron may vary according to the main file
//   electron: require(__dirname, "node_modules", "electron"),
// });

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

// electronReload(__dirname);

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1920,
    height: 1080,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// const template = [
//   {
//     label: "test",
//     submenu: [
//       {
//         label: "Open",
//         click: function () {
//           console.log("Clicked Menu Open!!!");
//         },
//       },
//       { type: "separator" },
//       { label: "Menu Item 2", type: "checkbox", checked: true },
//       {
//         role: "toggleDevTools",
//       },
//     ],
//   },
// ];
// const menu = Menu.buildFromTemplate(template);
// Menu.setApplicationMenu(menu);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

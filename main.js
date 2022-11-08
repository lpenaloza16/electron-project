// Modules
const { app, BrowserWindow } = require("electron");

//colors package import
const colors = require("colors");

console.log(colors.rainbow("Herro"));

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secondaryWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 640,
    minHeight: 480,
    frame: false,
    titleBarStyle: "hidden",
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
    },
    //hiding window until all content is loaded:
    backgroundColor: "#2B2E3B",
    //show: false,
  });

  /*
   secondaryWindow = new BrowserWindow({
    width: 600,
    height: 300,
    parent: mainWindow,
    modal: true, //shares same top bar as parent
    show: false,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
    },
    //hiding window until all content is loaded:
    backgroundColor: "#2B2E3B",
    //show: false,
  });
 */

  //will only fire one,
  //mainWindow.once("ready-to-show", mainWindow.show); //what,where; will still flicker but only because of css rendering, not html

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");
  /*
 
   secondaryWindow.loadFile("secondary.html");
 */
  //loads local file
  //mainWindow.loadURL("https://www.roblox.com/home"); //loads url

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();
  //Automatically opens devtools allowing us to debug immediately

  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // mainWindow.on("closed", () => {
  //   console.log(`tested`);
  // });

  /*
    secondaryWindow.on("closed", () => {
    mainWindow = null;
  });
  */
}

/*
  setTimeout(() => {
  secondaryWindow.show();
  setTimeout(() => {
    //secondaryWindow.hide();
    secondaryWindow.close();
    secondaryWindow = null;
  }, 3000);
}, 2000);
*/

//a timer to SHOW then after a while will hide again; but we rather close it and set it to nothing

// Electron `app` is ready
app.on("ready", createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});

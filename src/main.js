const { app, BrowserWindow, Menu } = require('electron')
const { session } = require('electron')
const { UA, referer } = require('./config')
const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')
const registerHandlers = require('./handlers.js')

Menu.setApplicationMenu(null)

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit()
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
      /* eslint-disable no-undef */
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
    // titleBarStyle: 'hidden'
    // frame: false
  })

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY, {
    // userAgent: USER_AGENT,
    // httpReferrer: HTTP_REFERER
  })
  // Open the DevTools.

  const xxxFilter = {
    urls: ['*://*/*']
  }
  session.defaultSession.webRequest.onBeforeSendHeaders(xxxFilter, (details, callback) => {
    details.requestHeaders['User-Agent'] = UA
    details.requestHeaders.Referer = referer
    /* eslint-disable node/no-callback-literal */
    callback({ requestHeaders: details.requestHeaders })
  })
  // allow cross domain ajax request
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['connect-src *;']
      }
    })
  })

  registerHandlers(mainWindow.webContents)
  return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  const mainWindow = createWindow()
  if (process.env.mode === 'development') {
    installExtension(VUEJS_DEVTOOLS)
      .then((name) => console.log('installed ', name))
      .catch((err) => console.log('An error occurred: ', err))

    const ses = mainWindow.webContents.session
    console.log('all path', ses.getStoragePath())

    mainWindow.webContents.on('did-frame-finish-load', () => {
      mainWindow.webContents.once('devtools-opened', () => {
        mainWindow.focus()
      })
      mainWindow.webContents.openDevTools()
    })
  }
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

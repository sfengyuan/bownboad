import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld('ipc', {
  global: {
    taskStatusUpdate (handler) {
      ipcRenderer.on('download:status', (ev, data) => handler(data))
    }
  },
  home: {
    add (url, replyHandler) {
      ipcRenderer.send('home:add', url)
      ipcRenderer.once('home:add:reply', (ev, data) => replyHandler(data))
    },
    download (data, replyHandler) {
      ipcRenderer.send('home:download', data)
      ipcRenderer.once('home:download:reply', (ev, data) => replyHandler(data))
    }
  },
  downloading: {
    start (id, replyHandler) {
      ipcRenderer.send('downloading:start', id)
      ipcRenderer.once('downloading:start:reply', (ev, data) => replyHandler(data))
    },
    stop (id, replyHandler) {
      ipcRenderer.send('downloading:stop', id)
      ipcRenderer.once('downloading:stop:reply', (ev, data) => replyHandler(data))
    },
    remove (id, replyHandler) {
      ipcRenderer.send('downloading:remove', id)
      ipcRenderer.once('downloading:remove:reply', (ev, data) => replyHandler(data))
    }
  },
  downloaded: {
    remove (id, replyHandler) {
      ipcRenderer.send('downloaded:remove', id)
      ipcRenderer.once('downloaded:remove:reply', (ev, data) => replyHandler(data))
    }
  }
})

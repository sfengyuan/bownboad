const { ipcMain } = require('electron')
const { getVideo } = require('./api')
const DM = require('./utils/DownloadManager')
const home = {}
const dm = new DM()
home.add = (ev, url) => {
  console.log('on home:add', url)
  ;(async function () {
    const info = await getVideo(url)
    ev.reply('home:add:reply', info)
  })()
}

home.download = (ev, videos, win) => {
  console.log('home:download')
  dm.setWindow(win)
  dm.addTask(videos)
  dm.start()
  ev.reply('home:download:reply', videos)
}

const downloading = {}
downloading.start = (ev, msg) => {
  console.log('downloading:start', msg)
  ev.reply('downloading:start:reply', msg)
}
downloading.stop = (ev, msg) => {
  console.log('downloading:stop', msg)
  ev.reply('downloading:stop:reply', msg)
}
downloading.remove = (ev, msg) => {
  console.log('downloading:remove', msg)
  ev.reply('downloading:remove:reply', msg)
}

const downloaded = {}
downloaded.remove = (ev, stat) => {
  console.log('downloaded:remove', stat)
  dm.removeTask(stat)
  ev.reply('downloaded:remove:reply', stat)
}

module.exports = function (win) {
  ipcMain.on('home:add', home.add)
  ipcMain.on('home:download', (ev, msg) => {
    home.download(ev, msg, win)
  })
  ipcMain.on('downloading:start', downloading.start)
  ipcMain.on('downloading:stop', downloading.stop)
  ipcMain.on('downloading:remove', downloading.remove)
  ipcMain.on('downloaded:remove', downloaded.remove)
}

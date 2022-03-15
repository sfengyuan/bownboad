const Downloader = require('nodejs-file-downloader')
const { UA, referer } = require('../config')
const path = require('path')
const exec = require('child_process').exec
const del = require('del')
class DM {
  static STAT_READY = 0
  static STAT_DOWNLOADING = 1
  static STAT_DONE = 2
  static STAT_STOP = 3
  static STAT_ERROR = 4
  static STAT_NEED_RETRY = 5
  constructor (info = [], options = {}) {
    this.taskId = -1
    this.tasks = []
    this.channel = 'download:status'
    const defaults = {
      parellel: 3,
      dir: path.resolve(__dirname, './downloads'),
      headers: { referer, 'user-agent': UA },
      maxAttempts: 10
    }

    this.opts = Object.assign({}, defaults, options)
    this.addTask(info)
  }

  addTask (info) {
    if (!Array.isArray(info)) {
      info = [info]
    }
    console.log('will add task:', this.tasks)
    info = info.filter(v => {
      if (v.dash) {
        return !this.tasks.some(t => {
          if (t.dash) {
            return v.dash.video[0].baseUrl === t.dash.video[0].baseUrl
          }
          return false
        })
      }
      return true
    })
    this.tasks = this.tasks.concat(
      info
        .map(video => {
        video.stat = DM.STAT_READY
        video.taskId = ++this.taskId
        video.useBackup = false
        return video
    }))
    console.log('added task', this.tasks)
    return this.tasks
  }

  removeTask(stat) {
    if(stat === 0) {
      this.tasks = this.tasks.filter(t => t.stat !== DM.STAT_DONE)
    } else {
      this.tasks = this.tasks.filter(t => t.stat !== stat)
    }
    this.sendStatus(this.tasks)
  }

  // new BrowserWindow().webContents
  setWindow(win) {
    this.win = win
  }

  sendStatus (msg) {
    this.win.send(this.channel, msg)
  }

  start () {
    let counts = this.countTask(DM.STAT_DOWNLOADING)
    while (counts < this.opts.parellel) {
      const task = this.pickTask(DM.STAT_READY)
      if (!task) return
      task.stat = DM.STAT_DOWNLOADING
      this.sendStatus(this.tasks)
      counts += 1
      this.download(task)
    }
  }

  countTask (stat) {
    return this.tasks.filter(t => t.stat === stat).length
  }

  pickTask (stat) {
    return this.tasks.find(t => t.stat === stat)
  }

  async download (task) {
    if (task.dash) {
      this.downloadDash(task)
      return
    }
    let isOk = true
    for (let seg of task.durl) {
      try {
        await this._downloadFile(task, seg, task.pageTitle)
      } catch (err) {
        isOk = false
        console.log('Seg error order: ', task.pageTitle + seg.order)
        console.log(err.message)
        break
      }
    }

    task.stat = isOk ? DM.STAT_DONE : DM.STAT_ERROR
    this.sendStatus(this.tasks)
    this.start()
  }

  async downloadDash (task) {
    console.log('downloadDash:dir', this.opts.dir)
    let isOk = true
    if (task.isAudioOnly) {

    }
    const audio = task.dash.audio.find(info => info.id === 30280)
    const video = task.dash.video.find(info => info.id === task.selected)
    try {
      const vname = task.pageTitle + '-video'
      const aname = task.pageTitle + '-audio'
      const vfile = vname + '.m4s'
      const afile = aname + '.m4s'
      await Promise.all([this._downloadFile(task, video, vname), this._downloadFile(task, audio, aname)])
      console.log('Downloaded, run ffmpeg to convert files to MP4')
      exec(`ffmpeg -i ${vfile} -i ${afile} -codec copy ${task.pageTitle}.mp4`,{ cwd: this.opts.dir }, (err, stdout, stderr) => {
        if (err) {
          console.log(err.message)
          return
        }
        // if (stderr) {
        //   console.log(stderr)
        //   return
        // }
        del([path.resolve(this.opts.dir, afile), path.resolve(this.opts.dir, vfile)])
      })
    } catch (err) {
      isOk = false
      console.log('Dash Error', err.message)
    }
    task.stat = isOk ? DM.STAT_DONE : DM.STAT_ERROR
    this.sendStatus(this.tasks)
    this.start()
  }

  async _downloadFile (task, info, filename) {
    const url = info.url || info.baseUrl || info.base_url
    const downloader = this.createDownloader(filename, url)
    try {
      await  downloader.download()
    } catch (err) {
      console.log(err.message)
      console.log('try backup')
      await this._downloadBackup(task, info, filename)
    }
  }

  async _downloadBackup(task, info, filename) {
    for(let url of info.backup_url) {
      const downloader = this.createDownloader(filename, url, filename)
      try {
        await downloader.download()
        return
      } catch (err) {
        console.log(err.message)
        console.log('backup url Failed.')
      }
    }
    throw new Error('All backup urls Failed.')
  }

  createDownloader (filename, url) {
    const { dir, headers, maxAttempts } = this.opts

    return new Downloader({
      url: url,
      maxAttempts: maxAttempts,
      directory: dir,
      onBeforeSave: deducedName => {
        if (filename) {
          return filename + path.extname(deducedName)
        }
        return deducedName
      },
      headers: headers,
      onProgress: (percentage, chunk, remainingSize) => {
        // console.log('% ', percentage)
        // console.log('Current chunk of data: ', chunk)
        // console.log('Remaining bytes: ', remainingSize)
      },
      // onError: err => {
      //   console.log('Error from attempt ', err.message)
      // }
    })
  }
}

module.exports = DM

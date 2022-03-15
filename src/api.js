const got = require('./utils/got')

const getVideo = async url => {
  const bvid = /BV[\d\w]+/.exec(url)[0]
  const details = await got('http://api.bilibili.com/x/web-interface/view?bvid=' + bvid)

  // const mp4Pages = await getPages(details, { fnval: 1, qn: 80 })
  details.data.pages = await getPages(details, { fnval: 16 })
  return reshapeData(details)
}

/*
  cid: page id
  qn: dash模式无效
    6: 240P 仅mp4
    16: 360P
    32: 480P
    64: 720P
    74: 720P60
    80: 1080P
    112: 1080P+ 大会员
    116: 1080P60
    120: 4K 需要fnver 128 , fourk 1
    125: HDR 需要 fnver 64
  fnval: 格式, 默认0, 可组合运算如:fnval=16|64=80
    0: flv
    1: mp4
    16: dash
    64: HDR 需要qn 125
    128: 4K, 需要qn 120 fouk
    256: 杜比

  fnver: 固定为0
  fouk: 4k, 默认0, 1080P: 0, 4K: 1
  */

const getPages = (videoInfo, { fnval, qn }) => {
  return Promise.all(videoInfo.data.pages.map(async page => {
    let quality = '&fnval=' + fnval
    quality += fnval === 16 ? '' : '&qn=' + qn
    const { data } = await got(`http://api.bilibili.com/x/player/playurl?bvid=${videoInfo.data.bvid}&cid=${page.cid}&fouk=0&fnver=0${quality}`)
    const { durl, support_formats: resolutions, dash } = data
    return {
      resolutions: resolutions.map(f => ({ name: f.new_description, code: f.quality, format: f.format })),
      pageTitle: page.part,
      durl,
      dash
    }
  }))
}

function reshapeData (details) {
  const { bvid: id, pic, title, pubdate: publishedAt, desc, owner, pages } = details.data
  return pages.map(p => {
    const { pageTitle, resolutions, durl, dash } = p
    return {
      id,
      pic,
      title,
      pageTitle,
      publishedAt,
      desc,
      owner,
      resolutions,
      dash,
      durl,
      selected: 32,
      isAudioOnly: false
    }
  })
}

module.exports = {
  getVideo
}

//解决小程序端真机图片不展示

/**
 * 动态绑定的使用方式 例如首页使用：
 * import common from '@/utils/common'
 * :style="{
			backgroundImage: `url(${common.urlTobase64('home', 'home-bg')})`,
	 }"
 */

/**
 * 获取本地图
 * @param folder // 文件夹名字 如 /static/images/home
 * @param fileName // 文件名 如 home-bg
 * @param format // 文件类型 如 png jpg
 * @returns {*|string}
 */

// #ifdef MP-WEIXIN
const urlTobase64 = (folder: string, fileName: string, format = 'png') => {
  let img = `/static/${folder}/${fileName}.${format}`,
    imgBase64 = wx.getFileSystemManager().readFileSync(img, 'base64'),
    base64Url = `data:image/png;base64,${imgBase64}`
  /*   console.log(
      "data:image/png;base64," + imgBase64,
      "图片转换成功+++++++++++++++++++++++++++++"
    ); */

  return base64Url
}
// #endif

//获取状态栏的高度
const getStatusBarHeight = () => {
  let statusBarHeight = null
  wx.getSystemInfo({
    success: function (res:any) {
      statusBarHeight = res.statusBarHeight
    }
  })
  return statusBarHeight+'px'
}

export default {
  urlTobase64,
  getStatusBarHeight
}

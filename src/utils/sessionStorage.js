const userInfo = 'userInfo'
const sessionHandle = {
  // 查
  setSession (data) {
    let jsonStr = JSON.stringify(data)
    sessionStorage.setItem(userInfo, jsonStr)
  },
  // 获取数据
  getSession () {
    const jsonStr = window.sessionStorage.getItem(userInfo)
    return JSON.parse(jsonStr)
  },
  // 删除
  delSession () {
    window.sessionStorage.removeItem(userInfo)
  }
}
export default sessionHandle

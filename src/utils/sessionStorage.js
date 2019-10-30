const userInfo = 'userInfo'
const sessionHandle = {
  // 获取
  setSession (data) {
    let jsonStr = JSON.stringify(data)
    sessionStorage.setItem(userInfo, jsonStr)
  },
  // 获取
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

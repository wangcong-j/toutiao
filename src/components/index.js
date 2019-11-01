// 封装一个插件，注册全局组件
import MyBread from '../components/my_bread'
export default {
  install (Vue) {
    // 基于vue做任何事情（注册全局组件、指令等）
    Vue.component(MyBread.name, MyBread)
  }
}

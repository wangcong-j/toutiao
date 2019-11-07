// 封装一个插件，注册全局组件
import MyBread from '../components/my_bread'
import MySelect from '../components/mySelect'
import Imger from '../components/imger'
export default {
  install (Vue) {
    // 基于vue做任何事情（注册全局组件、指令等）
    Vue.component(MyBread.name, MyBread)
    Vue.component(MySelect.name, MySelect)
    Vue.component(Imger.name, Imger)
  }
}

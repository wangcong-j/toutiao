<template>
  <el-container class="home-container">
    <!-- 侧边栏信息 -->
    <el-aside :width="!isCollapse?'200px':'64px'"
              class="left">
      <div class="bg_logo"
           :class="{small_logo:isCollapse}"></div>
      <!-- default-active=    默认激活样式选择 -->
      <el-menu router
               unique-opened
               :default-active="$route.path"
               class="el-menu-vertical-demo"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               :collapse="isCollapse"
               :collapse-transition="false">
        <el-menu-item index="/home">
          <i class="el-icon-house"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="/article">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/article">内容管理</el-menu-item>
            <el-menu-item index="/image">素材管理</el-menu-item>
            <el-menu-item index="/publish">发布文章</el-menu-item>
            <el-menu-item index="/comment">评论管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/fans">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>粉丝管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/fans">粉丝管理</el-menu-item>
            <el-menu-item index="3-2">图文数据</el-menu-item>
            <el-menu-item index="3-3">粉丝画像</el-menu-item>
            <el-menu-item index="3-3">粉丝列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/setting">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>个人设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/setting">个人设置</el-menu-item>
            <el-menu-item index="4-2">账号信息</el-menu-item>
            <el-menu-item index="4-3">账号信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>异步应用</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1">异步应用</el-menu-item>
            <el-menu-item index="5-2">异步应用</el-menu-item>
            <el-menu-item index="5-3">异步应用</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 头部信息 -->
      <el-header>
        <span class="el-icon-s-unfold icon_logo"
              @click="click_icon"></span>
        <span class="text_logo">阅读器后台</span>
        <el-dropdown style="float:right"
                     @command='hanadleClick'>
          <img class="headIcon"
               :src="photo"
               alt="">
          <span class="el-dropdown-link  user"> {{name}}
            <i class="el-icon-arrow-down el-icon--right"
               icon_i></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='setting'
                              icon="el-icon-user-solid">个人信息</el-dropdown-item>
            <el-dropdown-item command='gitup'
                              icon="el-icon-share">gitup地址</el-dropdown-item>
            <el-dropdown-item command='logout'
                              icon="el-icon-switch-button">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-header>

      <el-main style="">
        <!-- 视图三   更改信息 -->
        <router-view></router-view>
      </el-main>

    </el-container>
  </el-container>

</template>

<script>
import sessionStorage from '../../utils/sessionStorage'
import eventBus from '../../eventBus'

export default {
  data () {
    return {
      isCollapse: false,
      // 用户名
      name: null,
      // 用户头像
      photo: ''
    }
  },
  // 在组件初始化时 添加函数
  created () {
    const user = sessionStorage.getSession() || {}
    this.photo = user.photo
    this.name = user.name

    // 绑定事件  eventbus 接受传过来的参数 更新用户名
    eventBus.$on('updateName', name => {
      this.name = name
    })
    // 绑定事件  eventbus 回调函数中接收传过来的值，更新对应的数据    非父子之间传值
    eventBus.$on('photo', photo => {
      this.photo = photo
    })
  },
  methods: {
    click_icon () {
      this.isCollapse = !this.isCollapse
    },
    // 组件不支持click  但vue 提供了事件修饰符 native
    // 个人信息设置
    setting () {
      this.$router.push('./setting')
    },
    // gitup跳转接口
    gitup () {
      this.$router.push('./gitup')
    },
    // 退出接口
    logout () {
      sessionStorage.delSession()
      this.$router.push('./login')
    },
    hanadleClick (command) {
      this[command]()
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  .el-aside {
    background: rgb(84, 92, 100);
    .bg_logo {
      width: 100%;
      height: 60px;
      background: url(../../assets/login.png);
    }
    .small_logo {
      background-image: url(../../assets/logo_admin_01.png);
      background-position: center center;
      background-size: 30px 30px;
      background-repeat: no-repeat;
      // margin: 8px;
    }
    .el-menu {
      width: 100%;
      border: 0 none;
    }
  }

  .el-header {
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    line-height: 60px;
    .icon_logo {
      vertical-align: middle;
      font-size: 34px;
      display: inline-block;
      margin-right: 5px;
    }
    .text_logo {
      vertical-align: middle;
      font-size: 22px;
    }
    .user {
      margin: 0 10px;
      // display: inline-block;
    }
    .headIcon {
      display: inline-block;
      width: 30px;
      height: 30px;
      vertical-align: middle;
      border-radius: 50%;
    }
    .icon_i {
      margin-right: 20px;
    }
  }
}
</style>

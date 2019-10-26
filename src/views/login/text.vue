<template>
  <!-- <div class="bgc">
      <h1>text</h1>
      <el-card>
    <img src="../../assets/logo_index.png" alt="">
<el-form ref="form" :model="form" >

    <el-input v-model="form.name"></el-input>

    <el-input v-model="form.name"></el-input>
    <el-button>获取验证码</el-button>
    <br>
    <el-switch v-model="form.delivery"></el-switch>
  <el-form-item label="我已阅读并同意用户协议和隐私条款">
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
      </el-card>

  </div> -->
<el-container>
  <el-header>Header
    <img src="../../assets/welcome.jpg" alt="">
  </el-header>
  <el-col :span="12">
    <h5>自定义颜色</h5>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
                   <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item index="1-3">选项3</el-menu-item>
        <el-submenu index="1-4">
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
       <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
                   <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <el-menu-item index="2-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-col>
</el-container>

</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style>
.bgc{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url(../../assets/login_bg.jpg) no-repeat center/cover;
}
.el-card{
    width: 400px;
    height: 350px;
}
</style>

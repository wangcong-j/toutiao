<template>
    <div class='container'> login

        <el-card>
          <img src="../../assets/logo_index.png" alt="">

        <el-form :model="LoginForm" :rules="rules" status-icon>
        <el-form-item  prop="mobile">
          <el-input v-model="LoginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item  prop="code">
          <el-input v-model="LoginForm.code" placeholder="请输入验证码" style="width:240px;margin-right:8px"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  style="width:100%;">登录</el-button>
        </el-form-item>
      </el-form>

        </el-card>
    </div>
</template>
<script>
export default {
  data () {
    var rulezz = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('输入出错啦！'))
      }
    }
    return {
      LoginForm: {
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: rulezz, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

  }
}
</script>
<style>
.container{
    width: 100%;
    height: 100%;
    background:url(../../assets/login_bg.jpg) no-repeat center/cover;
    position: absolute;
    left: 0;
    top: 0;
}
.el-card{

    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
img{
    display: block;
    width: 200px;
    margin: 0 auto;
}
</style>

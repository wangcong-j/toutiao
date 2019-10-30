<template>
    <div class='container'> login

        <el-card>
          <img src="../../assets/logo_index.png" alt="">

      <el-form ref="fromlogin" :model="LoginForm" :rules="rules" status-icon>
        <el-form-item  prop="mobile">
          <el-input v-model="LoginForm.mobile" placeholder="请输入手机号" ></el-input>
        </el-form-item>
        <el-form-item  prop="code">
          <el-input v-model="LoginForm.code" placeholder="请输入验证码" style="width:240px;margin-right:8px"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  style="width:100%;" @click="login">登录</el-button>
        </el-form-item>
      </el-form>

        </el-card>
    </div>
</template>
<script>
import sessionHanlde from '../../utils/sessionStorage.js'
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
        mobile: '13911111111',
        code: '246810'
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
    login () {
      // 对整个表单进行验证
      this.$refs['fromlogin'].validate(async (valid) => {
        if (valid) {
          // 验证成功  进行登录（发请求）
          this.$http.post('authorizations', this.LoginForm).then(res => {
            // 保存用户信息（tolen）
            sessionHanlde.setSession(res.data.data)
            this.$router.push({ path: '/Home' })
          }).catch(err => {
            console.log(err)
            this.$message({
              message: '用户名或验证码输入错误',
              type: 'warning'
            })
          })

          // try {
          //   const { data: { data } } = await this.$http.post('authorizations', this.LoginForm)
          //   sessionHanlde.setSession(data)
          //   this.$router.push({ path: '/Home' })
          // } catch (error) {
          //   this.$message({
          //     message: '用户名或验证码输入错误'
          //   })
          // }
        }
      })
    }
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

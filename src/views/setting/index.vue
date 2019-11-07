<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12"
                style="display:flex;">
          <div style="flex:3; margin-top:20px">
            <el-form label-width="160px">
              <el-form-item label="用户名">
                <el-input v-model="userInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="简介">
                <el-input v-model="userInfo.intro"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="userInfo.email"></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="userInfo.phone"
                          disabled></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="pushsetting">保存设置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div style="flex:1"></div>
        </el-col>
        <el-col :span="12">
          <div style="margin-top:20px">
            <!-- 头像区域 -->
            <el-upload class="avatar-uploader"
                       action=""
                       :show-file-list="false"
                       :http-request="pushPhoto">

              <img v-if="userInfo.photo"
                   :src="userInfo.photo"
                   class="avatar">
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p></p>
            <h3 style="text-align:center">修改头像</h3>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import SessionStorage from '../../utils/sessionStorage'
import eventBus from '../../eventBus'
export default {
  data () {
    return {
      //   上传组件   携带的请求头
      userInfo: {
        name: null,
        intro: null,
        email: null,
        phone: 13900000000,
        photo: null
      }
    }
  },
  created () {
    this.getsetting()
  },
  methods: {
    //   获取用户信息数据
    async getsetting () {
      const {
        data: { data }
      } = await this.$http.get('user/profile')
      this.userInfo.name = data.name
      this.userInfo.intro = data.intro
      this.userInfo.email = data.email
      this.userInfo.phone = data.mobile
      this.userInfo.photo = data.photo
    },
    // 自定义上传头像
    async pushPhoto (res) {
      const formData = new FormData()
      formData.append('photo', res.file)
      const {
        data: { data }
      } = await this.$http({
        method: 'patch',
        url: 'user/photo',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      this.userInfo.photo = data.photo
      //   更新用户头像
      eventBus.$emit('photo', this.userInfo.photo)
    },
    // 上传用户修改信息
    async pushsetting () {
      await this.$http({
        method: 'patch',
        url: 'user/profile',
        data: {
          name: this.userInfo.name,
          intro: this.userInfo.intro,
          email: this.userInfo.email
        }
      })
      this.$message.success('修改成功')
      //   更新本地存储
      const user = SessionStorage.getSession()
      user.name = this.userInfo.name
      user.photo = this.userInfo.photo
      SessionStorage.setSession(user)

      // 更新home信息
      // 通过 eventbus 触发事件
      eventBus.$emit('updateName', this.userInfo.name)
    }
  }
}
</script>

<style lang="less">
.box-card.el-card {
  width: 100%;
  height: auto;
  position: relative;
  left: 0;
  top: 0;
  -webkit-transform: translate(0, 0);
  transform: translate(0, 0);
}
</style>

<template>
  <el-upload class="avatar-uploader"
             action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
             :headers="headers"
             name="image"
             :on-success="handSuccess"
             :show-file-list="false">
    <img v-if="imageUrl"
         :src="imageUrl"
         class="avatar">
    <i v-else
       class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import SessionStorage from '../utils/sessionStorage'
export default {
  // 声明组件名称
  name: 'Imger',
  data () {
    return {
      //   上传组件   携带的请求头
      headers: {
        Authorization: `Bearer ${SessionStorage.getSession().token}`
      },
      imageUrl: null
    }
  },
  methods: {
    handSuccess (res) {
      console.log(res)
      this.imageUrl = res.data.url
      // 添加提示信息
      this.$message.success('上传成功')
      //   添加定时器,关闭对话框
      window.setTimeout(() => {
        //   关闭对话框
        console.log(123)
        this.dialogVisible = false
        // // 更新列表
        // this.getImages()
      }, 200)
    }
  }
}
</script>

<style>
</style>

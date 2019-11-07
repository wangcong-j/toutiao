<template>
  <div>
    <el-card class="box-card">
      <!-- 表头 -->
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 全部$收藏$添加样式按钮 -->
      <div class="btn"
           style="margin-bottom:20px">
        <!-- 全部&收藏 单选框 -->
        <el-radio-group @change="toggleList"
                        size="small"
                        v-model="reqParams.collect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 添加素材按钮 -->
        <el-button type="success"
                   style="float: right;"
                   round
                   size="small"
                   @click="open">添加素材</el-button>
      </div>

      <!-- 照片展示区 -->
      <div class="img">
        <div v-for="item in images"
             :key="item.id"
             class="img_list">
          <img :src="item.url"
               alt="">
          <div class="footer"
               v-show="!reqParams.collect">
            <span class="el-icon-star-off"
                  :class="{red:item.is_collected}"
                  @click="toggleStatus(item)"></span>
            <span class="el-icon-delete"
                  @click="deleteImage(item.id)"></span>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination background
                     layout="prev, pager, next"
                     :total="total"
                     :page-size="reqParams.per_page"
                     :current-page="reqParams.page"
                     @current-change="pager">
      </el-pagination>
    </el-card>
    <!-- 上传素材按钮   对话框 -->
    <el-dialog title="添加素材"
               :visible.sync="dialogVisible"
               width="30%">
      <span>
        <!-- 显示上传按钮 -->
        <!-- action  上传图片的地址 -->
        <!-- headers  上传组件中需要自己携带请求头 -->
        <!-- name  提交文件的字段名称，需要和后台保持一致  -->
        <!-- :on-success  文件上传成功后的处理函数 -->
        <imger></imger>
        <!-- <el-upload class="avatar-uploader"
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
        </el-upload> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import SessionStorage from '../../utils/sessionStorage'
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10,
        is_collected: false
      },
      // 素材列表
      images: [],
      // 总条数
      total: 0,
      //   添加素材
      dialogVisible: false
      //   上传成功后要显示的图片地址
      //   imageUrl: null
      //   上传组件   携带的请求头
      //   headers: {
      //     Authorization: `Bearer ${SessionStorage.getSession().token}`
      //   }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 切换 全部与收藏 列表
    toggleList () {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      // 获取数据
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      // 赋值给images
      console.log(data)
      this.total = data.total_count
      this.images = data.results
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 切换  添加收藏 取消收藏
    async toggleStatus (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      // 成功（改当前图片的状态，提示）
      item.is_collected = data.collect
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
    },
    // 删除
    deleteImage (id) {
      // 显示确认框
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 点击了确认
          // 1. 发请求
          await this.$http.delete(`user/images/${id}`)
          // 2. 提示
          this.$message.success('删除成功')
          // 3. 更新列表
          this.getImages()
        })
        .catch(() => {
          // 点击了取消
        })
    },
    // 素材上传成功后的处理函数
    // handSuccess (res) {
    //   console.log(res)
    //   this.imageUrl = res.data.url
    //   // 添加提示信息
    //   this.$message.success('上传成功')
    //   //   添加定时器,关闭对话框
    //   window.setTimeout(() => {
    //     //   关闭对话框
    //     this.dialogVisible = false
    //     // 更新列表
    //     this.getImages()
    //   }, 2000)
    // },
    open () {
      // 打开对话框
      this.dialogVisible = true
      // 清空对话框上传处的内容
      this.imageUrl = null
    }
  }
}
</script>

<style lang="less">
.img_list {
  display: inline-block;
  margin: 4px;
  position: relative;

  img {
    width: 200px;
  }
}
.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.4);

  span {
    width: 100px;
  }
  .red {
    color: red;
  }
}
// 上传组件的样式     放到了全局的样式中
</style>

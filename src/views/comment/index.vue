<template>
  <!-- 评论管理   comment -->
  <div>
    <el-card class="box-card">
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 表格 -->
      <el-table :data="articles">
        <el-table-column label="标题"
                         width="400"
                         prop="title"></el-table-column>
        <el-table-column label="总评论数量"
                         prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数"
                         prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{scope.row.comment_status?'正常':'关闭'}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger"
                       small
                       v-if="scope.row.comment_status"
                       @click="toggleStatus(scope.row)">
              关闭评论
            </el-button>
            <el-button type="success"
                       small
                       v-else
                       @click="toggleStatus(scope.row)">
              打开评论
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination style="margin-top:20px"
                     background
                     layout="prev,pager,next"
                     :total="total"
                     :page-size="reqPrams.per_page"
                     :current-page="reqPrams.page"
                     @current-change="pager">

      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 文章列表
      articles: [],
      // 请求参数
      reqPrams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      //   总条数
      total: 0
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    //   获取文章数据
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqPrams })
      this.articles = data.results
      this.total = data.total_count
      console.log(data)
    },
    // 分页方法
    pager (newPager) {
      // 修改当前的页码为新的页码
      this.reqPrams.page = newPager
      // 重新获取数据
      this.getArticles()
    },
    // 切换操作状态
    toggleStatus (row) {
      // row 有id comment_status
      const text = row.comment_status
        ? '您确认要关闭文章的评论功能吗'
        : '您确认要打开评论功能吗'
      // 弹出对话框
      this.$confirm(text, '温馨提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          //   发修改状态请求
          const {
            data: { data }
          } = await this.$http.put(`comments/status?article_id=${row.id}`, {
            allow_comment: !row.comment_status
          })
          // 成功
          this.$message.success(
            data.allow_comment ? '打开评论成功' : '关闭评论成功'
          )
          // 更新当前文章的状态
          row.comment_status = data.allow_comment
        })
        .catch(() => {})
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

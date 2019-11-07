<template>
  <div>
    <!-- 表单筛选 -->
    <el-card class="box-card">
      <div slot="header">
        <!-- 使用面包屑元素 -->
        <my-bread>内容管理</my-bread>
      </div>

      <!-- 表单 -->
      <el-form label-width="80px"
               size="small">
        <el-form-item label="状态：">
          <template>
            <el-radio-group v-model="reqParams.status">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
              <el-radio :label="4">已删除</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <!-- 频道 -->
        <el-form-item label="频道：">
          <my-select v-model="reqParams.channel_id"></my-select>
        </el-form-item>

        <el-form-item label="日期：">
          <el-date-picker v-model="dateArr"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          @change="changeDate"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 筛选结果列表 -->
    <el-card class="box-card"
             style="margin-top:20px ; ">
      <!-- 表头 -->
      <div slot="header">
        <span>根据筛选条件共查询到 {{gitArticles_data.total_count}} 条结果：</span>
      </div>
      <!-- 表格 -->
      <el-table :data="articles">
        <!-- 封面 -->
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]"
                      style="width:150px;height:100px">
              <div slot="error">
                <img src="../../assets/error.gif"
                     width="150"
                     height="100" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <!-- 标题 -->
        <el-table-column label="标题"
                         prop="title"></el-table-column>
        <!-- 状态 -->
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0"
                    type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2"
                    type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3"
                    type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4"
                    type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <!-- 发布时间 -->
        <el-table-column label="发布时间"
                         prop="pubdate"> </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary"
                       icon="el-icon-edit"
                       plain
                       circle
                       @click="toEdit(scope.row.id)"></el-button>
            <el-button type="danger"
                       icon="el-icon-delete"
                       plain
                       circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination style="margin-top:20px"
                     background
                     layout="prev, pager, next"
                     :total="gitArticles_data.total_count"
                     :page-size="reqParams.per_page"
                     :current-page="reqParams.page"
                     @current-change="pager">
      </el-pagination>
    </el-card>
  </div>

</template>
<script>
export default {
  data () {
    return {
      // 提交给后台的参数对象
      // 由axios进行数据提交，字段的值null，axios是不会提交该字段
      // 后台返回的结果参数
      reqParams: {
        status: null,
        begin_pubdate: null,
        end_pubdate: null,
        // 每页多少条数据
        per_page: 10,
        page: 1,
        channel_id: null
      },
      articles: null,

      // 绑定选择日期范围
      dateArr: [],
      // 获取数据总条数
      gitArticles_data: ''
    }
  },
  // 在页面加载时 钩子函数
  created () {
    this.gitArticles()
  },
  methods: {
    // 获取文章列表
    async gitArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.gitArticles_data = data
      this.articles = data.results
      console.log(data)
    },
    // 分页页数
    pager (newPage) {
      //   修改当前的页码为最新的页码
      this.reqParams.page = newPage
      // 重新拉取数据
      this.gitArticles()
    },
    // 准备日期数据
    changeDate (dateArr) {
      // dateArr 是一个数组 []   有起始时间  与  终止时间
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
      console.log('执行了日期筛选')
    },
    // 筛选按钮事件
    search () {
      // 获取筛选数据（准备日期数据）
      // 处理频道空字符串问题
      console.log('点击了筛选按钮')
      this.reqParams.page = 1
      console.log(123)
      this.gitArticles()
    },
    // 编辑
    toEdit (id) {
      // 路由跳转 到编辑页面  使用 query:{id}  传参
      this.$router.push({ path: '/publish', query: { id } })
    }
    // 删除文章
    // async delArticle (id) {
    //   // 向后台发删除请求
    //   await this.$http.delete(`articles/${id}`)
    //   this.$message.success('删除成功')
    //   //   更新页面
    //   this.gitArticles()
    // }
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

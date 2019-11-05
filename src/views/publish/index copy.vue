
<template>
  <div>
    publish
    <el-card class="box-card">
      <!-- 头部面包屑 -->
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <!-- 内容 -->
      <el-form ref="form"
               :model="form"
               label-width="120px">
        <el-form-item label="* 标题">
          <el-input>
          </el-input>
        </el-form-item>
        <el-form-item label="* 内容">
          <!-- 富文本插件 -->
          <quill-editor v-model="content"
                        :options="editorOption">
          </quill-editor>
        </el-form-item>
        <el-form-item label="封面">
          <!-- 封面单选按钮 -->
          <el-radio-group v-model="radio">
            <el-radio :label="3">单图</el-radio>
            <el-radio :label="6">三图</el-radio>
            <el-radio :label="9">无图</el-radio>
            <el-radio :label="1">自动</el-radio>
          </el-radio-group>
          <!-- 上传封面组件 -->

        </el-form-item>

        <el-form-item label="频道：">
          <el-select v-model="reqParams.channel_id"
                     placeholder="请选择"
                     clearable>
            <el-option v-for="item in channelOptions"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-button type="success"
                     round
                     size="small">发布文章</el-button>
          <el-button type="info"
                     round
                     size="small">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  // 配置富文本
  components: {
    quillEditor
  },
  data () {
    return {
      form: null,
      radio: [],
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
      // 频道列表选项
      channelOptions: [],
      // 富文本配置对象
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    // 添加 getChannelOptions 事件 拿后台接口列表的数据   获取频道列表数据
    async getChannelOptions () {
      // 获取数据
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
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

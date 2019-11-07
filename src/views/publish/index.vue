<template>
  <div class="container-publish">
    <el-card class="box-card">
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="120px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title"
                    style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <!-- 富文本 -->
          <quill-editor v-model="articleForm.content"
                        :options="editorOption">
          </quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div v-if="articleForm.cover.type > 0">
            <div style="  float: left; margin-right:40px; margin-top:10px"
                 v-for="item in articleForm.cover.type"
                 :key="item">
              <imger></imger>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="频道：">
          <my-select :value='reqParams.channel_id'
                     v-on:input='handleinput'></my-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     @click="release">发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入富文本样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 挂载
import { quillEditor } from 'vue-quill-editor'
export default {
  // 配置富文本
  components: {
    quillEditor
  },
  data () {
    return {
      editorOption: {
        placeholder: '',
        modules: {
          // 富文本框功能配置
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      },
      // 频道
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
      // 提交文章表单
      articleForm: {
        title: null,
        content: '',
        cover: {
          type: 1
        }
      }
    }
  },
  methods: {
    handleinput (value) {
      this.reqParams.channel_id = value
    },
    // 点击发布按钮
    release () {}
  }
}
</script>

<style scoped lang='less'>
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

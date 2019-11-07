<template>
  <el-select :value="value"
             placeholder="请选择"
             clearable
             @change="handleSelectChange">
    <el-option v-for="item in channelOptions"
               :key="item.id"
               :label="item.name"
               :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'mySelect',
  data () {
    return {
      // 频道列表选项
      channelOptions: []
    }
  },
  props: ['value'],
  methods: {
    // 添加 getChannelOptions 事件 拿后台接口列表的数据
    async getChannelOptions () {
      // 获取数据
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    handleSelectChange (value) {
      console.log(value)
      this.$emit('input', value)
    }
  },
  created () {
    this.getChannelOptions()
  }
}
</script>

<style>
</style>

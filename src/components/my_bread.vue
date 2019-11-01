<template>
  <el-breadcrumb class="my_breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
            <!-- 留下插槽，等待传值 -->
            <slot></slot>
        </el-breadcrumb-item>
        </el-breadcrumb>
</template>

<script>
export default {
  // 声明组件明
  name: 'my-bread'
}
</script>

<style>

</style>

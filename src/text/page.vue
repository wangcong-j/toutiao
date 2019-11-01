<template>
  <div class="page">
      <!-- 头 -->
      <header>我是头部文字</header>
      <!-- 内容 -->
      <div>
          <slot>我是后备内容插槽</slot>
      </div>
      <!-- 尾 -->
      <footer>
          <slot name="footer"> </slot>
      </footer>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>

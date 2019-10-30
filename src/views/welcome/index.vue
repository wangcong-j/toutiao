<template>
  <div>
    <div class="img_bg"></div>
  </div>
</template>

<script>
export default {
  created () {
    this.$http
      .get('articles')
      .then(rel => {
        console.log(rel)
      })
      .catch(() => {
        console.log('error')
      })
  }
}
</script>

<style lang="less" scoped>

.img_bg{
      margin: 100px auto;
      width: 500px;
      height: 472px;
      background: url(../../assets/welcome.jpg) no-repeat ;
    }

</style>

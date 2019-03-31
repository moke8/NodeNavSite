<template>
    <div style="display: table-cell;vertical-align: middle;text-align: center;">
        <Button @click="up" >更新页面</Button>
    </div>

</template>

<script>
  export default {
    name: 'Up.vue',
    methods:{
      up:function () {
        this.$http.post("/console/update").then(function(){
          this.$Message.success('更新成功')
        },function(){
          this.$Message.warning('更新失败')
        })
      }
    }
  }
</script>

<style scoped>

</style>

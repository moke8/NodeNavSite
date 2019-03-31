<template>
  <div class="config">
    <div>
      网站名称：<Input v-model="name" placeholder="网站名称" />
      网站描述：<Input v-model="describe" placeholder="网站描述" />
      网站关键词：<Input v-model="key" placeholder="网站关键词" />
      后台登陆用户名：<Input v-model="username" placeholder="后台登陆用户名" />
      后台登陆密码：<Input v-model="password" placeholder="后台登陆密码" />
      <Button type="primary" @click="updateCon" long>Primary</Button>
    </div>


    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data:function(){
    return {
      name:"",
      describe:"",
      key:""
    }
  },
  methods:{
    updateCon:function (){
      this.$http.post('/console/config/update',{name:this.name,describe: this.describe,key:this.key,username:this.username,password:this.password}).then(function (data) {
        data=data.body;
        this.$Modal.success({
          title: '提示',
          content: '保存成功'
        })
      },function(error){
        this.$Modal.error({
          title: '警告',
          content: '服务器发生错误'
        })
      });
    }
  },
  created:function(){
    this.$http.get('/console/config/get').then(function (data) {
      data=data.body;
      this.name=data.name;
      this.describe=data.describe;
      this.key=data.key;
      this.username=data.username;
      this.password=data.password;
    },function(error){
      this.$Modal.error({
        title: '警告',
        content: '服务器发生错误'
      })
    })
  },
  components: {
    HelloWorld
  }
}
</script>

<template>
  <div id="app">
      <Menu v-if="Switch" id="menu" width="10%" :theme="'light'" active-name="1">
          <MenuGroup title="系统配置">
              <MenuItem name="1" to="/">
                  <Icon type="md-document"/>
                  系统配置
              </MenuItem>
              <MenuItem name="2" to="/menu">
                  <Icon type="md-chatbubbles"/>
                  菜单配置
              </MenuItem>
              <MenuItem name="3" to="/nav">
                  <Icon type="md-heart"/>
                  导航配置
              </MenuItem>
              <MenuItem name="4" to="/up">
                  <Icon type="md-leaf"/>
                  更新HTML文件
              </MenuItem>
          </MenuGroup>
      </Menu>
      <Card v-if="!Switch" style="width:100vw;height:100vh;display: table-cell;vertical-align: middle;text-align: center;">
          <div style="text-align:center;">
              <Input type="text" v-model="username" style="width:400px" placeholder="用户名"/>
              <Input type="text" v-model="password" style="width:400px" placeholder="密码"/>
              <Button @click="login">登陆</Button>
          </div>
      </Card>
    <router-view v-if="Switch" id="view"/>
  </div>
</template>
<style>
    #app{
        background-color: #f9f9f9;
    }
    #menu{
        width:10%;
        min-height: 100vh;
        float: left;
    }
    #view{
        width:70%;
        margin-left: 10%;
        margin-top: 50px;
        float: left;
        min-height: 100vh;
    }
    input,button{
        margin-top:15px;
    }
</style>
<script>
  export default {
    data () {
      return {
        Switch:false,
        menu:"",
        username:"",
        password:""
      }
    },
    methods:{
      login:function () {
        this.$http.post("/console/login",{username: this.username,password: this.password}).then(function(){
          this.Switch=true;
          this.$Message.success('登陆成功')
        },function(){
          this.$Message.warning('登陆失败')
        })
      }
    },
    created () {
      this.$http.get("/console/status/get").then(function(){
        this.Switch=true;
      },function(){
      })
    }
  }
</script>


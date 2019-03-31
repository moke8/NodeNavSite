<template>
    <div class="menu">
        <Card :bordered="false" dis-hover>
            <p slot="title">添加菜单</p>
            <Input type="text" v-model="New_menu.name" placeholder="菜单项名称"/>
            <Input type="text" v-model="New_menu.url" placeholder="菜单项链接"/>
            <Button @click="New_menu_post">提交</Button>
        </Card>
        <Table :columns="table.columns" :data="table.data"></Table>
        <Button type="primary" @click="postChange" long>将更改提交到服务器</Button>

        <Modal v-model="Change_menu.status" title="修改菜单项信息" @on-ok="ChangeOk" @on-cancel="">
            <Input v-model="Change_menu.name" type="text"/>
            <Input v-model="Change_menu.url" type="text"/>
        </Modal>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        value1: '1',
        New_menu: {
          name: '',
          url: ''
        },
        Change_menu:{
          status:false,
          i:-1,
          name: '',
          url: ''
        },
        table: {
          columns: [
            {
              title: '名称',
              key: 'Name'
            },
            {
              title: '链接',
              key: 'Url'
            },
            {
              title: '操作',
              key: 'Option',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.change(params.index)
                      }
                    }
                  }, '修改'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.delete(params.index)
                      }
                    }
                  }, '删除')
                ])
              }
            }
          ],
          data: []
        }
      }
    },
    methods: {
      New_menu_post: function () {  //增
        if (this.New_menu.name !== '' && this.New_menu.url !== '') {
          this.$set(this.table.data, this.table.data.length, {
            Name: this.New_menu.name,
            Url: this.New_menu.url
          })
        } else {
          this.$Modal.error({
            title: '警告',
            content: '您还未输入需要增加的内容'
          })
        }

      },
      change: function (i) {  //改
        this.Change_menu.i=i;
        this.Change_menu.name=this.table.data[i].Name;
        this.Change_menu.url=this.table.data[i].Url;
        this.Change_menu.status=true;
      },
      ChangeOk:function(){
        this.$set(this.table.data, this.Change_menu.i, {
          Name: this.Change_menu.name,
          Url: this.Change_menu.url
        })
        this.$Message.success('修改成功');
      },
      delete: function (i) {  //删
        // delete this.table.data[i];
        this.table.data.splice(i, 1);
        this.$Message.success('已删除');
      },
      postChange:function(){
        let json={};
        for(let i in this.table.data){
          json[''+i]={};
          json[''+i]["name"]=this.table.data[i].Name;
          console.log(this.table.data[i].Name);
          json[''+i]["url"]=this.table.data[i].Url;
          console.log(this.table.data[i].Url);

        }
        console.log(json);
        let postData=JSON.stringify(json);
        console.log(postData)
        this.$http.post('/console/menu/update',postData).then(function (data) {
          this.$Modal.success({
            title: '提示',
            content: '提交成功'
          })
        }, function () {
          this.$Modal.error({
            title: '警告',
            content: '服务器发生错误'
          })
        })
      }
    },
    created () {
      this.$http.get('/console/menu/get').then(function (data) {  //查
        data = data.body
        let n = 0
        for (let i in data) {
          this.$set(this.table.data, n, {
            Name: data[Number(i)]['name'],
            Url: data[Number(i)]['url']
          })
          n++
        }
      }, function (error) {
        this.$Message.error('请求失败');
      })
    }
  }
</script>

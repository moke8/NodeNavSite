<template>
    <!--<Collapse v-model="value1">-->
    <!--<Panel v-for="i in tables">-->
    <!--{{tables[i].name}}-->
    <!--<p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>-->
    <!--</Panel>-->
    <!--</Collapse>-->
    <div>
        <Collapse v-model="value1">
            <Panel name="addnav">
                添加分类
                <div slot="content">
                    <Input v-model="newNav.name" type="text"/>
                    <Select v-model="newNav.color">
                        <Option v-for="item in colorList" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                    <Button @click="newNavPost()" long>提交</Button>
                </div>
            </Panel>
        </Collapse>
        <Collapse v-model="value1">
            <Panel v-for="(i,index) in tables" :name="index">
                {{i.name}}
                <div slot="content">
                    <!--<Card :bordered="false" dis-hover>-->
                    <!--<p slot="title">添加菜单</p>-->
                    <!--<Input type="text" v-model="New_menu.name" placeholder="菜单项名称"/>-->
                    <!--<Input type="text" v-model="New_menu.url" placeholder="菜单项链接"/>-->
                    <!--<Button @click="New_menu_post">提交</Button>-->
                    <!--</Card>-->
                    <Button type="primary" @click="changeNav(index)" style="margin-top:0;margin-bottom: 15px;">分类信息修改
                    </Button>
                    <Button type="error" @click="deleteNav(index)" style="margin-top:0;margin-bottom: 15px;">删除分类
                    </Button>
                    <Collapse v-model="value1">
                        <Panel :name="index+'-1'">
                            添加菜单
                            <div slot="content">
                                <Input type="text" v-model="New_menu.name" placeholder="菜单项名称"/>
                                <Input type="text" v-model="New_menu.url" placeholder="菜单项链接"/>
                                <Button @click="newMenuPost(index)">提交</Button>
                            </div>
                        </Panel>
                    </Collapse>
                    <Table :columns="i.columns" :data="i.menu"></Table>
                    <!--<div v-for="j in i.data">{{j.name}}</div>-->
                </div>
            </Panel>
        </Collapse>
        <Button type="primary" style="margin-bottom:30px" @click="postSave" long>提交变更至服务器</Button>

        <Modal v-model="Change_menu.status" title="修改菜单项信息" @on-ok="changeMenuOk" @on-cancel="">
            <Input v-model="Change_menu.name" type="text"/>
            <Input v-model="Change_menu.url" type="text"/>
        </Modal>
        <Modal v-model="Change_nav.status" title="修改分类信息" @on-ok="changeNavOk" @on-cancel="">
            <Input v-model="Change_nav.name" type="text"/>
            <Select v-model="Change_nav.color" style="width:200px">
                <Option v-for="item in colorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </Modal>
    </div>
    <!--<p v-for="i in tables">32432443</p>-->
</template>

<script>
  export default {
    name: 'nav.vue',
    data: () => {
      return {
        value1: '1',
        tables: {},
        New_menu: {
          name: '',
          url: ''
        },
        Change_menu: {
          status: false,
          i: -1,
          j: -1,
          name: '',
          url: ''
        },
        Change_nav: {
          status: false,
          i: -1,
          name: '',
          color: ''
        },
        newNav: {
          name: '',
          color: ''
        },
        colorList: [
          {
            value: 'panel-primary',
            label: 'primary 深蓝'
          },
          {
            value: 'panel-success',
            label: 'success 淡绿'
          },
          {
            value: 'panel-info',
            label: 'info 淡蓝'
          },
          {
            value: 'panel-warning',
            label: 'warning 淡黄'
          },
          {
            value: 'panel-danger',
            label: 'danger 淡红'
          }
        ]
      }
    },
    methods: {
      jsonLen:function(json){
        let i=0;
        for(let index in json){
          i++;
        }
        return i;
      },
      newMenuPost: function (i) {  //增
        if (this.New_menu.name !== '' && this.New_menu.url !== '') {
          this.$set(this.tables[i].menu, this.tables[i].menu.length, {
            name: this.New_menu.name,
            url: this.New_menu.url
          })
          this.New_menu.name = ''
          this.New_menu.url = ''
          this.$Message.success('本地数据添加成功，如需应用到服务器请提交变更')
        } else {
          this.$Modal.error({
            title: '警告',
            content: '您还未输入需要增加的内容'
          })
        }

      },
      changeMenu: function (i, j) {
        this.Change_menu.i = i
        this.Change_menu.j = j
        this.Change_menu.name = this.tables[i].menu[j].name
        this.Change_menu.url = this.tables[i].menu[j].url
        this.Change_menu.status = true
      },
      changeMenuOk: function () {
        this.$set(this.tables[this.Change_menu.i].menu, this.Change_menu.j, {
          name: this.Change_menu.name,
          url: this.Change_menu.url
        })
        this.$Message.success('本地数据修改成功，如需应用到服务器请提交变更')
      },
      deleteMenu: function (i, j) {
        this.tables[i].menu.splice(j, 1)
        this.$Message.success('本地数据删除成功，如需应用到服务器请提交变更')
      },
      newNavPost: function () {
        if (this.newNav.name !== '' && this.newNav.color !== '') {
          let len=this.jsonLen(this.tables)
          this.$set(this.tables, len, {
            name: this.newNav.name,
            color: this.newNav.color,
            columns: [
              {
                title: '名称',
                key: 'name'
              },
              {
                title: '链接',
                key: 'url'
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
                          this.changeMenu(i, params.index)
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
                          this.deleteMenu(i, params.index)
                        }
                      }
                    }, '删除')
                  ])
                }
              }
            ],
            menu: []
          })
          this.newNav.name = ''
          this.newNav.url = ''
          this.$Message.success('本地数据添加成功，如需应用到服务器请提交变更')

        } else {
          this.$Modal.error({
            title: '警告',
            content: '您还未输入需要增加的内容'
          })
        }
      },
      changeNav: function (i) {
        this.Change_nav.name = this.tables[i].name
        this.Change_nav.color = this.tables[i].color
        this.Change_nav.i = i
        this.Change_nav.status = true
      },
      changeNavOk: function () {
        this.$set(this.tables[this.Change_nav.i], 'name', this.Change_nav.name)
        this.$set(this.tables[this.Change_nav.i], 'color', this.Change_nav.color)
        this.$Message.success('本地分类修改成功，如需应用到服务器请提交该变更')
      },
      deleteNav: function (i) {  //分类删除
        this.$Message.warning('您选择删除了一个分类，服务器暂未保存，若是您的误触，可以刷新页面返回')
        this.$Message.warning('该分类将在您提交到服务器后删除，删除过程不可逆，请谨慎操作')
        delete this.tables[i]  //删除对应的分类
        let tables = {}
        let n = 0
        for (let i in this.tables) {//对剩余的分类进行重新排序
          tables[n] = this.tables[i]
          n++
        }
        this.tables = tables
      },
      postSave:function(){
        let tables=this.tables;
        for(let i in tables){
          delete tables[i]["columns"]
        }
        this.$http.post("/console/nav/update",JSON.stringify(tables)).then(function(){
          this.$Message.success('提交成功！')
        },function(){
          this.$Message.warning('提交失败！')
        })
      }

    },
    created () {
      this.$http.get('/console/nav/get').then(function (data) {
        data = data.body
        for (let i in data) {
          this.$set(this.tables, i, {
            name: data[i].name,
            color: data[i].color,
            columns: [
              {
                title: '名称',
                key: 'name'
              },
              {
                title: '链接',
                key: 'url'
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
                          this.changeMenu(i, params.index)
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
                          this.deleteMenu(i, params.index)
                        }
                      }
                    }, '删除')
                  ])
                }
              }
            ],
            menu: []
          })
          for (let j in data[i].menu) {
            this.$set(this.tables[i].menu, j, {
              name: data[i].menu[j].name,
              url: data[i].menu[j].url
            })
          }
        }
      }, function (err) {
        this.$Modal.error({
          title: '警告',
          content: '服务器发生错误'
        })
      })
    }
  }
</script>

<style scoped>
</style>

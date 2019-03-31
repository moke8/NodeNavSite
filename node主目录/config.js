const koa = require('koa')
const route = require('koa-route')
const path = require('path')
const Static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session2')
const app = new koa()
const fs = require('fs')
const Promises = fs.promises
const updateJs = require('./update')
updateJs.indexUp()
//运行的只有这个
const main = ctx => {//返回主页
  ctx.response.body=fs.readFileSync("public/index.html",'utf8');
}
Console = function () {
  let json = fs.readFileSync(__dirname + '/data/config.json', 'utf8')
  let data = JSON.parse(json)
  let saveJson = async function (json, ctx) {
    if (typeof json === 'object') {
      json = JSON.stringify(json)
    }
    try {
      let err = await Promises.writeFile(__dirname + '/data/config.json', json)
      if (err) {
        ctx.throw(500)
        ctx.body = '失败'

      } else {
        ctx.body = '成功'
      }
    } catch (err) {
      console.log(err)
    }
  }
  let JsonLen = function (json) {//获得json最后一个对象的key 并+1返回  //控制台正常运行的啊
    let name = 0
    for (key in json) {
      name = key
    }
    return Number(key) + 1
  }
  this.login=async ctx=>{
    console.log("进入login");
    if(data.config.username===ctx.request.body.username && data.config.password===ctx.request.body.password){
      ctx.session={
        user_id:Math.random().toString(36).substr(2)
      }
      ctx.body="true"
    }
    else{
      console.log("请求错误");
    }
  }
  this.updateJs=async ctx=>{
    updateJs.indexUp('g')
    ctx.body="true"
  }
  this._get = function () {//查询
    this.getMenu =async ctx => {  //查询菜单
      ctx.response.body = data['menu']
    }
    this.getConfig =async ctx => {
      ctx.response.body = data['config']
    }
    this.getNav =async ctx => {
      ctx.response.body = data['nav']
    }
    this.getStatus=async ctx=>{
      if(ctx.session.user_id){
        ctx.body="true"
      }
    }
  }
  this.get = new this._get()

  this._add = function () {   //增加
    this.addMenu = async ctx => {   //增加菜单
      let name = ctx.request.body.name
      let url = ctx.request.body.url
      data['menu'][JsonLen(data['menu'])] = {
        name: name,
        url: url
      }
      console.log(JsonLen(data['menu']))
      console.log('name' + name + '\n url:' + url)

      await saveJson(data, ctx)
    }
  }
  this.add = new this._add

  this._delete = function () {    //删除
    this.addNav = async ctx => {
      let name = ctx.request.query.name
      let color = ctx.request.query.color
      let num = data['nav'].length
      data['nav'][this.JsonLen(data['nav'])] = {
        name: name,
        color: color,
        menu: {}
      }
      await saveJson(data, ctx)
    }
  }
  this.delete = new this._delete()

  this._update =function () {//更新
    this.upCon = async ctx => {  //更新配置
      data['config']['name'] = ctx.request.body.name
      data['config']['describe'] = ctx.request.body.describe
      data['config']['key'] = ctx.request.body.key
      data['config']['username'] = ctx.request.body.username
      data['config']['password'] = ctx.request.body.password
      await saveJson(data, ctx)
    }
    this.upMenu = async ctx => {
      data['menu'] = ctx.request.body
      await saveJson(data, ctx)
    }
    this.upNav = async ctx => {
      data['nav'] = ctx.request.body
      await saveJson(data, ctx)
    }
  }
  this.update = new this._update()
}

let con = new Console()

const SessionCon = {
  key: 'koa:sess',
  maxAge: 86400000
};
app.use(session(SessionCon, app));
app.use(  async (ctx, next) => {
  if(!ctx.session.user_id && ctx.request.method==='POST' && ctx.path!=="/console/login"){
    console.log("拦截请求\n请求地址："+ctx.path)
    return 0;
  }
  console.log("放通请求\n请求地址："+ctx.path)
  await next();
})

let Sta = Static(path.join(__dirname, 'public'))
app.use(Sta)


app.use(bodyParser())

app.use(route.get('/', main))

app.use(route.get('/console/menu/get', con.get.getMenu))
app.use(route.get('/console/config/get', con.get.getConfig))
app.use(route.get('/console/nav/get', con.get.getNav))
app.use(route.get('/console/status/get', con.get.getStatus))


app.use(route.post('/console/login', con.login))
app.use(route.post('/console/config/update', con.update.upCon))
app.use(route.post('/console/menu/update', con.update.upMenu))
app.use(route.post('/console/nav/update', con.update.upNav))
app.use(route.post('/console/update', con.updateJs))

app.listen('3000')

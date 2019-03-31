<h1>koa模板生成静态导航网站</h1>
<p>主要通过fs模块和正则读取json文件对model.html进行关键字替换并导出为index.html文件</p>
<p>前端框架用的是bootstrap,无js，无请求</p>
<p>部署后通过data.json修改内容后访问&nbsp;&nbsp;&nbsp;域名+'/run/update/json/'&nbsp;&nbsp;&nbsp;来生成index.html文件即可正常使用</p>
<p>由于本人设计并不是很好，因此页面偏简洁，主要由bootstrap的class组成，自己写的css较少</p>
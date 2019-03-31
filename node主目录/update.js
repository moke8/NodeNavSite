const fs=require("fs");

module.exports = {
    indexUp
}

function indexUp(){//若query为g则全局更新 为i只更新首页 默认只更新首页
    //读取配置和html模板
    let jsonStr = fs.readFileSync(__dirname+"/data/config.json", 'utf8');
    let json = JSON.parse(jsonStr);
    let html = fs.readFileSync(__dirname+"/template/template.html", 'utf8');

    ((json) => {
        for (let i in json["config"]) {//更改html的配置

            html = html.replace(new RegExp('\\${config_' + i + '}', 'g'), json["config"]['' + i]);
        }
        html = html.replace(new RegExp('\\${data}', 'g'), jsonStr);//将json参数导入到vue数据中

    })(json)

    if (fs.writeFileSync(__dirname+'/public/index.html', html)) {
        console.log(err);
    }
    else {
        console.log("主页写入成功！");
    }
}



var path=require('path');
var fs=require('fs');
var util=require('util');

var koa=require('koa');
var staticServe=require('koa-static');
var bodyParser=require('koa-bodyparser');
//var bodyParser=require('koa-better-body');
var render=require('koa-ejs');
var mount=require('koa-mount');

var gConfig=require('./config/web.json');

//创建koa实例
var app=koa();

//设置网页模板,ejs
render(app, {
  root: path.join(__dirname, 'view'),
  viewExt: 'ejs',
  cache: false,
  debug: true,
});

//日志
var tdLog=require('./lib/middleWare/td-log.js');
app.use(tdLog(gConfig.log));

//test
app.use(function*(next){
  //this.request.rawBody=this.request.body;
  this.pocket={};
  yield next;
  //console.log(this.querystring); //for get
  //console.log(this.query); //for get
  //console.log(util.inspect(this.request, true, 10, true));
});

//test msyql
var testMysql=require('./lib/middleWare/testMysql');
app.use(testMysql(gConfig.mysql.mainMysql));

//test redis
var testRedis=require('./lib/middleWare/testRedis');
app.use(testRedis(gConfig.redis.mainRedis));


//使用bodyParser解析post数据
app.use(bodyParser());

//serve static
app.use(staticServe(path.join(__dirname, 'staticFile')));


//indexRouter
var indexRouter=require('./controller/indexRouter.js');
app.use(mount('/', indexRouter.routes()));

//testRouter
var testRouter=require('./controller/testRouter.js');
app.use(mount('/test', testRouter.routes()));

//redisRouter
var testRedis=require('./controller/redisRouter.js');
app.use(mount('/redis', testRedis.routes()));

//mysqlRouter
var testMysql=require('./controller/mysqlRouter.js');
app.use(mount('/mysql', testMysql.routes()));

/*
//错误处理
app.on('error', function(err, ctx){
    log.error('server error', err, ctx);
    fs.appendFile('./log/error.log', err, function(err, res){});
});
*/

app.listen(3333, '192.168.1.9');

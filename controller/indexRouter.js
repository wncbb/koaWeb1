var router=require('koa-router');
var indexRouter=new router();

indexRouter.get('/', function*(next){
  this.body='hello world';
});

module.exports=indexRouter;

var router=require('koa-router');
var util=require('util');

var testRouter=router();
testRouter.get('/get', function*(next){
  var ret=yield this.pocket.mainRedis.get('name');
  console.log(util.inspect(ret, 10, true, 10));
  this.body=ret;
});

testRouter.get('/set', function*(next){
  var ret=yield this.pocket.mainRedis.set('name', 'todd');
  console.log(util.inspect(ret, 10, true, 10));
  this.body=ret;
});

module.exports=testRouter;

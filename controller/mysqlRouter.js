var router=require('koa-router');
var util=require('util');

var testRouter=router();

testRouter.get('/get', function*(next){
	var ret=yield this.pocket.mainMysql.query('select * from user;');
	this.body=ret[0];
});


module.exports=testRouter;










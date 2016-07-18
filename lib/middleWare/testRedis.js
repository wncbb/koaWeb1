var redisClientMaker=require('redis');
var wrapper=require('co-redis');

module.exports=function testRedis(opts){
	return function*(next){
		var redisClient=redisClientMaker.createClient(opts);
		var redisCo=wrapper(redisClient);
		this.pocket.mainRedis=redisCo;
		yield redisCo.select(2);
		yield next;
		this.pocket.mainRedis.quit();
	}
}

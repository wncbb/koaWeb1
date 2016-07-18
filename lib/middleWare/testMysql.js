var router=require('koa-router');
var mysqlCo=require('mysql-co');
var process=require('process');

module.exports=function(opts){
  return function*(next){

    //var db=yield mysqlCo.createConnection({
    var db=mysqlCo.createConnection({
      host: opts.host,
      port: opts.port||3306,
      user: opts.user,
      password: opts.password,
      database: opts.database,

    });
    this.pocket.mainMysql=db;
    yield next;
    db.end();
  }
}

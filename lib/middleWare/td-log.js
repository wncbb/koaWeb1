var util=require('util');
var fs=require('fs');
var moment=require('moment');
module.exports=function tdLog(inArg){
  return function*(next){
    var logStr=moment().format('YYYYMMDD.HH:mm:ss')+
      ','+this.ip+','+this.request.method+ //this.ip this.request.ip
      ','+this.request.url+'\n';
    //console.log(inArg.accessLog);
    fs.appendFile(inArg.accessLog, logStr, function(err, res){
      //console.log(err);
    });
    yield next;
    //console.log(this.ip);
  }
}

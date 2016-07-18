var router=require('koa-router');
var testRouter=router();
testRouter.get('/get', function*(next){
  this.body=this.request.query;
});

testRouter.get('/uploadfile', function*(){
  yield this.render('uploadfile', {
    title: 'uploadfile'
  });
});

testRouter.post('/post', function*(){
  this.body={
    'this.request.body': this.request.body,
    'this.request.fields': this.request.fields,
    'this.request.files': this.request.files,
  };
});

testRouter.post('/uploadfile', function*(next){
  // this.body=this.request.body;
  // console.log(this.request.body);
  // console.log(this.request.fields);
  // console.log(this.request.files);
  if (!this.request.is('multipart/*')){
    console.log('The type should be multipart/*');
    return yield next;
  }
  var parse=require('co-busboy');
  var fs=require('fs');
  var util=require('util');

  var parts = parse(this);
  var part;
  //console.log(util.inspect(parts, true, 10, true));
  var i=0;
  while (part = yield parts) {
    if (part.length) {
      // arrays are busboy fields
      //console.log('key: ' + part[0]);
      //console.log('value: ' + part[1]);
    } else {
      console.log({
        fieldname: part.fieldname,
        filename: part.filename,
        mime: part.mime,
        mimeType: part.mimeType,
        '_readableState.length': part._readableState.length,
        '_readableState.buffer': part._readableState.buffer,
      });
      // otherwise, it's a stream
      part.pipe(fs.createWriteStream(i+'a.jpg'));
      i=i+1;
    }
  }
  this.body='ok';

});



module.exports=testRouter;

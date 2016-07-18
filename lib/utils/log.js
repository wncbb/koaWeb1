var fs=require('fs');
module.exports={
  record: function(fileName, contentStr){
    fs.appendFile(fileName, contentStr, function(){
      
    });
  }
}

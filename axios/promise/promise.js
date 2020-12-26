var fs = require('fs');

function p1(filePath){
  var ps = new Promise(function(su,fa){
    fs.readFile(filePath,'utf8',function(err,data){
      if(!err){
        su(data);
      }else{
        fa(err);
      }
    });
    return ps;
  });
}

var prom = p1('./a.txt');
prom.then(function(val){
  console.log(val);
  return p1('./b.txt');
}).then(function(val){
  console.log(val);
});
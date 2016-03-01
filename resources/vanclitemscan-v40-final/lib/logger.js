// logger.js - VanclItemScan v4.0's module
// author: pczhang

var file=require('file'),
    now=new Date(),
    writer=file.open(file.join('c:','vancl_log'+now.getTime()+'.txt'),'w'),
    log=function(msg){
      writer.write(new Date()+":"+msg+"\n");  
    };

exports.log=log;

require('timers').setInterval(function(){writer.flush();}, 2000);

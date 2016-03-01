// PageWorkManager.js - VanclItemScan v4.0's module
// author: pczhang

var pageArr=[],
    self=require('self'),
    
    createPage = function(csFile,pageUrl){
      var page=require("page-worker").Page({
          contentScriptFile: [self.data.url('jquery-1.9.0.min.js'),self.data.url(csFile)],
          contentURL: pageUrl,
       });
       pageArr.push(page);
       return page;
    };

require('timers').setInterval(
    function(){
      while(pageArr.length>0)
        pageArr.pop().destroy();
    }, 
    60000
);

exports.createPage=createPage;
// outputPanel.js - VanclItemScan v4.0's module
// author: pczhang

var tabs=require('tabs'),
    self=require('self'),
    panel=require("panel").Panel({
      width:600,
      height:800,
      contentURL: self.data.url('my.html'),
      contentScriptFile: [self.data.url('jquery-1.9.0.min.js'),self.data.url('panel.js')],
      onMessage: function(msg){
        if(msg.link!=tabs.activeTab.url) 
          tabs.open(msg.link);
      }
    });

exports.outputPanel=panel;

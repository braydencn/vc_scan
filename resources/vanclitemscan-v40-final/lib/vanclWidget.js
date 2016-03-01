// vanclWidget.js - VanclItemScan v4.0's module
// author: pczhang

var timerManager=require('timerManager'),
    outputPanel=require('outputPanel').outputPanel,
    widget,
    
    clicked=function() {
        if(timerManager.ifStart())
          timerManager.end();
        else
          timerManager.begin();
        updateWidget();
    },
    
    updateWidget=function() {
        if(timerManager.ifStart())
          widget.tooltip="开着呢,单击关闭";
        else
          widget.tooltip="关着呢,单击开始";
    },
    
    widget=require('widget').Widget({
      id: "vancl", label: "抢凡客,单击开始", panel: outputPanel,
      contentURL: "http://i.vanclimg.com/common/favicon/favicon.ico",
      onClick: clicked,
      onMouseover: function(){
        outputPanel.show();
      }
    });

exports.updateWidget=updateWidget;
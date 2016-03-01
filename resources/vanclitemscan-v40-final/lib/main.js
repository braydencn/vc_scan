var timerManager=require('timerManager'),
    widget=require('vanclWidget'),
    logger=require('logger'),
    
    log=function(msg){
        logger.log('main:'+msg);
    };

require("simple-prefs").on("updateSetting", function() {
    log('get event from prefs');
    timerManager.reset(); 
    require('notifications').notify({text: "改了设置,开始重新抢货"});
});

/*
{"preferences":[{"description":"一轮提交几次订单","type":"string","name":"maxCheckoutNum","value":"3","title":"一轮提交几次订单"},{"description":"刷几页收藏夹","type":"string","name":"numOfScanPage","value":"10","title":"刷几页收藏夹"},{"description":"最多买几件","type":"string","name":"maxBuy","value":"10","title":"最多买几件"},{"description":"马上开始","type":"bool","name":"beginNow","value":true,"title":"马上开始"},{"description":"格式:[HH:MM];小时,分钟","type":"string","name":"startTime","value":"14:19","title":"啥时开始, 不是马上开始才有效哦"},{"description":"一直抢","type":"bool","name":"runForEver","value":true,"title":"一直抢"},{"description":"只有不是一直抢,才有效哦","type":"string","name":"roundLeft","value":"10","title":"抢几轮"},{"description":"按分钟计","type":"string","name":"roundsInMinutes","value":"7","title":"一轮抢多少分钟"},{"description":"按分钟计","type":"string","name":"minutesBetweenRound","value":"30","title":"每隔多少分钟刷一轮"},{"description":"设大了抢不到,设小了程序死掉,自己选吧","type":"string","name":"scanInterval","value":"5","title":"几秒刷一次"},{"title":"设置","type":"control","name":"updateSetting","label":"设置"}]}
*/

/*
main -> timerManager -> vanclProxy
     -> vanclWidget  -> outputPanel
*/
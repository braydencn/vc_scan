// timeManager.js - VanclItemScan v4.0's module
// author: pczhang

var vanclProxy=require('vanclProxy'),
    timers=require('timers'),
    prefs=require('simple-prefs').prefs,
    logger=require('logger'),
    widget=require('vanclWidget'),
    roundLeft,
    roundsInMinutes,    // how long is a round
    minutesBetweenRound, //how long between this round and next round
    scanInterval,
    roundBeginTime,
    roundEndTime,
    timerId,
    ifStartFlag=false,
    
    print=function(){
      log("next StartTime:"+roundBeginTime+", next endTime:"+roundEndTime+", roundLeft:"+roundLeft);
    },
    
    log=function(msg){
      logger.log("TimerManager: "+msg);
    },
    
    addMinutes=function(date1,minutes){
      return new Date(date1.getTime() + minutes*60000);
    },
    
    next=function() {
      roundBeginTime=addMinutes(roundBeginTime,minutesBetweenRound);
      roundEndTime=addMinutes(roundBeginTime, roundsInMinutes);
      roundLeft--;
      vanclProxy.reset();
      print();
    },
    
    oneRound=function(){
      if(roundLeft<=0)end();
      var now=new Date();
      if(now<roundBeginTime)return; //没到下一轮呢
      if(now>roundEndTime){next();return;}   //这一轮刷完了
      vanclProxy.scanMyFavors();
    },

    reset=function(){
      log('reset');
      roundsInMinutes=parseInt(prefs.roundsInMinutes);
      minutesBetweenRound=parseInt(prefs.minutesBetweenRound);
      scanInterval=parseInt(prefs.scanInterval);
      var now=new Date();
      
      if(prefs.beginNow){
          roundBeginTime=now;
      }else{
          var n=prefs.startTime.split(":");
          roundBeginTime=new Date(now.getFullYear(),now.getMonth(),now.getDate(),parseInt(n[0].trim()),parseInt(n[1].trim()));
      }
      roundEndTime=addMinutes(roundBeginTime, roundsInMinutes);
      
      if(prefs.runForEver)
        roundLeft=1000000000;
      else
        roundLeft=parseInt(prefs.roundLeft);
      print();
      if(ifStartFlag){end();begin();}
    },
    
    begin=function(){
      if(ifStartFlag)end();
      ifStartFlag=true;
      log('start');
      timerId=timers.setInterval(oneRound, scanInterval*1000);
      vanclProxy.reset();
      widget.updateWidget();
    },

    ifStart=function(){
      return ifStartFlag;
    },

    end=function(){
      ifStartFlag=false;
      timers.clearInterval(timerId);
      log('end');
      widget.updateWidget();
    };

reset();
exports.begin=begin;
exports.end=end;
exports.reset=reset;
exports.ifStart=ifStart;
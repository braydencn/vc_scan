// vanclProxy.js - VanclItemScan v4.0's module
// author: pczhang

var pageWorkerManager=require('PageWorkManager'),
    MAX_PAGE_SCAN,
    checkoutCount=0,
    itemNumInCart=0,
    ITEM_NUM_TO_CHECKOUT,
    MAX_CHECKOUT_NUM,
    logger=require('logger'),
    outputPanel=require('outputPanel').outputPanel,
    addToChartUrl='http://shopping.vancl.com/mycart/batchadd?price=1.00&qty=1'+
                  '&async=true&callback=jQuery17108273209437531838_13623232312385&_=13631231204567&sku=',
    
    log=function(msg){
      logger.log('VanclProxy: '+msg);  
    },
    
    /*
    getPageCount= function(){
      pageWorkerManager.createPage('getPageCount.js',"http://my.vancl.com/favorite#favoriteListAnchor").on('message', function(msg){
          pageCount=msg.pageCount;
      });
    },
     */

    checkout= function(){
      if(checkoutCount>=MAX_CHECKOUT_NUM)
        return;
      else checkoutCount++;
      log('before check out');
      pageWorkerManager.createPage('checkout.js','https://shopping.vancl.com/checkout').on('message', function(msg){
        log('checked out! already checked out for:'+checkoutCount+" times in this round.");
        itemNumInCart=0;
      });
    },

    addToCart= function(link){
//      log('addToCart:ifCheckout:'+ifCheckedout+" itemNumInCart:"+itemNumInCart+" ITEM_NUM_TO_CHECKOUT:"+ITEM_NUM_TO_CHECKOUT);
      if(checkoutCount>=MAX_CHECKOUT_NUM || itemNumInCart>=ITEM_NUM_TO_CHECKOUT)
        return;
      else itemNumInCart++;
      log("before addToCart: "+link);
      pageWorkerManager.createPage('getSku.js', link).on('message', function(msg){
        require("request").Request({
          url: addToChartUrl+msg.sku, 
          onComplete: function (resp){
            log('after addtoCart:'+resp.text);
            if(itemNumInCart==ITEM_NUM_TO_CHECKOUT)
              checkout();
          }
        }).get();
      });
    },

    scanMyFavors= function(){
      outputPanel.port.emit("ERASE", {});
      //getPageCount();
      for(var i=1;i<=MAX_PAGE_SCAN;i++){
        pageWorkerManager.createPage('checkPage.js',"http://my.vancl.com/Favorite/FavoriteList?IsVanclMark=1&Mark=&PageIndex="+i).on('message', function(msg) {
            addToCart(msg.link);
            log(msg.item);
            require('notifications').notify({text: "！有货了！"});
            outputPanel.port.emit('YOUHUO',msg);
          });
      }
      if(itemNumInCart>0)
        require('timers').setTimeout(checkout,1000);
    },
    
    
    
    reset=function(){
      var prefs=require("simple-prefs").prefs;
      checkoutCount=0;
      itemNumInCart=0;
      ITEM_NUM_TO_CHECKOUT=parseInt(prefs.maxBuy);
      MAX_CHECKOUT_NUM=parseInt(prefs.maxCheckoutNum);
      MAX_PAGE_SCAN=parseInt(prefs.numOfScanPage);
      log('reset');
    };

reset();

exports.scanMyFavors=scanMyFavors;
exports.reset=reset;
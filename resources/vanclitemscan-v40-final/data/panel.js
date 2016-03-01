self.port.on("YOUHUO", function(msg) {
   $('#link').append('<a href="'+msg.link+'" >'+msg.item+'</a><br/>');
   $(function(){
     $('a').off('click');
     $('a').click(function(){
       var link1=$(this).attr('href');
       self.postMessage({link:link1});
       return false;
    });
   });
});

self.port.on("ERASE", function(msg) {
  $('body').html('<div id="link" />');
});
var tabConS=$('.Tabcon');
for(var i=0;i<tabConS.length;i++){
    var gouMaiImg=$('.ricoim img', tabConS[i]);
    var aImg=$('a.nohoverunderline', tabConS[i]);
    if(gouMaiImg.length==0)continue;
    self.postMessage({link: $(gouMaiImg).parent().attr('href'), item: $(aImg).text() } );
}
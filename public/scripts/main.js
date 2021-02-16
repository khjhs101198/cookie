$("#pc").on("click", function(){
  if(document.cookie.indexOf("pcView")!==-1) {
    let cur = Number( document.cookie.slice(document.cookie.indexOf("pcS")+3, document.cookie.indexOf("pcE") ) );
    document.cookie = `pcView=pcS${cur+1}pcE; SameSite=Lax`;
  }
  else {
    document.cookie = "pcView=pcS0pcE; SameSite=Lax";
  }
});

// TWITTER : https://dev.twitter.com/web/intents
(function(){

  var popup = function popup(url, windowOptions){

    var width = 550,
        height = 420,
        winHeight = screen.height,
        winWidth = screen.width;

    var left, top;


    left = Math.round((winWidth / 2) - (width / 2));
    top = 0;

    if (winHeight > height) {
      top = Math.round((winHeight / 2) - (height / 2));
    }

    window.open(url, 'intent', windowOptions + ',width=' + width +
                                       ',height=' + height + ',left=' + left + ',top=' + top);
  };

  Shareable.prototype.twitter = function(options){

    var shareUrl = options.shareUrl || location.href;

    var url = 'https://twitter.com/intent/tweet?url=' + shareUrl;

    if( options.via ){ url += '&via=' + options.via; }
    if( options.text ){ url += '&text=' + options.text; }

    popup(url, 'scrollbars=yes,resizable=yes,toolbar=no,location=yes');

  };

})();
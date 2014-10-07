// TWITTER : https://dev.twitter.com/web/intents

(function(app){

  app.twitter = function(options){

    var url = 'https://twitter.com/intent/tweet?url=' + location.href;
    if( options.via ){ url += '&via=' + options.via }
    if( options.text ){ url += '&text=' + options.text }

    app.utils.popup(url, 'scrollbars=yes,resizable=yes,toolbar=no,location=yes', 'intent');

  }

})(Shareable);
// FACEBOOK : https://developers.facebook.com/docs/sharing/reference/share-dialog

(function(){


  Shareable.prototype.facebook = function(shareUrl){

    var shareUrl = shareUrl || location.href;

    if( navigator.userAgent.toLowerCase().match(/crios/) ){

      location.href = 'https://www.facebook.com/dialog/share?app_id='+this.config.fb_app_id
                                          +'&display=popup'
                                          +'&href='+shareUrl
                                          +'&redirect_uri='+location.href;

    } else {

      FB.ui({
        method: 'share',
        app_id: this.config.fb_app_id,
        display: 'popup',
        href: shareUrl,
      }, function(response){});

    }


  }

})();
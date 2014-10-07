// FACEBOOK : https://developers.facebook.com/docs/sharing/reference/share-dialog

(function(app){

  var popupDialog = function popupDialog(appId){

    FB.ui({
      method: 'share',
      app_id: appId,
      display: 'popup',
      href: location.href,
    }, function(response){});
  }


  app.facebook = function(appId){

    if( navigator.userAgent.toLowerCase().match(/crios/) ){

      location.href = 'https://www.facebook.com/dialog/share?app_id='+appId
                                          +'&display=popup'
                                          +'&href='+location.href
                                          +'&redirect_uri='+location.href;

    } else {

      if( typeof(FB) == 'undefined' ){

        app.utils.load('facebook');
        window.fbAsyncInit = function() {

          FB.init({
            appId      : appId,
            xfbml      : true,
            version    : 'v2.1'
          });

          popupDialog(appId);

        };

      } else {

        popupDialog(appId);

      }


    }


  }

})(Shareable);
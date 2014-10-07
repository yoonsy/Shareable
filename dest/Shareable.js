window.Shareable = function Shareable(config){

  var initializeFacebook, initializeKakao, loadScript;

  this.config = config;

  loadScript = function loadScript (url, scriptId) {

    var js, fjs = document.getElementsByTagName('script')[0];
    if (document.getElementById(scriptId)) {return;}
    js = document.createElement('script'); js.id = scriptId;
    js.src = url;
    fjs.parentNode.insertBefore(js, fjs);

  }

  initializeFacebook = function initializeFacebook(){

    loadScript("//connect.facebook.net/ko_KR/sdk.js", 'facebook-jssdk');

    window.fbAsyncInit = function() {

      FB.init({
        appId      : config.fb_app_id,
        xfbml      : true,
        version    : 'v2.1'
      });

    };

  }

  initializeKakao = function initializeKakao(){

    var intervalId, tryCount;

    tryCount = 0;

    loadScript("//developers.kakao.com/sdk/js/kakao.min.js", 'kakao-jssdk');

    // kakao sdk callback 이 없고, AsyncInit 같은 메서드도 없어서 interval 로;
    intervalId = setInterval(function(){

      try {

        if( tryCount < 400 ){ Kakao.init(config.kakao_app_key); }
        clearInterval(intervalId);

      } catch (e) {

        tryCount++;

      }

    }, 5);


  }


  if( config.fb_app_id ){ initializeFacebook(); }
  if( config.kakao_app_key ){ initializeKakao(); }

};
// FACEBOOK : https://developers.facebook.com/docs/sharing/reference/share-dialog

(function(){


  Shareable.prototype.facebook = function(){

    if( navigator.userAgent.toLowerCase().match(/crios/) ){

      location.href = 'https://www.facebook.com/dialog/share?app_id='+this.config.fb_app_id
                                          +'&display=popup'
                                          +'&href='+location.href
                                          +'&redirect_uri='+location.href;

    } else {

      FB.ui({
        method: 'share',
        app_id: this.config.fb_app_id,
        display: 'popup',
        href: location.href,
      }, function(response){});

    }


  }

})();;
// KAKAO : https://developers.kakao.com/docs/js

(function(){

  Shareable.prototype.kakaotalk = function(label, image, WebButton, webLink){

    Kakao.Link.sendTalkLink({
      label: label,
      image: image,
      webButton: WebButton,
      webLink: webLink
    });

  }


  Shareable.prototype.kakaostory = function(){

    Kakao.Auth.login({
      success: function(authObj) {
        // 로그인 성공시, API를 호출합니다.
        Kakao.API.request( {
          url : '/v1/api/story/linkinfo',
          data : {
            url : location.href
          }
        }).then(function(res) {
          // 이전 API 호출이 성공한 경우 다음 API를 호출합니다.
          return Kakao.API.request( {
            url : '/v1/api/story/post/link',
            data : {
              link_info : res
            }
          });
        }).then(function(res) {
          return Kakao.API.request( {
            url : '/v1/api/story/mystory',
            data : { id : res.id }
          });
        }).then(function(res) {
          console.log('success', JSON.stringify(res));
        }, function (err) {
          alert(JSON.stringify(err));
        });
      },
      fail: function(err) {
        alert(JSON.stringify(err))
      }
    });

  }

})();;
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
  }

  Shareable.prototype.twitter = function(options){

    var url = 'https://twitter.com/intent/tweet?url=' + location.href;
    if( options.via ){ url += '&via=' + options.via }
    if( options.text ){ url += '&text=' + options.text }

    popup(url, 'scrollbars=yes,resizable=yes,toolbar=no,location=yes');

  }

})();
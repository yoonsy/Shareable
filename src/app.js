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

}
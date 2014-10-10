/*
 Copyright 2012 KAKAO
 */

(function (window, undefined) {
    var kakao = {};
    window.kakao = window.kakao || kakao;

    var uagent = navigator.userAgent.toLocaleLowerCase();
    if (uagent.search("android") > -1) {
        kakao.os = "android";
        if (uagent.search("chrome") > -1) {
            kakao.browser = "android+chrome";
        }
    } else if (uagent.search("iphone") > -1 || uagent.search("ipod") > -1 || uagent.search("ipad") > -1) {
        kakao.os = "ios";
    }

    var app = {
        talk: {
            base_url: "kakaolink://sendurl?",
            apiver: "2.0.1",
            store: {
                android: "market://details?id=com.kakao.talk",
                ios: "http://itunes.apple.com/app/id362057947"
            },
            package: "com.kakao.talk"
        },
        story: {
            base_url: "storylink://posting?",
            apiver: "1.0",
            store: {
                android: "market://details?id=com.kakao.story",
                ios: "http://itunes.apple.com/app/id486244601"
            },
            package: "com.kakao.story"
        }
    };

    kakao.link = function (name) {
        var link_app = app[name];
        if (!link_app) return { send: function () {
            throw "No App exists";
        }};
        return {
            send: function (params) {
                var _app = this.app;
                params['apiver'] = _app.apiver;
                var full_url = _app.base_url + serialized(params);

                var install_block = (function (os) {
                    return function () {
                        window.location = _app.store[os];
                    };
                })(this.os);

                if (this.os == "ios") {
                    var timer = setTimeout(install_block, 2 * 1000);
                    window.addEventListener('pagehide', clearTimer(timer));
                    window.location = full_url;
                } else if (this.os == "android") {
                    if (this.browser == "android+chrome") {
                        window.location = "intent:" + full_url + "#Intent;package=" + _app.package + ";end;";
                    } else {
                        var iframe = document.createElement('iframe');
                        iframe.style.display = 'none';
                        iframe.src = full_url;
                        iframe.onload = install_block;
                        document.body.appendChild(iframe);
                    }
                }
            },
            app: link_app,
            os: kakao.os,
            browser: kakao.browser
        };

        function serialized(params) {
            var stripped = [];
            for (var k in params) {
                if (params.hasOwnProperty(k)) {
                    stripped.push(k + "=" + encodeURIComponent(params[k]));
                }
            }
            return stripped.join("&");
        }

        function clearTimer(timer) {
            return function () {
                clearTimeout(timer);
                window.removeEventListener('pagehide', arguments.callee);
            };
        }
    };
}(window));;
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


  Shareable.prototype.kakaostory = function(shareUrl){

    var shareUrl = shareUrl || location.href;

    if( navigator.userAgent.toLowerCase().match(/android|ios/) ){

      kakao.link("story").send({
        post : "http://m.media.daum.net/entertain/enews/view?newsid=20120927110708426",
        appid : "m.media.daum.net",
        appver : "1.0",
        appname : "미디어디음",
        urlinfo : JSON.stringify({
          title:"(광해) 실제 역사적 진실은?",
          desc:"(광해 왕이 된 남자)의 역사성 부족을 논하다.",
          imageurl:[
            "http://m1.daumcdn.net/photo-media/201209/27/ohmynews/R_430x0_20120927141307222.jpg"
          ],
          type:"article"
        })
      });

    } else {

      Kakao.Auth.login({
        success: function(authObj) {
          // 로그인 성공시, API를 호출합니다.
          Kakao.API.request( {
            url : '/v1/api/story/linkinfo',
            data : {
              url : shareUrl
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

    var shareUrl = options.shareUrl || location.href;

    var url = 'https://twitter.com/intent/tweet?url=' + shareUrl;

    if( options.via ){ url += '&via=' + options.via }
    if( options.text ){ url += '&text=' + options.text }

    popup(url, 'scrollbars=yes,resizable=yes,toolbar=no,location=yes');

  }

})();
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

})();
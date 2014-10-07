// KAKAO : https://developers.kakao.com/docs/js

(function(app){

  app.kakao = function(apiKey){

    // app.utils.load('kakao');

    // setTimeout(function(){
    Kakao.init(apiKey);
    // }, 1000);

  }

  app.kakaotalk = function(label, image, WebButton, webLink){
    Kakao.Link.sendTalkLink({
      label: label,
      image: image,
      webButton: WebButton,
      webLink: webLink
    });
  }

  app.kakaostory = function(){

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
          document.getElementById('post-result').innerHTML = JSON.stringify(res);
        }, function (err) {
          alert(JSON.stringify(err));
        });
      },
      fail: function(err) {
        alert(JSON.stringify(err))
      }
    });

  }

})(Shareable);
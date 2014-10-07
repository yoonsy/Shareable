(function(app){

  app.utils = {

    load: function(network){

      var loadScript = function(url, scriptId){

        var js, fjs = document.getElementsByTagName('script')[0];
        if (document.getElementById(scriptId)) {return;}
        js = document.createElement('script'); js.id = scriptId;
        js.src = url;
        fjs.parentNode.insertBefore(js, fjs);

      }

      switch(network) {
        case 'facebook':
          loadScript('http://connect.facebook.net/ko_KR/sdk.js', 'facebook-jssdk');
          break;
        case 'kakao':
          loadScript('https://developers.kakao.com/sdk/js/kakao.min.js', 'kakao-jssdk');
          break;
        default:
          // default code block
      }

    },

    popup: function(url, windowOptions, id){

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

      window.open(url, id, windowOptions + ',width=' + width +
                                         ',height=' + height + ',left=' + left + ',top=' + top);
    }

  };


})(Shareable);


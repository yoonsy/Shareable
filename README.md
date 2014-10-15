Shareable
=========

SNS 공유 인터페이스


### 목적

- facebook, twiiter, kakao story, kakao talk 지원
- 데스크탑 웹 지원
- 모바일 웹 지원

### 네트워크별 이용하는 서비스

##### facebook
> [Share Dialog](https://developers.facebook.com/docs/sharing/)

##### twitter
> [Web Intents](https://dev.twitter.com/web/intents)

##### kakao talk
> 웹 : 미지원  
> 모바일 : [웹 버튼](https://developers.kakao.com/docs/js#카카오톡-링크-예제:-카카오톡-링크-버튼-생성하기---웹-버튼)  

##### kakao story
> 웹 : [카카오 스토리에 웹사이트 공유하기](https://developers.kakao.com/docs/js#카카오-api-예제:-카카오스토리에-웹사이트-공유하기)  
> 모바일 : [카카오 스토리 링크](http://www.kakao.com/services/api/story_link)

### 사용법

##### initialize
```JavaScript
var shareable = new Shareable({
  fb_app_id: 'fb_app_id',
  kakao_app_key: 'kakao_app_key'
});
```

##### facebook
```JavaScript
shareable.facebook(shareUrl);
```

##### twitter
```JavaScript
shareable.twitter({ via: '', text: '', shareUrl: location.href });
```

##### kakao story
```JavaScript
// appOptions : https://github.com/kakao/kakaolink-web
shareable.kakaostory(shareUrl, appOptions);
```

##### kakao talk
```JavaScript
// https://developers.kakao.com/docs/js-reference#kakao_link_sendtalklink(settings)
shareable.kakaotalk(label, image, WebButton, webLink);
```

---
layout: post
title:  "Jekyll post tag"
date:   2022-05-01
tags: Jekyll JavaScript JQuery
ctgry: 개발
excerpt: Jekyll의 게시물들을 각 태그 별로 필터링하고 관리하는 방법에 대해 알아본다.
---

## - Jekyll post tag
Jekyll 에서는 Post에 대해 머릿말에 정의를 통해 각 태그들의 배열을 선언해 구분만 지어줄 수 있는 정도다. <br>
해당 태그를 활용한 게시물의 필터링, 관리 등과 같은 응용은 사용자가 직접 구현해야 한다. <br>
따라서 Javascript, Jquery, Liquid를 활용하여, 필자는 태그들을 Badge 형태로 구현하고 클릭 시 각 태그에 맞는 게시물들이 보이도록  구현해보고자 한다. <br>
JS, JQuery등에 대한 이해도가 낮아 틈틈히 공부하며 구현했으니 많은 허점(?)이 있으니 넓은 아량으로 봐주시길...<br>
추가적으로 기능 업데이트를 할 예정이지만, 더 좋은 방법이 있으면 제보바랍니다.

<br> <br>
### 1. JQuery 불러오기  

JQuery란 HTML Element를 선택, 효율적 제어, 조작할 수 있도록 설계된 자바스크립트 라이브러리이다.
JQuery를 사용하는 방법으로는 크게 두 가지가 있는데,   

1) 직접 서비스 하는 경우  

: [JQuery 홈페이지](https://jquery.com/download/)에서 JQuery 소스코드를 다운로드 해 서버에 업로드 후 웹페이지 안에서 자바스크립트를 삽입  

2) CDN(Content Delivery Network)을 이용한 로드 

\# CDN : 지리적 제약 없이 전 세계 사용자에게 빠르게 콘텐츠를 전송하는 기술 <br>
Google이나 MS 등에서 해당 기능을 이용할 수 있으며, 필자는 아래와 같은 코드로 구글 CDN을 활용해 불러왔다.

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
```

### - 구현 완료 사진 미리보기
![Tag Badge]({{site.url}}/assets/images/20220501_01.png)

위의 사진과 같이 해당 Tag에 대한 각 Badge들을 만들고, 해당 Tag를 클릭하면 해당 태그에 대한 게시물만 필터링해 보여주도록 구현하고자 한다.

### 2. Post에 태그 추가하기

Jekyll에서 제공하는 tag 기능을 해당 게시물의 머릿말에서 배열의 형태로 구현하고, 해당 post에 대한 정보를 `_data/tag_info.yml`에 별도의 파일로 저장하였다. <br>
해당 파일에는 각 tag와 tag의 badge URL이 저장되어 게시물에 맞는 Badge를 Liquid로 불러와 보여주도록 구현하였다. <br>
(필자의 [이전 게시물]({% post_url 개발/2022-04-18-Jekyll_tag_custom %}) 에서 해당 내용에 대한 자세한 설명이 되어 있으므로 참고 바랍니다. ) 


### 3. 각 Tag에 대한 Badge 만들기

`_data/tag_info.yml`에 저장되어 있는 각 태그 정보를 응용하여 Liquid로 각 태그의 이름만 불러와 Badge의 형식을 만들기로 하였다.<br>
이를 위해 Tag Badge를 생성할 템플릿 파일(`_layouts/default.html`)을 수정하였다.

#### 3-1) Badge 구현하기
원하는 위치에 아래와 같이 Badge가 보이도록 Liquid로 구현하였다.

* `_layouts/default.html`
{% raw %}
```html
{% if site.data.tag_info.size > 0 %}
  <div>
<!--      전체 게시물을 보기 위한 All Tag-->
    <div>#All</div> 
    {% for tag in site.data.tag_info %}
          <div>#{{tag[0]}}</div>
    {% endfor %}
  </div>
{% endif %}
```
{% endraw %}

* 완료 사진
![Tag Badge ver1]({{site.url}}/assets/images/20220501_02.png)

Tag Info에 정의한 태그 이름들이 반복하면서 적혀졌지만, 아직 CSS 구현이 안되어 순수하게 나열만 되어 있는 형태다.

#### 3-2) Badge 꾸미기
Badge 형태로 만들어주기 위해서 원하는 태그의 클래스 이름을 정의하고, css를 활용하여 수정 작업을 진행하였다.
* `_layouts/default.html`
{% raw %}
```html
{% if site.data.tag_info.size > 0 %}
    <div class="wrapper">
        <div class="box All" data-tag="All" style="cursor:pointer;" >#All</div>
        {% for tag in site.data.tag_info %}
          <div class="box {{tag[0]}}" data-tag="{{tag[0]}}" style="cursor:pointer;" >#{{tag[0]}}</div>
        {% endfor %}
    </div>
{% endif %}
```

* `_sass/plain.css`
```css
.wrapper {
  width: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 30%);
  margin-top: 5%;
}

.box {
  border: solid 1px black;
  border-radius: 5px;
  font-size: 30%;
}

.box:hover {
  background-color: #2E2E38;
  color: #DDC809;
  font-weight: bold;
}
```
{% endraw %}

* 완료 사진
![Tag Badge ver2]({{site.url}}/assets/images/20220501_03.png)

#### 3-3) 클릭 이벤트 구현하기
원하는 태그 Badge를 클릭했을 때 해당하는 태그에 맞는 게시물만을 필터링하여 보여주기 위해서는 클릭 이벤트 구현이 필요하다. <br>
필자는 JavaScript와 JQuery를 이용해 해당하는 태그에 맞는 게시물을 필터링하도록 구현하였다. <br>
해당 태그를 클릭하면 해당 태그의 class에 `clicked`를 추가하고, 필터링하여 원하는 게시물만 보이도록 구현하고자 한다.
우선 클릭 했을 때, 해당 태그 값을 가져오는 로직을 토대로 개선해나가 보도록하자. <br>

* `asssets/js/tag.js`
```javascript
function tagFilter(){
    let dv = event.currentTarget;
    let class_name = dv.className;
    if (class_name.indexOf("clicked") > 0){
        $(".post_li").css("display", "");
        $(".box").removeClass('clicked');
    } else {
        event.target.classList.add("clicked");
        let currentTag = dv.getAttribute("data-tag");
        filterByTagName(currentTag);
    }
}
```
`tagFilter`라는 함수를 만들어, 클릭 시 해당 태그의 class에 `clicked`를 추가하고 해당 속성 중 `data-tag`가 있는 속성을 가져와 `filterByTagName()`의 인수로 전달한다. 
 만약 element가 `clicked`가 있는 경우 전체 게시물을 보여주고 해당 클래스를 지우는 로직을 구현하였다.


#### 3-4) 필터링 함수 구현하기
마지막으로 필터링 함수만 구현하면 모두 완성이다. 해당하는 태그의 이름을 인수로 받아 각 게시물 목록에 포함되어 있는 태그를 비교하여 태그가 없는 경우 해당 게시물을 숨기는 기능을 구현하고자 한다.

* `assets/js/tag.js`
```javascript
// 선택된 태그에 따라 게시물을 Filtering
function filterByTagName(tagName) {
    if (tagName == "All"){
        $(".post_li").css("display", "");
    }else{
        $(".post_li").css("display", "none");
        $('img[post-tag='+tagName+']').parents(".post_li").css("display", "");
    }
}
```
위와 같이, tagName이 전체 게시물을 보여주는 `All`인 경우 게시물이 나열된 `post_li` class의 모든 `display` 상태를 지워주어 다 보이게 만든다.  
tagName이 각 태그의 이름인 경우 전체 게시물을 모두 지운 후에 해당하는 tagName을 가지고 있는 `post_li`의 상위 태그만 보이도록 구현하였다.

#### 3-5) 연결하기
3-2)의 결과물에 클릭시 이벤트를 주어 위의 코드를 적용하면 모든 과정은 끝난다.

* `_layouts/default.html`
{% raw %}
```html
<div class="about-category">
        {% if site.data.tag_info.size > 0 %}
          <div class="wrapper">
            <div class="box All" data-tag="All" style="cursor:pointer;" onclick="tagFilter()">#All</div>
            {% for tag in site.data.tag_info %}
                  <div class="box {{tag[0]}}" data-tag="{{tag[0]}}" style="cursor:pointer;" onclick="tagFilter()">#{{tag[0]}}</div>
            {% endfor %}
            </div>
        {% endif %}
      </div>
      {%- endif -%}
```
{% endraw %}


### 4. 한계점
태그 필터를 적용하기 위해 필요한 기술들에 대한 전반적인 이해도가 낮다보니, 그리 깔끔하고 효율적으로 구현하지는 못한 것 같다.  
다른 문서들을 참고하고 피나는 구글링을 통해 여차저차 구현하긴 했지만, 아직 한계점은 분명하다. 내가 생각하는 한계점은 두 가지 정도이다. <br>

1. 중복 필터링 불가
: 태그에 대한 필터링이 중복 수행(Ex. jekyll and javascript : Jekyll이면서 Javascript인 게시물)이 불가능하고 하나의 태그에 한해서만 필터링이 가능하다. 
각 포스트에 여러 태그가 들어가다보니 모든 게시물을 지우고 해당하는 태그만 보이도록 구현하여 기능적 한계점이 있는 것 같다. 필터링 로직에 대한 수정이 필요할 것 같다.

2. 게시물 상세 내용에서도 태그 목록 존재
: 해당 게시물에 들어가서도 위에 구현한 내용이 보이는 문제를 발견하였다. 해당 태그를 클릭하더라고 별도의 문제는 발생하지 않지만, 필요없는 기능이므로 로직상으로 구현해야 할 것 같다.

위의 두 가지 한계점을 개선하도록 노력해야겠다.

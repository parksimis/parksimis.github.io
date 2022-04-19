---
layout: post
title:  "Jekyll tag custom"
date:   2022-04-18
tags: Jekyll gh-pages
ctgry: 개발
---

## - Jekyll tag custom하기
기존 Template에서 제공하는 Tag는 뭔가 이쁘지가 않아 Github page의 장점(?)을 살려 내 입맛대로 Custom하기로 했다. <br>

### 1) 기존 Jekyll Tag 형식
![기존 Jekyll Tag]({{site.url}}/assets/images/20220418_01.png)

* 기존 Jekyll Tag는 위 사진과 같은 형식으로 밋밋하게 되어 있다.
* 자세히 살펴보기 위해 코드를 들여다보았다.
{% raw %}
```html
<!-- _layouts/home.html-->
{%- for post in site.posts -%}
      <li>
        {%- assign date_format = site.plainwhite.date_format | default: "%b %-d, %Y" -%}
        <a class="post-link" href="{{ post.url | relative_url }}">
          <h2 class="post-title">{{ post.title | escape }}</h2>
        </a>
        <div class="post-meta">
          <div class="post-date">
            <i class="icon-calendar"></i>
            {{ post.date | date: date_format }}
          </div>
          {%- if post.categories.size > 0-%}
          <ul class="post-categories">
            {%- for tag in post.categories -%}
            <li>{{ tag }}</li>  <!-- tag 작성 코드 -->
            {%- endfor -%}
          </ul>
          {%- endif -%}
        </div>
        <div class="post">
          {%- if site.show_excerpts -%}
            {{ post.excerpt }}
          {%- endif -%}
        </div>
      </li>
    {%- endfor -%}
  </ul>
```
{% endraw %}

* 각 Post의 머릿말의 Categories의 Loop를 돌며 미리 정의한 스타일에 맞는 tag의 형식으로 변환하는 비교적 간단한 코드였다.

### 2) 계획
나름의 생각을 해본 결과, 이전 Github Profile에서 사용했던 Badge를 응용하여 꾸미기로 하였다. <br>
Badge 는 [shields.io](https://shields.io/) 에서, 아이콘은 [Simple Icon](https://simpleicons.org/) 에서 사용하고 아이콘이 없는 경우에는 필자가 커스텀하여 사용하기로 하였다.<br>
이전 [Directory Structure]({% post_url 개발/Jekyll/2022-03-17-Jekyll_directory_structure %})에서 학습했던 `_data` 폴더에 tag에 관한 정보(태그 이름, badge url)를 저장하고 각 post의 category에 맞는 badge url을 나란히 보여주는 형식으로 진행하려 한다. <br>
다음과 같은 순서로 작업 계획을 짰다.
1. Badge 만들기
2. `_data` 폴더에 tag 정보 저장하기
3. Template(`home.html`, `post.html`) 수정하기

### 2-1) Badge 만들기
Badge는 이전에 Github Profile에서 만들어 본 적이 있어서 의외로 쉽게(?) 만들 수 있었다.(기억이 가물가물했지만..) <br>
Simple Icon에 해당하는 Logo가 있는 경우 아래의 형식에 맞춰 입력해주면 된다.

```posh
https://img.shields.io/badge/{Logo 이름}-{css컬러}?style={스타일}&logo={로고}&logoColor={로고컬러}
```
* 예시(Python)

  1) Simple Icon에서 Python 검색 <br>
  ![Simple Icon - Python]({{site.url}}/assets/images/20220418_02.png)

   * 위의 사진에서 `Pyhon`을 Logo 이름에 css 컬러에 `3776AB`를 넣어주면 된다.
   * Style의 경우 [Shields.io](https://shields.io/) 의 메인 페이지에서 Styles 항목을 참고하여 설정하면 된다.
   2) 결과
   * Badge Style을 `for-the-badge`로 설정 <br>
   ![Python-logo](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white)

### 2-2)`_data` 폴더에 tag 정보 저장하기
현재 시점에서 작성한 게시글이 적어 Tag가 많지 않지만, 이후 꾸준한 업로드를 통해 Tag가 늘어날 것을 대비해 tag 정보를 따로 저장하여 관리가 용이하게 만들고자 한다. <br>
`_data` 폴더에 `tag_info.yml`이라는 `yml` 확장자의 파일을 만들어보자. <br>
* `_data/tag_info.yml`

```yaml
gh-pages: "https://img.shields.io/badge/GitHub Pages-222222.svg?&style=for-the-badge&logo=GitHub Pages"
Jekyll: "https://img.shields.io/badge/Jekyll-CC0000.svg?&style=for-the-badge&logo=Jekyll"
```
원하는 Tag 이름에 맞는 badge의 url을 Key, Value 형태로 저장하여 관리하도록 한다. <br>
만약 게시글의 Category가 추가되면 해당 파일에 게시글에 맞는 Category, URL을 작성하기만 하면 된다..! <br>
나는 현재 Github Page와, Jekyll 두 Category에 대해서만 작성하였다. 추후 계속해서 추가할 예정이다. <br>

### 2-3) Template(`home.html`, `post.html`) 수정하기
이제 해당하는 category에 맞는 Badge URL을 가져올 수 있도록 각 Template의 코드를 수정해야 한다. <br>
{% raw %}
```html
  <div class="post-date"><i class="icon-calendar"></i>{{ page.date | date: date_format }}</div>
    {%- if page.categories.size > 0 -%}
    <ul class="post-categories">
      {%- for tag in page.categories -%}
        {% if site.data.tag_info contains tag %}
          <img class="tag" src="{{site.data.tag_info[tag]}}">
        {% endif %}
      {%- endfor -%}
    </ul>
    {%- endif -%}
  </div>
```
{% endraw %}

[Liquid Template Language](https://shopify.github.io/liquid/basics/operators/) 의 `contains`를 사용해 구현할 수 있었다. <br>
`site.data.tag_info`에서 각 tag의 정보의 유무를 확인하여, `True`인 경우 Value 값(URL) 검색하여 imgsrc에 저장하는 방식이다. <br>

### 2-4) 결과

위의 과정을 통해 각 Post의 머릿말에 따라 정의된 tag_info에 맞는 badge image가 보여지게 된다. <br>
결과물은 아래와 같다.

![custom_result]({{site.url}}/assets/images/20220418_03.png)

### 3) 마무리
다소 밋밋했던 기본 Tag UI를 Badge를 통해 커스텀하는 과정을 기록하였다. 블로그가 처음이다보니 정리가 잘 안되어 내용이 복잡해진 것 같다.(어렸을때 책 많이 읽을걸...) 게시글도 자주 쓰고 타 블로그도 자주 익히며 점점 더 발전하는 모습을 보여야지. 그래도 내 글이 Jekyll이나 Badge를 처음 다뤄보는 분들에게 조금이나마 도움이 되길 바란다. <br>










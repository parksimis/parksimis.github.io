---
layout: post
title:  "Jekyll Tag"
date:   2022-03-22
categories: Jekyll gh-pages
---

### Github 블로그 시작기 5
 1. Tags and Categories
 1-1. Tags
 1-2. Categories

## - Tags and Categories
* Jeyll은 블로그 포스트의 `tags`와 `categories` 설정이 가능하다.

### 1) Tags
* Jekyll에서 각 포스트에 Tag 기능을 추가하는 것은 간단하다.
* 각 포스트의 첫 부분에는 각 포스트에 대해 `yaml`형식으로 메타 데이터 설정이 가능하다.
  * 그곳에 `tag`나 `tags` 변수를 추가해주면 된다.
  Jekyll의 `tags`는 자동적으로 `whitespace`를 기준으로 split하여 tag 정보를 작성한다.<br>
  예를 들어 `tag : classic hollywood`의 경우 `classic hollywod` 하나의 단일적인 태그로 생성되지만, <br>
  `tags : classic hollywood`의 경우 `["classic", "hollywood"]`로 두개의 태그로 처리된다.
  * 아래와 같은 형식으로 각 포스트에 맞는 tag들을 기입해주면 된다.

```yaml
layout: post
tags: [Jeykll]
```
 
Jekyll의 각 포스트들은 렌더링되는 HTML 파일에 대한 이름을 메타 데이터의 `layout` 변수에 정의한다. <br>
위의 경우 `post`로 정의되어 있으므로 `post.html`에 해당 포스트에 대한 내용이 담긴다. <br>
따라서 `_layout` 디렉토리 안의 `post.html` 파일의 내용을 수정해야 `Tag`의 기능을 추가할 수 있다. <br>

#### - Tag 변수 사용하기
Jekyll은 [이전 포스트](2022-03-21-Jekyll_variables.md) 에서 기술했듯이, 사용할 수 있는 전역 변수가 선언되어 있는데, <br>
`page` 변수 중 `page.tags` 문법으로 각 게시물의 머릿말에 기술되어 있는 태그 목록을 불러와 사용할 수 있다. <br>
아래는 실제 현재 블로그의 `post.html`에 기술된 코드 내용이다.
{% raw %}
```html
{% if page.tags.size > 0 %}
    <span class="date-divider">/</span>
    {% for tag in page.tags %}
        {% if forloop.index == page.tags.size %}
           <a href='{{ site.baseurl }}tag/{{ tag | slugify: "latin" }}/'>{{ tag | upcase }}</a>
        {% else %}
           <a href='{{ site.baseurl }}tag/{{ tag | slugify: "latin" }}/'>{{ tag | upcase }}</a>,
        {% endif %}
    {% endfor %}
{% endif %}
```
{% endraw %}

위의 코드를 살펴보면, tag 사이즈가 0 이상인 경우, page.tags 목록을 loop 돌며, 해당 tag의 이름을 UpperCase로 만들어 a 태그로 만드는 작업을 수행한다.


### 2) Categories
* 카테고리가 태그와 유사한 점은 다음과 같다.
  * 머릿말에서 `category`나 `categories` 키를 사용하여 정의될 수 있다.
  * `site.categories`로 반복 가능한 Liquid templates로 접근할 수 있다.

* 카테고리와 태그의 차이점은 다음과 같다.
  * 태그와 달리 게시물의 카테고리는 게시물의 파일 경로에 의해서도 정의될 수 있다. 
  * `_post` 상위에 있는 모든 디렉토리는 카테고리로 인식될 수 있다.
  * 예를 들어, 만약 게시물이 `movies/horror/_posts/2019-05-21-bride-of-chuck.md`의 위치에 있다면, <br> `movies`와 `horror`는 자동적으로 해당 게시물의 카테고리들로 등록된다.
  * 게시물의 머릿말에 카테고리를 정의하지 않았더라도 자동으로 존재하는 리스트를 추가해준다. 
  
카테고리와 태그의 전형적인 특징은 카테고리는 게시물에 생성된 URL에 통합될 수 있는 반면에 태그는 불가능하다는 것이다. <br>
그러므로 `category : classic hollywood`인지 `categories : classic hollywood`인지에 따라서 게시물의 URL은 <br>
`movies/horror/classic%20hollywood/2019/05/21/bride-of-chucky.html` 거나 <br>
`movies/horror/classic/hollywood/2019/05/21/bride-of-chucky.html`이 될 수 있다.


* 참고 사이트
  [Jekyll Docs - Posts](https://jekyllrb.com/docs/posts/#tags-and-categories)


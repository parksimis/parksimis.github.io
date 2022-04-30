---
layout: post
title:  "Jekyll Variables"
date:   2022-03-21
tags: Jekyll gh-pages
ctgry: 개발
excerpt: Jekyll에서 사용하는 변수의 종류와 내용에 대해서 소개한다.
---

## - 변수
* Jekyll에서 머리말이 있는 모든 파일은 Jekyll의 처리 대상이 된다. 이후 이러한 각 파일에 대해 Jekyll은 Liquid를 통해 다양한 데이터를 사용가능하게 한다.
* 아래의 내용은 [Jekyll 변수](https://jekyllrb.com/docs/variables/) 에 관한 내용을 해석하여 필자가 재구성하였습니다.

### 1) Global Variables(전역 변수)

|변수|설명|
|--|--|
|`site`|`_config.yml`의 정보와 사이트 전체적인 구성 정보|
|`page`|Page 정보와 `yaml`의 머릿말과 사용자 정의 변수|
|`layout`| Layout 정보와 `yaml`의 머릿말과 그에 작성한 사용자 정의 변수|
|`content`|레이아웃 파일 내에서, 렌더링된 Post의 내용이나 래핑되는 페이지/ Post나 Page 파일에서 정의되지 않는다.|
|`paginator`|`paginate` 옵션이 세팅된 경우 사용할 수 있는 페이지 관련 변수|

### 2) Site Variables(사이트 변수)

|변수|설명|
|--|--|
|`site.time`|`jekyll` command를 실행시킨 시간|
|`site.pages`|모든 page의 리스트|
|`site.posts`|모든 포스트의 시간별 역순의 리스트|
|`site.related_posts`|만약 처리된 페이지가 포스트라면, 10개까지 관련 포스트들이 포함되어 나옴. <br> 최근 게시물이 10개까지 default로 나옴 느리지만 고퀄리티인 결과를 보고 싶으면 `jekyll` 명령어에 `--lsi`를 옵션을 추가 <br> (Github Page에는 해당 옵션 제공 X)|
|`site.static_file`|static files의 목록. 각 파일은 다음의 속성들을 갖는다.`path`, `modified_time`, `name`, `basename`, `extname` |
|`site.html_pages`|`.html`로 끝나는 `site.pages`부분 집합 리스트|
|`site.html_files`|`.html`로 끝나는 `site.static_files`의 부분 집합 리스트|
|`site.collections`|모든 컬렉션들의 리스트(post 포함)|
|`site.data`|`_data` 디렉토리에 위치한 `YAML` 파일에서 로드된 데이터의 목록|
|`site.documents`|모든 컬렉션의 document들의 목록|
|`site.categories.CATEGORY`|`CATEGORY`값을 가지는 모든 post의 리스트|
|`site.tags.TAG`|`TAG`값을 가지는 모든 post의 리스트|
|`site.url`|`_config.yml`에서 정의되는 url <br> 예를 들어 `url: https://mysite.com`이 정의되어 있다면 `site.url`로 접근 가능함 |
|`site.[CONFIGURATION_DATA]`|명령어나 `_config.yml`에서 정의한 모든 변수들은 사이트 변수들을 통해 사용할 수 있다. <br> 예를 들어, `foo: bar`로 정의한 경우 `site.foo`와 같은 liquid로 접근할 수 있다.|

<br>

### 3) Page Variables(페이지 변수)

|변수|설명|
|--|--|
|`page.content`| 처리 중인 Liquid와 페이지에 따라서 렌더링되거나 또는 렌더링되지 않은 페이지의 내용|
|`page.title`|Page의 타이틀|
|`page.excerpt`| 렌더 되지 않은 문서의 발췌 부분 |
|`page.url`| 도메인이 없지만, 선행 슬래시가 있는 게시물의 URL <br> Ex. `2022/03/07/Jekyll.html`|
|`page.date`|게시물이 등록된 시간<br> 이 값은 각 Post의 머릿말에 새로운 시간을 작성하면 그 값으로 재정의된다. <br> [strftime](http://strftime.net/)과 문법이 동일|
|`page.id`|컬렉션 또는 게시물의 문서의 고유한 식별자(RSS 피드를 사용할 때 유용)|
|`page.categories`|해당 게시물이 속해있는 카테고리의 리스트. 카테고리는 `_posts` 디렉토리 위의 디렉토리 구조에서 파생됨. <br> Ex.`work/code/_posts/2022-03-07-Jekyll.md`의 경우 `['work', 'code']`임. <br> 이 내용은 각 게시물의 머릿말에서 설정이 가능함.|
|`page.collection`|해당 문서가 속한 컬렉션의 라벨. <br> Ex. 게시물을 위한 `posts`나 `_puppies/rover.md`의 파일 경로의 documents를 위한 `puppies`를 말한다. <br> 만약 컬렉션의 일부가 아니면, 빈 문자열이 반환됨|
|`page.tags`|게시물이 속한 태그의 리스트. 머릿말에서 설정 가능|
|`page.dir`|source 디렉터리와 게시물 또는 페이지의 사이의 경로. 머릿말의 `permalink` 변수 작성 시 재정의 가능|
|`page.name`|게시물 또는 페이지의 파일명 |
|`page.path`|원 게시물 또는 페이지의 경로. 머릿말에서 재정의 가능|
|`page.next`|`site.posts`에서 현재 게시물의 다음 위치에 있는 게시물. 마지막 게시물에서는 `nil`을 반환함|
|`page.previous`|`site.posts`에서 현재 게시물의 이전 위치에 있는 게시물. 첫 게시물에서는 `nil`을 반환함|

### 4) Paginator

|변수|설명|
|--|--|
|`paginator.page`|현재 페이지의 번호|
|`paginator.per_page`| 페이지 당 게시물 수|
|`paginator.posts`|해당 페이지에서 사용 가능한 게시물|
|`paginator.total_posts`|전체 게시물의 번호|
|`paginator.total_pages`|전체 페이지의 번호|
|`paginator.previous_page`|이전 페이지의 번호 또는 `nil`(만약 이전 페이지가 없다면)|
|`paginator.previous_page_path`|이전 페이지의 경로 또는 `nil`(만약 이전 페이지가 없다면)|
|`paginator.next_page`|다음 페이지의 번호 또는 `nil`(만약 다음 페이지가 없다면)|
|`paginator.next_page_path`|다음 페이지의 경로 또는 `nil`(만약 다음 페이지가 없다면)|


### - 참고 사이트
* [Jekyll Variables](https://jekyllrb.com/docs/variables/)
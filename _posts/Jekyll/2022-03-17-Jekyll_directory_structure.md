---
layout: post
current: post
cover:  assets/built/images/locked.jpg
navigation: True
title: Github Blog 시작기 3 - Directory Structure
date: 2021-03-16 16:40:00
tags: [Jeykll]
class: post-template
subclass: 'post tag-Jekyll'
author: Park Seon Ik
---

## - Directory Structure(디렉토리 구조)
* Jekyll의 디렉토리 구조는 아래와 같이 구성된다.
  * [Jekyll documentation](https://jekyllrb.com/docs/structure/) 의 내용을 해석하여 필자가 재구성함.

* 기본 Jekyll 실행 시 Directory Structure
```posh
.
├── _config.yml
├── _data
│   └── members.yml
├── _drafts
│   ├── begin-with-the-crazy-ideas.md
│   └── on-simplicity-in-technology.md
├── _includes
│   ├── footer.html
│   └── header.html
├── _layouts
│   ├── default.html
│   └── post.html
├── _posts
│   ├── 2007-10-29-why-every-programmer-should-play-nethack.md
│   └── 2009-04-26-barcamp-boston-4-roundup.md
├── _sass
│   ├── _base.scss
│   └── _layout.scss
├── _site
├── .jekyll-cache
│   └── Jekyll
│       └── Cache
│           └── [...]
├── .jekyll-metadata
└── index.html # can also be an 'index.md' with valid front matter
```

* File/Directory 목록
  * 실제 파일은 더 많지만 필자가 실제로 사용 및 활용한 폴더 및 파일만 기술하였음.

|FILE/DIRECTORY|DESCRIPTION|
|--|--|
|`_config.yml`|설정 정보를 저장하는 파일. yml 파일로 되어 있고, 이름, url 주소, 언어 등 다양한 정보를 command line 형태로 입력할 수 있지만, yml 형식으로 작성되어 구분이 편하다.|
|`_drafts`|작성 중인 글을 위한 폴더. 날짜 형식이 붙을 필요가 없음.|
|`_includes`|재사용을 위해 레이아웃이나 게시물에 포함시킬 수 있는 파일들을 저장하는 폴더 `\{\% include file.ext \%\}`를 사용해 레이아웃 등에 불러와 사용 가능|
|`_layouts`|게시물을 래핑하는 템플릿을 저장하는 폴더. `default.html`라는 이름의 기본 템플릿이 존재하고, 필요에 따라 상속하여 다른 레이아웃을 만듦.|
|`_posts`|작성 post를 저장하는 공간으로 파일은 다음과 같은 명명 규칙을 가져야 한다. `YEAR-MONTH-DAY-title.MARKUP`|
|`_data`|사이트 생성 시 사용하는 부가적인 데이터를 저장하는 공간. 기본 변수, Liquid Template system뿐만 아니라 자신만의 데이터도 정의 가능 <br> 이 공간은 `yaml, yml, json, csv, tsv` 파일로부터만 데이터를 읽어들일 수 있음.|
|`_site`|Jekyll이 변환 완료 시 생성 사이트가 기본적으로 배치되는 위치|


### 1) Configuration
* Jekyll은 사이트 개인화를 위해 유동성을 제공하는데, `_config.yml` 또는 `_config.toml` 파일을 활용으로 가능하다.
* 기본 구성, Environments, Markdown Options, Liquid Option 등 여러 옵션을 `yml` 데이터 형식으로 작성하여 설정 가능
  * 세부 내용은 [Documentation](https://jekyllrb.com/docs/configuration/) 을 참고


### 2) Includes 
* `_includes` 폴더에는 곻통적으로 사용가능한 컴포넌트들을 만들어 놓고 page에 삽입하여 사용할 수 있다.
* `include` tag를 사용해 `_includes` 폴더에 저장된 다른 파일의 콘텐츠를 포함할 수 있다.
```html
{\% include footer.html \%}
```
* 원하는 html 페이지에서 위의 코드를 통해 `_includes` 폴더의 `footer.html`을 찾아 내용을 삽입할 수 있다.


#### 2-1) 참조 파일 Includes
* `include_relative` 태그를 사용하여 현재 파일과 관련된 참조 파일을 불러와 사용할 수 있다.
```html
{\% include_relative somedir/footer.html \%}
```
* 위의 코드를 통해 `_includes`폴더 이외의 폴더에 있는 html 파일을 불러와 사용할 수 있다.
  * 그러나 참조 위치는 해당 파일의 상대적이므로 주의해야 한다.
  * 예를 들어, `_post/2014-09-03-my-file.markdown`에서 `include_relative` 태그를 사용한다면, 그 파일은 반드시 `_post`나 `_post`폴더의 하위 폴더에 위치해야 함.
  * `../`를 사용해 상위 폴더의 위치를 참조할 수 없다.


### 3) Data Files
* Jekyll에서 사용 가능한 내장변수와 [Liquid templating system](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) 을 통해 사용자 지정 데이터를 지정할 수 있다.
* 이를 통해 템플릿에서 반복을 방지하고, 수정 없이 사이트별로 옵션을 설정할 수 있다.

#### 3-1) Data Folders
* `_data`폴더는 Jeykll이 사이트를 생성할 때 사용할 추가 데이터를 저장하는 곳이다.
* `YAML, JSON, CSV, TSV`를 확장자로 갖는 파일들만 액세스할 수 있다.
  * CSV와 TSV 파일은 헤더 행이 포함되어야 함.

#### Ex. Author 정보 추가
* 예를 들어 페이지에 반복되어 사용될 Author의 정보를 포함하고 싶다면 아래의 루트에 해당 내용을 추가할 수 있다.
* `_data/authors.yml`
```yaml
parksimis :
  name: Park Seon Ik      
  github: parksimis

examplemember:
  name: examplemember
  github: examplegithubrepo
  
```

* 위의 데이터는 `site.data.authors`로 액세스가 가능함.
  * 파일의 이름이 변수 이름을 결정하기 때문에, 동일한 디렉토리에 같은 이름의 다른 확장자가 있지 않도록 조심해야 함.
  * 실제 필자의 `post-card.html`에서 사용되는 코드
```html
 {\% for author in site.data.authors \%}
    {\% if author[1].username == post.author \%}
        {\% if author[1].picture \%}
        <img class="author-profile-image" src="{{ site.baseurl }}{{ author[1].picture }}" alt="{{ author[1].name }}" />
        {\% endif \%}
        <span class="post-card-author">
            <a href="{{ site.baseurl }}author/{{ post.author }}/">{{ author[1].name }}</a>
        </span>
    {\% endif \%}
{\% endfor \%}
```

### 3-2) 하위 폴더
* 데이터 파일은 폴더의 하위 폴더에 배치가 가능함.
* 각 폴더의 레벨은 변수의 namespace에 추가됨

#### Ex. 조직 정보 추가
* [Jekyll Docs](https://jekyllrb.com/docs/datafiles/) 에 소개된 하위폴더 예시를 활용해 이해해보자.
  * Github 조직이 `orgs` 폴더 아래의 파일에서 어떻게 별도로 정의할 수 있는지 하위 폴더로 진행하는 예시이다.

* 1) `_data/orgs/jekyll.yml`
```yaml
username: jekyll
name: Jekyll
members:
  - name: Tom Preston-Werner
    github: mojombo

  - name: Parker Moore
    github: parkr
```

* 2) `_data/orgs/doeorg.yml`
```yaml
username: doeorg
name: Doe Org
members:
  - name: John Doe
    github: jdoe
```

* 위와 같은 경우 `site.data.orgs`를 통해 조직에, 각 파일 이름으로 각각에 액세스할 수 있다.
```html
<ul>
{\% for org_hash in site.data.orgs \%}
{\% assign org = org_hash[1] \%}
  <li>
    <a href="https://github.com/{{ org.username }}">
      {{ org.name }}
    </a>
    ({{ org.members | size }} members)
  </li>
{\% endfor \%}
</ul>
```

### 4) Posts
* 블로그 게시물을 텍스트 파일로 작성하면, Jekyll이 이를 변환하여 사이트에 제공함.

#### 4-1) 게시물 폴더
* 블로그 포스트는 기본적으로 `_post` 폴더에 저장함. 
* 일반적으로 포스트들은 `Markdown` 형식으로 작성하고, `HTML`도 지원함.

#### 4-2) 게시물 작성
* 게시물을 작성하기 위해서는 `_post` 폴더에 아래의 형식을 맞춰주어야 함.
```commandline
YEAR-MONTH-DAY-title.MARKUP
```
```
2022-03-07-Jekyll.md
2022-03-11-Jekyll_Syntax.md
```
* 위와 같은 형식을 지켜주어야 한다.
* 모든 블로그 포스트 파일은 일반적으로 레이아웃이나 기타 메타 데이터를 설정하는 머리말로 시작하게 된다.
* 아래의 예시와 같은 형식이다. 
```markdown
---
layout: post
current: post
cover:  assets/built/images/locked.jpg
navigation: True
title: Github Blog 시작기 - basic
date: 2021-03-16 16:40:00
tags: [Jeykll]
class: post-template
subclass: 'post tag-Jekyll'
author: Park Seon Ik
---
```


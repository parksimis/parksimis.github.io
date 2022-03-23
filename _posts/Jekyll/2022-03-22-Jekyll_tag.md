---
layout: post
current: post
cover:  assets/built/images/Jekyll_Logo.png
navigation: True
title: Github Blog 시작기 5 - <br> Tag와 Categories
date: 2022-03-22
tags: [Jeykll]
class: post-template
subclass: 'post tag-Jekyll'
author: Park Seon Ik
---

## - Tags and Categories
* Jeyll은 블로그 포스트의 `tags`와 `categories` 설정이 가능하다.

### 1) Tag 기능 추가하기
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
* Jekyll의 각 포스트들은 
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
  * Jekyll documentation의 내용을 해석하여 필자가 재구성함.

|FILE/DIRECTORY|DESCRIPTION|
|--|--|
|`_config.yml`|설정 정보를 저장하는 파일. yml 파일로 되어 있고, 이름, url 주소, 언어 등 다양한 정보를 command line 형태로 입력할 수 있지만, yml 형식으로 작성되어 구분이 편하다.|
|`_drafts`|작성 중인 글을 위한 폴더. 날짜 형식이 붙을 필요가 없음.|
|`_includes`|재사용을 위해 레이아웃이나 게시물에 포함시킬 수 있는 파일들을 저장하는 폴더 `\{\% include file.ext \%\}`를 사용해 레이아웃 등에 불러와 사용 가능|
|`_layouts`|게시물을 래핑하는 템플릿을 저장하는 폴더. `default.html`라는 이름의 기본 템플릿이 존재하고, 필요에 따라 상속하여 다른 레이아웃을 만듦.|
|`_posts`|작성 post를 저장하는 공간으로 파일은 다음과 같은 명명 규칙을 가져야 한다. `YEAR-MONTH-DAY-title.MARKUP`|
|`_data`|사이트 생성 시 사용하는 부가적인 데이터를 저장하는 공간. 기본 변수, Liquid Template system뿐만 아니라 자신만의 데이터도 정의 가능 <br> 이 공간은 `yaml, yml, json, csv, tsv` 파일로부터만 데이터를 읽어들일 수 있음.|
|`_site`|Jekyll이 변환 완료 시 생성 사이트가 기본적으로 배치되는 위치|


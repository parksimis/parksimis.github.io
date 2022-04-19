---
layout: post
title:  "Jekyll Drafts"
date:   2022-03-28
tags: Jekyll gh-pages 
ctgry: 개발
---

## - Drafts
Drafts는 파일 이름에 일자가 없는 게시물이다. 다시 말해 아직 수정하고 있어서 publish하고 싶지 않은 게시물들을 말한다. <br>
drafts를 시작하고 실행하려면, 사이트 루트에 `_drafts` 폴더를 만들고 첫번째 초안을 만들면 됨.

```posh
.
├── _drafts
│   └── a-draft-post.md
...
```

초안으로 사이트를 미리 보려면 `--drafts`인자를 `jekyll build`나 `jekyll serve` 명령어에 붙여주면 현재 날짜로 게시물에 등록되어 볼 수 있다.
<br> 작성이 완료되면 `_drafts` 폴더에서 `_posts` 폴더로 게시물의 형식(`YEAR-MONTH-DAY-title.MARKUP`)으로 변경하여 옮겨주면 정식 게시물로 등록이 된다.


### 참고 게시물
* [Jekyll Docs](https://jekyllrb.com/docs/posts/)


# - Github Blog 시작기 2

## 1. Syntax Highlighting
* 코드 가독성과 깔끔한 Code block을 위하여 `rouge`의 syntax-highlighter를 설치 및 사용하고자 한다.

### 1-1) rouge란
* [Rouge-ruby Repo](https://github.com/rouge-ruby/rouge)
* Rouge는 pure Ruby syntax highlighter이다.
* Rouge는 가장 대표적으로 사용되는 Ruby 라이브러리임.
  * Jekyll에서는 기본적인 syntax 하이라이터로 사용되고, 기본적으로 Rouge는 `\{\% highlight \%\}` 템플릿 태그에 wrapping하여 사용함.
* Jekyll은 `rouge`와 `pygments` 두 가지의 Syntax Highlighter를 제공했었는데, Jekyll 3 이후부터 Pygments는 지원하지 않음.
* [홈페이지](https://github.com/rouge-ruby/rouge/wiki/List-of-supported-languages-and-lexers)를 통해 지원 언어 목록 확인 가능

### 1-2) rouge 설치
* `_config.yml`을 확인해보면 highlighter가 rouge로 설정이 잡혀있음. 
<br>
![Rouge 설정](assets/images/20220310_01.png)
<br>
* 실제 설치는 아직 안했으므로, gem을 이용해 rouge를 설치해줘야 함.
* Ruby 실행 후 해당 블로그 폴더로 이동 아래 코드 입력
```commandline
gem install rouge
```
![Rouge 설정](assets/images/20220310_02.png)
<br>
* 위와 같은 결과 화면이 나오면 설치 성공

### - 스타일 확인하기
* `rougify help style` 명령어를 통해 rouge에서 제공하는 code snippet의 스타일을 확인할 수 있다.
```commandline
available themes:
  base16, base16.dark, base16.light, base16.monokai, base16.monokai.dark, base16.monokai.light, base16.solarized, base16.solarized.dark, base16.solarized.light, bw, colorful, github, gruvbox, gruvbox.dark, gruvbox.light, igorpro, magritte, molokai, monokai, monokai.sublime, pastie, thankful_eyes, tulip
```
* 현재 rouge는 위와 같은 스타일들을 제공함.
  * 각 테마들을 미리보기하고 싶으면 [홈페이지](https://spsarolkar.github.io/rouge-theme-preview/)에서 확인 가능
* 필자는 `monokai.sublime`을 사용하기로 함.

### - 스타일시트 생성하기
```commandline
rougify style monokai.sublime > assets/css/syntax.css
```
* 위의 명령어로 "assets/css/syntax.css" 위치에 monokai.sublime의 css 파일을 생성할 수 있음.(기존에 있는 경우 덮어쓰기 됨)

### - 스타일 적용하기
* 스타일을 적용하기 위해 `_layouts/default.html` 파일에 해당 css 파일 링크를 연결해주어야 함.
```commandline
<!-- Styles'n'Scripts -->
    <link rel="stylesheet" type="text/css" href="{{ site.baseurl }}assets/built/screen.css" />
    <link rel="stylesheet" type="text/css" href="{{ site.baseurl }}assets/built/screen.edited.css" />
    <link rel="stylesheet" type="text/css" href="{{ site.baseurl }}assets/built/syntax.css" />
    <!-- highlight.js -->
```
* 해당 파일에 syntax.css를 연결해주어야 함.
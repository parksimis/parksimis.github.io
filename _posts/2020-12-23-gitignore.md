# gitignore

> git으로 관리하지 않을 파일/폴더를 관리한다.



* `.gitignore` 파일을 생성하여 아래와 같이 작성한다.

```bash
touch .gitignore # .gitignore 파일 생성

data.csv # 특정 파일
*.png # 모든 확장자
secret/ # 특정 폴더
!profile.png # 모든 png 파일은 관리하지않지만, profile.png는 관리함
```



> OS(windows/mac), 개발환경(IDE, text editor), 특정 프로그래밍 언어에서 발생하는 파일/폴더

* https://gitgignore.io
  * Ex. 자바로 eclipse에서 윈도우에서 개발하고 있다면, `Java`, `Eclipse`, `Windows`검색

[![gitignore_1](md-images/gitignore_1.PNG)](https://www.toptal.com/developers/gitignore/api/java,eclipse,windows)

* https://github.com/github/gitignore
  * 위의 github repo에서도 본인의 환경에 적당한 파일을 다운로드 받아 추가 가능
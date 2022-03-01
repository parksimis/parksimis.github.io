# Git undoing

## 1. Working Directory 작업내용 복구

* `git restore`
  * `git restore`를 사용하면 Working Directory의 작업 내용을 버린다. 따라서 이전 버전의 상태로 돌아간다.

> 누군가가 작업 내용을 지웠다면,

```bash
$ git status
On branch master
Changes not staged for commit:
	# WD -> Staging area ..
  (use "git add <file>..." to update what will be committed)
  	# WD의 변경 사항을 버리기 위해서는
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")
```

```bash
$ git restore README.md
$ git status
On branch master
nothing to commit, working tree clean
```



## 2. staging area 취소(unstage)

* `git restore --stage __파일명__`
  * Staging area에 올린 파일을 Working Directory로 undo할 수 있다.

```bash
$ touch 2.txt
$ git add .
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   2.txt
```

```bash
$ git restore --stage 2.txt
$ git status
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        2.txt

nothing added to commit but untracked files present (use "git add" to track)

```



## 3. 커밋 메시지 변경

> 주의사항!!!
>
> > 공개된 저장소에 이미 push한 경우, 커밋 메시지를 수정하지 말 것!!
> >
> > (커밋 메시지를 변경하면, hash값이 바뀌므로 공개된 저장소에 push가 된 경우 절대 변경 금지!!!)

* `git commit --ammend `
  * 커밋 메시지 편집 가능
  * Ex. 2.txt를 commit 했는데, 커밋메시지를 Add 3.txt라고 작성한 경우

```bash
$ git commit -m 'Add 3.txt'
[master 21d15e5] Add 3.txt
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 2.txt
```

```bash
$ git commit --amend
```

* 커밋 메시지 편집할 수 있는 vim 창이 뜬다.
  * vim 편집기
  * `i`키를 눌러서 편집모드로 전환해서 내용을 수정하고,
  * `esc` + `:wq`를 눌러서 빠져나온다.

```bash
$ git commit --amend
[master a2deea2] Add 2.txt
 Date: Wed Dec 23 17:16:25 2020 +0900
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 2.txt
```

* 위의 두개를 비교해보면 hash 값이 바뀐걸 알 수 있다. 그러니 이미 push한 경우 바꾸지 말자.



## reset vs revert

### revert

* 과거로 돌아갈 수 있지만, 돌아갔다는 history(revert commit)를 남겨줌.

```bash
$ git log --oneline
a2deea2 (HEAD -> master) Add 2.txt
fb004eb Merge branch 'feature/sub'
0d3bc0d Modify README.md@master
10d7747 Modify README.md@sub
a08d21b Merge branch 'feature/sub'
8013ed0 Update README.md@master
beb4f4c Update README.md
4da09f2 Complete sub
b19c358 Merge branch 'feature/main'
abe38be Hotfix
a7a954f Complete main
2556eac Complete test page
9738aaa Init
```

```bash
$ git revert a2deea2
Removing 2.txt
[master 7187c67] Revert "Add 2.txt"
 1 file changed, 0 insertions(+), 0 deletions(-)
 delete mode 100644 2.txt
 
$ git log --oneline
# revert commit 발생
7187c67 (HEAD -> master) Revert "Add 2.txt"
a2deea2 Add 2.txt
fb004eb Merge branch 'feature/sub'
0d3bc0d Modify README.md@master
10d7747 Modify README.md@sub
a08d21b Merge branch 'feature/sub'
8013ed0 Update README.md@master
beb4f4c Update README.md
4da09f2 Complete sub
b19c358 Merge branch 'feature/main'
abe38be Hotfix
a7a954f Complete main
2556eac Complete test page
9738aaa Init
```

### reset

* reset을 하면 history를 남기지 않고 돌아감.

```bash
$ git reset --hard fb004eb
HEAD is now at fb004eb Merge branch 'feature/sub'

$ git log --oneline
fb004eb (HEAD -> master) Merge branch 'feature/sub'
0d3bc0d Modify README.md@master
10d7747 Modify README.md@sub
a08d21b Merge branch 'feature/sub'
8013ed0 Update README.md@master
beb4f4c Update README.md
4da09f2 Complete sub
b19c358 Merge branch 'feature/main'
abe38be Hotfix
a7a954f Complete main
2556eac Complete test page
9738aaa Init
```

* option

  * `--mixed` : 기본 옵션. 해당 커밋 이후 변경사항을 staging area에 보관
  * `--hard` : 해당 커밋 이후 내용 모두 삭제
    * !! 이 명령어를 사용할 때는 변경사항이 모두 삭제되므로 주의해야함 !!
  * `--soft` : 해당 커밋 이후 변경사항 및 working directory에 보관

  


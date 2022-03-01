# 원격 저장소 push시 오류

1. Github에서 직접 README.md 파일 수정

   > 

2. 로컬

```bash
$ touch test.txt
$ git add .
$ git commit -m 'Add test'
$ git push origin master

To https://github.com/parksimis/bigdata.git
 ! [rejected]        master -> master (fetch first)
error: failed to push some refs to 'https://github.com/parksimis/bigdata.git'
# 거절됨(rejected)
# 원격 저장소의 작업(커밋)이 로컬에 없음.
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
# 원격 저장소의 변경사항을 먼저 통합해야함.(git pull -> git push)
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.

```

* 원격 저장소와 로컬저장소의 커밋 히스토리를 확인하고 아래의 명령어를 입력한다.

```bash
$ git pull origin master

remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), 658 bytes | 109.00 KiB/s, done.
From https://github.com/parksimis/bigdata
 * branch            master     -> FETCH_HEAD
   a15283c..802d0b2  master     -> origin/master
Merge made by the 'recursive' strategy.
 README.md | 4 +++-
 1 file changed, 3 insertions(+), 1 deletion(-)


```

> vim 편집기 창이 popup 된다.
>
> * `esc` + `:wq` + `enter`
>   * w : write
>   * q : quit(나가기)

* log를 확인한다.

```bash
$ git log --oneline
# vim 편집기가 뜬 이유 -> '합쳐졌다'라는 사실을 커밋으로 남김.
3d831e0 (HEAD -> master) Merge branch 'master' of https://github.com/parksimis/bigdata
# 로컬 작업한 것.
1f5b65f ADD test
# 원격 저장소에서 작업한 것.
802d0b2 (origin/master) Update README.md
a15283c Modify README.md - Title
80920f1 Modify README.md - Title
0954456 First commit
```

* 다시 push 한다.

```bash
$ git push origin master
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 6 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (5/5), 576 bytes | 576.00 KiB/s, done.
Total 5 (delta 0), reused 0 (delta 0)
To https://github.com/parksimis/bigdata.git
   802d0b2..3d831e0  master -> master
```


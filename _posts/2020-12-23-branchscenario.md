# Branch 시나리오

## 사전 준비

* 빈 프로젝트에 README.md 파일을 만들고, root commit을 발생시킬 것.

### 상황 1. fast-foward

> fast-foward는 feature 브랜치 생성된 이후 master 브랜치에 변경 사항이 없는 상황

1. feature/test branch 생성 및 이동

   ```bash
   # feature/test branch 생성
   $ git branch feature/test 
   
   # branch 확인
   $ git branch
     feature/test
   * master
   
   # branch 변경
   $ git checkout feature/test
   Switched to branch 'feature/test'
   (feature/test) $
   ```

   

2. 작업 완료 후 commit

   ```bash
   # test.txt 생성(작업을 파일 생성으로 가정)
   $ touch test.txt
   
   # add 및 commit
   $ git add .
   $ git commit -m 'Complete test page'
   
   # 커밋 후 커밋 log 확인
   $ git log --oneline
   2556eac (HEAD -> feature/test) Complete test page
   9738aaa (master) Init
   ```


3. master 이동

   ```bash
   $ git checkout master
   Switched to branch 'master'
   (master) $
   ```


4. master에 병합

   ```bash
   (master) $ git merge feature/test
   Updating 9738aaa..2556eac
   Fast-forward
    test.txt | 0
    1 file changed, 0 insertions(+), 0 deletions(-)
    create mode 100644 test.txt
   ```


5. 결과 -> fast-foward (단순히 HEAD를 이동)

   ```bash 
   $ git log --oneline
   2556eac (HEAD -> master, feature/test) Complete test page
   9738aaa Init
   ```

   > master는 변경 사항이 없기 때문에, 단순히 HEAD를 branch로 이동시키기만 하면 됨.

6. branch 삭제

   ```bash
   $ git branch -d feature/test
   Deleted branch feature/test (was 2556eac).
   ```
   
   

---

### 상황 2. merge commit

> 서로 다른 이력(commit)을 병합(merge)하는 과정에서 다른 파일이 수정되어 있는 상황
>
> git이 auto merging을 진행하고, commit이 발생된다.

1. feature/signout branch 생성 및 이동

   ```bash
   $ git checkout -b feature/main
   Switched to a new branch 'feature/main'
   (feature/main) $
   ```

2. 작업 완료 후 commit

   ```bash
   $ touch main.txt
   $ git add .
   $ git commit -m 'Complete main'
   [feature/main a7a954f] Complete main
    1 file changed, 0 insertions(+), 0 deletions(-)
    create mode 100644 main.txt
   $ git log --oneline
   a7a954f (HEAD -> feature/main) Complete main
   2556eac (master) Complete test page
   9738aaa Init
   ```

   

3. master 이동

   ```bash
   $ git checkout master
   Switched to branch 'master'
   (master) $ 
   ```

4. *master에 추가 commit 이 발생시키기!!*

   * **다른 파일을 수정 혹은 생성하세요!**

   ```bash
   $ touch hotfix.txt
   $ git add .
   $ git commit -m 'Hotfix'
   [master abe38be] Hotfix
    1 file changed, 0 insertions(+), 0 deletions(-)
    create mode 100644 hotfix.txt
   $ git log --oneline
   abe38be (HEAD -> master) Hotfix
   2556eac Complete test page
   9738aaa Init
   ```

5. master에 병합

   ```bash
   $ git merge feature/main
   Merge made by the 'recursive' strategy.
    main.txt | 0
    1 file changed, 0 insertions(+), 0 deletions(-)
    create mode 100644 main.txt
   ```

6. 결과 -> 자동으로 *merge commit 발생*

   * vim 편집기 화면이 나타납니다.

      ![branch_vim](md-images/branch_vim.PNG)

   * 자동으로 작성된 커밋 메시지를 확인하고, `esc`를 누른 후 `:wq`를 입력하여 저장 및 종료를 합니다.
      * `w` : write
      * `q` : quit

   * 커밋을 확인 해봅시다.

      ``` bash
      $ git log --oneline
      b19c358 (HEAD -> master) Merge branch 'feature/main'
      abe38be Hotfix
      a7a954f (feature/main) Complete main
      2556eac Complete test page
      9738aaa Init
      ```

7. 그래프 확인하기

   ```bash
   # 시각적인 형태로 보고싶을때는 --graph 옵션 추가
   $ git log --oneline --graph
   *   b19c358 (HEAD -> master) Merge branch 'feature/main'
   |\
   | * a7a954f (feature/main) Complete main
   * | abe38be Hotfix
   |/
   * 2556eac Complete test page
   * 9738aaa Init
   ```

8. branch 삭제

   ```bash
   $ git branch -d feature/main
   Deleted branch feature/main (was a7a954f).
   ```
   
   

---

### 상황 3. merge commit 충돌

> 서로 다른 이력(commit)을 병합(merge)하는 과정에서 동일 파일이 수정되어 있는 상황
>
> git이 auto merging을 하지 못하고, 해당 파일의 위치에 라벨링을 해준다.
>
> 원하는 형태의 코드로 직접 수정을 하고 merge commit을 발생 시켜야 한다.

1. feature/board branch 생성 및 이동

   ```bash
   $ git checkout -b feature/sub
   Switched to a new branch 'feature/sub'
   (feature/sub) $
   ```

2. 작업 완료 후 commit

   ```bash
   $ touch sub.txt
   $ git add .
   $ git commit -m 'Complete sub'
   [feature/sub 4da09f2] Complete sub
    1 file changed, 0 insertions(+), 0 deletions(-)
    create mode 100644 sub.txt
   $ git log --oneline
   4da09f2 (HEAD -> feature/sub) Complete sub
   b19c358 (master) Merge branch 'feature/main'
   abe38be Hotfix
   a7a954f Complete main
   2556eac Complete test page
   9738aaa Init
   ```
   
   ```bash
   # -> README.md를 열어서 수정 및 커밋
   $ git status
   $ git add .
   $ git commit -m 'Update README.md'
   [feature/sub beb4f4c] Update README.md
    1 file changed, 3 insertions(+)
   $ git log --oneline
   beb4f4c (HEAD -> feature/sub) Update README.md
   4da09f2 Complete sub
   b19c358 Merge branch 'feature/main'
   abe38be Hotfix
   a7a954f Complete main
   2556eac Complete test page
   9738aaa Init
   ```


3. master 이동

   ```bash
   $ git checkout master
   Switched to branch 'master'
   (master) $
   ```


4. *master에 추가 commit 이 발생시키기!!*

   * **동일 파일을 수정 혹은 생성하세요!**
   
  ```bash
     # README.md 파일 수정
     $ git status
     $ git add .
     $ git commit -m 'Update README.me@master'
     [master 8013ed0] Update README.md@master
      1 file changed, 1 insertion(+)
     $ git log --oneline
     8013ed0 (HEAD -> master) Update README.md@master
     b19c358 Merge branch 'feature/main'
     abe38be Hotfix
     a7a954f Complete main
     2556eac Complete test page
     9738aaa Init
     ```
   
5. master에 병합

   ```bash
   $ git merge feature/sub
   Auto-merging README.md
   CONFLICT (content): Merge conflict in README.md
   Automatic merge failed; fix conflicts and then commit the result.
   ```


6. 결과 -> *merge conflict발생*

   ```bash
   $ git status
   On branch master
   You have unmerged paths.
     (fix conflicts and run "git commit")
     (use "git merge --abort" to abort the merge)
   
   Unmerged paths:
     (use "git add <file>..." to mark resolution)
           both modified:   README.md
   
   no changes added to commit (use "git add" and/or "git commit -a")
   ```
   
   > 같은 파일을 두 브랜치에서 모두 수정하므로 conflict 발생


7. 충돌 확인 및 해결

   ```markdown
   <<<<<<< HEAD
   
   # 마스터
   
   ### 마스터
   
   =======
   
   ### 프로젝트 
   
   
   
   # sub 기능
   
   >>>>>>> feature/sub
   ```


8. merge commit 진행

    ```bash
    # 내가 원하는 방향으로 수정 후
    $ git add .
$ git commit
   [master fb004eb] Merge branch 'feature/sub'
   (master) $
   ```
   
   * vim 편집기 화면이 나타납니다.
   
   * 자동으로 작성된 커밋 메시지를 확인하고, `esc`를 누른 후 `:wq`를 입력하여 저장 및 종료를 합니다.
      * `w` : write
      * `q` : quit
      
   * 커밋이  확인 해봅시다.
   
9. 그래프 확인하기

    ```bash
   $ git log --oneline --graph
   *   fb004eb (HEAD -> master) Merge branch 'feature/sub'
   |\
   | * 10d7747 (feature/sub) Modify README.md@sub
   * | 0d3bc0d Modify README.md@master
   * | a08d21b Merge branch 'feature/sub'
   |\|
   | * beb4f4c Update README.md
   | * 4da09f2 Complete sub
   * | 8013ed0 Update README.md@master
   |/
   *   b19c358 Merge branch 'feature/main'
   |\
   | * a7a954f Complete main
   * | abe38be Hotfix
   |/
   * 2556eac Complete test page
   * 9738aaa Init
    ```


10. branch 삭제

    ```bash
    $ git branch -d feature/sub
    Deleted branch feature/sub (was 10d7747).
    ```
    
    

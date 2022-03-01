## `git status`

```bash
$ git status
On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   1.txt
        deleted:    2.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        3.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

* working directory에서 파일의 상태
  * untracked : 깃이 관리하고 있지 않는 파일(커밋에 들어간 적 X)
    * 파일 생성(new file)
  * tracked : 이전 커밋에 포함된 적 있는 파일
    * `modified`
      * `modified` / `deleted`
    * `unmodified`
      * 수정 X -> git status에 등장하지 않음
Creating a new branch is quick
<<<<<<< HEAD
Git is a distributed version control system.
Git is free software distributed under the GPL.


=======

目录
Git教程
Git简介
Git的诞生
集中式vs分布式
安装Git
创建版本库
时光机穿梭
版本回退
工作区和暂存区
管理修改
撤销修改
删除文件
远程仓库
添加远程库
从远程库克隆
分支管理
创建与合并分支
解决冲突
分支管理策略
Bug分支
Feature分支
多人协作
标签管理
创建标签
操作标签
使用GitHub
自定义Git
忽略特殊文件
配置别名
搭建Git服务器
期末总结
关于作者


删除文件

阅读: 425976
在Git中，删除也是一个修改操作，我们实战一下，先添加一个新文件test.txt到Git并且提交：

$ git add test.txt
$ git commit -m "add test.txt"
[master 94cdc44] add test.txt
 1 file changed, 1 insertion(+)
     create mode 100644 test.txt
     一般情况下，你通常直接在文件管理器中把没用的文件删了，或者用rm命令删了：
     
     $ rm test.txt
     这个时候，Git知道你删除了文件，因此，工作区和版本库就不一致了，git
     status命令会立刻告诉你哪些文件被删除了：
     
     $ git status
# On branch master
# Changes not staged for commit:
#   (use "git add/rm <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#       deleted:    test.txt
#
     no changes added to commit (use "git add" and/or "git commit -a").
>>>>>>> dev

@echo off

set path=%path%;C:\Program Files\Git\cmd

git config --global credential.helper store

cd /d C:\redmicro\redjs

git pull 

echo 已获取最新版本，按回车退出

pause >nul
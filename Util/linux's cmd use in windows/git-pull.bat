@echo off
if "%1" == "" goto:err

git pull origin %1

goto:end

:err
echo û��ѡ���֧

:end

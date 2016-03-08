@echo off
if "%1" == "-rf" goto:del_dir

del %1 /f /q
goto:end

:del_dir
rd %2 /s /q
goto:end

:err
echo ÃüÁîÓï·¨´íÎó
:end

@echo off
if "%1" == "-r" goto:cp_dir

copy %1 %2
goto:end

:cp_dir
xcopy %2 %3 /s /e /h /q
goto:end

:end
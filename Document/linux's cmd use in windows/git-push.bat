@echo off
if "%1" == "" goto:err
cd.>pass.vbs
>>pass.vbs echo set WshShell = WScript.CreateObject("WScript.Shell")
>>pass.vbs echo WScript.Sleep 1500
>>pass.vbs echo WshShell.SendKeys "stefenson" 
>>pass.vbs echo WshShell.SendKeys "{enter}" 
>>pass.vbs echo WScript.Sleep 800
>>pass.vbs echo WshShell.SendKeys "wkq@git921012" 
>>pass.vbs echo WshShell.SendKeys "{enter}"
pass.vbs

git push origin %1

del pass.vbs

goto:end

:err
echo 没有选择分支

:end

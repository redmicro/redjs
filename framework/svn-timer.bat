
@echo off
set /a count= 0
:start

set /a count += 1

CD "C:\Program Files\TortoiseSVN\bin\" 
start TortoiseProc.exe -command:update -path:"F:\redmicro\redjs" -closeonend:1

echo %count% - %date% %time% ÒÑ¸üÐÂ

choice /t 5 /d y /n >nul

set /a p =  (%count%%%100)
 
if %p%== 0 (cls)

if %count% GTR 100000 (set /a count= 0)

goto start


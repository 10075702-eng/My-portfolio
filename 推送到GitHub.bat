@echo off
cd /d "%~dp0"

echo.
echo  ==================================================
echo    PUSH TO GITHUB
echo  ==================================================
echo.
echo  When asked, type:
echo.
echo    Username : 10075702-eng
echo    Password : your GitHub token (starts with ghp_)
echo.
echo  The password will NOT appear while typing.
echo  That is normal. Paste it, then press Enter.
echo.
echo  ==================================================
echo.

"C:\Users\ZJH\AppData\Local\hermes\git\cmd\git.exe" push -u origin main

echo.
if %errorlevel%==0 (
  echo  ==================================================
  echo    SUCCESS - pushed to GitHub
  echo  ==================================================
  echo.
  echo    Next: import this repo on Vercel.
  echo.
) else (
  echo  ==================================================
  echo    FAILED - please screenshot this window
  echo  ==================================================
  echo.
)

pause

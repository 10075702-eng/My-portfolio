@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo   ============================================
echo      周俊行 · 作品集网站
echo   ============================================
echo.
echo   正在启动，大约需要 10 秒...
echo   启动完成后浏览器会自动打开。
echo.
echo   查看完网站后，直接关闭这个黑色窗口即可。
echo.
echo   ============================================
echo.

start /b cmd /c "timeout /t 12 /nobreak >nul && start http://localhost:3000/zh"

call npm run dev

pause

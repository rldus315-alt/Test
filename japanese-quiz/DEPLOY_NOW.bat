@echo off
cd /d "%~dp0"

where git >nul 2>&1
if %errorlevel% neq 0 (
    start https://github.com/rldus315-alt/Test/upload/main
    exit /b 1
)

if not exist ".git" (
    git init
    git remote add origin https://github.com/rldus315-alt/Test.git
)

git add .
git commit -m "Vercel 404 fix - vercel.json" 2>nul
git branch -M main
git push -u origin main

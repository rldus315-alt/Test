$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$git = Get-Command git -ErrorAction SilentlyContinue
if (-not $git) {
    Start-Process "https://github.com/rldus315-alt/Test/upload/main"
    exit 1
}

if (-not (Test-Path ".git")) {
    git init
    git remote add origin https://github.com/rldus315-alt/Test.git
}

git add .
git commit -m "Japanese quiz - Vercel deploy" 2>$null
git branch -M main
git push -u origin main

Start-Process "https://vercel.com/new?repository-url=https://github.com/rldus315-alt/Test"

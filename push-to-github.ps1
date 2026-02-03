# GitHub 저장소에 푸시하는 스크립트
# 사용법: PowerShell에서 .\push-to-github.ps1 실행

$projectPath = $PSScriptRoot
Set-Location $projectPath

# Git 초기화 (이미 되어 있으면 무시)
if (-not (Test-Path ".git")) {
    git init
}

# Remote 추가 (이미 있으면 URL 업데이트)
git remote remove origin 2>$null
git remote add origin https://github.com/rldus315-alt/Test.git

# 모든 파일 추가
git add .

# 커밋
git commit -m "GitHub Pages 배포 설정 (Actions workflow)"

# 푸시 (main 브랜치)
git branch -M main
git push -u origin main

Write-Host "완료! https://github.com/rldus315-alt/Test 에서 확인하세요." -ForegroundColor Green

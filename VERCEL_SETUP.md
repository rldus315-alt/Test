# Vercel 404 해결 가이드

## 1. vercel.json 추가됨 ✓

`vercel.json`이 추가되어 정적 사이트로 올바르게 배포됩니다.

## 2. Vercel 프로젝트 설정 확인

Vercel 대시보드에서 다음을 확인하세요:

1. **프로젝트** → **Settings** → **General**
2. **Root Directory**: 
   - `index.html`이 **저장소 루트**에 있으면: **비워두기**
   - `index.html`이 **japanese-quiz 폴더** 안에 있으면: `japanese-quiz` 입력

3. **Build & Development Settings**:
   - **Framework Preset**: `Other`
   - **Build Command**: 비워두기
   - **Output Directory**: 비워두기 (또는 `.`)

## 3. 변경 사항 푸시 후 재배포

```powershell
git add .
git commit -m "Vercel 404 수정 - vercel.json 추가"
git push origin main
```

푸시 후 Vercel이 자동으로 재배포합니다.

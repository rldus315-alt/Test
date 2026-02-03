# Vercel 배포 가이드

저장소 `rldus315-alt/Test`를 Vercel에 연결하여 배포하는 방법입니다.

## 빠른 배포 (3단계)

### 1. GitHub에 코드 올리기

프로젝트 폴더에서:

```powershell
git add .
git commit -m "일본어 단어 퀴즈"
git push origin main
```

### 2. Vercel에서 프로젝트 생성

1. https://vercel.com 접속 → 로그인
2. **Add New** → **Project**
3. **Import** 탭에서 `rldus315-alt/Test` 저장소 선택
4. **Import** 클릭

### 3. 배포 설정 (기본값 그대로)

| 항목 | 설정 |
|------|------|
| Framework Preset | Other |
| Root Directory | (비워두기) |
| Build Command | (비워두기) |
| Output Directory | (비워두기) |

**Deploy** 클릭 → 완료!

---

## Root Directory 설정

저장소 구조에 따라 다릅니다:

- **index.html이 루트에 있는 경우** (권장): Root Directory 비워두기
- **japanese-quiz 폴더 안에 있는 경우**: Root Directory에 `japanese-quiz` 입력

---

## 배포 후

- **자동 배포**: `main` 브랜치에 푸시할 때마다 자동 재배포
- **URL**: `https://[프로젝트명].vercel.app`
- **커스텀 도메인**: Project Settings → Domains에서 추가 가능

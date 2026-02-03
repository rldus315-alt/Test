# GitHub Pages 404 해결 가이드

## 해결 완료 - 자동 배포 설정됨

GitHub Actions 워크플로우가 추가되었습니다. 아래 순서대로 진행하세요.

---

## 1. 새 코드 푸시

```powershell
cd "c:\Users\rldus\.cursor\projects\c-Users-rldus-cursor\japanese-quiz"
git add .
git commit -m "GitHub Pages 배포 설정"
git push origin main
```

## 2. GitHub Pages 소스 설정 (최초 1회)

1. https://github.com/rldus315-alt/Test/settings/pages 접속
2. **Build and deployment** > **Source** → **GitHub Actions** 선택
3. (저장 버튼이 있으면 클릭)

## 3. 배포 확인

- 푸시 후 **Actions** 탭에서 워크플로우 실행 확인
- 1~2분 후 https://rldus315-alt.github.io/Test/ 접속

---

## 폴더 구조 확인

`index.html`이 **저장소 루트**에 있어야 합니다.

올바른 구조:
```
Test/
├── index.html
├── styles.css
├── app.js
├── vocabulary.js
└── server/
```

잘못된 구조 (japanese-quiz 폴더 안에 있는 경우):
```
Test/
└── japanese-quiz/
    ├── index.html
    └── ...
```

이 경우 접속 주소는 `https://rldus315-alt.github.io/Test/japanese-quiz/` 입니다.

---

## 여전히 404가 뜨는 경우

1. **캐시 삭제**: 브라우저 시크릿 모드로 접속
2. **배포 상태 확인**: Settings > Pages에서 에러 메시지 확인
3. **브랜치 확인**: `main` 브랜치에 코드가 있는지 확인

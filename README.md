# 일본어 단어 퀴즈

## Vercel 배포 (저장소 연결)

### 1단계: GitHub에 코드 푸시

```powershell
cd "c:\Users\rldus\.cursor\projects\c-Users-rldus-cursor\japanese-quiz"
git add .
git commit -m "일본어 단어 퀴즈"
git push origin main
```

### 2단계: Vercel에서 저장소 연결

1. [vercel.com](https://vercel.com) 접속 후 로그인
2. **Add New** → **Project** 클릭
3. **Import Git Repository**에서 `rldus315-alt/Test` 선택
4. **Import** 클릭

### 3단계: 프로젝트 설정

- **Framework Preset**: `Other` (자동 감지되면 그대로)
- **Root Directory**: `index.html`이 저장소 루트에 있으면 **비워두기**
- **Build Command**: 비워두기
- **Output Directory**: 비워두기

**Deploy** 클릭

### 4단계: 배포 완료

- 1~2분 후 배포 URL로 접속 (예: `https://test-xxx.vercel.app`)
- 커스텀 도메인도 설정 가능

---

## 문의하기 기능 (Resend)

### 1. Resend API 키 발급

1. [resend.com](https://resend.com) 가입
2. API Keys 메뉴에서 새 키 생성
3. 생성된 키 복사 (re_로 시작)

### 2. 서버 실행

```bash
cd server
npm install
```

환경 변수 설정 후 실행:

**Windows (PowerShell):**
```powershell
$env:RESEND_API_KEY="re_여기에_API키_입력"; node server.js
```

**Mac/Linux:**
```bash
RESEND_API_KEY=re_여기에_API키_입력 node server.js
```

또는 `.env` 파일 생성 (dotenv 사용 시):
```
RESEND_API_KEY=re_여기에_API키_입력
```

### 3. 웹사이트 실행

- `index.html`을 브라우저에서 열기
- 또는 `npx serve .` 로 정적 서버 실행

### 4. API URL 변경 (배포 시)

배포 시 `app.js`의 `API_URL`을 실제 서버 주소로 변경하세요.

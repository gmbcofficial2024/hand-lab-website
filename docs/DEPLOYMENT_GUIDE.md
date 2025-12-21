# HAND Lab 웹사이트 배포 가이드

## 목차
1. [사전 준비](#사전-준비)
2. [Vercel 배포](#vercel-배포-권장)
3. [Cloudflare DNS 설정](#cloudflare-dns-설정)
4. [환경 변수 설정](#환경-변수-설정)
5. [관리자 기능](#관리자-기능)
6. [문제 해결](#문제-해결)

---

## 사전 준비

### 필요 계정
- GitHub 계정 (코드 저장소)
- Vercel 계정 (배포 플랫폼)
- Cloudflare 계정 (DNS 관리 - handkaistnas.org 도메인용)

### 로컬 테스트
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드 테스트
npm run build
npm run start
```

---

## Vercel 배포 (권장)

Vercel은 Next.js 개발사로, 가장 최적화된 배포 환경을 제공합니다.

### 1단계: Vercel 프로젝트 생성

1. [vercel.com](https://vercel.com)에서 GitHub 계정으로 로그인
2. **"Add New..."** → **"Project"** 클릭
3. **"Import Git Repository"**에서 `hand-lab-website` 선택
4. **"Deploy"** 클릭

### 2단계: 환경 변수 설정

Vercel 대시보드 → 프로젝트 선택 → **Settings** → **Environment Variables**

```env
# 관리자 인증
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password-here

# JWT 인증 (32자 이상의 랜덤 문자열)
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters

# 사이트 URL (선택)
NEXT_PUBLIC_SITE_URL=https://lab.handkaistnas.org
```

**중요**: 모든 환경에 적용하려면 **Production**, **Preview**, **Development** 체크

### 3단계: 빌드 설정 확인

기본값으로 자동 설정됨:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build` 또는 `next build`
- **Output Directory**: Next.js (자동 감지)
- **Install Command**: `npm install`

### 4단계: 배포 확인

- 배포 완료 후 `*.vercel.app` URL 제공
- 예: `hand-lab-website-xxx.vercel.app`

---

## Cloudflare DNS 설정

### lab.handkaistnas.org 서브도메인 연결

1. [Cloudflare 대시보드](https://dash.cloudflare.com) 로그인
2. **handkaistnas.org** 도메인 선택
3. **DNS** → **Records** → **Add record**

### CNAME 레코드 추가

| Type | Name | Target | Proxy status | TTL |
|------|------|--------|--------------|-----|
| CNAME | lab | cname.vercel-dns.com | DNS only (회색 구름) | Auto |

**주의**: Vercel과 함께 사용할 때는 **Proxy status**를 반드시 **DNS only**로 설정해야 합니다.

### SSL/TLS 설정

1. Cloudflare → **SSL/TLS** → **Overview**
2. **Full (strict)** 선택 (Vercel이 자동으로 SSL 인증서 제공)

### Vercel에서 도메인 추가

1. Vercel 프로젝트 → **Settings** → **Domains**
2. `lab.handkaistnas.org` 입력
3. **Add** 클릭
4. DNS 설정 확인 메시지가 나오면, Cloudflare 설정이 완료되었는지 확인

### 도메인 연결 확인

```bash
# DNS 확인
nslookup lab.handkaistnas.org

# 또는
dig lab.handkaistnas.org CNAME
```

---

## 환경 변수 설정

### .env.local 템플릿 (로컬 개발용)

```env
# 관리자 인증
ADMIN_USERNAME=admin
ADMIN_PASSWORD=devpassword123

# JWT Secret (개발용)
JWT_SECRET=dev-secret-key-at-least-32-characters-long

# 사이트 URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 프로덕션 환경 변수

| 변수명 | 설명 | 필수 |
|--------|------|------|
| `ADMIN_USERNAME` | 관리자 사용자명 | ✅ |
| `ADMIN_PASSWORD` | 관리자 비밀번호 | ✅ |
| `JWT_SECRET` | JWT 서명 키 (32자 이상) | ✅ |
| `NEXT_PUBLIC_SITE_URL` | 사이트 URL | 선택 |

### JWT_SECRET 생성 방법

```bash
# Node.js로 랜덤 문자열 생성
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 또는 openssl 사용
openssl rand -hex 32
```

---

## 배포 후 설정

### 1. 관리자 로그인

1. `https://lab.handkaistnas.org/login` 접속
2. 환경 변수에 설정한 자격 증명으로 로그인
3. 대시보드에서 기능 확인

### 2. 콘텐츠 확인

- 메인 페이지: `/`
- 연구 분야: `/research`
- 논문: `/publications`
- 멤버: `/members`
- 뉴스: `/news`
- 영상: `/watch`

### 3. 관리자 기능 테스트

- 멤버 추가/수정/삭제
- 논문 등록
- 뉴스 작성
- 미디어 업로드

---

## 관리자 기능

### 대시보드 (`/admin`)
- 전체 통계 보기 (멤버, 논문, 뉴스 수)
- 최근 논문 및 뉴스 확인
- 빠른 작업 버튼

### 멤버 관리 (`/admin/members`)
- 새 멤버 추가 (이름, 직위, 연구분야 등)
- 기존 멤버 정보 수정
- 멤버 삭제

### 졸업생 관리 (`/admin/alumni`)
- 졸업생 정보 추가/수정/삭제
- 현재 소속 업데이트
- 학위논문 정보

### 논문 관리 (`/admin/publications`)
- 새 논문 등록
- 주요 논문(Featured) 표시 설정
- Impact Factor 관리
- DOI 링크

### 뉴스 관리 (`/admin/news`)
- 새 뉴스/공지사항 작성
- 카테고리별 분류 (연구, 수상, 미디어, 행사, 연구실)
- 뉴스 수정/삭제

### 미디어 관리 (`/admin/media`)
- 이미지 업로드
- 파일 관리
- URL 복사

### 사이트 설정 (`/admin/settings`)
- 연구실 기본 정보 수정
- 연락처 정보 업데이트

---

## 문제 해결

### 배포 실패 시

1. **빌드 로그 확인**
   - Vercel 대시보드 → Deployments → 실패한 배포 클릭 → Build Logs

2. **일반적인 오류**
   ```
   # 모듈 찾기 실패
   Error: Cannot find module 'xxx'
   → npm install 재실행

   # 타입 오류
   Type error: ...
   → TypeScript 오류 수정 후 재배포
   ```

3. **환경 변수 확인**
   - 모든 필수 환경 변수가 설정되었는지 확인
   - 오타 없는지 확인

### 로그인 안 될 때

1. 환경 변수 확인
   ```
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your-password
   JWT_SECRET=your-secret
   ```

2. 브라우저 쿠키/캐시 삭제
   - Chrome: 설정 → 개인정보 및 보안 → 쿠키 삭제

3. 시크릿 모드에서 테스트

### DNS 연결 문제

```bash
# DNS 전파 확인
nslookup lab.handkaistnas.org

# 예상 결과
lab.handkaistnas.org canonical name = cname.vercel-dns.com
```

DNS 변경은 전파까지 최대 48시간 소요될 수 있습니다.

### 데이터 변경이 반영 안 될 때

1. 브라우저 캐시 삭제
2. 하드 새로고침 (Ctrl/Cmd + Shift + R)
3. Vercel 대시보드에서 수동 재배포

---

## 비용 비교

| 항목 | 아임웹 (현재) | Vercel + Cloudflare (신규) |
|------|--------------|---------------------------|
| 호스팅 | 월 ~5만원 | **무료** |
| 도메인 | 기존 유지 | 기존 유지 |
| SSL | 포함 | **무료** (자동) |
| 관리 | 외부 의존 | **자체 관리** |
| **연간 비용** | ~60만원 | **0원** |

### 예상 절감 효과
- **연간 50~100만원 절감**
- 완전한 소유권 및 커스터마이징 자유
- Git 기반 버전 관리 및 롤백

---

## 자동 배포 (CI/CD)

Vercel은 GitHub 연동 시 자동으로 CI/CD가 설정됩니다:

- **Production 배포**: `main` 브랜치에 push 시
- **Preview 배포**: PR 생성 시 (고유 URL 제공)

### 수동 배포

Vercel CLI 사용:
```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 배포
vercel --prod
```

---

## 백업 및 복구

### 콘텐츠 백업
모든 콘텐츠는 `content/` 폴더의 JSON 파일에 저장됩니다:
- `members.json` - 멤버 정보
- `alumni.json` - 졸업생 정보
- `publications.json` - 논문 정보
- `news.json` - 뉴스
- `videos.json` - 영상

Git으로 자동 버전 관리됩니다.

### 복구
```bash
# 이전 버전으로 롤백
git log content/members.json
git checkout <commit-hash> -- content/members.json
git commit -m "Restore members.json"
git push
```

---

*최종 업데이트: 2025년 12월*

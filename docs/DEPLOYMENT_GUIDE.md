# HAND Lab 웹사이트 배포 가이드

## 배포 옵션

### 옵션 1: Vercel (권장 - 가장 간단)

Vercel은 Next.js를 개발한 회사로, 가장 쉽게 배포할 수 있습니다.

#### 1. Vercel 계정 생성 및 연결
1. [vercel.com](https://vercel.com) 접속
2. GitHub 계정으로 로그인
3. "New Project" 클릭
4. GitHub 저장소 `hand-lab-website` 선택

#### 2. 환경 변수 설정
Vercel 대시보드 → Settings → Environment Variables에서 다음 변수 추가:
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
JWT_SECRET=your-secret-jwt-key-at-least-32-chars
```

#### 3. 자동 배포
- `main` 브랜치에 push하면 자동 배포
- 배포 완료 후 `*.vercel.app` URL 제공

#### 4. 커스텀 도메인 연결 (lab.handkaistnas.org)
1. Vercel 대시보드 → Settings → Domains
2. `lab.handkaistnas.org` 입력
3. Cloudflare DNS에서 CNAME 레코드 추가:
   - Name: `lab`
   - Target: `cname.vercel-dns.com`
   - Proxy status: DNS only (회색 구름)

---

### 옵션 2: Cloudflare Pages

#### 1. Cloudflare 계정에서 Pages 프로젝트 생성
1. [dash.cloudflare.com](https://dash.cloudflare.com) 접속
2. Workers & Pages → Create application → Pages
3. "Connect to Git" 선택
4. GitHub 저장소 연결

#### 2. 빌드 설정
```
Framework preset: Next.js
Build command: npm run build
Build output directory: .next
```

#### 3. 환경 변수 설정
Settings → Environment variables:
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
JWT_SECRET=your-secret-jwt-key-at-least-32-chars
NODE_VERSION=18
```

#### 4. 서브도메인 설정 (lab.handkaistnas.org)
1. Pages 프로젝트 → Custom domains
2. "Set up a custom domain" 클릭
3. `lab.handkaistnas.org` 입력
4. Cloudflare가 자동으로 DNS 레코드 추가

---

## 관리자 접근

배포 완료 후:
- 메인 사이트: `https://lab.handkaistnas.org`
- 관리자 로그인: `https://lab.handkaistnas.org/login`
- 관리자 대시보드: `https://lab.handkaistnas.org/admin`

### 기본 관리자 계정
```
사용자명: admin
비밀번호: handlab2024!
```

**중요**: 첫 배포 후 반드시 비밀번호를 변경하세요!
환경 변수 `ADMIN_PASSWORD`를 새로운 안전한 비밀번호로 변경하세요.

---

## 관리자 기능

### 대시보드
- 전체 통계 보기 (멤버, 논문, 뉴스 수)
- 최근 논문 및 뉴스 확인

### 멤버 관리 (/admin/members)
- 새 멤버 추가
- 기존 멤버 정보 수정
- 멤버 삭제

### 졸업생 관리 (/admin/alumni)
- 졸업생 정보 추가/수정/삭제
- 현재 소속 업데이트

### 논문 관리 (/admin/publications)
- 새 논문 등록
- 주요 논문 표시 설정
- Impact Factor 관리

### 뉴스 관리 (/admin/news)
- 새 뉴스/공지사항 작성
- 카테고리별 분류
- 뉴스 수정/삭제

### 사이트 설정 (/admin/settings)
- 연구실 기본 정보 수정
- 연락처 정보 업데이트

---

## 문제 해결

### 배포 실패 시
1. 빌드 로그 확인
2. 환경 변수 설정 확인
3. Node.js 버전 확인 (18 이상 권장)

### 로그인 안 될 때
1. 환경 변수 확인 (ADMIN_USERNAME, ADMIN_PASSWORD)
2. 브라우저 쿠키 삭제 후 재시도
3. JWT_SECRET 설정 확인

### 데이터 변경이 반영 안 될 때
1. 브라우저 캐시 삭제
2. 페이지 새로고침 (Ctrl/Cmd + Shift + R)

---

## 비용

| 플랫폼 | 비용 | 특징 |
|--------|------|------|
| Vercel | 무료 (Hobby) | 월 100GB 대역폭, 자동 HTTPS |
| Cloudflare Pages | 무료 | 무제한 대역폭, 빠른 CDN |

기존 아임웹 호스팅 대비 **연간 50~100만원 절감** 예상

---

*작성일: 2025년 12월*

# KAIST HAND Lab 웹사이트 기술 명세서

## 1. 프로젝트 개요

### 1.1 목적
- 외부 웹사이트 관리 업체(아임웹) 의존성 제거
- 연간 관리비용 절감
- 연구실 자체 관리 가능한 웹사이트 구축
- 현대적이고 빠른 사용자 경험 제공

### 1.2 현재 사이트 분석
- **현재 플랫폼**: 아임웹(imweb.me)
- **URL**: https://hand.kaist.ac.kr/
- **문제점**: 매년 호스팅/관리비 발생, 커스터마이징 제한, 외부 의존성

---

## 2. 기술 스택

### 2.1 프론트엔드
| 기술 | 버전 | 용도 |
|------|------|------|
| **Next.js** | 14.x | React 기반 풀스택 프레임워크 |
| **React** | 18.x | UI 컴포넌트 라이브러리 |
| **Tailwind CSS** | 3.x | 유틸리티 기반 CSS 프레임워크 |
| **TypeScript** | 5.x | 타입 안정성 확보 |

### 2.2 콘텐츠 관리
| 기술 | 용도 |
|------|------|
| **Markdown/MDX** | 뉴스, 연구 설명 등 장문 콘텐츠 |
| **JSON 파일** | 구조화된 데이터 (멤버, 논문, 연구 분야) |
| **로컬 이미지** | public 폴더 내 이미지 관리 |

### 2.3 배포 및 호스팅 (무료)
| 옵션 | 특징 |
|------|------|
| **Vercel** (권장) | Next.js 최적화, 자동 배포, 무료 SSL |
| **GitHub Pages** | 정적 사이트 호스팅, 완전 무료 |
| **Cloudflare Pages** | 빠른 CDN, 무료 호스팅 |

### 2.4 도메인 연결
- 기존 도메인 `hand.kaist.ac.kr` DNS 설정 변경으로 연결
- KAIST 도메인 관리자에게 CNAME 또는 A 레코드 변경 요청

---

## 3. 사이트 구조

### 3.1 페이지 구성
```
/                       # 메인 페이지 (Hero + 요약 정보)
/professor              # 교수 소개
/research               # 연구 분야 (전체)
/research/[category]    # 카테고리별 연구
/publications           # 논문 목록
/publications/data      # 데이터/자료
/members                # 현재 멤버
/members/alumni         # 졸업생
/members/photos         # 사진 갤러리
/news                   # 뉴스/공지
/news/[slug]            # 개별 뉴스 상세
/recruit                # 채용/모집
/contact                # 연락처
```

### 3.2 파일 구조
```
hand-lab-website/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 공통 레이아웃
│   ├── page.tsx                  # 메인 페이지
│   ├── professor/
│   ├── research/
│   ├── publications/
│   ├── members/
│   ├── news/
│   └── recruit/
├── components/                   # 재사용 컴포넌트
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   ├── PublicationCard.tsx
│   ├── MemberCard.tsx
│   └── NewsCard.tsx
├── content/                      # 콘텐츠 데이터
│   ├── professor.json
│   ├── members.json
│   ├── alumni.json
│   ├── publications.json
│   ├── research.json
│   └── news/                     # Markdown 뉴스 파일
│       └── *.md
├── public/                       # 정적 자산
│   ├── images/
│   │   ├── professor/
│   │   ├── members/
│   │   ├── research/
│   │   └── logos/
│   └── files/                    # PDF 등 다운로드 파일
├── lib/                          # 유틸리티 함수
│   ├── content.ts
│   └── types.ts
├── styles/
│   └── globals.css
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md                     # 관리 가이드
```

---

## 4. 데이터 구조

### 4.1 교수 정보 (professor.json)
```json
{
  "name": "이건재",
  "nameEn": "Keon Jae Lee",
  "title": "석좌교수 (Distinguished Professor)",
  "department": "신소재공학과",
  "email": "keonlee@kaist.ac.kr",
  "phone": "82-42-350-3343",
  "fax": "82-42-350-3310",
  "office": "KAIST E6-6 #3321",
  "photo": "/images/professor/keonlee.jpg",
  "bio": "...",
  "education": [...],
  "positions": [...],
  "awards": [...]
}
```

### 4.2 멤버 정보 (members.json)
```json
[
  {
    "id": "member-001",
    "name": "홍길동",
    "nameEn": "Gildong Hong",
    "position": "Ph.D. Student",
    "year": 2022,
    "email": "gdhong@kaist.ac.kr",
    "photo": "/images/members/gdhong.jpg",
    "research": ["Neuromorphic AI", "FTJ"],
    "education": "KAIST, B.S. Materials Science, 2022"
  }
]
```

### 4.3 논문 정보 (publications.json)
```json
[
  {
    "id": "pub-2025-001",
    "title": "Wearable blood pressure sensors...",
    "authors": ["S. Min", "J. An", "...", "K. Lee*"],
    "journal": "Nat. Rev. Cardiol",
    "volume": "22",
    "pages": "629",
    "year": 2025,
    "impactFactor": 41.7,
    "doi": "10.1038/xxxxx",
    "pdf": "/files/publications/2025-nrc-bp.pdf",
    "category": "review"
  }
]
```

### 4.4 연구 분야 (research.json)
```json
[
  {
    "id": "human-augmented-sensor",
    "title": "Human Augmented Sensor",
    "description": "...",
    "image": "/images/research/sensor.jpg",
    "topics": [
      "Auditory Sensors",
      "Tactile Sensors",
      "Ultrasonic Sensors",
      "Self-powered Energy"
    ]
  }
]
```

### 4.5 뉴스 (Markdown 파일)
```markdown
---
title: "KAIST, 문어다리처럼 감싸 췌장암 치료하는 LED 장치 개발"
date: "2025-12-15"
category: "research"
thumbnail: "/images/news/2025-12-led.jpg"
---

뉴스 본문 내용...
```

---

## 5. 관리 가이드

### 5.1 콘텐츠 수정 방법

#### 새 논문 추가
1. `content/publications.json` 파일 열기
2. 배열에 새 논문 객체 추가
3. PDF 파일이 있으면 `public/files/publications/`에 업로드
4. Git commit & push → 자동 배포

#### 새 멤버 추가
1. `content/members.json` 파일 열기
2. 사진을 `public/images/members/`에 업로드
3. 배열에 새 멤버 객체 추가
4. Git commit & push → 자동 배포

#### 새 뉴스 작성
1. `content/news/` 폴더에 새 `.md` 파일 생성
2. frontmatter와 본문 작성
3. Git commit & push → 자동 배포

### 5.2 로컬 개발 환경
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm run start
```

---

## 6. 배포 설정

### 6.1 Vercel 배포 (권장)
1. GitHub 저장소 생성 및 코드 푸시
2. Vercel.com에서 GitHub 연동
3. 프로젝트 import
4. 자동 빌드 및 배포
5. 커스텀 도메인 설정

### 6.2 도메인 연결
```
# Vercel 사용 시 CNAME 레코드
hand.kaist.ac.kr → cname.vercel-dns.com

# 또는 A 레코드
hand.kaist.ac.kr → 76.76.21.21
```

---

## 7. 비용 비교

### 현재 (아임웹)
- 연간 호스팅/관리비: 약 50~100만원 추정
- 업체 의존성: 높음
- 커스터마이징: 제한적

### 제안 (자체 구축)
- 호스팅 비용: **무료** (Vercel/GitHub Pages)
- 도메인: KAIST 도메인 유지 (기존과 동일)
- SSL 인증서: **무료** (자동 발급)
- 관리: 연구실 자체 (Git 기반)

### 예상 절감 효과
- **연간 50~100만원 절감**
- 완전한 소유권 및 커스터마이징 자유
- 버전 관리 및 롤백 가능

---

## 8. 마이그레이션 계획

### Phase 1: 개발 (1-2주)
- 기본 사이트 구조 구축
- 기존 콘텐츠 이전
- 디자인 완성

### Phase 2: 테스트 (1주)
- 임시 URL로 테스트 배포
- 콘텐츠 검증
- 반응형 테스트

### Phase 3: 전환 (1일)
- DNS 변경 요청 (KAIST 전산팀)
- 기존 서비스 해지
- 모니터링

---

## 9. 유지보수

### 정기 작업
- 의존성 업데이트 (분기별)
- 백업 (Git으로 자동 관리)
- SSL 갱신 (자동)

### 담당자 교육
- Git 기본 사용법
- Markdown 작성법
- JSON 데이터 수정법
- 이미지 최적화 방법

---

## 10. Admin Console (관리자 콘솔)

### 10.1 개요
웹 기반 관리자 콘솔을 통해 웹사이트 콘텐츠를 직접 관리할 수 있습니다.

### 10.2 접근 방법
- 로그인 페이지: `/login`
- 관리자 대시보드: `/admin`
- 기본 계정: `admin` / 환경변수로 설정

### 10.3 관리 기능

| 메뉴 | 경로 | 기능 |
|------|------|------|
| 대시보드 | `/admin` | 통계 및 최근 활동 확인 |
| 멤버 관리 | `/admin/members` | 현재 연구실 멤버 CRUD |
| 졸업생 관리 | `/admin/alumni` | 졸업생 정보 CRUD |
| 논문 관리 | `/admin/publications` | 논문 등록/수정/삭제 |
| 뉴스 관리 | `/admin/news` | 뉴스 및 공지사항 관리 |
| 사이트 설정 | `/admin/settings` | 기본 정보 수정 |

### 10.4 인증 시스템
- JWT 기반 인증
- HttpOnly 쿠키 사용
- 24시간 세션 유지
- 환경변수로 자격 증명 관리

### 10.5 API 구조
```
/api/auth/login     POST   로그인
/api/auth/logout    POST   로그아웃
/api/auth/check     GET    인증 확인

/api/members        GET    전체 조회
/api/members        POST   새 멤버 추가
/api/members/[id]   GET    개별 조회
/api/members/[id]   PUT    수정
/api/members/[id]   DELETE 삭제

(publications, news, alumni 동일 구조)
```

---

## 11. 확장 가능성

### 향후 추가 가능 기능
- 다국어 지원 (i18n)
- 검색 기능 (Algolia)
- 방문자 통계 (Google Analytics, Plausible)
- 뉴스레터 구독
- RSS 피드
- 논문 검색/필터링
- 연구 타임라인

---

*문서 작성일: 2025년 12월*
*작성자: Claude AI*

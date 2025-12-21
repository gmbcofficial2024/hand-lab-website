# KAIST HAND Lab 웹사이트 현황 분석 보고서

> 분석일: 2025-12-21
> 분석 대상: hand.kaist.ac.kr 대체 웹사이트 프로젝트

---

## 1. 프로젝트 개요

### 1.1 목표
- 현재 imweb 플랫폼 기반 웹사이트를 자체 Next.js 기반으로 마이그레이션
- 자체 Admin Console 개발로 외부 의존성 제거
- lab.handkaistnas.org에 테스트 배포 후 디버깅 진행

### 1.2 현재 기술 스택

| 구분 | 기술 | 버전 | 상태 |
|------|------|------|------|
| 프레임워크 | Next.js | 14.2.0 | ✅ 구현됨 |
| 언어 | TypeScript | 5.3.3 | ✅ 구현됨 |
| UI 프레임워크 | React | 18.2.0 | ✅ 구현됨 |
| 스타일링 | Tailwind CSS | 3.4.1 | ✅ 구현됨 |
| 아이콘 | Lucide React | 0.400.0 | ✅ 구현됨 |
| 인증 | JWT (jose) | 5.2.0 | ✅ 구현됨 |
| 마크다운 | gray-matter, remark | 최신 | ✅ 구현됨 |

---

## 2. 페이지 구조 분석

### 2.1 구현된 페이지

| 경로 | 설명 | 구현 상태 | 비고 |
|------|------|----------|------|
| `/` | 메인 페이지 | ✅ 완료 | Hero, Research, Publications, CTA 섹션 |
| `/professor` | 교수 소개 | ✅ 완료 | 상세 프로필 페이지 |
| `/research` | 연구 분야 | ✅ 완료 | 카드 레이아웃 |
| `/research/[id]` | 연구 상세 | ✅ 완료 | 동적 라우팅 |
| `/publications` | 논문 목록 | ✅ 완료 | 필터링 기능 포함 |
| `/publications/data` | 데이터/자료 | ✅ 완료 | - |
| `/members` | 현재 멤버 | ✅ 완료 | 카드 그리드 |
| `/members/alumni` | 졸업생 | ✅ 완료 | - |
| `/members/photos` | 사진 갤러리 | ✅ 완료 | - |
| `/news` | 뉴스/공지 | ✅ 완료 | 카테고리 필터 |
| `/recruit` | 채용/모집 | ✅ 완료 | - |
| `/login` | 관리자 로그인 | ✅ 완료 | JWT 인증 |

### 2.2 관리자 콘솔 (Admin Console)

| 경로 | 기능 | 구현 상태 |
|------|------|----------|
| `/admin` | 대시보드 | ✅ 완료 |
| `/admin/members` | 멤버 CRUD | ✅ 완료 |
| `/admin/alumni` | 졸업생 CRUD | ✅ 완료 |
| `/admin/publications` | 논문 CRUD | ✅ 완료 |
| `/admin/news` | 뉴스 CRUD | ✅ 완료 |
| `/admin/settings` | 사이트 설정 | ✅ 완료 |

---

## 3. 명세서 vs 현재 구현 비교

### 3.1 충족된 요구사항

#### A. 콘텐츠 관리 시스템 (CMS)
| 요구사항 | 구현 상태 | 구현 방식 |
|----------|----------|-----------|
| 게시글 CRUD | ✅ 완료 | API Routes + JSON 파일 |
| 멤버 프로필 관리 | ✅ 완료 | API Routes + JSON 파일 |
| 논문 관리 | ✅ 완료 | API Routes + JSON 파일 |
| 카테고리 분류 | ✅ 완료 | JSON 기반 |
| 검색 기능 | ✅ 완료 | 클라이언트 사이드 필터링 |

#### B. 인증 시스템
| 요구사항 | 구현 상태 | 구현 방식 |
|----------|----------|-----------|
| JWT 인증 | ✅ 완료 | jose 라이브러리 |
| HttpOnly 쿠키 | ✅ 완료 | 보안 쿠키 설정 |
| 세션 관리 | ✅ 완료 | 24시간 유효 |

#### C. API 엔드포인트
```
✅ /api/auth/login     POST   로그인
✅ /api/auth/logout    POST   로그아웃
✅ /api/auth/check     GET    인증 확인

✅ /api/members        GET    전체 조회
✅ /api/members        POST   새 멤버 추가
✅ /api/members/[id]   GET    개별 조회
✅ /api/members/[id]   PUT    수정
✅ /api/members/[id]   DELETE 삭제

✅ /api/publications   (동일 구조)
✅ /api/news           (동일 구조)
✅ /api/alumni         (동일 구조)
✅ /api/settings       GET/PUT 설정 관리
```

#### D. 디자인 시스템
| 요소 | 구현 상태 | 상세 |
|------|----------|------|
| 컬러 스킴 | ✅ 완료 | primary-500: 파란색 계열 (#3B82F6) |
| 고정 네비게이션 | ✅ 완료 | sticky 헤더, 드롭다운 메뉴 |
| 반응형 디자인 | ✅ 완료 | Tailwind CSS 반응형 클래스 |
| 카드 레이아웃 | ✅ 완료 | 2열, 3열 그리드 |
| 호버 효과 | ✅ 완료 | transition, shadow 애니메이션 |
| 모바일 메뉴 | ✅ 완료 | 햄버거 메뉴 |

### 3.2 부분 구현된 요구사항

#### A. 다국어 지원 (i18n)
| 상태 | 설명 |
|------|------|
| 🔶 부분 완료 | Header에 KR/EN 토글 버튼 존재 |
| ⏳ 미완료 | 실제 영어 콘텐츠 번역 파일 없음 |
| ⏳ 미완료 | 다국어 라우팅 (/en/*) 미구현 |

**개선 방안:**
1. `content/` 폴더에 영어 버전 JSON 파일 추가 (예: `members.en.json`)
2. Next.js i18n 설정 또는 자체 번역 시스템 구현
3. URL 기반 언어 전환 (`/en/research` 등)

#### B. 미디어 관리
| 상태 | 설명 |
|------|------|
| 🔶 부분 완료 | 이미지 참조 (URL 기반) 지원 |
| ⏳ 미완료 | 파일 업로드 API 없음 |
| ⏳ 미완료 | 미디어 라이브러리 UI 없음 |
| ⏳ 미완료 | 썸네일 자동 생성 없음 |

**개선 방안:**
1. `/api/media/upload` 엔드포인트 구현
2. `public/uploads/` 디렉토리 또는 외부 스토리지 (AWS S3, Cloudflare R2) 연동
3. Admin Console에 미디어 라이브러리 페이지 추가

### 3.3 미구현 요구사항

| 기능 | 우선순위 | 설명 |
|------|----------|------|
| 페이지 에디터 | 낮음 | 드래그앤드롭 섹션 편집 (현재는 코드 수정 필요) |
| Watch/비디오 섹션 | 중간 | YouTube/Vimeo 임베드 전용 페이지 |
| 실제 데이터 마이그레이션 | 높음 | imweb에서 실제 콘텐츠 추출 및 이전 |
| 이미지 마이그레이션 | 높음 | cdn.imweb.me → 자체 스토리지 |

---

## 4. 데이터 구조 분석

### 4.1 현재 데이터 저장 방식

**장점:**
- JSON 파일 기반으로 Git 버전 관리 용이
- 별도 데이터베이스 서버 불필요 (무료 호스팅 가능)
- 백업 및 롤백 간편

**단점:**
- 동시 수정 시 충돌 가능성
- 대용량 데이터에 부적합 (현재 연구실 규모에는 적합)
- 이미지 업로드 시 별도 처리 필요

### 4.2 데이터 파일 구조

```
content/
├── professor.json     # 교수 정보
├── members.json       # 현재 멤버 (8명)
├── alumni.json        # 졸업생
├── publications.json  # 논문 목록 (11편)
├── research.json      # 연구 분야
├── news.json          # 뉴스 (마크다운 대신 JSON 사용)
└── site.json          # 사이트 설정
```

### 4.3 명세서 DB 스키마 vs 현재 구현

| 명세서 테이블 | 현재 구현 | 매핑 상태 |
|--------------|----------|-----------|
| pages | 미사용 (정적 페이지) | - |
| posts | news.json | ✅ 호환 |
| categories | JSON 내 category 필드 | ✅ 호환 |
| members | members.json | ✅ 호환 |
| media | 미구현 | ⏳ 필요 |

---

## 5. 컴포넌트 구조 분석

### 5.1 현재 컴포넌트

```
components/
├── Header.tsx         # 네비게이션 (드롭다운, 모바일 메뉴)
├── Footer.tsx         # 푸터
└── admin/
    └── AdminSidebar.tsx  # 관리자 사이드바
```

### 5.2 필요한 추가 컴포넌트

| 컴포넌트 | 우선순위 | 용도 |
|----------|----------|------|
| `NewsCard.tsx` | 중간 | 뉴스 카드 (재사용) |
| `PublicationCard.tsx` | 중간 | 논문 카드 (재사용) |
| `MemberCard.tsx` | 중간 | 멤버 카드 (재사용) |
| `VideoCard.tsx` | 낮음 | 비디오 임베드 |
| `ImageUploader.tsx` | 높음 | 이미지 업로드 UI |
| `RichTextEditor.tsx` | 중간 | 뉴스 본문 편집 |

---

## 6. 배포 준비 상태

### 6.1 lab.handkaistnas.org 배포 체크리스트

| 항목 | 상태 | 설명 |
|------|------|------|
| 빌드 테스트 | ⏳ 미확인 | `npm run build` 성공 여부 |
| 환경변수 설정 | ⏳ 필요 | JWT_SECRET, ADMIN_* |
| 도메인 설정 | ⏳ 필요 | DNS, SSL 설정 |
| 이미지 최적화 | ⏳ 필요 | Next.js Image 설정 |

### 6.2 필요한 환경변수

```env
# 인증
JWT_SECRET=your-secret-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=bcrypt-hash

# 사이트 URL
NEXT_PUBLIC_SITE_URL=https://lab.handkaistnas.org

# (선택) 외부 스토리지
S3_BUCKET=hand-lab-media
S3_ACCESS_KEY=...
S3_SECRET_KEY=...
```

---

## 7. 개선 권장사항

### 7.1 즉시 수행 (Phase 1)

1. **빌드 테스트**
   ```bash
   npm run build
   npm run start
   ```

2. **환경변수 설정**
   - `.env.local` 파일 생성
   - 배포 환경에 환경변수 등록

3. **테스트 배포**
   - Vercel 또는 자체 서버에 배포
   - 기본 기능 동작 확인

### 7.2 단기 개선 (Phase 2 - 1~2주)

1. **이미지 업로드 기능**
   - `/api/media/upload` 구현
   - Admin Console 미디어 라이브러리 추가

2. **실제 콘텐츠 마이그레이션**
   - imweb에서 멤버, 논문, 뉴스 데이터 추출
   - 이미지 다운로드 및 재호스팅

3. **UI/UX 개선**
   - 기존 hand.kaist.ac.kr 디자인과 일치시키기
   - 컬러 코드 조정 (#123a7f → primary 색상)

### 7.3 중기 개선 (Phase 3 - 2~4주)

1. **다국어 지원 완성**
   - 영어 콘텐츠 번역
   - i18n 라우팅 구현

2. **고급 기능**
   - 뉴스레터 구독
   - 방문자 통계 (Google Analytics)
   - 논문 검색 고도화

---

## 8. 결론

### 8.1 전체 완성도: 약 75%

| 영역 | 완성도 | 평가 |
|------|--------|------|
| 프론트엔드 페이지 | 90% | 대부분 완료, 세부 디자인 조정 필요 |
| Admin Console | 85% | 핵심 CRUD 완료, 미디어 업로드 필요 |
| API 백엔드 | 80% | 주요 엔드포인트 완료, 미디어 API 필요 |
| 데이터 | 50% | 샘플 데이터만 있음, 실제 마이그레이션 필요 |
| 다국어 | 20% | 토글만 있음, 번역 미구현 |
| 배포 | 0% | 미배포 상태 |

### 8.2 다음 단계

1. ✅ 현황 분석 완료
2. ⏳ 빌드 테스트 및 오류 수정
3. ⏳ lab.handkaistnas.org 테스트 배포
4. ⏳ 실제 콘텐츠 마이그레이션
5. ⏳ 디버깅 및 UI 조정
6. ⏳ 본 도메인(hand.kaist.ac.kr) 전환

---

## 부록: 파일 구조

```
hand-lab-website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # 메인 페이지
│   ├── globals.css                 # 전역 스타일
│   ├── professor/page.tsx
│   ├── research/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── publications/
│   │   ├── page.tsx
│   │   └── data/page.tsx
│   ├── members/
│   │   ├── page.tsx
│   │   ├── alumni/page.tsx
│   │   └── photos/page.tsx
│   ├── news/page.tsx
│   ├── recruit/page.tsx
│   ├── login/page.tsx
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── page.tsx                # 대시보드
│   │   ├── members/page.tsx
│   │   ├── alumni/page.tsx
│   │   ├── publications/page.tsx
│   │   ├── news/page.tsx
│   │   └── settings/page.tsx
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts
│       │   ├── logout/route.ts
│       │   └── check/route.ts
│       ├── members/
│       │   ├── route.ts
│       │   └── [id]/route.ts
│       ├── publications/...
│       ├── news/...
│       ├── alumni/...
│       └── settings/route.ts
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── admin/AdminSidebar.tsx
├── content/
│   ├── professor.json
│   ├── members.json
│   ├── alumni.json
│   ├── publications.json
│   ├── research.json
│   ├── news.json
│   └── site.json
├── lib/
│   ├── types.ts
│   ├── auth.ts
│   └── data.ts (추정)
├── public/
│   └── images/...
├── docs/
│   ├── TECHNICAL_SPECIFICATION.md
│   ├── DEPLOYMENT_GUIDE.md
│   └── ANALYSIS_REPORT.md (현재 문서)
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

*이 보고서는 자동 생성되었습니다.*

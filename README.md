# KAIST HAND Lab Website

KAIST Human Augmentation Nano Device Laboratory 공식 웹사이트입니다.

## 🚀 Quick Start

### 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 정적 파일 생성 (out/ 폴더)
npm run export
```

## 📁 프로젝트 구조

```
hand-lab-website/
├── app/                    # Next.js 페이지
│   ├── page.tsx           # 메인 페이지
│   ├── professor/         # 교수 소개
│   ├── research/          # 연구 분야
│   ├── publications/      # 논문 목록
│   ├── members/           # 연구실 멤버
│   ├── news/              # 뉴스/공지
│   └── recruit/           # 채용 정보
├── components/            # 재사용 컴포넌트
├── content/               # 📝 콘텐츠 데이터 (주로 수정하는 부분)
│   ├── professor.json     # 교수 정보
│   ├── members.json       # 멤버 정보
│   ├── publications.json  # 논문 목록
│   ├── research.json      # 연구 분야
│   └── site.json          # 사이트 설정
├── public/                # 정적 파일
│   └── images/            # 이미지
└── lib/                   # 유틸리티
```

## 📝 콘텐츠 수정 가이드

### 1. 새 논문 추가하기

`content/publications.json` 파일을 열어 배열에 새 항목을 추가합니다:

```json
{
  "id": "pub-2025-003",
  "title": "논문 제목",
  "authors": ["저자1", "저자2", "K. Lee*"],
  "journal": "저널명",
  "volume": "권",
  "pages": "페이지",
  "year": 2025,
  "impactFactor": 10.5,
  "doi": "10.1000/xxxxx",
  "category": "journal",
  "featured": true
}
```

### 2. 새 멤버 추가하기

1. 프로필 사진을 `public/images/members/` 폴더에 업로드
2. `content/members.json` 파일에 새 멤버 정보 추가:

```json
{
  "id": "member-009",
  "name": "홍길동",
  "nameEn": "Gildong Hong",
  "position": "Ph.D. Student",
  "year": 2025,
  "email": "gdhong@kaist.ac.kr",
  "photo": "/images/members/gdhong.jpg",
  "research": ["Research Area 1", "Research Area 2"],
  "education": "KAIST, B.S. Materials Science, 2025"
}
```

### 3. 교수 정보 수정하기

`content/professor.json` 파일을 직접 수정합니다.

### 4. 이미지 추가하기

- 프로필 사진: `public/images/members/`
- 연구 이미지: `public/images/research/`
- 뉴스 이미지: `public/images/news/`
- 로고: `public/images/logos/`

**권장 이미지 사양:**
- 형식: JPG, PNG, WebP
- 프로필: 400x400px 이상 (정사각형)
- 연구 이미지: 1200x800px 이상

## 🌐 배포 가이드

### Vercel 배포 (권장)

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com)에서 GitHub 저장소 연동
3. 자동 빌드 및 배포

### 도메인 연결

KAIST 전산팀에 DNS 변경 요청:

```
hand.kaist.ac.kr → CNAME → cname.vercel-dns.com
```

또는 A 레코드:
```
hand.kaist.ac.kr → A → 76.76.21.21
```

## 🔧 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React
- **Fonts**: Pretendard, Montserrat

## 📋 체크리스트

새로운 학기/년도 시작 시:
- [ ] 졸업생 → alumni로 이동
- [ ] 새 멤버 추가
- [ ] 새 논문 추가
- [ ] 뉴스 업데이트

## 🆘 문제 해결

### 빌드 에러 발생 시

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules
npm install
```

### 이미지가 안 보일 때

- 파일 경로가 `/images/...`로 시작하는지 확인
- 파일명에 특수문자나 공백이 없는지 확인
- 대소문자가 정확한지 확인

## 📞 지원

기술적인 문의사항은 GitHub Issues를 통해 남겨주세요.

---

© 2025 KAIST HAND Lab. All rights reserved.

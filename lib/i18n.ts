export type Locale = 'kr' | 'en'

export const defaultLocale: Locale = 'kr'

export const locales: Locale[] = ['kr', 'en']

// Common translations
export const translations = {
  kr: {
    // Navigation
    nav: {
      professor: 'Professor',
      research: 'Research',
      publications: 'Publications',
      members: 'Members',
      news: 'News',
      recruit: 'Recruit',
      watch: 'Watch',
    },
    // Home page
    home: {
      heroSubtitle: 'KAIST 신소재공학과',
      heroTitle1: 'Human',
      heroTitle2: 'Augmentation',
      heroTitle3: 'Nano Device',
      heroDescription: '소프트 전자공학 기반 인간 증강 기술 개발을 통해 자연인과 새로운 인류의 조화로운 공존을 추구합니다.',
      exploreResearch: '연구 탐색',
      joinLab: '연구실 참여',
      publications: '논문',
      ercFunding: 'ERC 펀딩',
      labMembers: '연구실 멤버',
      researchAreas: '연구 분야',
      researchAreasSubtitle: '인간 증강 기술 개발을 위한 세 가지 주요 연구 분야',
      news: 'NEWS',
      newsSubtitle: 'HAND Lab의 최신 소식과 성과',
      seeAllNews: '모든 뉴스 보기',
      featuredPublications: '주요 논문',
      featuredPublicationsSubtitle: '최근 고영향력 논문',
      viewAllPublications: '전체 논문 보기',
      watch: 'WATCH',
      watchSubtitle: 'HAND Lab 주요 영상',
      seeAllVideos: '모든 영상 보기',
      labVlog: 'LAB Vlog',
      labVlogSubtitle: '연구실과 팀원 소개',
      gbmc: 'Global Bio-integrated Materials Center',
      gbmcDescription: 'HAND Lab은 7년간 130억원 규모의 공학연구센터(ERC)로 선정되었습니다. Global Bio-integrated Materials Center (GBMC)는 인간 증강을 위한 차세대 바이오 통합 소재 및 디바이스 개발에 집중하고 있습니다.',
      ercFundingLabel: 'ERC 펀딩',
      ercFundingValue: '7년간 130억원',
      collaborativeResearch: '협력 연구',
      collaborativeResearchValue: '다기관 파트너십',
      visitGbmc: 'GBMC 웹사이트 방문',
      joinTeam: '연구팀 합류',
      joinTeamDescription: '열정적인 연구자를 항상 환영합니다. 최첨단 인간 증강 기술 연구에 참여하세요.',
      viewPositions: '채용 공고 보기',
      meetTeam: '팀원 소개',
    },
    // Footer
    footer: {
      department: '신소재공학과',
      address: '대전광역시 유성구 대학로 291',
      copyright: '© 2025 KAIST HAND Lab. All rights reserved.',
    },
  },
  en: {
    // Navigation
    nav: {
      professor: 'Professor',
      research: 'Research',
      publications: 'Publications',
      members: 'Members',
      news: 'News',
      recruit: 'Recruit',
      watch: 'Watch',
    },
    // Home page
    home: {
      heroSubtitle: 'KAIST Department of Materials Science & Engineering',
      heroTitle1: 'Human',
      heroTitle2: 'Augmentation',
      heroTitle3: 'Nano Device',
      heroDescription: 'Developing Human Augmentation Technologies based on Soft Electronics for the harmonic coexistence of natural human and new humanity.',
      exploreResearch: 'Explore Research',
      joinLab: 'Join Our Lab',
      publications: 'Publications',
      ercFunding: 'ERC Funding',
      labMembers: 'Lab Members',
      researchAreas: 'Research Areas',
      researchAreasSubtitle: 'We focus on three main research areas to develop human augmentation technologies',
      news: 'NEWS',
      newsSubtitle: 'Latest updates and achievements from HAND Lab',
      seeAllNews: 'See all News',
      featuredPublications: 'Featured Publications',
      featuredPublicationsSubtitle: 'Recent high-impact papers from our lab',
      viewAllPublications: 'View all publications',
      watch: 'WATCH',
      watchSubtitle: 'Featured videos from HAND Lab',
      seeAllVideos: 'See all Videos',
      labVlog: 'LAB Vlog',
      labVlogSubtitle: 'Get to know our lab and team',
      gbmc: 'Global Bio-integrated Materials Center',
      gbmcDescription: 'HAND Lab is selected as an Engineering Research Center (ERC) with $13 million funding over 7 years. Our center, Global Bio-integrated Materials Center (GBMC), focuses on developing next-generation bio-integrated materials and devices for human augmentation.',
      ercFundingLabel: 'ERC Funding',
      ercFundingValue: '$13M over 7 years',
      collaborativeResearch: 'Collaborative Research',
      collaborativeResearchValue: 'Multi-institutional partnerships',
      visitGbmc: 'Visit GBMC Website',
      joinTeam: 'Join Our Research Team',
      joinTeamDescription: 'We are always looking for passionate researchers to join our lab. Explore opportunities to work on cutting-edge human augmentation technologies.',
      viewPositions: 'View Open Positions',
      meetTeam: 'Meet Our Team',
    },
    // Footer
    footer: {
      department: 'Department of Materials Science and Engineering',
      address: '291 Daehak-ro, Yuseong-gu, Daejeon, Korea',
      copyright: '© 2025 KAIST HAND Lab. All rights reserved.',
    },
  },
}

export function getTranslations(locale: Locale) {
  return translations[locale] || translations[defaultLocale]
}

// Helper to get localized content from objects with title/titleEn pattern
export function getLocalizedField<T extends Record<string, unknown>>(
  item: T,
  field: string,
  locale: Locale
): string {
  if (locale === 'en') {
    const enField = `${field}En` as keyof T
    if (item[enField]) {
      return item[enField] as string
    }
  }
  return (item[field as keyof T] as string) || ''
}

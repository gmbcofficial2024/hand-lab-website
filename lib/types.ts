// Professor Types
export interface Education {
  degree: string;
  institution: string;
  field: string;
  year: number;
}

export interface Position {
  title: string;
  organization: string;
  period: string;
  current?: boolean;
}

export interface Award {
  title: string;
  organization: string;
  year: number;
}

export interface Professor {
  name: string;
  nameEn: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  fax: string;
  office: string;
  photo: string;
  bio: string;
  education: Education[];
  positions: Position[];
  awards: Award[];
}

// Member Types
export interface Member {
  id: string;
  name: string;
  nameEn: string;
  position: 'Ph.D. Student' | 'M.S. Student' | 'M.S./Ph.D. Student' | 'Postdoc' | 'Research Professor' | 'Visiting Scholar' | 'Undergraduate';
  year: number;
  email: string;
  photo: string;
  research: string[];
  education: string;
  linkedin?: string;
  googleScholar?: string;
  website?: string;
}

export interface Alumni extends Omit<Member, 'position'> {
  position: string;
  graduationYear: number;
  thesis?: string;
  currentPosition?: string;
  currentOrganization?: string;
}

// Publication Types
export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  volume?: string;
  issue?: string;
  pages?: string;
  year: number;
  impactFactor?: number;
  doi?: string;
  pdf?: string;
  category: 'journal' | 'conference' | 'review' | 'book';
  featured?: boolean;
}

// Research Types
export interface ResearchTopic {
  title: string;
  description: string;
}

export interface Research {
  id: string;
  title: string;
  titleKo?: string;
  description: string;
  image: string;
  topics: ResearchTopic[];
  publications?: string[]; // Publication IDs
}

// News Types
export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  category: 'research' | 'award' | 'media' | 'event' | 'lab';
  thumbnail?: string;
  excerpt?: string;
  content: string;
  externalLink?: string;
}

// Site Config
export interface SiteConfig {
  name: string;
  nameKo: string;
  description: string;
  url: string;
  address: string;
  addressKo: string;
  phone: string;
  fax: string;
  email: string;
  social: {
    googleScholar?: string;
    researchGate?: string;
    linkedin?: string;
  };
}

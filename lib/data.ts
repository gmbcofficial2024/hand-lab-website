import fs from 'fs/promises';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface Member {
  id: string;
  name: string;
  nameEn: string;
  position: string;
  year: number;
  email: string;
  photo: string;
  research: string[];
  education: string;
}

export interface Alumni {
  id: string;
  name: string;
  nameEn: string;
  degree: string;
  graduationYear: number;
  thesis?: string;
  currentPosition?: string;
  currentOrganization?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  volume: string;
  issue?: string;
  pages: string;
  year: number;
  impactFactor?: number;
  doi: string;
  category: string;
  featured: boolean;
}

export interface News {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
  thumbnail?: string;
}

export interface Research {
  id: string;
  title: string;
  description: string;
  image: string;
  topics: string[];
}

// Generic read function
async function readJsonFile<T>(filename: string): Promise<T> {
  const filePath = path.join(CONTENT_DIR, filename);
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

// Generic write function
async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(CONTENT_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Members
export async function getMembers(): Promise<Member[]> {
  return readJsonFile<Member[]>('members.json');
}

export async function getMember(id: string): Promise<Member | null> {
  const members = await getMembers();
  return members.find(m => m.id === id) || null;
}

export async function saveMembers(members: Member[]): Promise<void> {
  return writeJsonFile('members.json', members);
}

export async function addMember(member: Member): Promise<void> {
  const members = await getMembers();
  members.push(member);
  await saveMembers(members);
}

export async function updateMember(id: string, data: Partial<Member>): Promise<boolean> {
  const members = await getMembers();
  const index = members.findIndex(m => m.id === id);
  if (index === -1) return false;
  members[index] = { ...members[index], ...data };
  await saveMembers(members);
  return true;
}

export async function deleteMember(id: string): Promise<boolean> {
  const members = await getMembers();
  const filtered = members.filter(m => m.id !== id);
  if (filtered.length === members.length) return false;
  await saveMembers(filtered);
  return true;
}

// Alumni
export async function getAlumni(): Promise<Alumni[]> {
  return readJsonFile<Alumni[]>('alumni.json');
}

export async function saveAlumni(alumni: Alumni[]): Promise<void> {
  return writeJsonFile('alumni.json', alumni);
}

export async function addAlumnus(alumnus: Alumni): Promise<void> {
  const alumni = await getAlumni();
  alumni.push(alumnus);
  await saveAlumni(alumni);
}

export async function updateAlumnus(id: string, data: Partial<Alumni>): Promise<boolean> {
  const alumni = await getAlumni();
  const index = alumni.findIndex(a => a.id === id);
  if (index === -1) return false;
  alumni[index] = { ...alumni[index], ...data };
  await saveAlumni(alumni);
  return true;
}

export async function deleteAlumnus(id: string): Promise<boolean> {
  const alumni = await getAlumni();
  const filtered = alumni.filter(a => a.id !== id);
  if (filtered.length === alumni.length) return false;
  await saveAlumni(filtered);
  return true;
}

// Publications
export async function getPublications(): Promise<Publication[]> {
  return readJsonFile<Publication[]>('publications.json');
}

export async function getPublication(id: string): Promise<Publication | null> {
  const pubs = await getPublications();
  return pubs.find(p => p.id === id) || null;
}

export async function savePublications(publications: Publication[]): Promise<void> {
  return writeJsonFile('publications.json', publications);
}

export async function addPublication(publication: Publication): Promise<void> {
  const publications = await getPublications();
  publications.unshift(publication);
  await savePublications(publications);
}

export async function updatePublication(id: string, data: Partial<Publication>): Promise<boolean> {
  const publications = await getPublications();
  const index = publications.findIndex(p => p.id === id);
  if (index === -1) return false;
  publications[index] = { ...publications[index], ...data };
  await savePublications(publications);
  return true;
}

export async function deletePublication(id: string): Promise<boolean> {
  const publications = await getPublications();
  const filtered = publications.filter(p => p.id !== id);
  if (filtered.length === publications.length) return false;
  await savePublications(filtered);
  return true;
}

// News
export async function getNews(): Promise<News[]> {
  try {
    return readJsonFile<News[]>('news.json');
  } catch {
    return [];
  }
}

export async function getNewsItem(id: string): Promise<News | null> {
  const news = await getNews();
  return news.find(n => n.id === id) || null;
}

export async function saveNews(news: News[]): Promise<void> {
  return writeJsonFile('news.json', news);
}

export async function addNews(item: News): Promise<void> {
  const news = await getNews();
  news.unshift(item);
  await saveNews(news);
}

export async function updateNews(id: string, data: Partial<News>): Promise<boolean> {
  const news = await getNews();
  const index = news.findIndex(n => n.id === id);
  if (index === -1) return false;
  news[index] = { ...news[index], ...data };
  await saveNews(news);
  return true;
}

export async function deleteNews(id: string): Promise<boolean> {
  const news = await getNews();
  const filtered = news.filter(n => n.id !== id);
  if (filtered.length === news.length) return false;
  await saveNews(filtered);
  return true;
}

// Research
export async function getResearch(): Promise<Research[]> {
  return readJsonFile<Research[]>('research.json');
}

export async function saveResearch(research: Research[]): Promise<void> {
  return writeJsonFile('research.json', research);
}

export async function updateResearch(id: string, data: Partial<Research>): Promise<boolean> {
  const research = await getResearch();
  const index = research.findIndex(r => r.id === id);
  if (index === -1) return false;
  research[index] = { ...research[index], ...data };
  await saveResearch(research);
  return true;
}

// Site settings
export async function getSiteSettings(): Promise<Record<string, unknown>> {
  return readJsonFile<Record<string, unknown>>('site.json');
}

export async function saveSiteSettings(settings: Record<string, unknown>): Promise<void> {
  return writeJsonFile('site.json', settings);
}

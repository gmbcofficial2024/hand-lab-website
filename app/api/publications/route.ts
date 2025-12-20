import { NextRequest, NextResponse } from 'next/server';
import { getPublications, addPublication, Publication } from '@/lib/data';
import { getSession } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const publications = await getPublications();
    return NextResponse.json(publications);
  } catch (error) {
    console.error('Error fetching publications:', error);
    return NextResponse.json({ error: 'Failed to fetch publications' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const publication: Publication = {
      id: `pub-${data.year}-${uuidv4().slice(0, 4)}`,
      title: data.title,
      authors: data.authors,
      journal: data.journal,
      volume: data.volume,
      issue: data.issue,
      pages: data.pages,
      year: data.year,
      impactFactor: data.impactFactor,
      doi: data.doi,
      category: data.category || 'journal',
      featured: data.featured || false
    };

    await addPublication(publication);
    return NextResponse.json({ success: true, publication });
  } catch (error) {
    console.error('Error adding publication:', error);
    return NextResponse.json({ error: 'Failed to add publication' }, { status: 500 });
  }
}

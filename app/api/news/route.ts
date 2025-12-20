import { NextRequest, NextResponse } from 'next/server';
import { getNews, addNews, News } from '@/lib/data';
import { getSession } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const news = await getNews();
    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const now = new Date();

    const news: News = {
      id: `news-${now.getFullYear()}-${uuidv4().slice(0, 4)}`,
      title: data.title,
      date: data.date || now.toISOString().split('T')[0],
      category: data.category || 'general',
      content: data.content,
      thumbnail: data.thumbnail || '/images/news/placeholder.jpg'
    };

    await addNews(news);
    return NextResponse.json({ success: true, news });
  } catch (error) {
    console.error('Error adding news:', error);
    return NextResponse.json({ error: 'Failed to add news' }, { status: 500 });
  }
}

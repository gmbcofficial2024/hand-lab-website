import { NextRequest, NextResponse } from 'next/server';
import { getAlumni, addAlumnus, Alumni } from '@/lib/data';
import { getSession } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const alumni = await getAlumni();
    return NextResponse.json(alumni);
  } catch (error) {
    console.error('Error fetching alumni:', error);
    return NextResponse.json({ error: 'Failed to fetch alumni' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const alumnus: Alumni = {
      id: `alumni-${uuidv4().slice(0, 8)}`,
      name: data.name,
      nameEn: data.nameEn,
      degree: data.degree,
      graduationYear: data.graduationYear,
      thesis: data.thesis,
      currentPosition: data.currentPosition,
      currentOrganization: data.currentOrganization
    };

    await addAlumnus(alumnus);
    return NextResponse.json({ success: true, alumnus });
  } catch (error) {
    console.error('Error adding alumnus:', error);
    return NextResponse.json({ error: 'Failed to add alumnus' }, { status: 500 });
  }
}

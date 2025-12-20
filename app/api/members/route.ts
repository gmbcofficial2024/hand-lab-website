import { NextRequest, NextResponse } from 'next/server';
import { getMembers, addMember, Member } from '@/lib/data';
import { getSession } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const members = await getMembers();
    return NextResponse.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const member: Member = {
      id: `member-${uuidv4().slice(0, 8)}`,
      name: data.name,
      nameEn: data.nameEn,
      position: data.position,
      year: data.year,
      email: data.email,
      photo: data.photo || '/images/members/placeholder.jpg',
      research: data.research || [],
      education: data.education
    };

    await addMember(member);
    return NextResponse.json({ success: true, member });
  } catch (error) {
    console.error('Error adding member:', error);
    return NextResponse.json({ error: 'Failed to add member' }, { status: 500 });
  }
}

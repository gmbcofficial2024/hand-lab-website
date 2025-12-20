import { NextRequest, NextResponse } from 'next/server';
import { getAlumni, updateAlumnus, deleteAlumnus } from '@/lib/data';
import { getSession } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const alumni = await getAlumni();
    const alumnus = alumni.find(a => a.id === id);
    if (!alumnus) {
      return NextResponse.json({ error: 'Alumnus not found' }, { status: 404 });
    }
    return NextResponse.json(alumnus);
  } catch (error) {
    console.error('Error fetching alumnus:', error);
    return NextResponse.json({ error: 'Failed to fetch alumnus' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();
    const success = await updateAlumnus(id, data);

    if (!success) {
      return NextResponse.json({ error: 'Alumnus not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating alumnus:', error);
    return NextResponse.json({ error: 'Failed to update alumnus' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const success = await deleteAlumnus(id);

    if (!success) {
      return NextResponse.json({ error: 'Alumnus not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting alumnus:', error);
    return NextResponse.json({ error: 'Failed to delete alumnus' }, { status: 500 });
  }
}

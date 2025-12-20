import { NextRequest, NextResponse } from 'next/server';
import { getPublication, updatePublication, deletePublication } from '@/lib/data';
import { getSession } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const publication = await getPublication(id);
    if (!publication) {
      return NextResponse.json({ error: 'Publication not found' }, { status: 404 });
    }
    return NextResponse.json(publication);
  } catch (error) {
    console.error('Error fetching publication:', error);
    return NextResponse.json({ error: 'Failed to fetch publication' }, { status: 500 });
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
    const success = await updatePublication(id, data);

    if (!success) {
      return NextResponse.json({ error: 'Publication not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating publication:', error);
    return NextResponse.json({ error: 'Failed to update publication' }, { status: 500 });
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
    const success = await deletePublication(id);

    if (!success) {
      return NextResponse.json({ error: 'Publication not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting publication:', error);
    return NextResponse.json({ error: 'Failed to delete publication' }, { status: 500 });
  }
}

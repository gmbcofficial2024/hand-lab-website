import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { readdir, stat, unlink } from 'fs/promises';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

interface MediaFile {
  name: string;
  url: string;
  folder: string;
  size: number;
  modifiedAt: string;
}

async function getFilesRecursively(dir: string, baseDir: string): Promise<MediaFile[]> {
  const files: MediaFile[] = [];

  try {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        const subFiles = await getFilesRecursively(fullPath, baseDir);
        files.push(...subFiles);
      } else {
        const relativePath = path.relative(baseDir, fullPath);
        const folder = path.dirname(relativePath);
        const stats = await stat(fullPath);

        files.push({
          name: entry.name,
          url: `/uploads/${relativePath.replace(/\\/g, '/')}`,
          folder: folder === '.' ? 'root' : folder,
          size: stats.size,
          modifiedAt: stats.mtime.toISOString(),
        });
      }
    }
  } catch {
    // Directory might not exist
  }

  return files;
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder');

    let files: MediaFile[];

    if (folder) {
      const folderPath = path.join(UPLOAD_DIR, folder);
      files = await getFilesRecursively(folderPath, UPLOAD_DIR);
    } else {
      files = await getFilesRecursively(UPLOAD_DIR, UPLOAD_DIR);
    }

    // Sort by modification date (newest first)
    files.sort((a, b) => new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime());

    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error listing media:', error);
    return NextResponse.json({ error: 'Failed to list media' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get('url');

    if (!fileUrl || !fileUrl.startsWith('/uploads/')) {
      return NextResponse.json({ error: 'Invalid file URL' }, { status: 400 });
    }

    const relativePath = fileUrl.replace('/uploads/', '');
    const filePath = path.join(UPLOAD_DIR, relativePath);

    // Security check: ensure the file is within the uploads directory
    const resolvedPath = path.resolve(filePath);
    if (!resolvedPath.startsWith(path.resolve(UPLOAD_DIR))) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
    }

    await unlink(filePath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}

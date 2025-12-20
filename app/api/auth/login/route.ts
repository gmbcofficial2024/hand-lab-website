import { NextRequest, NextResponse } from 'next/server';
import { createToken, validateCredentials } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: '사용자명과 비밀번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    if (!validateCredentials(username, password)) {
      return NextResponse.json(
        { error: '잘못된 사용자명 또는 비밀번호입니다.' },
        { status: 401 }
      );
    }

    const token = await createToken({
      username,
      role: 'admin'
    });

    const response = NextResponse.json({
      success: true,
      message: '로그인 성공'
    });

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: '로그인 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

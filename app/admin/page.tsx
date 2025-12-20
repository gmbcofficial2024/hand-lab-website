import { getMembers, getPublications, getNews, getAlumni } from '@/lib/data';
import { Users, FileText, Newspaper, GraduationCap, TrendingUp, Calendar } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  const [members, publications, news, alumni] = await Promise.all([
    getMembers(),
    getPublications(),
    getNews(),
    getAlumni()
  ]);

  const stats = [
    { label: '현재 멤버', value: members.length, icon: Users, href: '/admin/members', color: 'blue' },
    { label: '졸업생', value: alumni.length, icon: GraduationCap, href: '/admin/alumni', color: 'purple' },
    { label: '논문', value: publications.length, icon: FileText, href: '/admin/publications', color: 'green' },
    { label: '뉴스', value: news.length, icon: Newspaper, href: '/admin/news', color: 'orange' },
  ];

  const recentPublications = publications.slice(0, 5);
  const recentNews = news.slice(0, 5);

  const colorClasses: Record<string, { bg: string; text: string; iconBg: string }> = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', iconBg: 'bg-blue-100' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', iconBg: 'bg-purple-100' },
    green: { bg: 'bg-green-50', text: 'text-green-600', iconBg: 'bg-green-100' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', iconBg: 'bg-orange-100' },
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-600 mt-1">HAND Lab 웹사이트 관리 콘솔</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const colors = colorClasses[stat.color];
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className={`${colors.bg} rounded-xl p-6 hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className={`text-3xl font-bold ${colors.text} mt-1`}>{stat.value}</p>
                </div>
                <div className={`${colors.iconBg} rounded-full p-3`}>
                  <stat.icon className={`w-6 h-6 ${colors.text}`} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Publications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h2 className="font-semibold text-gray-900">최근 논문</h2>
            </div>
            <Link href="/admin/publications" className="text-sm text-blue-600 hover:underline">
              전체 보기
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentPublications.length > 0 ? (
              recentPublications.map((pub) => (
                <div key={pub.id} className="px-6 py-4 hover:bg-gray-50">
                  <p className="font-medium text-gray-900 line-clamp-1">{pub.title}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {pub.journal} ({pub.year}) • IF: {pub.impactFactor}
                  </p>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-gray-500">
                등록된 논문이 없습니다.
              </div>
            )}
          </div>
        </div>

        {/* Recent News */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              <h2 className="font-semibold text-gray-900">최근 뉴스</h2>
            </div>
            <Link href="/admin/news" className="text-sm text-blue-600 hover:underline">
              전체 보기
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentNews.length > 0 ? (
              recentNews.map((item) => (
                <div key={item.id} className="px-6 py-4 hover:bg-gray-50">
                  <p className="font-medium text-gray-900 line-clamp-1">{item.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-gray-500">
                등록된 뉴스가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">빠른 작업</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/members?action=add"
            className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Users className="w-6 h-6 text-blue-600" />
            <span className="text-sm text-gray-700">멤버 추가</span>
          </Link>
          <Link
            href="/admin/publications?action=add"
            className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
          >
            <FileText className="w-6 h-6 text-green-600" />
            <span className="text-sm text-gray-700">논문 추가</span>
          </Link>
          <Link
            href="/admin/news?action=add"
            className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors"
          >
            <Newspaper className="w-6 h-6 text-orange-600" />
            <span className="text-sm text-gray-700">뉴스 작성</span>
          </Link>
          <Link
            href="/admin/alumni?action=add"
            className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
          >
            <GraduationCap className="w-6 h-6 text-purple-600" />
            <span className="text-sm text-gray-700">졸업생 추가</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

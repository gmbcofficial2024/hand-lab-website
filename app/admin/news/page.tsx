'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, Loader2, Search, Calendar } from 'lucide-react';

interface News {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
  thumbnail?: string;
}

const categoryOptions = [
  { value: 'research', label: '연구' },
  { value: 'publication', label: '논문 게재' },
  { value: 'award', label: '수상' },
  { value: 'event', label: '행사' },
  { value: 'general', label: '일반' }
];

export default function NewsAdmin() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'general',
    content: '',
    thumbnail: '/images/news/placeholder.jpg'
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      setNews(data);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingNews ? `/api/news/${editingNews.id}` : '/api/news';
      const method = editingNews ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        await fetchNews();
        closeModal();
      }
    } catch (error) {
      console.error('Failed to save news:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await fetch(`/api/news/${id}`, { method: 'DELETE' });
      await fetchNews();
    } catch (error) {
      console.error('Failed to delete news:', error);
    }
  };

  const openAddModal = () => {
    setEditingNews(null);
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      category: 'general',
      content: '',
      thumbnail: '/images/news/placeholder.jpg'
    });
    setShowModal(true);
  };

  const openEditModal = (item: News) => {
    setEditingNews(item);
    setFormData({
      title: item.title,
      date: item.date,
      category: item.category,
      content: item.content,
      thumbnail: item.thumbnail || '/images/news/placeholder.jpg'
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingNews(null);
  };

  const getCategoryLabel = (value: string) => {
    return categoryOptions.find(c => c.value === value)?.label || value;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      research: 'bg-blue-100 text-blue-700',
      publication: 'bg-green-100 text-green-700',
      award: 'bg-yellow-100 text-yellow-700',
      event: 'bg-purple-100 text-purple-700',
      general: 'bg-gray-100 text-gray-700'
    };
    return colors[category] || colors.general;
  };

  const filteredNews = news.filter(n =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">뉴스 관리</h1>
          <p className="text-gray-600 mt-1">연구실 소식과 공지사항을 관리합니다.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          뉴스 작성
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="제목, 내용으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredNews.map((item) => (
            <div key={item.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColor(item.category)}`}>
                      {getCategoryLabel(item.category)}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {item.date}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.content}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="text-blue-600 hover:text-blue-800 p-2"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {searchTerm ? '검색 결과가 없습니다.' : '등록된 뉴스가 없습니다.'}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {editingNews ? '뉴스 수정' : '새 뉴스 작성'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">날짜</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {categoryOptions.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">썸네일 이미지 경로</label>
                <input
                  type="text"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  placeholder="/images/news/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-orange-400 transition-colors"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {editingNews ? '수정' : '작성'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

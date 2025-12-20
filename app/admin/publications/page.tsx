'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, Loader2, Search, Star } from 'lucide-react';

interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  volume: string;
  issue?: string;
  pages: string;
  year: number;
  impactFactor?: number;
  doi: string;
  category: string;
  featured: boolean;
}

const categoryOptions = ['journal', 'review', 'conference', 'book'];

export default function PublicationsAdmin() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPub, setEditingPub] = useState<Publication | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    journal: '',
    volume: '',
    issue: '',
    pages: '',
    year: new Date().getFullYear(),
    impactFactor: '',
    doi: '',
    category: 'journal',
    featured: false
  });

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const res = await fetch('/api/publications');
      const data = await res.json();
      setPublications(data);
    } catch (error) {
      console.error('Failed to fetch publications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingPub ? `/api/publications/${editingPub.id}` : '/api/publications';
      const method = editingPub ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          authors: formData.authors.split(',').map(a => a.trim()).filter(Boolean),
          impactFactor: formData.impactFactor ? parseFloat(formData.impactFactor) : undefined
        })
      });

      if (res.ok) {
        await fetchPublications();
        closeModal();
      }
    } catch (error) {
      console.error('Failed to save publication:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await fetch(`/api/publications/${id}`, { method: 'DELETE' });
      await fetchPublications();
    } catch (error) {
      console.error('Failed to delete publication:', error);
    }
  };

  const openAddModal = () => {
    setEditingPub(null);
    setFormData({
      title: '',
      authors: '',
      journal: '',
      volume: '',
      issue: '',
      pages: '',
      year: new Date().getFullYear(),
      impactFactor: '',
      doi: '',
      category: 'journal',
      featured: false
    });
    setShowModal(true);
  };

  const openEditModal = (pub: Publication) => {
    setEditingPub(pub);
    setFormData({
      title: pub.title,
      authors: pub.authors.join(', '),
      journal: pub.journal,
      volume: pub.volume,
      issue: pub.issue || '',
      pages: pub.pages,
      year: pub.year,
      impactFactor: pub.impactFactor?.toString() || '',
      doi: pub.doi,
      category: pub.category,
      featured: pub.featured
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPub(null);
  };

  const years = Array.from(new Set(publications.map(p => p.year))).sort((a, b) => b - a);

  const filteredPubs = publications.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.journal.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = filterYear === 'all' || p.year.toString() === filterYear;
    return matchesSearch && matchesYear;
  });

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
          <h1 className="text-3xl font-bold text-gray-900">논문 관리</h1>
          <p className="text-gray-600 mt-1">연구실 논문 목록을 관리합니다.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          논문 추가
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="제목, 저널명으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">전체 연도</option>
            {years.map(year => (
              <option key={year} value={year}>{year}년</option>
            ))}
          </select>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredPubs.map((pub) => (
            <div key={pub.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {pub.featured && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                    <h3 className="font-medium text-gray-900">{pub.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                    {pub.authors.join(', ')}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="font-medium text-blue-600">{pub.journal}</span>
                    <span>{pub.year}</span>
                    {pub.impactFactor && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                        IF: {pub.impactFactor}
                      </span>
                    )}
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full capitalize">
                      {pub.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(pub)}
                    className="text-blue-600 hover:text-blue-800 p-2"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(pub.id)}
                    className="text-red-600 hover:text-red-800 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPubs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {searchTerm || filterYear !== 'all' ? '검색 결과가 없습니다.' : '등록된 논문이 없습니다.'}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {editingPub ? '논문 수정' : '새 논문 추가'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">논문 제목</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">저자 (쉼표로 구분)</label>
                <textarea
                  value={formData.authors}
                  onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                  placeholder="S. Min, J. An, J. Lee, K. Lee*"
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">저널명</label>
                  <input
                    type="text"
                    value={formData.journal}
                    onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
                    placeholder="Nature, Advanced Materials, etc."
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
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Volume</label>
                  <input
                    type="text"
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issue</label>
                  <input
                    type="text"
                    value={formData.issue}
                    onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pages</label>
                  <input
                    type="text"
                    value={formData.pages}
                    onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Impact Factor</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.impactFactor}
                    onChange={(e) => setFormData({ ...formData, impactFactor: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">DOI</label>
                  <input
                    type="text"
                    value={formData.doi}
                    onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                    placeholder="10.1038/xxxxx"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="featured" className="text-sm text-gray-700">주요 논문으로 표시</label>
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
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 transition-colors"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {editingPub ? '수정' : '추가'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

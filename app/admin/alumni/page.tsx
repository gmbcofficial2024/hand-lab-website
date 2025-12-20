'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, Loader2, Search, GraduationCap } from 'lucide-react';

interface Alumni {
  id: string;
  name: string;
  nameEn: string;
  degree: string;
  graduationYear: number;
  thesis?: string;
  currentPosition?: string;
  currentOrganization?: string;
}

const degreeOptions = ['Ph.D.', 'M.S.', 'Postdoc'];

export default function AlumniAdmin() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAlumnus, setEditingAlumnus] = useState<Alumni | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    degree: 'Ph.D.',
    graduationYear: new Date().getFullYear(),
    thesis: '',
    currentPosition: '',
    currentOrganization: ''
  });

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const res = await fetch('/api/alumni');
      const data = await res.json();
      setAlumni(data);
    } catch (error) {
      console.error('Failed to fetch alumni:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingAlumnus ? `/api/alumni/${editingAlumnus.id}` : '/api/alumni';
      const method = editingAlumnus ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        await fetchAlumni();
        closeModal();
      }
    } catch (error) {
      console.error('Failed to save alumnus:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await fetch(`/api/alumni/${id}`, { method: 'DELETE' });
      await fetchAlumni();
    } catch (error) {
      console.error('Failed to delete alumnus:', error);
    }
  };

  const openAddModal = () => {
    setEditingAlumnus(null);
    setFormData({
      name: '',
      nameEn: '',
      degree: 'Ph.D.',
      graduationYear: new Date().getFullYear(),
      thesis: '',
      currentPosition: '',
      currentOrganization: ''
    });
    setShowModal(true);
  };

  const openEditModal = (alumnus: Alumni) => {
    setEditingAlumnus(alumnus);
    setFormData({
      name: alumnus.name,
      nameEn: alumnus.nameEn,
      degree: alumnus.degree,
      graduationYear: alumnus.graduationYear,
      thesis: alumnus.thesis || '',
      currentPosition: alumnus.currentPosition || '',
      currentOrganization: alumnus.currentOrganization || ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAlumnus(null);
  };

  const filteredAlumni = alumni.filter(a =>
    a.name.includes(searchTerm) ||
    a.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.currentOrganization?.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-3xl font-bold text-gray-900">졸업생 관리</h1>
          <p className="text-gray-600 mt-1">연구실 졸업생 정보를 관리합니다.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          졸업생 추가
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="이름, 소속으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">학위</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">졸업년도</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">현재 소속</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAlumni.map((alumnus) => (
                <tr key={alumnus.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{alumnus.name}</div>
                        <div className="text-sm text-gray-500">{alumnus.nameEn}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                      {alumnus.degree}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{alumnus.graduationYear}</td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-gray-900">{alumnus.currentPosition || '-'}</div>
                      <div className="text-sm text-gray-500">{alumnus.currentOrganization || ''}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => openEditModal(alumnus)}
                      className="text-blue-600 hover:text-blue-800 p-2"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(alumnus.id)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAlumni.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {searchTerm ? '검색 결과가 없습니다.' : '등록된 졸업생이 없습니다.'}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {editingAlumnus ? '졸업생 수정' : '새 졸업생 추가'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이름 (한글)</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이름 (영문)</label>
                  <input
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">학위</label>
                  <select
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {degreeOptions.map(deg => (
                      <option key={deg} value={deg}>{deg}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">졸업년도</label>
                  <input
                    type="number"
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">학위 논문 제목</label>
                <input
                  type="text"
                  value={formData.thesis}
                  onChange={(e) => setFormData({ ...formData, thesis: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">현재 직위</label>
                  <input
                    type="text"
                    value={formData.currentPosition}
                    onChange={(e) => setFormData({ ...formData, currentPosition: e.target.value })}
                    placeholder="예: Senior Researcher"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">현재 소속</label>
                  <input
                    type="text"
                    value={formData.currentOrganization}
                    onChange={(e) => setFormData({ ...formData, currentOrganization: e.target.value })}
                    placeholder="예: Samsung Electronics"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
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
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-400 transition-colors"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {editingAlumnus ? '수정' : '추가'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

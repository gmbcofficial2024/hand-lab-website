'use client';

import { useEffect, useState } from 'react';
import { Save, Loader2, Globe, Phone, Mail, MapPin, Building } from 'lucide-react';

interface SiteSettings {
  name: string;
  nameKo: string;
  fullName: string;
  description: string;
  url: string;
  address: string;
  addressKo: string;
  phone: string;
  fax: string;
  email: string;
  department: string;
  departmentKo: string;
}

export default function SettingsAdmin() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setMessage('');

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (res.ok) {
        setMessage('설정이 저장되었습니다.');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      setMessage('저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof SiteSettings, value: string) => {
    if (settings) {
      setSettings({ ...settings, [field]: value });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="text-center py-12 text-gray-500">
        설정을 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">사이트 설정</h1>
        <p className="text-gray-600 mt-1">웹사이트 기본 정보를 관리합니다.</p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${message.includes('실패') || message.includes('오류') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">기본 정보</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">연구실 이름 (영문)</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">연구실 이름 (한글)</label>
              <input
                type="text"
                value={settings.nameKo}
                onChange={(e) => updateField('nameKo', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">연구실 전체 이름</label>
              <input
                type="text"
                value={settings.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
              <textarea
                value={settings.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">웹사이트 URL</label>
              <input
                type="url"
                value={settings.url}
                onChange={(e) => updateField('url', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Department Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Building className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">소속 정보</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">학과명 (영문)</label>
              <input
                type="text"
                value={settings.department}
                onChange={(e) => updateField('department', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">학과명 (한글)</label>
              <input
                type="text"
                value={settings.departmentKo}
                onChange={(e) => updateField('departmentKo', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Phone className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">연락처 정보</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> 이메일</span>
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> 전화번호</span>
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">팩스</label>
              <input
                type="text"
                value={settings.fax}
                onChange={(e) => updateField('fax', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-semibold text-gray-900">주소 정보</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">주소 (영문)</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => updateField('address', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">주소 (한글)</label>
              <input
                type="text"
                value={settings.addressKo}
                onChange={(e) => updateField('addressKo', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            설정 저장
          </button>
        </div>
      </form>
    </div>
  );
}

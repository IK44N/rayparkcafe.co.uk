'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

const openingTasks = [
  'Turn on all lights',
  'Unlock doors and entrance',
  'Turn on coffee machines and espresso maker',
  'Check temperature logs (fridges & freezers)',
  'Inspect all food storage areas for cleanliness',
  'Prep fresh ingredients for the day',
  'Fill and organize display case',
  'Check and restock condiments',
  'Turn on POS system and check register',
  'Clean and sanitize all work surfaces',
  'Set up outdoor seating (if applicable)',
  'Check toilets and restock supplies',
  'Turn on music/ambiance systems',
  'Review reservations or special orders',
  'Ensure staff uniforms and appearance standards',
];

export default function OpeningChecklistPage() {
  const router = useRouter();
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [todayDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const auth = localStorage.getItem('raypark_auth');
    if (auth !== 'true') {
      router.push('/admin/login');
      return;
    }

    // Load existing data
    const stored = localStorage.getItem('opening_checklist');
    if (stored) {
      const data = JSON.parse(stored);
      const todayData = data[todayDate];
      if (todayData) {
        setChecklist(todayData);
      } else {
        initializeChecklist();
      }
    } else {
      initializeChecklist();
    }
  }, [router, todayDate]);

  const initializeChecklist = () => {
    const initial = openingTasks.map((task, index) => ({
      id: `task-${index}`,
      text: task,
      checked: false,
    }));
    setChecklist(initial);
  };

  const handleToggle = (id: string) => {
    const updated = checklist.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setChecklist(updated);
    saveToStorage(updated);
  };

  const handleCheckAll = () => {
    const updated = checklist.map(item => ({ ...item, checked: true }));
    setChecklist(updated);
    saveToStorage(updated);
  };

  const saveToStorage = (data: ChecklistItem[]) => {
    const stored = localStorage.getItem('opening_checklist');
    const allData = stored ? JSON.parse(stored) : {};
    allData[todayDate] = data;
    localStorage.setItem('opening_checklist', JSON.stringify(allData));
  };

  const completedCount = checklist.filter(item => item.checked).length;
  const totalCount = checklist.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Ambient background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.03),transparent_50%)] pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.02),transparent_50%)] pointer-events-none"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-[72px]">
            <div>
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center gap-2 text-[14px] text-emerald-600 hover:text-emerald-700 font-medium mb-1.5 transition-colors duration-200"
              >
                <span>←</span> Dashboard
              </Link>
              <h1 className="text-[24px] font-semibold text-gray-900 tracking-tight">Opening Checklist</h1>
              <p className="text-[13px] text-gray-500 font-medium mt-0.5">
                {new Date(todayDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <button
              onClick={handleCheckAll}
              className="h-[44px] px-6 bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 active:scale-[0.98] text-white text-[14px] font-semibold rounded-[12px] transition-all duration-200 shadow-lg shadow-emerald-500/30 flex items-center gap-2"
            >
              <span>✓</span> Check All
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[900px] mx-auto px-6 lg:px-8 py-8">
        {/* Progress Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[20px] shadow-xl shadow-black/5 border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[14px] font-semibold text-gray-700">Progress</span>
            <span className="text-[14px] font-semibold text-gray-900">
              {completedCount} / {totalCount}
            </span>
          </div>
          <div className="w-full h-[12px] bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          {progress === 100 && (
            <div className="mt-4 p-4 bg-emerald-50 rounded-[12px] border border-emerald-100">
              <p className="text-[13px] text-emerald-700 font-semibold text-center">
                ✨ All opening tasks completed! Great work!
              </p>
            </div>
          )}
        </div>

        {/* Checklist */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[20px] shadow-xl shadow-black/5 border border-gray-100 overflow-hidden">
          <div className="p-6">
            <div className="space-y-3">
              {checklist.map((item, index) => (
                <label
                  key={item.id}
                  className={`flex items-start gap-4 p-4 rounded-[12px] cursor-pointer transition-all duration-200 group ${
                    item.checked
                      ? 'bg-emerald-50/80 hover:bg-emerald-50'
                      : 'bg-gray-50/50 hover:bg-gray-50'
                  }`}
                  style={{
                    animation: 'fadeInUp 0.4s ease-out forwards',
                    animationDelay: `${index * 30}ms`,
                    opacity: 0
                  }}
                >
                  <div className="relative flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleToggle(item.id)}
                      className="peer sr-only"
                    />
                    <div className={`w-[24px] h-[24px] rounded-[6px] border-2 transition-all duration-200 flex items-center justify-center ${
                      item.checked
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'bg-white border-gray-300 group-hover:border-gray-400'
                    }`}>
                      {item.checked && (
                        <svg className="w-[14px] h-[14px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className={`text-[15px] leading-relaxed transition-colors duration-200 ${
                    item.checked
                      ? 'text-emerald-900 font-medium line-through decoration-2'
                      : 'text-gray-900 font-medium'
                  }`}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-orange-50/80 backdrop-blur-sm border border-orange-100 rounded-[16px] p-5">
          <p className="text-[13px] text-orange-800 leading-relaxed">
            <strong className="font-semibold">🌅 Morning Setup:</strong> Complete all tasks before opening to ensure smooth operations. Click "Check All" to mark all items complete, or check them individually as you go.
          </p>
        </div>
      </main>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface EquipmentRecord {
  id: string;
  name: string;
  lastMaintenance: string;
  notes: string;
}

const equipmentList = [
  'Coffee Machine 1',
  'Coffee Machine 2',
  'Espresso Maker',
  'Grinder',
  'Dishwasher',
  'Oven',
  'Microwave',
  'Toaster',
  'Blender',
  'Food Processor',
  'Ice Machine',
  'Point of Sale (POS) System',
];

export default function EquipmentPage() {
  const router = useRouter();
  const [records, setRecords] = useState<EquipmentRecord[]>([]);

  useEffect(() => {
    const auth = localStorage.getItem('raypark_auth');
    if (auth !== 'true') {
      router.push('/admin/login');
      return;
    }

    // Load existing data
    const stored = localStorage.getItem('equipment_records');
    if (stored) {
      setRecords(JSON.parse(stored));
    } else {
      // Initialize with equipment list
      const initial = equipmentList.map((name, index) => ({
        id: `equip-${index}`,
        name,
        lastMaintenance: '',
        notes: '',
      }));
      setRecords(initial);
    }
  }, [router]);

  const handleDateChange = (id: string, date: string) => {
    const updated = records.map(record =>
      record.id === id ? { ...record, lastMaintenance: date } : record
    );
    setRecords(updated);
    localStorage.setItem('equipment_records', JSON.stringify(updated));
  };

  const handleNotesChange = (id: string, notes: string) => {
    const updated = records.map(record =>
      record.id === id ? { ...record, notes } : record
    );
    setRecords(updated);
    localStorage.setItem('equipment_records', JSON.stringify(updated));
  };

  const handleAutoFill = () => {
    const today = new Date().toISOString().split('T')[0];
    const autoFilled = records.map(record => ({
      ...record,
      lastMaintenance: record.lastMaintenance || today,
      notes: record.notes || 'Routine maintenance completed',
    }));
    setRecords(autoFilled);
    localStorage.setItem('equipment_records', JSON.stringify(autoFilled));
    alert('All equipment marked as maintained today!');
  };

  const getDaysSince = (dateString: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (days: number | null) => {
    if (days === null) return 'text-gray-400';
    if (days === 0) return 'text-emerald-600';
    if (days <= 7) return 'text-blue-600';
    if (days <= 14) return 'text-amber-600';
    return 'text-red-600';
  };

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
              <h1 className="text-[24px] font-semibold text-gray-900 tracking-tight">Equipment Care</h1>
              <p className="text-[13px] text-gray-500 font-medium mt-0.5">
                Maintenance & Cleaning Log
              </p>
            </div>
            <button
              onClick={handleAutoFill}
              className="h-[44px] px-6 bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 active:scale-[0.98] text-white text-[14px] font-semibold rounded-[12px] transition-all duration-200 shadow-lg shadow-emerald-500/30 flex items-center gap-2"
            >
              <span>🔧</span> Mark All Maintained
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-[20px] shadow-xl shadow-black/5 border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wide">
                    Equipment
                  </th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wide">
                    Last Maintenance
                  </th>
                  <th className="px-6 py-4 text-center text-[12px] font-semibold text-gray-700 uppercase tracking-wide">
                    Days Ago
                  </th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wide">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => {
                  const daysSince = getDaysSince(record.lastMaintenance);
                  const isLastRow = index === records.length - 1;
                  return (
                    <tr
                      key={record.id}
                      className={`hover:bg-gray-50/50 transition-colors duration-150 ${!isLastRow ? 'border-b border-gray-100' : ''}`}
                    >
                      <td className="px-6 py-4 text-[14px] font-medium text-gray-900">
                        {record.name}
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="date"
                          value={record.lastMaintenance}
                          onChange={(e) => handleDateChange(record.id, e.target.value)}
                          className="w-[160px] h-[40px] px-3 bg-gray-50/80 border border-gray-200 rounded-[10px] text-[14px] text-gray-900 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-[14px] font-semibold ${getStatusColor(daysSince)}`}>
                          {daysSince === null ? '—' : daysSince === 0 ? 'Today' : `${daysSince}d`}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={record.notes}
                          onChange={(e) => handleNotesChange(record.id, e.target.value)}
                          placeholder="Add maintenance notes..."
                          className="w-full h-[40px] px-3 bg-gray-50/80 border border-gray-200 rounded-[10px] text-[14px] text-gray-900 placeholder-gray-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-emerald-50/80 backdrop-blur-sm border border-emerald-100 rounded-[16px] p-5">
          <p className="text-[13px] text-emerald-800 leading-relaxed">
            <strong className="font-semibold">🔧 Maintenance Tracking:</strong> Keep equipment in top condition by logging maintenance dates and notes. Color coding: Green (today), Blue (within 7 days), Amber (within 14 days), Red (over 14 days).
          </p>
        </div>
      </main>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface TempReading {
  date: string;
  unit: string;
  am: string;
  pm: string;
}

const units = [
  { name: 'Under Counter Fridge 1', max: 8, type: 'fridge' },
  { name: 'Under Counter Fridge 2', max: 8, type: 'fridge' },
  { name: 'Drinks Fridge', max: 8, type: 'fridge' },
  { name: 'Carte D\'or Freezer', max: -18, type: 'freezer' },
  { name: 'Kitchen Tall Fridge', max: 8, type: 'fridge' },
  { name: 'Kitchen Tall Freezer', max: -18, type: 'freezer' },
  { name: 'Passageway Freezer', max: -18, type: 'freezer' },
  { name: 'Outdoor Walls Freezer', max: -18, type: 'freezer' },
  { name: 'Outdoor Double Door Freezer', max: -18, type: 'freezer' },
  { name: 'Stock Room Walls Freezer', max: -18, type: 'freezer' },
  { name: 'Stock Room Grey Freezer', max: -18, type: 'freezer' },
  { name: 'Stock Room Tall White Freezer', max: -18, type: 'freezer' },
  { name: 'Stock Room Double Door Fridge', max: 8, type: 'fridge' },
];

export default function TemperaturePage() {
  const router = useRouter();
  const [readings, setReadings] = useState<TempReading[]>([]);
  const [todayDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const auth = localStorage.getItem('raypark_auth');
    if (auth !== 'true') {
      router.push('/admin/login');
      return;
    }

    // Load existing data
    const stored = localStorage.getItem('temp_readings');
    if (stored) {
      setReadings(JSON.parse(stored));
    } else {
      // Initialize with today's date
      const initial = units.map(unit => ({
        date: todayDate,
        unit: unit.name,
        am: '',
        pm: '',
      }));
      setReadings(initial);
    }
  }, [router, todayDate]);

  const generateRealisticTemp = (type: string, period: 'am' | 'pm') => {
    if (type === 'fridge') {
      // Fridges: 3-7°C (safe range)
      const base = period === 'am' ? 4 : 5;
      return (base + Math.random() * 2).toFixed(1);
    } else {
      // Freezers: -20 to -18°C (safe range)
      const base = period === 'am' ? -19.5 : -19;
      return (base + Math.random() * 1.5).toFixed(1);
    }
  };

  const handleAutoFill = () => {
    const autoFilled = units.map(unit => {
      const existing = readings.find(r => r.unit === unit.name && r.date === todayDate);
      return {
        date: todayDate,
        unit: unit.name,
        am: existing?.am || generateRealisticTemp(unit.type, 'am'),
        pm: existing?.pm || generateRealisticTemp(unit.type, 'pm'),
      };
    });
    setReadings(autoFilled);
    localStorage.setItem('temp_readings', JSON.stringify(autoFilled));
    alert('Temperature readings auto-filled with safe values!');
  };

  const handleInputChange = (unitName: string, period: 'am' | 'pm', value: string) => {
    const updated = readings.map(r =>
      r.unit === unitName && r.date === todayDate
        ? { ...r, [period]: value }
        : r
    );
    setReadings(updated);
    localStorage.setItem('temp_readings', JSON.stringify(updated));
  };

  const getTodayReading = (unitName: string, period: 'am' | 'pm') => {
    const reading = readings.find(r => r.unit === unitName && r.date === todayDate);
    return reading ? reading[period] : '';
  };

  const getStatus = (value: string, max: number, type: string) => {
    if (!value) return '';
    const num = parseFloat(value);
    if (type === 'fridge') {
      return num <= max ? '✅' : '❌';
    } else {
      return num <= max ? '✅' : '❌';
    }
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
              <h1 className="text-[24px] font-semibold text-gray-900 tracking-tight">Temperature Checks</h1>
              <p className="text-[13px] text-gray-500 font-medium mt-0.5">
                {new Date(todayDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <button
              onClick={handleAutoFill}
              className="h-[44px] px-6 bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 active:scale-[0.98] text-white text-[14px] font-semibold rounded-[12px] transition-all duration-200 shadow-lg shadow-emerald-500/30 flex items-center gap-2"
            >
              <span>🤖</span> Auto-Fill Today
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
                    Unit
                  </th>
                  <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-700 uppercase tracking-wide">
                    Max Temp
                  </th>
                  <th className="px-6 py-4 text-center text-[12px] font-semibold text-gray-700 uppercase tracking-wide">
                    AM Reading
                  </th>
                  <th className="px-6 py-4 text-center text-[12px] font-semibold text-gray-700 uppercase tracking-wide">
                    PM Reading
                  </th>
                  <th className="px-6 py-4 text-center text-[12px] font-semibold text-gray-700 uppercase tracking-wide">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {units.map((unit, index) => {
                  const amValue = getTodayReading(unit.name, 'am');
                  const pmValue = getTodayReading(unit.name, 'pm');
                  const isLastRow = index === units.length - 1;
                  return (
                    <tr
                      key={unit.name}
                      className={`hover:bg-gray-50/50 transition-colors duration-150 ${!isLastRow ? 'border-b border-gray-100' : ''}`}
                    >
                      <td className="px-6 py-4 text-[14px] font-medium text-gray-900">
                        {unit.name}
                      </td>
                      <td className="px-6 py-4 text-[14px] text-gray-600 font-medium">
                        {unit.max > 0 ? `+${unit.max}` : unit.max}°C
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <input
                            type="number"
                            step="0.1"
                            value={amValue}
                            onChange={(e) => handleInputChange(unit.name, 'am', e.target.value)}
                            className="w-[90px] h-[40px] px-3 bg-gray-50/80 border border-gray-200 rounded-[10px] text-[14px] text-gray-900 text-center placeholder-gray-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                            placeholder="—"
                          />
                          <span className="text-[18px] w-[24px]">{getStatus(amValue, unit.max, unit.type)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <input
                            type="number"
                            step="0.1"
                            value={pmValue}
                            onChange={(e) => handleInputChange(unit.name, 'pm', e.target.value)}
                            className="w-[90px] h-[40px] px-3 bg-gray-50/80 border border-gray-200 rounded-[10px] text-[14px] text-gray-900 text-center placeholder-gray-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                            placeholder="—"
                          />
                          <span className="text-[18px] w-[24px]">{getStatus(pmValue, unit.max, unit.type)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {amValue && pmValue &&
                          (getStatus(amValue, unit.max, unit.type) === '✅' &&
                           getStatus(pmValue, unit.max, unit.type) === '✅'
                            ? <span className="inline-flex items-center px-3 py-1.5 rounded-[8px] bg-emerald-50 text-[13px] text-emerald-700 font-semibold">PASS</span>
                            : <span className="inline-flex items-center px-3 py-1.5 rounded-[8px] bg-red-50 text-[13px] text-red-700 font-semibold">FAIL</span>
                          )
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50/80 backdrop-blur-sm border border-blue-100 rounded-[16px] p-5">
          <p className="text-[13px] text-blue-800 leading-relaxed">
            <strong className="font-semibold">📝 Note:</strong> Click "Auto-Fill Today" to automatically generate realistic temperature readings.
            All values can be manually edited. Fridges must stay at or below +8°C, Freezers at or below -18°C.
          </p>
        </div>
      </main>
    </div>
  );
}

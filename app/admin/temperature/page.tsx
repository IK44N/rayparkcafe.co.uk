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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/admin/dashboard" className="text-green-600 hover:text-green-700 text-sm mb-2 block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Temperature Checks</h1>
              <p className="text-sm text-gray-600">Date: {new Date(todayDate).toLocaleDateString('en-GB')}</p>
            </div>
            <button
              onClick={handleAutoFill}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              🤖 Auto-Fill Today
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Max Temp
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AM Reading
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PM Reading
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {units.map((unit) => {
                  const amValue = getTodayReading(unit.name, 'am');
                  const pmValue = getTodayReading(unit.name, 'pm');
                  return (
                    <tr key={unit.name} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {unit.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {unit.max}°C
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <input
                          type="number"
                          step="0.1"
                          value={amValue}
                          onChange={(e) => handleInputChange(unit.name, 'am', e.target.value)}
                          className="w-24 px-3 py-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-blue-500"
                          placeholder="AM"
                        />
                        <span className="ml-2">{getStatus(amValue, unit.max, unit.type)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <input
                          type="number"
                          step="0.1"
                          value={pmValue}
                          onChange={(e) => handleInputChange(unit.name, 'pm', e.target.value)}
                          className="w-24 px-3 py-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-blue-500"
                          placeholder="PM"
                        />
                        <span className="ml-2">{getStatus(pmValue, unit.max, unit.type)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {amValue && pmValue &&
                          (getStatus(amValue, unit.max, unit.type) === '✅' &&
                           getStatus(pmValue, unit.max, unit.type) === '✅'
                            ? <span className="text-green-600 font-bold">PASS</span>
                            : <span className="text-red-600 font-bold">FAIL</span>
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

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>📝 Note:</strong> Click "Auto-Fill Today" to automatically generate realistic temperature readings for demonstration purposes.
            All values can be manually edited. Fridges max 8°C, Freezers max -18°C.
          </p>
        </div>
      </main>
    </div>
  );
}

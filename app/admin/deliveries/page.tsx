'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface DeliveryRecord {
  id: string;
  date: string;
  supplier: string;
  items: string;
  temperature: string;
  condition: string;
}

export default function DeliveriesPage() {
  const router = useRouter();
  const [records, setRecords] = useState<DeliveryRecord[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('raypark_auth');
    if (auth !== 'true') {
      router.push('/admin/login');
      return;
    }

    // Load existing data
    const stored = localStorage.getItem('delivery_records');
    if (stored) {
      setRecords(JSON.parse(stored));
    }
  }, [router]);

  const handleAddRecord = () => {
    const newRecord: DeliveryRecord = {
      id: `delivery-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      supplier: '',
      items: '',
      temperature: '',
      condition: 'Good',
    };
    const updated = [newRecord, ...records];
    setRecords(updated);
    localStorage.setItem('delivery_records', JSON.stringify(updated));
    setShowAddForm(true);
  };

  const handleDeleteRecord = (id: string) => {
    if (confirm('Delete this delivery record?')) {
      const updated = records.filter(r => r.id !== id);
      setRecords(updated);
      localStorage.setItem('delivery_records', JSON.stringify(updated));
    }
  };

  const handleFieldChange = (id: string, field: keyof DeliveryRecord, value: string) => {
    const updated = records.map(record =>
      record.id === id ? { ...record, [field]: value } : record
    );
    setRecords(updated);
    localStorage.setItem('delivery_records', JSON.stringify(updated));
  };

  const handleAutoFill = () => {
    const today = new Date().toISOString().split('T')[0];
    const suppliers = ['Fresh Foods Ltd', 'Dairy Delights', 'Coffee Beans Co', 'Bakery Supplies'];
    const items = ['Fresh milk, eggs, butter', 'Coffee beans, tea', 'Bread, pastries', 'Vegetables, fruits'];

    const newRecords = Array.from({ length: 3 }, (_, i) => ({
      id: `delivery-${Date.now()}-${i}`,
      date: today,
      supplier: suppliers[i % suppliers.length],
      items: items[i % items.length],
      temperature: (Math.random() * 2 + 3).toFixed(1),
      condition: 'Good',
    }));

    const updated = [...newRecords, ...records];
    setRecords(updated);
    localStorage.setItem('delivery_records', JSON.stringify(updated));
    alert('Sample delivery records added!');
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'good':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'acceptable':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-100';
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
              <h1 className="text-[24px] font-semibold text-gray-900 tracking-tight">Delivery Records</h1>
              <p className="text-[13px] text-gray-500 font-medium mt-0.5">
                Incoming Shipment Tracking
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAutoFill}
                className="h-[44px] px-5 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 text-[14px] font-semibold rounded-[12px] transition-all duration-200 border border-gray-200 active:scale-[0.98]"
              >
                🤖 Add Samples
              </button>
              <button
                onClick={handleAddRecord}
                className="h-[44px] px-6 bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 active:scale-[0.98] text-white text-[14px] font-semibold rounded-[12px] transition-all duration-200 shadow-lg shadow-emerald-500/30 flex items-center gap-2"
              >
                <span>+</span> New Record
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">
        {records.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-[20px] shadow-xl shadow-black/5 border border-gray-100 p-12 text-center">
            <div className="text-[48px] mb-4">📦</div>
            <h3 className="text-[18px] font-semibold text-gray-900 mb-2">No delivery records yet</h3>
            <p className="text-[14px] text-gray-500 mb-6">Start tracking incoming shipments by adding your first record</p>
            <button
              onClick={handleAddRecord}
              className="inline-flex items-center gap-2 h-[44px] px-6 bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 active:scale-[0.98] text-white text-[14px] font-semibold rounded-[12px] transition-all duration-200 shadow-lg shadow-emerald-500/30"
            >
              <span>+</span> Add First Record
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {records.map((record, index) => (
              <div
                key={record.id}
                className="bg-white/80 backdrop-blur-xl rounded-[20px] shadow-lg shadow-black/5 border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-200"
                style={{
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  animationDelay: `${index * 50}ms`,
                  opacity: 0
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={record.date}
                      onChange={(e) => handleFieldChange(record.id, 'date', e.target.value)}
                      className="w-full h-[40px] px-3 bg-gray-50/80 border border-gray-200 rounded-[10px] text-[14px] text-gray-900 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Supplier
                    </label>
                    <input
                      type="text"
                      value={record.supplier}
                      onChange={(e) => handleFieldChange(record.id, 'supplier', e.target.value)}
                      placeholder="Supplier name"
                      className="w-full h-[40px] px-3 bg-gray-50/80 border border-gray-200 rounded-[10px] text-[14px] text-gray-900 placeholder-gray-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Items Delivered
                    </label>
                    <input
                      type="text"
                      value={record.items}
                      onChange={(e) => handleFieldChange(record.id, 'items', e.target.value)}
                      placeholder="List of items"
                      className="w-full h-[40px] px-3 bg-gray-50/80 border border-gray-200 rounded-[10px] text-[14px] text-gray-900 placeholder-gray-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Temp (°C)
                    </label>
                    <input
                      type="text"
                      value={record.temperature}
                      onChange={(e) => handleFieldChange(record.id, 'temperature', e.target.value)}
                      placeholder="5.0"
                      className="w-full h-[40px] px-3 bg-gray-50/80 border border-gray-200 rounded-[10px] text-[14px] text-gray-900 placeholder-gray-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                    />
                  </div>

                  <div className="flex items-end gap-3">
                    <div className="flex-1">
                      <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Condition
                      </label>
                      <select
                        value={record.condition}
                        onChange={(e) => handleFieldChange(record.id, 'condition', e.target.value)}
                        className={`w-full h-[40px] px-3 border rounded-[10px] text-[14px] font-medium focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all ${getConditionColor(record.condition)}`}
                      >
                        <option value="Good">Good</option>
                        <option value="Acceptable">Acceptable</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                    <button
                      onClick={() => handleDeleteRecord(record.id)}
                      className="h-[40px] w-[40px] flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 rounded-[10px] transition-all duration-200 border border-red-100"
                      title="Delete record"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Card */}
        <div className="mt-6 bg-pink-50/80 backdrop-blur-sm border border-pink-100 rounded-[16px] p-5">
          <p className="text-[13px] text-pink-800 leading-relaxed">
            <strong className="font-semibold">📦 Delivery Tracking:</strong> Record all incoming shipments with delivery dates, supplier info, items received, and temperature readings. Mark condition as Good, Acceptable, or Rejected based on quality inspection.
          </p>
        </div>
      </main>
    </div>
  );
}

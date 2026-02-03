'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('raypark_auth');
    if (auth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('raypark_auth');
    router.push('/admin/login');
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"></div>;
  }

  const menuItems = [
    {
      title: 'Temperature Checks',
      description: 'Daily fridge & freezer monitoring',
      href: '/admin/temperature',
      icon: '🌡️',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Opening Checklist',
      description: 'Morning preparation tasks',
      href: '/admin/opening-checklist',
      icon: '🌅',
      gradient: 'from-orange-500 to-amber-500',
    },
    {
      title: 'Closing Checklist',
      description: 'Evening shutdown procedures',
      href: '/admin/closing-checklist',
      icon: '🌙',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      title: 'Equipment Care',
      description: 'Maintenance & cleaning log',
      href: '/admin/equipment',
      icon: '🔧',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Delivery Records',
      description: 'Incoming shipment tracking',
      href: '/admin/deliveries',
      icon: '📦',
      gradient: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Ambient background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.03),transparent_50%)] pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.02),transparent_50%)] pointer-events-none"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-[72px]">
            <div className="flex items-center gap-4">
              <div className="w-[48px] h-[48px] bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[16px] flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <span className="text-[28px]">☕</span>
              </div>
              <div>
                <h1 className="text-[20px] font-semibold text-gray-900 tracking-tight">
                  Ray Park Café
                </h1>
                <p className="text-[13px] text-gray-500 font-medium">Compliance Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="h-[40px] px-5 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-700 rounded-[10px] transition-all duration-200 text-[14px] font-semibold hover:shadow-md active:scale-[0.98] border border-gray-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10">
        {/* Stats Bar */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[20px] shadow-xl shadow-black/5 border border-gray-100 p-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center transform hover:scale-105 transition-transform duration-200">
              <div className="text-[28px] font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1.5">
                {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
              </div>
              <div className="text-[13px] text-gray-500 font-medium">Today</div>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-200">
              <div className="text-[28px] font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1.5">
                {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="text-[13px] text-gray-500 font-medium">Current Time</div>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-200">
              <div className="text-[28px] font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1.5">
                5
              </div>
              <div className="text-[13px] text-gray-500 font-medium">Active Logs</div>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-200">
              <div className="text-[28px] mb-1.5">✨</div>
              <div className="text-[13px] text-gray-500 font-medium">All Systems OK</div>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {menuItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative bg-white rounded-[20px] shadow-lg shadow-black/5 border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1 hover:border-gray-200 active:scale-[0.98]"
              style={{
                animation: 'fadeInUp 0.5s ease-out forwards',
                animationDelay: `${index * 80}ms`,
                opacity: 0
              }}
            >
              <div className="relative p-7 h-full">
                <div className={`w-[56px] h-[56px] bg-gradient-to-br ${item.gradient} rounded-[16px] flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-[28px]">{item.icon}</span>
                </div>
                <h2 className="text-[18px] font-semibold text-gray-900 mb-2 tracking-tight">
                  {item.title}
                </h2>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  {item.description}
                </p>
                <div className="absolute bottom-6 right-6 text-[20px] text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-300">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="glass-header sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">☕</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Ray Park Café
                </h1>
                <p className="text-sm text-gray-500 font-medium">Compliance Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-300 text-sm font-semibold hover:shadow-lg active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats Bar */}
        <div className="glass-card rounded-3xl p-8 mb-12 backdrop-blur-xl bg-gradient-to-br from-white/80 to-white/60 border border-white/20 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">
                {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
              </div>
              <div className="text-sm text-gray-500 font-medium">Today</div>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="text-sm text-gray-500 font-medium">Current Time</div>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                5
              </div>
              <div className="text-sm text-gray-500 font-medium">Active Logs</div>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl mb-1">✨</div>
              <div className="text-sm text-gray-500 font-medium">All Systems OK</div>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="group modern-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative p-8 h-full">
                <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                  {item.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
                <div className="absolute bottom-6 right-6 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-300">
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

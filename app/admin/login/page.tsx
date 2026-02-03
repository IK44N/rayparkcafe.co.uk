'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === 'bossman' && password === 'raygreen') {
      localStorage.setItem('raypark_auth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden admin-bg">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
            <span className="text-4xl">☕</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Ray Park Café
          </h1>
          <p className="text-gray-500 font-medium">Employee Portal</p>
        </div>

        {/* Login Card */}
        <div className="glass-card p-8 rounded-3xl shadow-2xl backdrop-blur-xl animate-slide-up">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="modern-input w-full px-5 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="modern-input w-full px-5 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-700 px-5 py-4 rounded-2xl text-sm font-medium animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          Secure access for authorized employees only
        </p>
      </div>
    </div>
  );
}

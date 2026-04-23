'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type AuthTab = 'login' | 'register';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger entrance animation on first paint
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: replace with real auth API call when contract is available
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-hidden">
      {/* Left Side: Brand Imagery — slides in from the left */}
      <div
        className={`hidden md:flex md:w-1/2 relative bg-[#eae8e4] overflow-hidden
          transition-transform duration-800 ease-out
          ${mounted ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFqxZ3BFGZc8EPc-fbG5caEnAa3qljujTK1NvZ8fVMpdGioRELJ3APa3ipcx0t7GhXwSt24no4OMmrsD-500AmNlG7GeDP88vjplsv5Bl-H1vnaedF0fWoW2yAgyeN4BALkotFBswa_0TmcrkE1pz9kGxIjv0FpSPtbuN8hqFJh2LYviaTmODBvxSp087VmPb5ZTaW8qI9xB-gcLt_7b_31lY26ZqB06ZS9fsXIFJYWG32yC7iqyeec2mzA1o5sTrhvRN7I1RsCOc"
          alt="Ginseng root on dark marble with moody lighting"
          fill
          className="object-cover opacity-90 mix-blend-multiply contrast-125 saturate-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12 bg-black/30 backdrop-blur-[2px]">
          <h2 className="font-headline text-5xl md:text-6xl tracking-tighter text-white mb-6 drop-shadow-lg">
            Di Sản
            <br />
            Tinh Túy
          </h2>
          <p className="font-body text-[#f2f0ed] text-lg max-w-md font-light tracking-wide leading-relaxed">
            Khám phá quyền năng bồi bổ sức khỏe từ những củ sâm quý hiếm nhất, được gìn giữ qua
            nhiều thế hệ.
          </p>
        </div>
      </div>

      {/* Right Side: Auth Interface — slides in from the right */}
      <div
        className={`w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-24 bg-[#fbf9f5] py-12 md:py-0 relative z-10
          transition-transform duration-700 ease-out
          ${mounted ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="w-full max-w-md bg-white ambient-shadow rounded-xl p-8 md:p-10 border border-[#dfbfbc]/10">
          {/* Header / Tabs */}
          <div className="mb-10 text-center">
            <h1 className="font-headline text-3xl text-[#1b1c1a] mb-2 tracking-tight">
              Chào mừng trở lại
            </h1>
            <p className="font-body text-[#58413f] text-sm mb-8">
              Đăng nhập để tiếp tục hành trình chăm sóc sức khỏe
            </p>
            {/* Tab Navigation */}
            <div className="flex border-b border-[#dfbfbc]/30 relative">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className={`flex-1 font-body pb-2 transition-colors ${
                  activeTab === 'login'
                    ? 'font-semibold text-[#570005]'
                    : 'font-medium text-[#58413f] hover:text-[#570005]'
                }`}
              >
                Đăng nhập
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                className={`flex-1 font-body pb-2 transition-colors ${
                  activeTab === 'register'
                    ? 'font-semibold text-[#570005]'
                    : 'font-medium text-[#58413f] hover:text-[#570005]'
                }`}
              >
                Đăng ký
              </button>
              {/* Sliding active tab indicator */}
              <div
                className={`absolute -bottom-[1px] h-[2px] w-1/2 bg-[#570005] transition-transform duration-300 ${
                  activeTab === 'register' ? 'translate-x-full' : 'translate-x-0'
                }`}
              />
            </div>
          </div>

          {/* Sign-in Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email / Phone Input */}
            <div className="relative">
              <label
                className="block font-body text-xs text-[#58413f] mb-1 uppercase tracking-wider"
                htmlFor="email"
              >
                Email hoặc Số điện thoại
              </label>
              <input
                className="ghost-input w-full font-body text-[#1b1c1a] placeholder:text-[#58413f]/40 py-2"
                id="email"
                name="email"
                placeholder="Nhập email hoặc SĐT"
                type="text"
                autoComplete="username"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label
                className="block font-body text-xs text-[#58413f] mb-1 uppercase tracking-wider"
                htmlFor="password"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  className="ghost-input w-full font-body text-[#1b1c1a] placeholder:text-[#58413f]/40 py-2 pr-10"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#58413f] hover:text-[#570005] transition-colors"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>

            {/* Options Row */}
            <div className="flex justify-between items-center pt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center w-4 h-4 border border-[#dfbfbc]/40 rounded-[2px] group-hover:border-[#735b2b] transition-colors">
                  <input
                    className="sr-only peer"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="material-symbols-outlined text-[12px] text-[#735b2b] opacity-0 peer-checked:opacity-100 transition-opacity">
                    check
                  </span>
                </div>
                <span className="font-body text-sm text-[#58413f] group-hover:text-[#1b1c1a] transition-colors">
                  Ghi nhớ đăng nhập
                </span>
              </label>
              <Link
                className="font-body text-sm text-[#735b2b] hover:text-[#570005] transition-colors"
                href="#"
              >
                Quên mật khẩu?
              </Link>
            </div>

            {/* Submit Action */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full btn-primary text-white font-body font-semibold py-4 rounded-full hover:opacity-90 transition-opacity ambient-shadow flex justify-center items-center gap-2"
              >
                Đăng nhập
                <span className="material-symbols-outlined text-[20px]">arrow_right_alt</span>
              </button>
            </div>

            {/* Social / Alternative Sign-in */}
            <div className="mt-8 text-center">
              <p className="font-body text-xs text-[#58413f] mb-4 uppercase tracking-widest relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-[30%] before:h-[1px] before:bg-[#dfbfbc]/30 after:content-[''] after:absolute after:right-0 after:top-1/2 after:w-[30%] after:h-[1px] after:bg-[#dfbfbc]/30">
                Hoặc tiếp tục với
              </p>
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  className="w-12 h-12 rounded-full border border-[#dfbfbc]/40 flex items-center justify-center hover:border-[#735b2b] hover:bg-[#f5f3ef] transition-all"
                  aria-label="Đăng nhập với Google"
                >
                  <span className="font-headline font-bold text-[#1b1c1a]">G</span>
                </button>
                <button
                  type="button"
                  className="w-12 h-12 rounded-full border border-[#dfbfbc]/40 flex items-center justify-center hover:border-[#735b2b] hover:bg-[#f5f3ef] transition-all"
                  aria-label="Đăng nhập với Facebook"
                >
                  <span className="font-headline font-bold text-[#1b1c1a]">f</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';

function IconMenu() {
  return <span className="text-3xl">☰</span>;
}

function IconClose() {
  return <span className="text-3xl">✕</span>;
}

function IconHeart() {
  return <span className="text-xl">❤</span>;
}

function IconSparkles() {
  return <span className="text-xl">✦</span>;
}

export default function FuanTempleWebsite() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      setMobileMenu(false);
    }
  };

  const navItems = [
    ['首頁', 'home'],
    ['福安寺介紹', 'about'],
    ['神佛博物館', 'museum'],
    ['建寺護持', 'donate'],
  ];

  return (
    <div className="min-h-screen bg-[#f8f4ec] text-gray-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-yellow-700/20 bg-[#450000]/95 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-black tracking-[0.2em]">
              八里福安寺
            </h1>

            <p className="text-xs tracking-[0.3em] text-yellow-300">
              FU AN TEMPLE
            </p>
          </div>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="rounded-xl px-4 py-2 text-sm transition hover:bg-yellow-400 hover:text-black"
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            className="lg:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <IconClose /> : <IconMenu />}
          </button>
        </div>

        {mobileMenu && (
          <div className="border-t border-white/10 bg-[#520000] px-6 py-6 lg:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="rounded-xl border border-white/10 px-4 py-3 text-left hover:bg-yellow-400 hover:text-black"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden bg-[#250000] pt-32 text-white"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1800&auto=format&fit=crop')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-[#4a0000]/70 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <p className="mb-5 text-sm tracking-[0.5em] text-yellow-300">
            傳統信仰 × 數位文化 × 神佛典藏
          </p>

          <h2 className="mb-8 text-5xl font-black leading-tight md:text-7xl">
            打造全台首座
            <span className="block text-yellow-300">
              數位神佛博物館
            </span>
          </h2>

          <p className="mx-auto mb-10 max-w-3xl text-lg leading-9 text-gray-200 md:text-xl">
            福安寺致力於結合宗教文化、數位科技與地方傳承，打造屬於台灣的神佛文化典藏平台。
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollToSection('museum')}
              className="rounded-2xl bg-yellow-400 px-8 py-5 text-lg font-black text-black transition hover:scale-105"
            >
              探索神佛博物館
            </button>

            <button
              onClick={() => scrollToSection('donate')}
              className="rounded-2xl border border-white px-8 py-5 text-lg font-bold transition hover:bg-white hover:text-black"
            >
              參與建寺護持
            </button>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-3 text-sm tracking-[0.4em] text-yellow-700">
            ABOUT FU AN TEMPLE
          </p>

          <h3 className="mb-8 text-5xl font-black text-[#680000]">
            福安寺核心理念
          </h3>

          <p className="text-lg leading-10 text-gray-600">
            延續傳統宗教文化，以科技方式重新詮釋信仰，讓神佛文化能跨越世代與地域持續傳承。
          </p>
        </div>
      </section>

      {/* Museum */}
      <section
        id="museum"
        className="bg-gradient-to-b from-[#470000] to-[#240000] px-6 py-24 text-white"
      >
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-5 flex justify-center text-yellow-300">
            <IconSparkles />
          </div>

          <p className="mb-3 text-sm tracking-[0.4em] text-yellow-300">
            DIGITAL MUSEUM
          </p>

          <h3 className="mb-6 text-6xl font-black">
            數位神佛博物館
          </h3>

          <p className="mx-auto max-w-3xl text-lg leading-9 text-gray-200">
            收錄台灣神佛文化、歷史故事與祭祀知識，建立屬於台灣的信仰文化典藏平台。
          </p>
        </div>
      </section>

      {/* Donate */}
      <section
        id="donate"
        className="bg-gradient-to-r from-[#2f0000] via-[#650000] to-[#980000] px-6 py-24 text-white"
      >
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 flex justify-center text-yellow-300">
            <IconHeart />
          </div>

          <p className="mb-3 text-sm tracking-[0.4em] text-yellow-300">
            DONATION
          </p>

          <h3 className="mb-8 text-6xl font-black">
            建寺護持
          </h3>

          <p className="mx-auto mb-14 max-w-3xl text-xl leading-10 text-gray-200">
            您的每一份善念與支持，都將成為福安寺文化傳承的重要力量。
          </p>

          <div className="mx-auto max-w-lg rounded-[2rem] border border-white/10 bg-white/10 p-10 backdrop-blur-xl">
            <h4 className="mb-4 text-4xl font-black text-yellow-300">
              隨喜護持
            </h4>

            <button className="mt-6 w-full rounded-2xl bg-yellow-400 px-8 py-5 text-lg font-black text-black transition hover:scale-105">
              我要護持
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

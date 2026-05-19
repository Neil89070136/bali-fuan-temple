"use client";

import React, { useState } from "react";

export default function FuanTempleWebsite() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setMobileMenu(false);
    }
  };

  const navItems = [
    ["首頁", "home"],
    ["福安寺介紹", "about"],
    ["神佛博物館", "museum"],
    ["福安商城", "shop"],
    ["建寺護持", "donate"],
  ];

  const products = [
    {
      title: "平安護身符",
      price: "$680",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "招財金牌",
      price: "$1,280",
      image:
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "福安香火禮盒",
      price: "$2,080",
      image:
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f4ec] text-gray-800">
      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-yellow-700/20 bg-[#450000]/95 text-white backdrop-blur-xl">
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
            ☰
          </button>
        </div>
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
            <br />
            數位神佛博物館
          </h2>

          <p className="mx-auto mb-10 max-w-3xl text-lg leading-9 text-white/80">
            福安寺致力於結合宗教文化、數位科技與地方傳承，打造屬於台灣的神佛文化典藏平台。
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection("museum")}
              className="rounded-2xl bg-yellow-400 px-8 py-4 text-lg font-bold text-black transition hover:scale-105"
            >
              探索神佛博物館
            </button>

            <a
              href="/donate"
              className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-lg font-bold text-white transition hover:scale-105 hover:bg-yellow-400 hover:text-black"
            >
              參與建寺護持
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-[#f6efe4] px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <h3 className="mb-8 text-5xl font-black text-[#450000]">
            福安寺核心理念
          </h3>

          <p className="text-lg leading-10 text-gray-700">
            延續傳統宗教文化，以科技方式重新詮釋信仰，讓神佛文化能跨越世代與地域持續傳承。
          </p>
        </div>
      </section>

      {/* Museum */}
      <section id="museum" className="bg-[#2b0000] px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl text-center">
          <h3 className="mb-8 text-5xl font-black">
            數位神佛博物館
          </h3>

          <p className="mx-auto max-w-4xl text-lg leading-10 text-white/80">
            收錄台灣神佛文化、歷史故事與祭祀知識，建立屬於台灣的信仰文化典藏平台。
          </p>
        </div>
      </section>

      {/* Shop */}
      <section id="shop" className="bg-[#f6efe4] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h3 className="mb-8 text-5xl font-black text-[#450000]">
              福安商城
            </h3>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.title}
                className="overflow-hidden rounded-[2rem] bg-white shadow-2xl"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-72 w-full object-cover"
                />

                <div className="p-8">
                  <h4 className="mb-3 text-4xl font-black text-[#5b0000]">
                    {product.title}
                  </h4>

                  <p className="mb-8 text-3xl font-bold text-[#c67a00]">
                    {product.price}
                  </p>

                  <button className="w-full rounded-2xl bg-[#8b0000] px-6 py-4 text-lg font-bold text-white transition hover:scale-105 hover:bg-[#b10000]">
                    查看商品
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donate */}
      <section
        id="donate"
        className="bg-gradient-to-b from-[#7a0000] to-[#450000] px-6 py-28 text-white"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="mb-8 text-6xl font-black">
            建寺護持
          </h3>

          <p className="mb-14 text-lg leading-10 text-white/80">
            您的每一份善念與支持，都將成為福安寺文化傳承的重要力量。
          </p>

          <div className="mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-white/10 p-10 backdrop-blur-xl">
            <h4 className="mb-8 text-5xl font-black text-yellow-300">
              隨喜護持
            </h4>

            <a
              href="/donate"
              className="inline-block rounded-2xl bg-yellow-400 px-12 py-5 text-2xl font-black text-black transition hover:scale-105"
            >
              我要護持
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
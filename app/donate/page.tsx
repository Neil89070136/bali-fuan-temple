"use client";

export default function DonatePage() {
  const handleDonate = () => {
    window.location.href = "/api/ecpay";
  };

  return (
    <main className="min-h-screen bg-[#2b0000] text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-bold mb-6 text-yellow-400">
        建寺護持
      </h1>

      <p className="mb-10 text-center max-w-xl leading-8">
        您的每一份護持，都將成為福安寺建設的重要力量。
      </p>

      <button
        onClick={handleDonate}
        className="bg-yellow-400 text-black px-10 py-4 rounded-2xl text-xl font-bold hover:scale-105 transition"
      >
        我要護持捐款
      </button>
    </main>
  );
}
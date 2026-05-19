"use client";

export default function DonatePage() {
  async function handleDonate() {
    console.log("按鈕有觸發");

    alert("測試成功");
  }

  return (
    <main className="min-h-screen bg-[#2b0000] text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-bold mb-6 text-yellow-400">
        建寺護持
      </h1>

      <p className="mb-10 text-center max-w-xl leading-8 text-lg">
        您的每一份護持，都將成為福安寺建設的重要力量。
      </p>

      <button
        onClick={handleDonate}
        className="bg-yellow-400 text-black px-10 py-4 rounded-xl text-xl font-bold"
      >
        我要護持
      </button>
    </main>
  );
}
"use client";

export default function DonatePage() {
  const handleDonate = async () => {
    console.log("按鈕有觸發");

    try {
      const res = await fetch("/api/ecpay", {
        method: "POST",
      });

      const data = await res.json();

      console.log(data);

      alert("綠界付款資料已建立！");
    } catch (error) {
      console.error(error);

      alert("發生錯誤");
    }
  };

  return (
    <main className="min-h-screen bg-[#2b0000] text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-bold mb-6 text-yellow-400">
        建寺護持
      </h1>

      <p className="mb-10 text-center max-w-xl leading-8 text-lg">
        您的每一份護持，都將成為福安寺建設的重要力量。
      </p>

      <div className="bg-[#4a0000] p-10 rounded-3xl shadow-2xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-yellow-300 mb-8">
          隨喜護持
        </h2>

        <button
          onClick={handleDonate}
          className="bg-yellow-400 text-black px-10 py-4 rounded-xl text-xl font-bold hover:scale-105 transition"
        >
          我要護持
        </button>
      </div>
    </main>
  );
}
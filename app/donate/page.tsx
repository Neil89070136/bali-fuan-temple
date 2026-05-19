export default function DonatePage() {
  return (
    <div className="min-h-screen bg-[#2b0000] px-6 py-24 text-white">
      <div className="mx-auto max-w-xl rounded-[2rem] bg-white/10 p-10 backdrop-blur-xl">
        <h1 className="mb-6 text-center text-5xl font-black text-yellow-300">
          建寺護持
        </h1>

        <p className="mb-10 text-center text-lg text-gray-200">
          您的每份善念，都是福安寺的重要力量。
        </p>

        <form
          method="POST"
          action="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5"
          className="space-y-4"
        >
          <input
            type="hidden"
            name="MerchantID"
            value="3002607"
          />

          <input
            type="hidden"
            name="MerchantTradeNo"
            value={`FUAN${Date.now()}`}
          />

          <input
            type="hidden"
            name="MerchantTradeDate"
            value="2026/05/20 12:00:00"
          />

          <input
            type="hidden"
            name="PaymentType"
            value="aio"
          />

          <input
            type="hidden"
            name="TotalAmount"
            value="100"
          />

          <input
            type="hidden"
            name="TradeDesc"
            value="福安寺建寺護持"
          />

          <input
            type="hidden"
            name="ItemName"
            value="建寺護持"
          />

          <input
            type="hidden"
            name="ReturnURL"
            value="https://example.com"
          />

          <input
            type="hidden"
            name="ChoosePayment"
            value="ALL"
          />

          <input
            type="hidden"
            name="EncryptType"
            value="1"
          />

          <button
            type="submit"
            className="w-full rounded-2xl bg-yellow-400 px-8 py-5 text-xl font-black text-black transition hover:scale-105"
          >
            前往綠界付款
          </button>
        </form>
      </div>
    </div>
  );
}
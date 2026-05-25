import create from "@/lib/ecpay-sdk";

export async function GET() {
  const MerchantTradeDate = new Date()
    .toLocaleString("sv-SE", {
      timeZone: "Asia/Taipei",
    })
    .replace("T", " ");

  const params = {
    MerchantID: "3002607",

    MerchantTradeNo: "FUAN" + Date.now(),

    MerchantTradeDate,

    PaymentType: "aio",

    TotalAmount: "100",

    TradeDesc: "test",

    ItemName: "donate",

    ReturnURL:
      "https://developers.ecpay.com.tw/WebSiteSetting/AioCheckOut_ReturnURL",

    ClientBackURL: "https://google.com",

    ChoosePayment: "Credit",

    EncryptType: 1,
  };

  const html = create.payment_client.aio_check_out_all(params);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
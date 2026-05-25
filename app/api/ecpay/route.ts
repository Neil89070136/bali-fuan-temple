import create from "@/lib/ecpay-sdk";

export async function GET() {
  const MerchantTradeDate = new Date()
    .toLocaleString("sv-SE", {
      timeZone: "Asia/Taipei",
    })
    .replace("T", " ");

  const params = {
    MerchantTradeNo: "FUAN" + Date.now(),
    MerchantTradeDate,
    TotalAmount: "100",
    TradeDesc: "test",
    ItemName: "donate",
    ReturnURL: "https://www.ecpay.com.tw/receive.php",
    ClientBackURL: "https://google.com",
    ChoosePayment: "Credit",
  };

  const html = create.payment_client.aio_check_out_all(params);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
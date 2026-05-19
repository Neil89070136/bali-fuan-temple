import { NextResponse } from "next/server";

export async function POST() {
  const orderData = {
    MerchantID: "3002607",
    MerchantTradeNo: `FUAN${Date.now()}`,
    MerchantTradeDate: "2026/05/20 12:00:00",
    PaymentType: "aio",
    TotalAmount: "100",
    TradeDesc: "福安寺建寺護持",
    ItemName: "建寺護持",
    ReturnURL: "https://developers.ecpay.com.tw/",
    ChoosePayment: "ALL",
    EncryptType: 1,
  };

  return NextResponse.json(orderData);
}
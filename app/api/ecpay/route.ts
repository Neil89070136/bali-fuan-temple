import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "success",
    message: "綠界 API 已成功啟動",
  });
}

export async function POST() {
  const merchantID = "3002607";

  const formData = {
    MerchantID: merchantID,
    MerchantTradeNo: `FUAN${Date.now()}`,
    MerchantTradeDate: "2026/05/20 12:00:00",
    PaymentType: "aio",
    TotalAmount: "100",
    TradeDesc: "福安寺建寺護持",
    ItemName: "建寺護持",
    ReturnURL: "https://bali-fuan-template.vercel.app",
    ChoosePayment: "ALL",
    EncryptType: "1",
    CheckMacValue: "TEST",
  };

  return NextResponse.json(formData);
}
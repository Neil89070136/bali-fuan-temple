import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

function generateCheckMacValue(data: Record<string, string>) {
  const HashKey = "5294y06JbISpM5x9";
  const HashIV = "v77hoKGq4kWxNNIS";

  const sorted = Object.keys(data)
    .sort()
    .map((key) => `${key}=${data[key]}`)
    .join("&");

  const raw = `HashKey=${HashKey}&${sorted}&HashIV=${HashIV}`;

  const encoded = encodeURIComponent(raw)
    .toLowerCase()
    .replace(/%20/g, "+")
    .replace(/!/g, "%21")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2a");

  return CryptoJS.SHA256(encoded).toString().toUpperCase();
}

export async function POST() {
  const orderData: Record<string, string> = {
    MerchantID: "3002607",
    MerchantTradeNo: `FUAN${Date.now()}`,
    MerchantTradeDate: "2026/05/20 12:00:00",
    PaymentType: "aio",
    TotalAmount: "100",
    TradeDesc: "福安寺建寺護持",
    ItemName: "建寺護持",
    ReturnURL: "https://developers.ecpay.com.tw/",
    ChoosePayment: "ALL",
    EncryptType: "1",
  };

  const CheckMacValue = generateCheckMacValue(orderData);

  return NextResponse.json({
    ...orderData,
    CheckMacValue,
  });
}
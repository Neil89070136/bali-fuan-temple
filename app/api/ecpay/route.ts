import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

function generateCheckMacValue(data: Record<string, string>) {
  const HashKey = "5294y06JbISpM5x9";
  const HashIV = "v77hoKGq4kWxNNIS";

  const sortedData = Object.keys(data)
    .sort((a, b) => a.localeCompare(b))
    .map((key) => `${key}=${data[key]}`)
    .join("&");

  const raw = `HashKey=${HashKey}&${sortedData}&HashIV=${HashIV}`;

  const encoded = encodeURIComponent(raw)
    .toLowerCase()
    .replace(/%20/g, "+")
    .replace(/%21/g, "!")
    .replace(/%28/g, "(")
    .replace(/%29/g, ")")
    .replace(/%2a/g, "*");

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
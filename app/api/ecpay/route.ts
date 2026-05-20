import { NextResponse } from "next/server";
import crypto from "crypto";

const MerchantID = process.env.ECPAY_MERCHANT_ID ?? "3002607";
const HashKey = process.env.ECPAY_HASH_KEY ?? "5294y06JbISpM5x9";
const HashIV = process.env.ECPAY_HASH_IV ?? "v77hoKGq4kWxNNIS";
const ECPAY_CHECKOUT_URL =
  process.env.ECPAY_CHECKOUT_URL ??
  "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ??
  "http://localhost:3000";

function generateCheckMacValue(params: Record<string, string>) {
  const sorted = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const raw = `HashKey=${HashKey}&${sorted}&HashIV=${HashIV}`;

  const encoded = encodeURIComponent(raw)
    .toLowerCase()
    .replace(/%20/g, "+")
    .replace(/%2d/g, "-")
    .replace(/%5f/g, "_")
    .replace(/%2e/g, ".")
    .replace(/%21/g, "!")
    .replace(/%2a/g, "*")
    .replace(/%28/g, "(")
    .replace(/%29/g, ")");

  return crypto
    .createHash("sha256")
    .update(encoded)
    .digest("hex")
    .toUpperCase();
}

export async function GET() {
  const now = new Date();
  const MerchantTradeDate =
    now.getFullYear() +
    "/" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "/" +
    String(now.getDate()).padStart(2, "0") +
    " " +
    String(now.getHours()).padStart(2, "0") +
    ":" +
    String(now.getMinutes()).padStart(2, "0") +
    ":" +
    String(now.getSeconds()).padStart(2, "0");

  const params: Record<string, string> = {
    MerchantID,

    MerchantTradeNo: "FUAN" + Date.now(),

    MerchantTradeDate,

    PaymentType: "aio",

    TotalAmount: "100",

    TradeDesc: "福安寺捐款",

    ItemName: "建寺護持",

    ReturnURL: `${SITE_URL}/api/ecpay/return`,
    ClientBackURL: `${SITE_URL}/donate-success`,

    ChoosePayment: "ALL",

    EncryptType: "1",
  };

  const CheckMacValue = generateCheckMacValue(params);

  const html = `
  <!DOCTYPE html>
  <html>
  <body>
    <form id="ecpayForm"
      method="post"
      action="${ECPAY_CHECKOUT_URL}">

      ${Object.entries({
        ...params,
        CheckMacValue,
      })
        .map(
          ([key, value]) =>
            `<input type="hidden" name="${key}" value="${value}" />`
        )
        .join("")}

    </form>

    <script>
      document.getElementById("ecpayForm").submit();
    </script>
  </body>
  </html>
  `;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
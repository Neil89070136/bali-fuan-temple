import { NextResponse } from "next/server";
import crypto from "crypto";

const HashKey = "5294y06JbISpM5x9";
const HashIV = "v77hoKGq4kWxNNIS";

export async function GET() {

  const MerchantTradeDate = getEcpayDate();

  const params: Record<string, string> = {
    MerchantID: "3002607",
    MerchantTradeNo: "FUAN" + Date.now(),
    MerchantTradeDate,
    PaymentType: "aio",
    TotalAmount: "100",
    TradeDesc: "test",
    ItemName: "donate",
    ReturnURL: "https://www.ecpay.com.tw/receive.php",
    ChoosePayment: "ALL",
    EncryptType: "1",
  };

  const result = generateCheckMacValue(params);

  console.log({
    RAW: result.raw,
    ENCODED: result.encoded,
    CHECKMAC: result.checkMacValue,
  });

  const html = `
  <!DOCTYPE html>
  <html>
  <body>

  <form id="ecpay-form"
        method="post"
        action="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5">

    ${Object.entries({
      ...params,
      CheckMacValue: result.checkMacValue,
    })
      .map(
        ([key, value]) =>
          `<input type="hidden" name="${key}" value="${value}" />`
      )
      .join("")}

  </form>

  <script>
    document.getElementById("ecpay-form").submit();
  </script>

  </body>
  </html>
  `;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}

function generateCheckMacValue(params: Record<string, string>) {

  const sorted = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const raw =
    `HashKey=${HashKey}&${sorted}&HashIV=${HashIV}`;

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

  const checkMacValue = crypto
    .createHash("sha256")
    .update(encoded)
    .digest("hex")
    .toUpperCase();

  return {
    raw,
    encoded,
    checkMacValue,
  };
}

function getEcpayDate() {

  const d = new Date();

  const yyyy = d.getFullYear();

  const mm = String(d.getMonth() + 1).padStart(2, "0");

  const dd = String(d.getDate()).padStart(2, "0");

  const hh = String(d.getHours()).padStart(2, "0");

  const mi = String(d.getMinutes()).padStart(2, "0");

  const ss = String(d.getSeconds()).padStart(2, "0");

  return `${yyyy}/${mm}/${dd} ${hh}:${mi}:${ss}`;
}
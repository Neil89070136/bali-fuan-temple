import { NextResponse } from "next/server";
import crypto from "crypto";

const HashKey = "5294y06JbISpM5x9";
const HashIV = "v77hoKGq4kWxNNIS";

function generateCheckMacValue(params: Record<string, string>) {
  // 移除 CheckMacValue
  const filtered = { ...params };
  delete filtered.CheckMacValue;

  // 官方排序
  const sorted = Object.keys(filtered)
    .sort()
    .reduce((acc: Record<string, string>, key) => {
      acc[key] = filtered[key];
      return acc;
    }, {});

  // 組字串
  let raw = `HashKey=${HashKey}`;

  for (const key in sorted) {
    raw += `&${key}=${sorted[key]}`;
  }

  raw += `&HashIV=${HashIV}`;

  // 官方 urlencode 規則
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

  console.log("RAW:", raw);
  console.log("ENCODED:", encoded);

  // SHA256
  return crypto
    .createHash("sha256")
    .update(encoded)
    .digest("hex")
    .toUpperCase();
}

export async function GET() {
  const now = new Date();

  const MerchantTradeDate =
    `${now.getFullYear()}/` +
    `${String(now.getMonth() + 1).padStart(2, "0")}/` +
    `${String(now.getDate()).padStart(2, "0")} ` +
    `${String(now.getHours()).padStart(2, "0")}:` +
    `${String(now.getMinutes()).padStart(2, "0")}:` +
    `${String(now.getSeconds()).padStart(2, "0")}`;

  const data: Record<string, string> = {
    MerchantID: "3002607",

    MerchantTradeNo:
      "FUAN" + Date.now().toString().slice(-10),

    MerchantTradeDate,

    PaymentType: "aio",

    TotalAmount: "100",

    TradeDesc: "Test",

    ItemName: "Donate",

    ReturnURL:
      "https://developers.ecpay.com.tw/",

    ChoosePayment: "ALL",

    EncryptType: "1",
  };

  data.CheckMacValue = generateCheckMacValue(data);

  console.log("CHECKMAC:", data.CheckMacValue);

  const html = `
  <!DOCTYPE html>
  <html>
  <body>
    <form id="ecpayForm"
      method="post"
      action="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5">

      ${Object.entries(data)
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
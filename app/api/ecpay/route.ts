import { NextResponse } from "next/server";
import crypto from "crypto";

const HASH_KEY = "5294y06JbISpM5x9";
const HASH_IV = "v77hoKGq4kWxNNIS";

function generateCheckMacValue(params: Record<string, string>): string {
  const sortedKeys = Object.keys(params).sort();

  let rawStr = sortedKeys
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  rawStr = `HashKey=${HASH_KEY}&${rawStr}&HashIV=${HASH_IV}`;

  const urlEncoded = encodeURIComponent(rawStr)
    .replace(/%2D/g, "-")
    .replace(/%5F/g, "_")
    .replace(/%2E/g, ".")
    .replace(/%21/g, "!")
    .replace(/%2A/g, "*")
    .replace(/%28/g, "(")
    .replace(/%29/g, ")")
    .replace(/%20/g, "+")
    .toLowerCase();

  const hash = crypto
    .createHash("sha256")
    .update(urlEncoded)
    .digest("hex");

  return hash.toUpperCase();
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

  const orderData: Record<string, string> = {
    MerchantID: "3002607",
    MerchantTradeNo: `FUAN${Date.now()}`,
    MerchantTradeDate,
    PaymentType: "aio",
    TotalAmount: "100",
    TradeDesc: "福安寺建寺護持",
    ItemName: "建寺護持",
    ReturnURL: "https://developers.ecpay.com.tw/",
    ChoosePayment: "ALL",
    EncryptType: "1",
  };

  const CheckMacValue = generateCheckMacValue(orderData);

  const html = `
    <html>
      <body>
        <form id="ecpay-form"
          method="post"
          action="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5">

          ${Object.entries({
            ...orderData,
            CheckMacValue,
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

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
import { NextResponse } from "next/server";
import crypto from "crypto";

const HashKey = "5294y06JbISpM5x9";
const HashIV = "v77hoKGq4kWxNNIS";

function generateCheckMacValue(params: Record<string, string>) {
  const sorted = Object.keys(params)
    .sort((a, b) => a.localeCompare(b))
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const raw = `HashKey=${HashKey}&${sorted}&HashIV=${HashIV}`;

  let encoded = encodeURIComponent(raw);

  encoded = encoded
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
    `${now.getFullYear()}/` +
    `${String(now.getMonth() + 1).padStart(2, "0")}/` +
    `${String(now.getDate()).padStart(2, "0")} ` +
    `${String(now.getHours()).padStart(2, "0")}:` +
    `${String(now.getMinutes()).padStart(2, "0")}:` +
    `${String(now.getSeconds()).padStart(2, "0")}`;

  console.log(MerchantTradeDate);

  const data: Record<string, string> = {
    MerchantID: "3002607",
    MerchantTradeNo:
      "FUAN" + Date.now().toString().slice(-10),

    MerchantTradeDate,

    PaymentType: "aio",

    TotalAmount: "100",

    TradeDesc: "donate",

    ItemName: "donate",

    ReturnURL:
      "https://developers.ecpay.com.tw/",

    ChoosePayment: "ALL",

    EncryptType: "1",
  };

  data.CheckMacValue = generateCheckMacValue(data);

  const formHtml = `
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

  return new NextResponse(formHtml, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
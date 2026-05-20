import { NextResponse } from "next/server";
import crypto from "crypto";
const qs = require("qs");

const HashKey = "5294y06JbISpM5x9";
const HashIV = "v77hoKGq4kWxNNIS";

function generateCheckMacValue(data: Record<string, string>) {
  const sorted = Object.keys(data)
    .sort()
    .reduce((obj: any, key) => {
      obj[key] = data[key];
      return obj;
    }, {});

  const query = qs.stringify(sorted, { encode: false });

  const raw = `HashKey=${HashKey}&${query}&HashIV=${HashIV}`;

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
    `${now.getFullYear()}/` +
    `${String(now.getMonth() + 1).padStart(2, "0")}/` +
    `${String(now.getDate()).padStart(2, "0")} ` +
    `${String(now.getHours()).padStart(2, "0")}:` +
    `${String(now.getMinutes()).padStart(2, "0")}:` +
    `${String(now.getSeconds()).padStart(2, "0")}`;

  const data = {
    MerchantID: "3002607",

    MerchantTradeNo: `FUAN${Date.now().toString().slice(-10)}`,

    MerchantTradeDate,

    PaymentType: "aio",

    TotalAmount: "100",

    TradeDesc: "TempleDonate",

    ItemName: "Donation",

    ReturnURL: "https://developers.ecpay.com.tw/",

    ChoosePayment: "ALL",

    EncryptType: "1",
  };

  const CheckMacValue = generateCheckMacValue(data);

  const formData = {
    ...data,
    CheckMacValue,
  };

  const html = `
  <html>
    <body>
      <form id="form" method="post"
      action="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5">

        ${Object.entries(formData)
          .map(
            ([k, v]) =>
              `<input type="hidden" name="${k}" value="${v}" />`
          )
          .join("")}

      </form>

      <script>
        document.getElementById("form").submit();
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
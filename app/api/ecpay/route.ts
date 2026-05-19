import { NextResponse } from "next/server";
import crypto from "crypto";

const HASH_KEY = "5294y06JbISpM5x9";
const HASH_IV = "v77hoKGq4kWxNNIS";

function generateCheckMacValue(params: Record<string, string>): string {
  const sorted = Object.keys(params).sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const raw = `HashKey=${HASH_KEY}&${sorted}&HashIV=${HASH_IV}`;

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

  const orderData: Record<string, string> = {
    MerchantID: "3002607",

    MerchantTradeNo: `FUAN${Date.now().toString().slice(-10)}`,

    MerchantTradeDate,

    PaymentType: "aio",

    TotalAmount: "100",

    TradeDesc: "FUAN TEMPLE",

    ItemName: "Donation",

    ReturnURL: "https://developers.ecpay.com.tw/",

    ClientBackURL: "https://bali-fuan-template.vercel.app",

    ChoosePayment: "ALL",

    EncryptType: "1",
  };

  const CheckMacValue = generateCheckMacValue(orderData);

  const formData = {
    ...orderData,
    CheckMacValue,
  };

  const html = `
    <html>
      <body>
        <form
          id="ecpay-form"
          method="post"
          action="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5"
        >
          ${Object.entries(formData)
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
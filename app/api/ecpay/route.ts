import { NextResponse } from "next/server";
import crypto from "crypto";

function generateCheckMacValue(params: Record<string, string>) {
  const HashKey = "5294y06JbISpM5x9";
  const HashIV = "v77hoKGq4kWxNNIS";

  const sorted = Object.keys(params)
    .sort((a, b) => a.localeCompare(b))
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const raw = `HashKey=${HashKey}&${sorted}&HashIV=${HashIV}`;

  const encoded = encodeURIComponent(raw)
    .toLowerCase()
    .replace(/%20/g, "+")
    .replace(/'/g, "%27")
    .replace(/~/g, "%7e");

  return crypto
    .createHash("sha256")
    .update(encoded)
    .digest("hex")
    .toUpperCase();
}

export async function GET() {
  const order: Record<string, string> = {
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

  const CheckMacValue = generateCheckMacValue(order);

  const formInputs = Object.entries({
    ...order,
    CheckMacValue,
  })
    .map(
      ([key, value]) =>
        `<input type="hidden" name="${key}" value="${value}" />`
    )
    .join("");

  const html = `
    <html>
      <body>
        <form
          id="ecpay-form"
          method="post"
          action="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5"
        >
          ${formInputs}
        </form>

        <script>
          document.getElementById('ecpay-form').submit();
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
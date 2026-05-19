import { NextRequest } from "next/server";
import crypto from "crypto";

function getTradeDate() {
  const now = new Date();

  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");

  const hh = String(now.getHours()).padStart(2, "0");
  const mi = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  return `${yyyy}/${mm}/${dd} ${hh}:${mi}:${ss}`;
}

function generateCheckMacValue(data: Record<string, string>) {
  const HashKey = "5294y06JbISpM5x9";
  const HashIV = "v77hoKGq4kWxNNIS";

  const sorted = Object.keys(data)
    .sort((a, b) => a.localeCompare(b))
    .map((key) => `${key}=${data[key]}`)
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

export async function GET(req: NextRequest) {
  const baseUrl = req.nextUrl.origin;

  const orderData: Record<string, string> = {
    MerchantID: "3002607",

    MerchantTradeNo: `FUAN${Date.now()}`,

    MerchantTradeDate: getTradeDate(),

    PaymentType: "aio",

    TotalAmount: "100",

    TradeDesc: "FUAN",

    ItemName: "Donation",

    ReturnURL: `${baseUrl}/api/ecpay/return`,

    OrderResultURL: `${baseUrl}/donate-success`,

    ClientBackURL: `${baseUrl}`,

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

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
import { NextResponse } from "next/server";
import crypto from "crypto";

const HashKey = "5294y06JbISpM5x9";
const HashIV = "v77hoKGq4kWxNNIS";

function ecpayEncode(str: string) {
  return encodeURIComponent(str)
    .replace(/%20/g, "+")
    .replace(/!/g, "%21")
    .replace(/\*/g, "%2A")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29");
}

function generateCheckMacValue(params: Record<string, string>) {
  const sorted = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const raw = `HashKey=${HashKey}&${sorted}&HashIV=${HashIV}`;

  const encoded = ecpayEncode(raw).toLowerCase();

  return crypto
    .createHash("sha256")
    .update(encoded)
    .digest("hex")
    .toUpperCase();
}

function getTradeDate() {
  const now = new Date();

  return (
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
    String(now.getSeconds()).padStart(2, "0")
  );
}

export async function GET() {
  const params: Record<string, string> = {
    MerchantID: "3002607",

    MerchantTradeNo:
      "FUAN" + Date.now().toString().slice(-10),

    MerchantTradeDate: getTradeDate(),

    PaymentType: "aio",

    TotalAmount: "100",

    TradeDesc: "donate",

    ItemName: "donate",

    ReturnURL: "https://www.google.com",

    ChoosePayment: "ALL",

    EncryptType: "1",
  };

  const CheckMacValue =
    generateCheckMacValue(params);

  const html = `
  <html>
    <body>
      <form
        id="ecpayForm"
        method="post"
        action="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5"
      >

        ${Object.entries({
          ...params,
          CheckMacValue,
        })
          .map(
            ([key, value]) =>
              `<input type="hidden"
                name="${key}"
                value="${value}" />`
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
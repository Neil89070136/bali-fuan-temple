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

function generateCheckMacValue(params: Record<string, string>) {
  const HashKey = "5294y06JbISpM5x9";
  const HashIV = "v77hoKGq4kWxNNIS";

  const sorted = Object.keys(params)
    .sort((a, b) => a.localeCompare(b))
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const raw = `HashKey=${HashKey}&${sorted}&HashIV=${HashIV}`;

  const urlEncoded = encodeURIComponent(raw)
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
    .update(urlEncoded)
    .digest("hex")
    .toUpperCase();
}

export async function GET() {
  const order = {
    MerchantID: "3002607",

    MerchantTradeNo: `FUAN${Date.now()}`,

    MerchantTradeDate: getTradeDate(),

    PaymentType: "aio",

    TotalAmount: "100",

    TradeDesc: "Test",

    ItemName: "Donation",

    ReturnURL: "https://developers.ecpay.com.tw/",

    ChoosePayment: "ALL",

    EncryptType: "1",
  };

  const CheckMacValue = generateCheckMacValue(order);

  const form = `
  <html>
    <body onload="document.forms[0].submit()">

      <form method="POST"
        action="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5">

        ${Object.entries({
          ...order,
          CheckMacValue,
        })
          .map(
            ([key, value]) =>
              `<input type="hidden" name="${key}" value="${value}" />`
          )
          .join("")}

      </form>

    </body>
  </html>
  `;

  return new Response(form, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
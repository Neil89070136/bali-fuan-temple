import crypto from "crypto";

function getTradeDate() {
  const date = new Date();

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  const hh = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  return `${yyyy}/${mm}/${dd} ${hh}:${mi}:${ss}`;
}

function ecpayEncode(str: string) {
  return encodeURIComponent(str)
    .toLowerCase()
    .replace(/%20/g, "+")
    .replace(/%2d/g, "-")
    .replace(/%5f/g, "_")
    .replace(/%2e/g, ".")
    .replace(/%21/g, "!")
    .replace(/%2a/g, "*")
    .replace(/%28/g, "(")
    .replace(/%29/g, ")");
}

function generateCheckMacValue(params: Record<string, string>) {
  const HashKey = "5294y06JbISpM5x9";
  const HashIV = "v77hoKGq4kWxNNIS";

  const sorted = Object.keys(params)
    .sort((a, b) => a.localeCompare(b))
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const raw = `HashKey=${HashKey}&${sorted}&HashIV=${HashIV}`;

  const encoded = ecpayEncode(raw);

  return crypto
    .createHash("sha256")
    .update(encoded)
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

    TradeDesc: "test",

    ItemName: "test",

    ReturnURL: "https://developers.ecpay.com.tw/",

    ChoosePayment: "ALL",

    EncryptType: "1",
  };

  const CheckMacValue = generateCheckMacValue(order);

  const formData = {
    ...order,
    CheckMacValue,
  };

  return new Response(
    `
    <html>
      <body onload="document.forms[0].submit()">

        <form
          method="POST"
          action="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5"
        >

          ${Object.entries(formData)
            .map(
              ([key, value]) =>
                `<input type="hidden" name="${key}" value="${value}" />`
            )
            .join("")}

        </form>

      </body>
    </html>
  `,
    {
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}
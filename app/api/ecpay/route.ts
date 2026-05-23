import { NextResponse } from "next/server";
import crypto from "crypto";

const HashKey = "5294y06JbISpM5x9";
const HashIV = "v77hoKGq4kWxNNIS";

export async function GET() {
  const MerchantTradeDate = getEcpayDate();

  console.log(MerchantTradeDate);

  const params: Record<string, string> = {
    MerchantID: "3002607",
    MerchantTradeNo: "FUAN" + Date.now(),
    MerchantTradeDate,
    PaymentType: "aio",
    TotalAmount: "100",
    TradeDesc: "test",
    ItemName: "donate",
    ReturnURL: "https://www.ecpay.com.tw/receive.php",
    ChoosePayment: "ALL",
    EncryptType: "1",
  };

  const CheckMacValue = generateCheckMacValue(params);

  console.log("CHECKMAC:", CheckMacValue);

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>ECPay</title>
</head>
<body>

<form id="ecpay-form"
      method="post"
      action="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5">

  ${Object.entries({
    ...params,
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

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}

function generateCheckMacValue(params: Record<string, string>) {
  const sorted = Object.keys(params)
    .sort((a, b) => a.localeCompare(b))
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const raw = `HashKey=${HashKey}&${sorted}&HashIV=${HashIV}`;

  const encoded = encodeURIComponent(raw)
    .replace(/%20/g, "+")
    .replace(/!/g, "%21")
    .replace(/\*/g, "%2A")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .toLowerCase();

  console.log("RAW:", raw);
  console.log("ENCODED:", encoded);

  return crypto
    .createHash("sha256")
    .update(encoded)
    .digest("hex")
    .toUpperCase();
}

function getEcpayDate() {
  const d = new Date();

  const yyyy = d.getFullYear();

  const mm = String(d.getMonth() + 1).padStart(2, "0");

  const dd = String(d.getDate()).padStart(2, "0");

  const hh = String(d.getHours()).padStart(2, "0");

  const mi = String(d.getMinutes()).padStart(2, "0");

  const ss = String(d.getSeconds()).padStart(2, "0");

  return `${yyyy}/${mm}/${dd} ${hh}:${mi}:${ss}`;
}
import { generateCheckMacValue } from "@/lib/ecpay";

export async function GET() {
  const params: Record<string, string> = {
    MerchantID: process.env.ECPAY_MERCHANT_ID!,
    MerchantTradeNo: `FUAN${Date.now()}`,

    MerchantTradeDate: new Date()
      .toLocaleString("sv-SE", {
        timeZone: "Asia/Taipei",
      })
      .replace("T", " "),

    PaymentType: "aio",
    TotalAmount: "100",
    TradeDesc: "test",
    ItemName: "donate",

    ReturnURL: "https://www.ecpay.com.tw/receive.php",

    ChoosePayment: "Credit",
    EncryptType: "1",
  };

  const result = generateCheckMacValue(params);

  console.log({
    RAW: result.raw,
    ENCODED: result.encoded,
    CHECKMAC: result.checkMacValue,
  });

  const html = `
<!DOCTYPE html>
<html>
<body>

<form id="ecpay-form"
      method="post"
      action="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5">

${Object.entries({
  ...params,
  CheckMacValue: result.checkMacValue,
})
  .map(
    ([key, value]) =>
      `<input type="hidden" name="${key}" value="${value}" />`
  )
  .join("")}

<button type="submit">
前往付款
</button>

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
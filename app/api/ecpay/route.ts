import { generateCheckMacValue, getEcpayDate } from "@/lib/ecpay";

export async function GET() {
  const params = {
    MerchantID: "3002607",
    MerchantTradeNo: "FUAN" + Date.now(),
    MerchantTradeDate: getEcpayDate(),

    PaymentType: "aio",
    TotalAmount: "100",
    TradeDesc: "test",
    ItemName: "donate",

    ReturnURL: "https://www.ecpay.com.tw/receive.php",

    ChoosePayment: "Credit",
    IgnorePayment: "",

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
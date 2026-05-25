import {
  generateCheckMacValue,
  getEcpayDate,
} from "@/lib/ecpay";

export async function GET() {
  const params: Record<string, any> = {
    MerchantID: "3002607",

    MerchantTradeNo: "FUAN" + Date.now(),

    MerchantTradeDate: getEcpayDate(),

    PaymentType: "aio",

    TotalAmount: "100",

    TradeDesc: "test",

    ItemName: "donate",

    ReturnURL:
      "https://developers.ecpay.com.tw/WebSiteSetting/AioCheckOut_ReturnURL",

    ChoosePayment: "Credit",

    EncryptType: 1,
  };

  const CheckMacValue = generateCheckMacValue(params);

  const html = `
  <html>
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
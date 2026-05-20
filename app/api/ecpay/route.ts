import { NextResponse } from "next/server";

const ecpay_payment = require("ecpay_aio_nodejs");

export async function GET() {
  try {
    const base_param = {
      MerchantTradeNo: "FUAN" + Date.now(),
      MerchantTradeDate: new Date()
        .toLocaleString("sv-SE")
        .replace("T", " "),

      TotalAmount: "100",

      TradeDesc: "福安寺捐款",

      ItemName: "建寺護持",

      ReturnURL: "https://www.google.com",

      ChoosePayment: "ALL",

      EncryptType: 1,
    };

    const options = {
      OperationMode: "Test",

      MercProfile: {
        MerchantID: "3002607",

        HashKey: "pwFHCqoQZGmho4w6",

        HashIV: "EkRm7iFT261dpevs",
      },

      IgnorePayment: [],

      IsProjectContractor: false,
    };

    const create = new ecpay_payment(options);

    const html = create.payment_client.aio_check_out_all(base_param);

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (err: any) {
    return NextResponse.json({
      error: true,
      message: err.message,
      stack: err.stack,
    });
  }
}
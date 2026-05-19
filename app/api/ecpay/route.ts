import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ecpay_payment = require("ecpay_aio_nodejs");

    const options = {
      OperationMode: "Test",
      MercProfile: {
        MerchantID: "3002607",
        HashKey: "5294y06JbISpM5x9",
        HashIV: "v77hoKGq4kWxNNIS",
      },
      IgnorePayment: [],
      IsProjectContractor: false,
    };

    const create = new ecpay_payment(options);

    const order = {
      MerchantTradeNo: `FUAN${Date.now()}`,
      MerchantTradeDate: "2026/05/20 12:00:00",
      TotalAmount: "100",
      TradeDesc: "福安寺建寺護持",
      ItemName: "建寺護持",
      ReturnURL: "https://developers.ecpay.com.tw/",
      ChoosePayment: "ALL",
      EncryptType: 1,
    };

    const html = create.payment_client.aio_check_out_all(order);

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (err: any) {
    return NextResponse.json({
      error: true,
      message: err.message,
    });
  }
}
import { NextResponse } from "next/server";

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

export async function GET() {
  try {
    // @ts-ignore
    const ecpay_payment = require("ecpay_aio_nodejs");

    const create = new ecpay_payment(options);

    const date = new Date();

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    const hh = String(date.getHours()).padStart(2, "0");
    const mi = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");

    const tradeDate = `${yyyy}/${mm}/${dd} ${hh}:${mi}:${ss}`;

    const base_param = {
      MerchantTradeNo: `FUAN${Date.now()}`,
      MerchantTradeDate: tradeDate,
      TotalAmount: "100",
      TradeDesc: "Test",
      ItemName: "Donation",
      ReturnURL: "https://developers.ecpay.com.tw/",
      ChoosePayment: "ALL",
      ClientBackURL: "https://developers.ecpay.com.tw/",
    };

    const html = create.payment_client.aio_check_out_all(base_param);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      error: true,
      message: error.message,
    });
  }
}
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
  const ecpay_payment = require("ecpay_aio_nodejs");

  const create = new ecpay_payment(options);

  const date = new Date();

  const MerchantTradeDate =
    date.getFullYear() +
    "/" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "/" +
    String(date.getDate()).padStart(2, "0") +
    " " +
    String(date.getHours()).padStart(2, "0") +
    ":" +
    String(date.getMinutes()).padStart(2, "0") +
    ":" +
    String(date.getSeconds()).padStart(2, "0");

  const base_param = {
    MerchantTradeNo: "FUAN" + Date.now(),
    MerchantTradeDate,
    TotalAmount: "100",
    TradeDesc: "Temple Donate",
    ItemName: "Donation",
    ReturnURL: "https://www.ecpay.com.tw/receive.php",
    ChoosePayment: "ALL",
    ClientBackURL: "https://google.com",
    ItemURL: "https://google.com",
    Remark: "test",
    EncryptType: 1,
  };

  const html = create.payment_client.aio_check_out_all(base_param);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
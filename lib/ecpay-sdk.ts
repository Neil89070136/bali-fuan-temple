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

const create = new (require("ecpay_aio_nodejs"))(options);

export default create;
import crypto from "crypto";

const HashKey = process.env.ECPAY_HASH_KEY!;
const HashIV = process.env.ECPAY_HASH_IV!;

export function generateCheckMacValue(data: Record<string, any>) {
  const sorted = Object.keys(data)
    .sort((a, b) => a.localeCompare(b))
    .map((key) => `${key}=${data[key]}`)
    .join("&");

  const raw = `HashKey=${HashKey}&${sorted}&HashIV=${HashIV}`;

  const encoded = encodeURIComponent(raw)
    .toLowerCase()
    .replace(/%20/g, "+")
    .replace(/%21/g, "!")
    .replace(/%28/g, "(")
    .replace(/%29/g, ")")
    .replace(/%2a/g, "*")
    .replace(/%2d/g, "-")
    .replace(/%2e/g, ".")
    .replace(/%5f/g, "_");

  const checkMacValue = crypto
    .createHash("sha256")
    .update(encoded)
    .digest("hex")
    .toUpperCase();

  return checkMacValue;
}

export function getEcpayDate() {
  const date = new Date();

  return date
    .toLocaleString("sv-SE", {
      timeZone: "Asia/Taipei",
    })
    .replace("T", " ");
}
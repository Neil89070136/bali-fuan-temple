import crypto from "crypto";

const HashKey = process.env.ECPAY_HASH_KEY!;
const HashIV = process.env.ECPAY_HASH_IV!;

export function generateCheckMacValue(data: Record<string, string>) {
  const sorted = Object.keys(data)
    .sort()
    .map((key) => `${key}=${data[key]}`)
    .join("&");

  const raw = `HashKey=${HashKey}&${sorted}&HashIV=${HashIV}`;

  const encoded = encodeURIComponent(raw)
    .toLowerCase()
    .replace(/%20/g, "+")
    .replace(/%2d/g, "-")
    .replace(/%5f/g, "_")
    .replace(/%2e/g, ".")
    .replace(/%21/g, "!")
    .replace(/%2a/g, "*")
    .replace(/%28/g, "(")
    .replace(/%29/g, ")");

  const checkMacValue = crypto
    .createHash("sha256")
    .update(encoded)
    .digest("hex")
    .toUpperCase();

  return {
    raw,
    encoded,
    checkMacValue,
  };
}

export function getEcpayDate() {
  const date = new Date();

  const taiwan = new Date(
    date.toLocaleString("en-US", {
      timeZone: "Asia/Taipei",
    })
  );

  const yyyy = taiwan.getFullYear();

  const mm = String(taiwan.getMonth() + 1).padStart(2, "0");

  const dd = String(taiwan.getDate()).padStart(2, "0");

  const hh = String(taiwan.getHours()).padStart(2, "0");

  const mi = String(taiwan.getMinutes()).padStart(2, "0");

  const ss = String(taiwan.getSeconds()).padStart(2, "0");

  return `${yyyy}/${mm}/${dd} ${hh}:${mi}:${ss}`;
}
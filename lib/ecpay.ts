import crypto from "crypto";

const HASH_KEY = "5294y06JbISpM5x9";
const HASH_IV = "v77hoKGq4kWxNNIS";

export function getEcpayDate() {
  const d = new Date();

  const yyyy = d.getFullYear();

  const MM = String(d.getMonth() + 1).padStart(2, "0");

  const dd = String(d.getDate()).padStart(2, "0");

  const HH = String(d.getHours()).padStart(2, "0");

  const mm = String(d.getMinutes()).padStart(2, "0");

  const ss = String(d.getSeconds()).padStart(2, "0");

  return `${yyyy}/${MM}/${dd} ${HH}:${mm}:${ss}`;
}

export function generateCheckMacValue(params: Record<string, string>) {
  const sorted = Object.keys(params)
    .sort((a, b) => a.localeCompare(b))
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const raw = `HashKey=${HASH_KEY}&${sorted}&HashIV=${HASH_IV}`;

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
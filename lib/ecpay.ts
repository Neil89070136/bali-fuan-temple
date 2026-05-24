import crypto from "crypto";

const HashKey = process.env.ECPAY_HASH_KEY!;
const HashIV = process.env.ECPAY_HASH_IV!;

export function generateCheckMacValue(data: Record<string, string>) {
  // 排序
  const sorted = Object.keys(data)
    .sort((a, b) => a.localeCompare(b))
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {} as Record<string, string>);

  // 組合字串
  let raw = `HashKey=${HashKey}`;

  for (const key in sorted) {
    raw += `&${key}=${sorted[key]}`;
  }

  raw += `&HashIV=${HashIV}`;

  // 綠界 encode 規則
  const encoded = encodeURIComponent(raw)
    .replace(/%20/g, "+")
    .replace(/!/g, "%21")
    .replace(/\*/g, "%2a")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .toLowerCase();

  // SHA256
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
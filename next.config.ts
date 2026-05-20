import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/ecpay": ["./ecpay_payment.ini"],
  },
};

export default nextConfig;
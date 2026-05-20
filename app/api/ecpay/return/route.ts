import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());

  console.log("ECPay return payload:", payload);

  return new NextResponse("1|OK", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
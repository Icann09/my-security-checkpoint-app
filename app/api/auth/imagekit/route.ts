import ImageKit from "imagekit";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const imagekit = new ImageKit({
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
    });

    // Generate authentication parameters
    const authParams = imagekit.getAuthenticationParameters();

    return NextResponse.json({
      signature: authParams.signature,
      expire: authParams.expire,
      token: authParams.token,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    });
  } catch (err) {
    console.error("Error generating auth params:", err);
    return NextResponse.json(
      { error: "Failed to generate auth parameters" },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest, { params: { roomId } }: { params: { roomId: string } }) {
  try {
    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

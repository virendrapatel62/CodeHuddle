import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      {
        error: error?.message || "Error deleting answer",
      },
      {
        status: error?.status || error?.code || 500,
      }
    );
  }
}

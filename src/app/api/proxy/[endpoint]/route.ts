import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/lib/axios";
import { logger } from "@/lib/logger";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function POST(req: NextRequest, { params }: { params: Promise<{ endpoint: string }> }) {
  const resolvedParams = await params;
  try {
    const body = await req.json();
    const xType = req.headers.get("x-type");
    const response = await axiosInstance.post(`${resolvedParams.endpoint}/`, body, {
      headers: {
        ...(xType ? { "x-type": xType } : {}),
      },
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      httpsAgent: new (require("https").Agent)({
        rejectUnauthorized: false,
      }),
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    logger.debug("Proxy Error:", axiosError?.message || error);
    return NextResponse.json(
      { error: "Proxy failed", details: axiosError?.response?.data || null },
      { status: axiosError?.response?.status || 500 }
    );
  }
}

//GET

export async function GET(
  req: NextRequest,
  { params }: { params: { endpoint: string } }
) {
  try {
    const { endpoint } = await params;
    const xType = req.headers.get("x-type") || "CLIENT_PORTAL";
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    const search = req.nextUrl.search || "";
    const url = `${endpoint}/${search}`;

    const response = await axiosInstance.get(url, {
      headers: {
        "x-type": xType,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      httpsAgent: new (require("https").Agent)({
        rejectUnauthorized: false,
      }),
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    logger.error("Proxy Error:", axiosError?.message, axiosError?.response?.data);

    return NextResponse.json(
      { error: "Proxy failed", details: axiosError?.response?.data || null },
      { status: axiosError?.response?.status || 500 }
    );
  }
}

//put
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ endpoint: string }> }
) {
  const resolvedParams = await params;
  try {
    const body = await req.json();
    const xType = req.headers.get("x-type");
    const response = await axiosInstance.put(`${resolvedParams.endpoint}/`, body, {
      headers: {
        ...(xType ? { "x-type": xType } : {}),
      },
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError
    logger.debug("Proxy Error:", axiosError?.message || error);
  }
}
//delete

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ endpoint: string }> }
) {
  const resolvedParams = await params;
  try {
    const xType = req.headers.get("x-type");
    const url = `${resolvedParams.endpoint}/${req.nextUrl.search ? req.nextUrl.search : ""
      }`;
    const response = await axiosInstance.delete(url, {
      headers: {
        ...(xType ? { "x-type": xType } : {}),
      },
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError
    logger.debug("Proxy Error:", axiosError?.message || error);
  }
}
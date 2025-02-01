import { NextResponse } from "next/server";




export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout Successfull",
            success: true,
            statusCode: 200,

        });
        response.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        })

        return response;
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            success: false,
            statusCode: 500,
        })
    }
}
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId: string | null = await getDataFromToken(request);

        if (!userId) {
            return NextResponse.json({
                message: "Invalid or expired token",
                success: false,
            }, { status: 401 }); // Set appropriate status for authentication failure
        }

        const user = await User.findById(userId).select("email username");

        if (!user) {
            return NextResponse.json({
                message: "User not found",
                success: false,
            }, { status: 404 }); // User not found
        }

        return NextResponse.json({
            message: "User fetched successfully",
            data: user,
            success: true,
        });
    } catch (error: any) {
        console.error("Error fetching user:", error.message); // Only log non-sensitive data
        return NextResponse.json({
            message: error.message,
            success: false,
            status: error.status || 500,
        });
    }
}

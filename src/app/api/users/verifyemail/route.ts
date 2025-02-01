import { connect } from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import User from "@/models/userModel"


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        console.log(reqBody);
        const { token } = reqBody
        console.log(token);

        const user = await User.findOne({
            $and: [{
                verifyToken: token,
                verifyTokenExpiry: { $gt: Date.now() }
            }]
        })
        if (!user) {
            return NextResponse.json({
                message: "Invalid token or token expired",
                status: 401,
                success: false,
            }, { status: 401 })
        }
        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "User verified successfully",
            status: 200,
            success: true,
        }, { status: 200 })


    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: error.status,
            success: false,
        }, { status: error.status })
    }
}
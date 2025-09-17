import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/config";
import User from "@/models/userModel";



export async function GET(request: NextRequest){
    try {
        await connect();
        const {token} = await request.json();
      console.log(token);
     const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});
        if(!user){
            return NextResponse.json({message: "Invalid or expired token"}, {status: 400});
        }
        console.log(user);
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({message: "Email verified successfully"}, {status: 200});
    }
    catch (error) {
        return NextResponse.json({error: error}, {status: 400});
    }
}
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
    }
    catch (error) {
        return NextResponse.json({error: error}, {status: 400});
    }
}
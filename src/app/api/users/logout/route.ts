
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response =NextResponse.json({
            message: "Log Out SucessFull ",
            sucess :true,
        })
        response.cookies.set("token","",{httpOnly:true})
        return response;
    } catch (error:unknown) {
        
        console.log("error during logout",error);
        return NextResponse.json(
            {error: error instanceof Error ? error.message : 'Unknown error'},
            { status : 500}           
           );
        
    }
}
import {connect} from '@/dbconfig/config';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import Link from 'next/link';
import jwt from 'jsonwebtoken';
 connect();
export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error: 'User not found'}, {status: 400});
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({error: 'Invalid password'}, {status: 400});
        }
        const token = await jwt.sign({id: user._id, email: user.email}, process.env.TOKEN_SECRET!, {expiresIn: '1d'});
        return NextResponse.json({message: 'Login successful'}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: error}, {status: 500});
    }
}
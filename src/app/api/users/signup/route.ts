import {connect} from '@/dbconfig/config';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/helper/mailer';

export async function POST(request: NextRequest){
    try {
        // Ensure database connection
        await connect();
        
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        
        // Validate input
        if (!username || !email || !password) {
            return NextResponse.json({error: "All fields are required"}, {status: 400});
        }
        
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({username, email, password: hashedPassword});
        const savedUser = await newUser.save();
        
        console.log("New user created:", savedUser._id);
        //send email
        await sendEmail({email: savedUser.email, emailType: "VERIFY", userId: savedUser._id});
        return NextResponse.json({
            message: "User created successfully", 
            success: true, 
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
                isVerified: savedUser.isVerified
            }
        }, {status: 201});
        
    } catch (error: unknown) {
        console.error('Signup error:', error);
        
        if (error instanceof Error) {
            // Handle specific MongoDB errors
            if (error.message.includes('Authentication failed')) {
                return NextResponse.json({
                    error: 'Database authentication failed. Please check server configuration.'
                }, {status: 500});
            }
            
            if (error.message.includes('E11000')) {
                return NextResponse.json({
                    error: 'User with this email or username already exists'
                }, {status: 400});
            }
            
            return NextResponse.json({
                error: error.message
            }, {status: 500});
        }
        
        return NextResponse.json({
            error: 'An unexpected error occurred'
        }, {status: 500});
    }
}

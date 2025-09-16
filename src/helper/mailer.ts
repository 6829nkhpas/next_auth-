
import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export const sendEmail = async ({email, emailType, userId}: {email: string, emailType: string, userId: string}) => {

    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000});
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000});
        }
       

        // Looking to send emails in production? Check out our Email API/SMTP product!
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "784bce8d63c7b2",
      pass: "5fdfc1fdd0504b"
    }
  });
        const mailOptions = {
            from: "noreply@example.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            text: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: emailType === "VERIFY" ? `<p>Click <a href="${process.env.NEXT_PUBLIC_APP_URL}/verifyemail?token=${hashedToken}">here</a> to verify your email</p>` : `<p>Click <a href="${process.env.NEXT_PUBLIC_APP_URL}/resetpassword?token=${hashedToken}">here</a> to reset your password</p>`,
        }
        await transporter.sendMail(mailOptions);
        return NextResponse.json({message: "Email sent successfully", success: true}, {status: 200});
    } catch (error: unknown) {
        throw new Error("Failed to send email",{cause: error instanceof Error ? error.message : "Unknown error"});
        
    }
}
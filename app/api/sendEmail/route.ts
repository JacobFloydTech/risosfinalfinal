import { NextResponse, NextRequest } from "next/server";

import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) { 
    try { 
      const { firstName, lastName, phoneNumber, email, Comments } = await req.json();
        const smtpTransport = nodemailer.createTransport({
          host: "smtp.gmail.com",
          service: 'gmail',
          port: 587,
          secure: false,
          auth: {
            type: 'Login',
            user: "risosenterprisescontactform@gmail.com",
            pass: process.env.EMAIL_PASSWORD!,
          },
        });
        const sendMail = await smtpTransport.sendMail({
            from: 'risosenterprisescontactform@gmail.com',
            to: 'a.risos@risosenterprises.com'
,
            subject: `Message from ${Capitalize(firstName)} ${!!!lastName ? '' : Capitalize(lastName)} - Email ${email}`,
            text: `${Comments + (phoneNumber ? `\n Phone Number - ${phoneNumber}` : '')}`, 
        })
      
        return NextResponse.json({messageID: sendMail.messageId}, {status: 200})
    }
    catch (e) { 
      console.log(e);
        return NextResponse.json({error: e},  {status: 500})
    }

}


function Capitalize(s: string) { 
  return s.slice(0,1).toUpperCase()+s.slice(1)
}
import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';



interface Mailtrap {
    email: string,
    emailType: string,
    userId: string
}

export async function sendEmail({ email, emailType, userId }: Mailtrap) {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {

            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: new Date(Date.now() + 3600000) // 1 hour
            },
                { new: true, runValidators: true });
        } else if (emailType === "RESET") {

            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: new Date(Date.now() + 1800000) // 30 minutes
            },
                { new: true, runValidators: true });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT!, 10), // Ensure the port is parsed as an integer
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_USERGMAIL,
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email address" : "Reset your password",
            text: `Please use the following link to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}`,
            html: `<p>Please use the following link to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}: <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Click here</a>
            <br>
            or copy paste the link below: ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
        }

        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse;


    } catch (error: any) {
        throw new Error(error.message);
    }
}
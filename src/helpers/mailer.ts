// Ethereal email

import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

interface SendEmailProps {
  email: string;
  emailType: 'VERIFY' | 'RESET';
  userId: string;
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: SendEmailProps) => {
  try {
    // 1️⃣ Generate hashed token for email verification or password reset
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    // 2️⃣ Update user document in DB
    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour expiry
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // // 3️⃣ Create an Ethereal test account (temporary)
    // const testAccount = await nodemailer.createTestAccount();

    // 4️⃣ Create transporter using Ethereal SMTP
    const transport = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: process.env.ETHEREAL_USER,
        pass: process.env.ETHEREAL_PASS,
      },
    });

    // Optional: verify connection
    await transport.verify();
    console.log('✅ Ethereal SMTP is ready to send emails');

    // 5️⃣ Email options
    const mailOptions = {
      from: '"My App" <no-reply@myapp.com>',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === 'VERIFY' ? 'verify your email' : 'reset your password'
      }.<br/>
Or copy and paste the link below in your browser:<br/>
${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
    };

    // 6️⃣ Send the email
    const mailResponse = await transport.sendMail(mailOptions);

    // 7️⃣ Log preview URL to view email in browser
    console.log('📩 Preview URL:', nodemailer.getTestMessageUrl(mailResponse));

    return mailResponse;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Mailtrap code (commented out for now)

// import User from '@/models/userModel';
// import bcrypt from 'bcryptjs';
// import nodemailer from 'nodemailer';
// import SMTPTransport from 'nodemailer/lib/smtp-transport';

// export const sendEmail = async ({ email, emailType, userId }: any) => {
//   try {
//     const hashedToken = await bcrypt.hash(userId.toString(), 10);

//     if (emailType === 'VERIFY') {
//       await User.findByIdAndUpdate(userId, {
//         verifyToken: hashedToken,
//         verifyTokenExpiry: Date.now() + 3600000,
//       });
//     } else if (emailType === 'RESET') {
//       await User.findByIdAndUpdate(userId, {
//         forgotPasswordToken: hashedToken,
//         forgotPasswordTokenExpiry: Date.now() + 3600000,
//       });
//     }

//     const transport = nodemailer.createTransport({
//       host: process.env.MAIL_HOST,
//       port: Number(process.env.MAIL_PORT),
//       secure: false,
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//     } as SMTPTransport.Options);

//     await transport.verify();
// console.log("✅ Mailtrap is ready to receive emails");

//     const mailOptions = {
//       from: '"My App" <no-reply@myapp.com>',
//       to: email,
//       subject:
//         emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
//       html: `<p>Click <a href="${
//         process.env.DOMAIN
//       }/verifyemail?token=${hashedToken}">
//   here
// </a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}.
// <br/> Or copy and paste the link below in your browser:<br/>
// ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
//     };

//     const mailResponse = await transport.sendMail(mailOptions);
//     return mailResponse;
//   } catch (error) {
//     console.log('Error sending email:', error);
//   }
// };

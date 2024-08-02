import nodemailer from 'nodemailer';
import { configDotenv } from 'dotenv';
import authEmailTemplate from '../mails/authEmailTemplate.js';

configDotenv();

const sendEmail = async options => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    // host: 'sandbox.smtp.mailtrap.io',
    // port: 2525,
    // auth: {
    //   user: '04ebd1e4ca4c4e',
    //   pass: '4d98982b697521',
    // },
    service: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define the email options
  const mailOptions = {
    from: 'Payertel <noreply@example.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html, // Optionally include HTML formatted email
  };

  // Actually send the email
  await transporter.sendMail(mailOptions);
};

const sendOTP = async (email, otp, recipientName) => {
  const html = authEmailTemplate({
    type: 'otp',
    recipientName,
    companyName: 'Payertel',
    otp,
    email,
  });

  await sendEmail({
    email,
    subject: 'Your OTP Code',
    message: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    html,
  });
};

const sendPasswordReset = async (email, resetToken, recipientName) => {
  const resetURL = `${process.env.CLIENT_URL}/resetPassword/${resetToken}`;
  const html = authEmailTemplate({
    type: 'reset',
    recipientName,
    companyName: 'Payertel',
    actionURL: resetURL,
    email,
  });

  await sendEmail({
    email,
    subject: 'Your password reset token (valid for 1 hour)',
    message: `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}. If you didn't forget your password, please ignore this email!`,
    html,
  });
};

export { sendEmail, sendOTP, sendPasswordReset };

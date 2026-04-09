require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // 👈 THIS is your app password
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages 🚀');
  }
});

// Send email function
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend-Ledger" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log('Message sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Registration email
async function sendRegistrationEmail(userEmail, name) {
     console.log("EMAIL:", userEmail);
  const subject = 'Welcome to Backend Ledger';

  const text = `Hello ${name},
  
Thank you for registering at Backend Ledger. We're excited to have you!

Best regards,
Backend Ledger Team`;

  const html = `
    <p>Hello ${name},</p>
    <p>Thank you for registering at Backend Ledger. We're excited to have you!</p>
    <p>Best regards,<br>Backend Ledger Team</p>
  `;

  await sendEmail(userEmail, subject, text, html);
}

module.exports = {
  sendRegistrationEmail,
};
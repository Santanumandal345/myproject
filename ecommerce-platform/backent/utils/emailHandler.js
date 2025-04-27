import nodemailer from 'nodemailer';
import logger from './logger.js';

const sendEmail = async (options) => {
  // Create reusable transporter object
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  // Email message configuration
  const message = {
    from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html || options.message
  };

  try {
    await transporter.sendMail(message);
    logger.info(`Email sent to ${options.email}`);
  } catch (error) {
    logger.error(`Email sending failed: ${error.message}`);
    throw new Error('Email could not be sent');
  }
};

export default sendEmail;
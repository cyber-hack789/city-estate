// ============================================
// Email Configuration (Nodemailer)
// ============================================

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify connection on startup (non-blocking)
if (process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter.verify().catch((err) => {
    console.warn("⚠️ Email transporter verification failed:", err.message);
  });
} else {
  console.warn("⚠️ SMTP credentials not set. Email sending will not work.");
}

export default transporter;

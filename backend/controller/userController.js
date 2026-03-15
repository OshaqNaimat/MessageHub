import { User } from "../models/userModal.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const generateOTP = () => {
  let random = Math.random() * 10000;
  if (random < 10) {
    random *= 1000;
  } else if (random < 100) {
    random *= 100;
  } else if (random < 1000) {
    random *= 10;
  }
  let floor = Math.floor(random);

  return floor;
};

export const registerUser = async (req, res) => {
  const { name, email, number, password } = req.body;
  if (!name || !email || !number || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  //   hash the password

  const hashPassword = await bcrypt.hash(password, 10);

  // configuration for mail
  //   const transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: "oshaqnaimat3@gmail.com",
  //       pass: "nvckixjthfzngpxi",
  //     },
  //   });

  //   //  make mail options

  //   const mailOptions = {
  //     from: "oshaqnaimat3@gmail.com",
  //     to: email,
  //     subject: "OTP Verification",
  //     html: ` <!DOCTYPE html>
  // <html lang="en">
  // <head>
  // <meta charset="UTF-8">
  // <meta name="viewport" content="width=device-width, initial-scale=1.0">
  // <title>OTP Verification Email</title>
  // <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600&display=swap" rel="stylesheet">
  // <style>
  //   * { margin: 0; padding: 0; box-sizing: border-box; }

  //   body {
  //     background: #0e0e0e;
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //     min-height: 100vh;
  //     padding: 32px 16px;
  //     font-family: 'DM Sans', sans-serif;
  //   }

  //   @keyframes float-up {
  //     0%   { opacity: 0; transform: translateY(24px); }
  //     100% { opacity: 1; transform: translateY(0); }
  //   }
  //   @keyframes scale-in {
  //     0%   { opacity: 0; transform: scale(0.88); }
  //     100% { opacity: 1; transform: scale(1); }
  //   }
  //   @keyframes digit-pop {
  //     0%   { opacity: 0; transform: translateY(12px) scale(0.9); }
  //     60%  { transform: translateY(-3px) scale(1.06); }
  //     100% { opacity: 1; transform: translateY(0) scale(1); }
  //   }
  //   @keyframes shimmer {
  //     0%   { background-position: -200% center; }
  //     100% { background-position: 200% center; }
  //   }
  //   @keyframes tick-spin {
  //     0%   { transform: rotate(-90deg) scale(0); opacity: 0; }
  //     60%  { transform: rotate(8deg) scale(1.1); opacity: 1; }
  //     100% { transform: rotate(0deg) scale(1); opacity: 1; }
  //   }
  //   @keyframes bar-fill {
  //     0%   { width: 0%; }
  //     100% { width: 78%; }
  //   }
  //   @keyframes fade-in {
  //     from { opacity: 0; }
  //     to   { opacity: 1; }
  //   }

  //   .email-wrapper {
  //     width: 100%;
  //     max-width: 520px;
  //     animation: scale-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  //   }

  //   .email-card {
  //     background: #ffffff;
  //     border-radius: 24px;
  //     overflow: hidden;
  //     box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06);
  //   }

  //   /* ── Header ── */
  //   .header {
  //     position: relative;
  //     background: #0d1f14;
  //     padding: 40px 40px 36px;
  //     overflow: hidden;
  //   }
  //   .header-bg {
  //     position: absolute;
  //     inset: 0;
  //     background:
  //       radial-gradient(ellipse 60% 80% at 20% 50%, rgba(34,197,94,0.18) 0%, transparent 60%),
  //       radial-gradient(ellipse 50% 70% at 85% 20%, rgba(16,185,129,0.14) 0%, transparent 60%),
  //       radial-gradient(ellipse 40% 60% at 60% 90%, rgba(74,222,128,0.10) 0%, transparent 60%);
  //     animation: fade-in 1s ease forwards;
  //   }
  //   .header-grid {
  //     position: absolute;
  //     inset: 0;
  //     background-image:
  //       linear-gradient(rgba(74,222,128,0.04) 1px, transparent 1px),
  //       linear-gradient(90deg, rgba(74,222,128,0.04) 1px, transparent 1px);
  //     background-size: 32px 32px;
  //   }
  //   .header-content { position: relative; z-index: 1; }

  //   .logo-row {
  //     display: flex;
  //     align-items: center;
  //     gap: 10px;
  //     margin-bottom: 28px;
  //     animation: float-up 0.5s 0.1s both;
  //   }
  //   .logo-icon {
  //     width: 36px; height: 36px;
  //     background: linear-gradient(135deg, #22c55e, #10b981);
  //     border-radius: 10px;
  //     display: flex; align-items: center; justify-content: center;
  //     box-shadow: 0 4px 16px rgba(34,197,94,0.4);
  //   }
  //   .logo-icon svg { width: 18px; height: 18px; }
  //   .logo-text {
  //     font-family: 'Playfair Display', serif;
  //     font-size: 18px;
  //     color: #ffffff;
  //     letter-spacing: 0.02em;
  //   }
  //   .header-title {
  //     font-size: 28px;
  //     font-weight: 300;
  //     color: #ffffff;
  //     line-height: 1.25;
  //     margin-bottom: 8px;
  //     animation: float-up 0.5s 0.2s both;
  //   }
  //   .header-title strong {
  //     font-weight: 600;
  //     background: linear-gradient(90deg, #4ade80, #34d399, #6ee7b7, #4ade80);
  //     background-size: 200% auto;
  //     -webkit-background-clip: text;
  //     -webkit-text-fill-color: transparent;
  //     background-clip: text;
  //     animation: shimmer 3s linear infinite;
  //   }
  //   .header-sub {
  //     font-size: 13px;
  //     color: rgba(255,255,255,0.45);
  //     animation: float-up 0.5s 0.3s both;
  //     letter-spacing: 0.01em;
  //   }

  //   /* ── Body ── */
  //   .body { padding: 36px 40px; background: #ffffff; }

  //   .greeting {
  //     font-size: 15px;
  //     color: #374151;
  //     margin-bottom: 6px;
  //     animation: float-up 0.5s 0.35s both;
  //     opacity: 0;
  //   }
  //   .message {
  //     font-size: 14px;
  //     color: #6b7280;
  //     line-height: 1.65;
  //     margin-bottom: 32px;
  //     animation: float-up 0.5s 0.4s both;
  //     opacity: 0;
  //   }

  //   /* OTP */
  //   .otp-label {
  //     font-size: 11px;
  //     font-weight: 600;
  //     letter-spacing: 0.12em;
  //     text-transform: uppercase;
  //     color: #9ca3af;
  //     margin-bottom: 12px;
  //     animation: float-up 0.5s 0.45s both;
  //     opacity: 0;
  //   }
  //   .otp-row {
  //     display: flex;
  //     gap: 10px;
  //     margin-bottom: 20px;
  //     flex-wrap: wrap;
  //   }
  //   .otp-digit {
  //     flex: 1;
  //     min-width: 52px;
  //     height: 64px;
  //     background: #f8fafc;
  //     border: 1.5px solid #bbf7d0;
  //     border-radius: 14px;
  //     display: flex; align-items: center; justify-content: center;
  //     font-family: 'DM Sans', sans-serif;
  //     font-size: 28px;
  //     font-weight: 600;
  //     color: #111827;
  //     opacity: 0;
  //     animation: digit-pop 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  //     position: relative;
  //     overflow: hidden;
  //   }
  //   .otp-digit::after {
  //     content: '';
  //     position: absolute;
  //     inset: 0;
  //     background: linear-gradient(135deg, rgba(34,197,94,0.06), transparent 60%);
  //   }
  //   .otp-digit:nth-child(1) { animation-delay: 0.50s; }
  //   .otp-digit:nth-child(2) { animation-delay: 0.60s; }
  //   .otp-digit:nth-child(3) { animation-delay: 0.70s; }
  //   .otp-digit:nth-child(4) { animation-delay: 0.80s; }
  //   .otp-digit:nth-child(5) { animation-delay: 0.90s; }
  //   .otp-digit:nth-child(6) { animation-delay: 1.00s; }

  //   /* Expiry bar */
  //   .expiry-wrap {
  //     margin-bottom: 28px;
  //     animation: float-up 0.5s 1.1s both;
  //     opacity: 0;
  //   }
  //   .expiry-top {
  //     display: flex;
  //     justify-content: space-between;
  //     align-items: center;
  //     margin-bottom: 7px;
  //   }
  //   .expiry-text {
  //     font-size: 12px;
  //     color: #9ca3af;
  //     display: flex; align-items: center; gap: 5px;
  //   }
  //   .expiry-text svg { width: 12px; height: 12px; }
  //   .expiry-time { font-size: 12px; font-weight: 600; color: #22c55e; }
  //   .bar-track { height: 3px; background: #f3f4f6; border-radius: 99px; overflow: hidden; }
  //   .bar-fill {
  //     height: 100%;
  //     background: linear-gradient(90deg, #4ade80, #10b981);
  //     border-radius: 99px;
  //     animation: bar-fill 2.5s 1.2s cubic-bezier(0.25, 1, 0.5, 1) both;
  //   }

  //   /* CTA Button */
  //   .cta-btn {
  //     display: block;
  //     width: 100%;
  //     padding: 15px;
  //     background: linear-gradient(135deg, #16a34a, #059669);
  //     color: #ffffff;
  //     border: none;
  //     border-radius: 14px;
  //     font-family: 'DM Sans', sans-serif;
  //     font-size: 15px;
  //     font-weight: 600;
  //     text-align: center;
  //     cursor: pointer;
  //     margin-bottom: 28px;
  //     box-shadow: 0 8px 24px rgba(22,163,74,0.3);
  //     animation: float-up 0.5s 1.15s both;
  //     opacity: 0;
  //     position: relative;
  //     overflow: hidden;
  //     transition: transform 0.15s, box-shadow 0.15s;
  //     text-decoration: none;
  //   }
  //   .cta-btn:hover {
  //     transform: translateY(-2px);
  //     box-shadow: 0 12px 32px rgba(22,163,74,0.4);
  //   }
  //   .cta-btn::after {
  //     content: '';
  //     position: absolute;
  //     inset: 0;
  //     background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
  //     background-size: 200% 100%;
  //     animation: shimmer 2.5s 1.5s linear infinite;
  //   }
  //   .tick-wrap { display: inline-flex; align-items: center; gap: 8px; }
  //   .tick-wrap svg {
  //     width: 16px; height: 16px;
  //     animation: tick-spin 0.5s 1.5s cubic-bezier(0.22, 1, 0.36, 1) both;
  //     opacity: 0;
  //   }

  //   /* Divider */
  //   .divider {
  //     display: flex;
  //     align-items: center;
  //     gap: 12px;
  //     margin-bottom: 20px;
  //     animation: float-up 0.5s 1.2s both;
  //     opacity: 0;
  //   }
  //   .divider-line { flex: 1; height: 1px; background: #f3f4f6; }
  //   .divider-text { font-size: 12px; color: #d1d5db; white-space: nowrap; }

  //   /* Security Tips */
  //   .tips {
  //     display: flex;
  //     flex-direction: column;
  //     gap: 10px;
  //     margin-bottom: 28px;
  //     animation: float-up 0.5s 1.25s both;
  //     opacity: 0;
  //   }
  //   .tip {
  //     display: flex;
  //     align-items: flex-start;
  //     gap: 10px;
  //     padding: 12px 14px;
  //     background: #fafafa;
  //     border-radius: 10px;
  //     border: 1px solid #f3f4f6;
  //   }
  //   .tip-icon {
  //     flex-shrink: 0;
  //     width: 22px; height: 22px;
  //     border-radius: 6px;
  //     display: flex; align-items: center; justify-content: center;
  //     font-size: 12px;
  //   }
  //   .tip-icon.warn { background: #fef9c3; }
  //   .tip-icon.info { background: #dbeafe; }
  //   .tip-text { font-size: 12px; color: #6b7280; line-height: 1.55; }
  //   .tip-text strong { color: #374151; font-weight: 500; }
  //   .tip-text a { color: #22c55e; text-decoration: none; }
  //   .tip-text a:hover { text-decoration: underline; }

  //   /* Footer */
  //   .footer {
  //     padding: 20px 40px 28px;
  //     background: #f9fafb;
  //     border-top: 1px solid #f3f4f6;
  //     animation: float-up 0.5s 1.3s both;
  //     opacity: 0;
  //   }
  //   .footer-brand { font-size: 12px; color: #9ca3af; margin-bottom: 4px; }
  //   .footer-brand strong { color: #6b7280; }
  //   .footer-copy { font-size: 11px; color: #d1d5db; margin-top: 10px; }
  //   .footer-links { display: flex; gap: 16px; margin-top: 10px; flex-wrap: wrap; }
  //   .footer-links a {
  //     font-size: 11px; color: #9ca3af;
  //     text-decoration: none;
  //     transition: color 0.2s;
  //   }
  //   .footer-links a:hover { color: #22c55e; }

  //   /* Responsive */
  //   @media (max-width: 480px) {
  //     .header, .body { padding: 28px 24px; }
  //     .footer { padding: 18px 24px 24px; }
  //     .header-title { font-size: 22px; }
  //     .otp-digit { font-size: 22px; height: 54px; min-width: 38px; }
  //     .otp-row { gap: 7px; }
  //   }
  // </style>
  // </head>
  // <body>

  // <div class="email-wrapper">
  //   <div class="email-card">

  //     <!-- Header -->
  //     <div class="header">
  //       <div class="header-bg"></div>
  //       <div class="header-grid"></div>
  //       <div class="header-content">

  //         <div class="logo-row">
  //           <div class="logo-icon">
  //             <svg viewBox="0 0 24 24" fill="none">
  //               <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="white" opacity="0.9"/>
  //               <path d="M9 12l2 2 4-4" stroke="#0d1f14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  //             </svg>
  //           </div>
  //           <span class="logo-text">MessageHub</span>
  //         </div>

  //         <h1 class="header-title">Your <strong>verification</strong><br>code is ready</h1>
  //         <p class="header-sub">One-time password &middot; Expires in 10 minutes</p>

  //       </div>
  //     </div>

  //     <!-- Body -->
  //     <div class="body">

  //       <p class="greeting">Hello 👋</p>
  //       <p class="message">We received a sign-in request for your account. Use the code below to complete your verification. Do not share this code with anyone.</p>

  //       <p class="otp-label">Your one-time code</p>

  //     <div class="otp-digit">${generateOTP()}</div>

  //       <!-- Divider -->
  //       <div class="divider">
  //         <div class="divider-line"></div>
  //         <span class="divider-text">security notice</span>
  //         <div class="divider-line"></div>
  //       </div>

  //       <!-- Security Tips -->
  //     //   <div class="tips">
  //     //     <div class="tip">
  //     //       <div class="tip-icon warn">⚠️</div>
  //     //       <p class="tip-text"><strong>Never share this code.</strong> Our team will never ask for your OTP via email, phone, or chat.</p>
  //     //     </div>
  //     //     <div class="tip">
  //     //       <div class="tip-icon info">🔒</div>
  //     //       <p class="tip-text"><strong>Didn't request this?</strong> If you didn't initiate this login, you can safely ignore this email or <a href="#">secure your account</a>.</p>
  //     //     </div>
  //     //   </div>

  //     // </div>

  //     // <!-- Footer -->
  //     // <div class="footer">
  //     //   <p class="footer-brand">Sent by <strong>Veritas Security</strong> &middot; 123 Security Lane, San Francisco, CA 94102</p>
  //     //   <p class="footer-copy">&copy; 2026 Veritas Inc. All rights reserved. This is an automated message &mdash; please do not reply.</p>
  //     //   <div class="footer-links">
  //     //     <a href="#">Unsubscribe</a>
  //     //     <a href="#">Privacy Policy</a>
  //     //     <a href="#">Terms of Service</a>
  //     //     <a href="#">Help Center</a>
  //     //   </div>
  //     // </div>

  //   </div>
  // </div>

  // </body>
  // </html>`,
  //   };

  const createdUser = await User.create({
    name,
    email,
    password: hashPassword,
    number,
    otp: generateOTP(),
  });

  res.send(createdUser);
};

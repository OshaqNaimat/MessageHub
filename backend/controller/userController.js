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
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "oshaqnaimatmemon@gmail.com",
      pass: "tiyijhvrercrecko",
    },
  });

  let myOTP = generateOTP();

  //  make mail options

  // Before building mailOptions, split the OTP:
  // const otpDigits = String(myOTP)
  //   .split("")
  //   .map((d) => `<div class="otp-digit">${d}</div>`)
  //   .join("");

  const mailOptions = {
    from: "oshaqnaimat3@gmail.com",
    to: email,
    subject: "OTP Verification for MessegeHub",
    html: ` <!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>OTP Verification</title>
</head>

<body style="margin:0; padding:0; font-family:Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<!-- Wrapper -->
<div style="max-width:520px; width:100%; margin:auto;">

<!-- Card -->
<div style="background:#ffffff; border-radius:24px; border: 2px solid #28a745; overflow:hidden;">

<!-- Header -->
<div style="background:#0d1f14; padding:40px; color:#ffffff;">

  <div style="display:flex; align-items:center; gap:10px;">
   <div style="
  width:36px;
  height:36px;
  background:linear-gradient(135deg,#22c55e,#10b981);
  border-radius:10px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  color:white
">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</div>
    <span style="font-family:Georgia, serif; font-size:18px;margin:0;">MessageHub</span>
  </div>

  <h1 style="font-size:26px; margin-top:20px; margin-bottom:10px;">
    <strong style="color:#4ade80;">verification</strong><br>
    code 
  </h1>

 

</div>

<!-- Body -->
<div style="padding:36px;">

  <p style="font-size:15px; color:#374151;">Hello 👋</p>

  <p style="font-size:14px; color:#6b7280; line-height:1.6;">
    We received a sign-in request for your account. Use the code below to complete your verification.
  </p>



  <!-- OTP -->
 <div style="text-align:center; margin-top:15px;">
  
  <p style="
    font-size:11px;
    font-weight:600;
    letter-spacing:0.15em;
    text-transform:uppercase;
    color:#9ca3af;
    margin:0 0 14px 0;
  ">Your one-time code</p>

  <div style="
    display:inline-flex;
    gap:10px;
    background:linear-gradient(135deg,#f0fdf4,#dcfce7);
    border:1.5px solid #bbf7d0;
    border-radius:20px;
    padding:18px 28px;
  ">
    ${String(myOTP)
      .split("")
      .map(
        (d) => `
      <div style="
        width:52px;
        height:60px;
        background:#ffffff;
        border:1.5px solid #86efac;
        border-radius:12px;
        font-size:26px;
        font-weight:700;
        color:#15803d;
        text-align:center;
        line-height:60px;
        margin: 0 2px;
        box-shadow:0 4px 12px rgba(34,197,94,0.15);
      ">${d}</div>
    `,
      )
      .join("")}
  </div>

 

</div>

  <!-- Divider -->
  <div style="margin-top:30px; text-align:center;">
    <hr style="border:none; border-top:1px solid #eee;">
    </div>

</div>

</div>
</div>

</td>
</tr>
</table>

</body>
</html>`,
  };

  // send the mail

  transporter.sendMail(mailOptions, (err, info) => {
    try {
      console.log("mail send");
    } catch (error) {
      console.log(error);
    }
  });

  // const createdUser = await User.create({
  //   name,
  //   email,
  //   password: hashPassword,
  //   number,
  //   otp: myOTP,
  // });

  // res.send(createdUser);
};

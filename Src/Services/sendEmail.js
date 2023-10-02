import nodemailer from "nodemailer";
async function sendEmail(to, subject, html) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SENDEMAIL,
            pass: process.env.SENDPASSWORD,
        },
    });
  const info = await transporter.sendMail({
    from: `TellMe app, ${process.env.SENDEMAIL}`, 
    to: to,
    subject: subject, 
    html: html, 
  });
}
export default sendEmail;
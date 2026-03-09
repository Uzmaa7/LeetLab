// import dotenv from "dotenv";
// import nodemailer from "nodemailer";

// dotenv.config();

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         type: 'OAuth2',
//         user: process.env.EMAIL_USER,
//         clientId: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         refreshToken: process.env.REFRESH_TOKEN,
//     }
// });

// transporter.verify((error, success) => {
//     if(error){
//         console.log("Error connecting to email server:", error);
//     }else{
//         console.log("Email server is ready to send message");
//     }
// });

// // Function to send email
// const sendEmail = async (to, subject, text, html) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"LeetLab" <${process.env.EMAIL_USER}>`, // sender address
//       to, // list of receivers
//       subject, // Subject line
//       text, // plain text body
//       html, // html body
//     });

//     console.log('Message sent: %s', info.messageId);
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// };



// const sendRegistartionEmail = async (email, fullname) => {
//     const subject = "Welcome to LeetLab !!";
//     const text = `Hello ${fullname}, \n\nThank you for requesting at LeetLab.
//     We're excited to have you on board!\n\nBest regards,\nThe LeetLab Team`;
//     const html = `<p>Hello ${fullname},</p><p>Thank you for requesting at LeetLab.
//     We're excited to have you on board!</p><p>Best regards,\nThe LeetLab Team</p>`;

//     await sendEmail(email, subject, text, html);
// }

// export default sendRegistartionEmail;
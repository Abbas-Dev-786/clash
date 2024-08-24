import nodemailer from "nodemailer";
import ejs from "ejs";
import { __dirName } from "../app.js";

const newTransport = () => {
  const dev = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.NODEMAILER_USERNAME,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const prod = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  return process.env.NODE_ENV === "prod" ? prod : dev;
};

const getHTML = async (fileName: string) => {
  return ejs.renderFile(`${__dirName}/views/${fileName}.ejs`);
};

const sendMail = async (to: string, subject: string, templateName: string) => {
  try {
    console.log("sending email");
    const html = await getHTML(templateName);

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    };

    await newTransport().sendMail(mailOptions);
  } catch (err) {
    console.log(err);
    const error = new Error(
      "There was an error sending the email. Try again later!"
    );
    error.name = "EmailSendingError";

    //   this.user.emailVerifyToken = undefined;
    //   this.user.passwordResetToken = undefined;
    //   this.user.passwordResetExpires = undefined;
    //   await this.user.save({ validateBeforeSave: false });

    throw error;
  }
};

export default sendMail;

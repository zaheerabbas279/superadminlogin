const nodemailer = require("nodemailer");
/**
 *
 * @param {string} toAddress --> email id
 * @param {{organization,detials:{userName,password}}} emailBody
 */
const sendMail = async (toAddress, emailBody) => {
  console.log("🚀 ~ file: mail.service.js:8 ~ sendMail ~ emailBody:", emailBody)
  try {
    const {
      organization,
      detials: { userName, password },
    } = emailBody;
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "abbaszaheer216@gmail.com",
        pass: "ypljjcxiysxmajda",
      },
    });
    let mailDetails = {
      from: "abbaszaheer216@gmail.com",
      to: `${toAddress}`,
      subject: "Test mail",
      // text: "Test Mail from Cosmonet",
      html: `<div>
      <h2>Hi, ${toAddress},</h2>
      <p>Please click on the link, to login with your account. <a href="https://www.google.com">${organization}</a> </p>
      <h3>Your account details are </h3>
      <p>Email - ${userName} </p>
      <p>Password - ${password} </p>
      </div>`,
    };
    const mailResponse = await mailTransporter.sendMail(mailDetails);

    // function (err, data) {
    //       console.log("triggred");
    //       if (err) {
    //         console.log("Error Occurs");
    //       } else {
    //         console.log("Email sent successfully");
    //       }
    //     }
    // );
  } catch (error) {
    throw error;
  }
};

module.exports = { sendMail };

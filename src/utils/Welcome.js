import { decrypt } from '../utils/Encrypt_decrypt.js';
import SibApiV3Sdk from 'sib-api-v3-sdk';
import express from 'express';

const app = express();
app.use(express.json({ limit: "16kb" }))

var defaultClient = SibApiV3Sdk.ApiClient.instance;
const sendWelcomeTemplate = async (User) => {
    const sender_name = "Nera Soft";
    const sender_email = "amit.developer2024@gmail.com";

    let user_id = decrypt(User.user_id);
    let to_email = decrypt(User.email);
    let to_name = decrypt(User.name);
    let security_pin = decrypt(User.security_pin);
    let password = decrypt(User.password);
    let message = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Registration Success</title>
</head>
<body style="margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; height: 100% !important; width: 100% !important;">
    <table style="width: 100%; border-collapse: collapse; margin: 0 auto; padding: 0;">
        <tr>
            <td>
                <table style="width: 100%; max-width: 1140px; margin: 40px auto; background-color: #fff; border: 15px solid #f4f6f9;">
                    <tr>
                        <td style="padding: 20px; text-align: center; background-color: #f4f6f9;">
                            <a href="#">
                                <img src="https://nifipayments.com/assets/images/logo.png" alt="Nifi Payments Logo" style="width: 140px; border: 0;">
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px; text-align: center;">
                            <h3 style="margin: 0; font-size: 24px; color: #085b8a;">Registration Successful</h3>
                            <p style="font-size: 16px; margin: 20px 0;">Welcome to Nifi Payments! Your account has been created successfully. Below are your account details:</p>
                            <p style="font-size: 16px; margin: 10px 0;"><strong>Name:</strong> ${to_name}</p>
                            <p style="font-size: 16px; margin: 10px 0;"><strong>Email:</strong> ${to_email}</p>
                            <p style="font-size: 16px; margin: 10px 0;"><strong>User ID:</strong> ${user_id}</p>
                            <p style="font-size: 16px; margin: 10px 0;"><strong>Security Pin:</strong> ${security_pin}</p>
                            <p style="font-size: 16px; margin: 10px 0;"><strong>Password or Security Pin:</strong> ${password}</p>
                            <a href="#}" style="width: 200px; display: inline-block; padding: 12px 20px; font-size: 18px; font-weight: bold; color: #ffffff; text-decoration: none; background-color: #99c35c; border-radius: 4px; box-shadow: 0 6px 2px -2px #648732; margin: 20px auto; text-align: center; display: block;">Login to Your Account</a>
                            <p style="font-size: 16px; margin: 20px 0;">If you have any questions or need assistance, feel free to contact our support team.</p>
                            <a href="#" style="width: 200px; display: inline-block; padding: 12px 20px; font-size: 18px; font-weight: bold; color: #ffffff; text-decoration: none; background-color: #085b8a; border-radius: 4px; box-shadow: 0 6px 2px -2px #054370; margin: 20px auto; text-align: center; display: block;">Contact Support</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; text-align: center; background-color: #f4f6f9;">
                            <p style="font-size: 12px; color: #aaa; margin: 0;">&copy; 2024 Nifi Payments. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
    try {
        if (to_email) {

            var apiKey = defaultClient.authentications['api-key'];
            apiKey.apiKey = process.env.BREVO_API_KEY;

            let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
            let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
            sendSmtpEmail.to = [{ 'email': to_email, 'name': to_name }];
            sendSmtpEmail.sender = { 'name': sender_name, 'email': sender_email };
            sendSmtpEmail.subject = "Register User Successfully";
            sendSmtpEmail.htmlContent = message;
            // res.status(200).json({message : sendSmtpEmail});
            //   the email
            apiInstance.sendTransacEmail(sendSmtpEmail).then(
                function (data) {
                    return true;

                },
                function (error) {
                    return true;
                }
            );
        }
        else {
            return true;

        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const sendLoginInformation = async (User,res) => {
    
    const sender_name = "Nera Soft";
    const sender_email = "amit.developer2024@gmail.com";
    let user_id = decrypt(User.user_id);
    let to_email = decrypt(User.email);
    let to_name = decrypt(User.name);
    let security_pin = decrypt(User.security_pin);
    let password = decrypt(User.password);
    let message = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Login Notification</title>
</head>
<body style="margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; height: 100% !important; width: 100% !important;">
    <table style="width: 100%; border-collapse: collapse; margin: 0 auto; padding: 0;">
        <tr>
            <td>
                <table style="width: 100%; max-width: 1140px; margin: 40px auto; background-color: #fff; border: 15px solid #f4f6f9;">
                    <tr>
                        <td style="padding: 20px; text-align: center; background-color: #f4f6f9;">
                            <a href="#">
                                <img src="https://nifipayments.com/assets/images/logo.png" alt="Nifi Payments Logo" style="width: 140px; border: 0;">
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px; text-align: center;">
                            <h3 style="margin: 0; font-size: 24px; color: #085b8a;">Login Notification</h3>
                            <p style="font-size: 16px; margin: 20px 0;">We noticed a login to your account from a new device or location. If this was you, no further action is needed. If you did not log in, please follow the instructions below to secure your account:</p>
                            <p style="font-size: 16px; margin: 10px 0;"><strong>Name:</strong> ${to_name}</p>
                            <p style="font-size: 16px; margin: 10px 0;"><strong>User Agent:</strong> Chrome</p>
                            <p style="font-size: 16px; margin: 10px 0;"><strong>Location:</strong> Noida 135</p>
                            <p style="font-size: 16px; margin: 10px 0;"><strong>Device Info:</strong> Window 11 </p>
                            <p style="font-size: 16px; margin: 20px 0;">If you did not initiate this login, your account may be at risk. Click the button below to secure your account:</p>
                            <a href="${User._id}" style="width: 200px; display: inline-block; padding: 12px 20px; font-size: 18px; font-weight: bold; color: #ffffff; text-decoration: none; background-color: #99c35c; border-radius: 4px; box-shadow: 0 6px 2px -2px #648732; margin: 20px auto; text-align: center; display: block;">Secure Your Account</a>
                            <p style="font-size: 16px; margin: 20px 0;">To log out and end your current session, click the button below:</p>
                            <a href="#" style="width: 200px; display: inline-block; padding: 12px 20px; font-size: 18px; font-weight: bold; color: #ffffff; text-decoration: none; background-color: #ff4d4d; border-radius: 4px; box-shadow: 0 6px 2px -2px #d43f3a; margin: 20px auto; text-align: center; display: block;">Log Out</a>
                            <p style="font-size: 16px; margin: 20px 0;">If you have any questions or need assistance, feel free to contact our support team.</p>
                            <a href="#" style="width: 200px; display: inline-block; padding: 12px 20px; font-size: 18px; font-weight: bold; color: #ffffff; text-decoration: none; background-color: #085b8a; border-radius: 4px; box-shadow: 0 6px 2px -2px #054370; margin: 20px auto; text-align: center; display: block;">Contact Support</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; text-align: center; background-color: #f4f6f9;">
                            <p style="font-size: 12px; color: #aaa; margin: 0;">&copy; 2024 Nifi Payments. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>

`;
    try {
        if (to_email) {

            var apiKey = defaultClient.authentications['api-key'];
            apiKey.apiKey = process.env.BREVO_API_KEY;

            let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
            let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
            sendSmtpEmail.to = [{ 'email': to_email, 'name': to_name }];
            sendSmtpEmail.sender = { 'name': sender_name, 'email': sender_email };
            sendSmtpEmail.subject = "Nifi Payments User Login Successfully ";
            sendSmtpEmail.htmlContent = message;
            // res.status(200).json({message : sendSmtpEmail});
            //   the email
            apiInstance.sendTransacEmail(sendSmtpEmail).then(
                function (data) {
                    return true;

                },
                function (error) {
                    return true;
                }
            );
        }
        else {
            return true;

        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}





export { sendWelcomeTemplate, sendLoginInformation }



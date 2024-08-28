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
    <title>Login Notification</title>
</head>
<body style="-webkit-box-sizing: border-box;box-sizing: border-box;margin: 0 auto;padding: 0;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100% !important;width: 100% !important;">
    <table id="bodyTable"
           style="-webkit-box-sizing: border-box;box-sizing: border-box;width: 100% !important;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0 auto;padding: 0;background-color: #f4f6f9;font-family: sans-serif;height: 100% !important;">
        <tr style="-webkit-box-sizing: border-box;box-sizing: border-box;">
            <td style="-webkit-box-sizing: border-box;box-sizing: border-box;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                <table id="content"
                       style="-webkit-box-sizing: border-box;box-sizing: border-box;width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;max-width: 1140px;margin: 40px auto 0;background-color: #fff;border-right: 15px solid #f4f6f9;border-left: 15px solid #f4f6f9;">
                    <tr style="-webkit-box-sizing: border-box;box-sizing: border-box;">
                        <td style="-webkit-box-sizing: border-box;box-sizing: border-box;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <table id="header-container"
                                   style="-webkit-box-sizing: border-box;box-sizing: border-box;width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;border-top: 20px solid transparent;border-bottom: 20px solid transparent;">
                                <tr style="-webkit-box-sizing: border-box;box-sizing: border-box;">
                                    <td class="top-logo-container"
                                        style="-webkit-box-sizing: border-box;box-sizing: border-box;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;width: 50%;padding-left: 0.5rem;padding-top: 5px;">
                                        <a href="#"
                                           style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><img
                                                class="logo" src="https://nifipayments.com/assets/images/logo.png" alt="logo"
                                                style="-webkit-box-sizing: border-box;box-sizing: border-box;border: 0;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;width: 140px;"></a>
                                    </td>
                                </tr>
                            </table>
                            <table id="sectionOne"
                                   style="-webkit-box-sizing: border-box;box-sizing: border-box;width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #ebebeb;text-align: center;">
                                <tr style="-webkit-box-sizing: border-box;box-sizing: border-box;">
                                    <td style="-webkit-box-sizing: border-box;box-sizing: border-box;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                        <h3 class="title" style="-webkit-box-sizing: border-box;box-sizing: border-box;">
                                            <span style="-webkit-box-sizing: border-box;box-sizing: border-box;color: #8cbb4c;font-size: 22.4px;">Welcome</span><br
                                                style="-webkit-box-sizing: border-box;box-sizing: border-box;">
                                            <span class="name"
                                                  style="-webkit-box-sizing: border-box;box-sizing: border-box;color: #085b8a;font-size: 22.4px;font-weight: bold;">Nifi Payments</span>
                                        </h3>
                                    </td>
                                </tr>
                            </table>
                            <table style="-webkit-box-sizing: border-box;box-sizing: border-box;width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                <tr style="-webkit-box-sizing: border-box;box-sizing: border-box;">
                                    <td id="sectionTwoContainer"
                                        style="-webkit-box-sizing: border-box;box-sizing: border-box;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;border-right: 10px solid transparent;border-left: 10px solid transparent;">
                                        <h3 class="section-title"
                                            style="-webkit-box-sizing: border-box;box-sizing: border-box;color: #085b8a;font-weight: bold;padding: 30px 0 20px;margin: 0;background-color: #fff;text-align: center;font-size: 21px;">
                                            Login Notification</h3>
                                        <div id="sectionTwo"
                                             style="-webkit-box-sizing: border-box;box-sizing: border-box;background-color: #fff;border: 1px solid #a0a0a0;text-align: center;">
                                            <p style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-size: 14px;">
                                                We noticed a login to your account from a new device or location. If this was you, no further action is needed. If you did not log in, please secure your account by following the link below.</p>
                                            <div style="-webkit-box-sizing: border-box;box-sizing: border-box;text-align: center;">
                                                <a href="${User.user_id}" class="btn btn-primary login"
                                                   style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;border-left: 1px solid #000;padding-right: .5rem;color: #ffffff;text-decoration: none;background-color: #99c35c;border-radius: 0;border-color: transparent;width: 250px;padding: 12px 0;-webkit-box-shadow: 0 6px 2px -2px #648732;box-shadow: 0 6px 2px -2px #648732;margin: 20px auto;font-weight: bold;font-size: 18px;display: block;text-align: center;">Secure Your Account</a>
                                            </div>
                                        </div>
                                        <h3 class="section-title"
                                            style="-webkit-box-sizing: border-box;box-sizing: border-box;color: #085b8a;font-weight: bold;padding: 30px 0 20px;margin: 0;background-color: #fff;text-align: center;font-size: 21px;">
                                            Getting Started</h3>
                                    </td>
                                </tr>
                            </table>
                            <table style="-webkit-box-sizing: border-box;box-sizing: border-box;width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                <tr style="-webkit-box-sizing: border-box;box-sizing: border-box;">
                                    <td id="sectionThree"
                                        style="-webkit-box-sizing: border-box;box-sizing: border-box;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #e6f2f8;padding: 40px 0;margin-bottom: 20px;text-align: center;border-bottom: 24px solid transparent;border-right: 20px solid transparent;border-left: 20px solid transparent;">
                                        <h3 class="title"
                                            style="-webkit-box-sizing: border-box;box-sizing: border-box;color: #0f5b8e;margin: 0;font-weight: normal;">Thank you for choosing Nifi Payments</h3>
                                        <p style="-webkit-box-sizing: border-box;box-sizing: border-box;margin: 20px 0;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-size: 16px;">
                                            If you have any questions, feel free to contact our support team.</p>
                                        <div style="-webkit-box-sizing: border-box;box-sizing: border-box;text-align: center;">
                                            <a href="%%SUPPORT_LINK%%" class="btn btn-secondary contact-us"
                                               style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;border-left: 1px solid #000;padding-right: .5rem;color: #ffffff;text-decoration: none;background-color: #085b8a;border-radius: 0;border-color: transparent;width: 250px;padding: 12px 0;-webkit-box-shadow: 0 6px 2px -2px #054370;box-shadow: 0 6px 2px -2px #054370;margin: 20px auto;font-weight: bold;font-size: 18px;display: block;text-align: center;">Contact Support</a>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table style="-webkit-box-sizing: border-box;box-sizing: border-box;width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                <tr style="-webkit-box-sizing: border-box;box-sizing: border-box;">
                                    <td id="footer"
                                        style="-webkit-box-sizing: border-box;box-sizing: border-box;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;padding: 20px;text-align: center;background-color: #f4f6f9;">
                                        <p style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-size: 12px;color: #aaa;">
                                            &copy; 2024 Nifi Payments. All rights reserved.</p>
                                    </td>
                                </tr>
                            </table>
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
<body style="-webkit-box-sizing: border-box;box-sizing: border-box;margin: 0 auto;padding: 0;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100% !important;width: 100% !important;">
    <table id="bodyTable"
           style="-webkit-box-sizing: border-box;box-sizing: border-box;width: 100% !important;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0 auto;padding: 0;background-color: #f4f6f9;font-family: sans-serif;height: 100% !important;">
        <tr style="-webkit-box-sizing: border-box;box-sizing: border-box;">
            <td style="-webkit-box-sizing: border-box;box-sizing: border-box;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                <table id="content"
                       style="-webkit-box-sizing: border-box;box-sizing: border-box;width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;max-width: 1140px;margin: 40px auto 0;background-color: #fff;border-right: 15px solid #f4f6f9;border-left: 15px solid #f4f6f9;">
                    <tr style="-webkit-box-sizing: border-box;box-sizing: border-box;">
                        <td style="-webkit-box-sizing: border-box;box-sizing: border-box;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <table id="header-container"
                                   style="-webkit-box-sizing: border-box;box-sizing: border-box;width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;border-top: 20px solid transparent;border-bottom: 20px solid transparent;">
                                <tr style="-webkit-box-sizing: border-box;box-sizing: border-box;">
                                    <td class="top-logo-container"
                                        style="-webkit-box-sizing: border-box;box-sizing: border-box;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;width: 50%;padding-left: 0.5rem;padding-top: 5px;">
                                        <a href="#"
                                           style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><img
                                                class="logo" src="https://nifipayments.com/assets/images/logo.png" alt="logo"
                                                style="-webkit-box-sizing: border-box;box-sizing: border-box;border: 0;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;width: 140px;"></a>
                                    </td>
                                </tr>
                            </table>
                            <table id="sectionOne"
                                   style="-webkit-box-sizing: border-box;box-sizing: border-box;width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #ebebeb;text-align: center;">
                                <tr style="-webkit-box-sizing: border-box;box-sizing: border-box;">
                                    <td style="-webkit-box-sizing: border-box;box-sizing: border-box;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                        <h3 class="title" style="-webkit-box-sizing: border-box;box-sizing: border-box;">
                                            <span style="-webkit-box-sizing: border-box;box-sizing: border-box;color: #8cbb4c;font-size: 22.4px;">Welcome</span><br
                                                style="-webkit-box-sizing: border-box;box-sizing: border-box;">
                                            <span class="name"
                                                  style="-webkit-box-sizing: border-box;box-sizing: border-box;color: #085b8a;font-size: 22.4px;font-weight: bold;">Nifi Payments</span>
                                        </h3>
                                    </td>
                                </tr>
                            </table>
                            <table style="-webkit-box-sizing: border-box;box-sizing: border-box;width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                <tr style="-webkit-box-sizing: border-box;box-sizing: border-box;">
                                    <td id="sectionTwoContainer"
                                        style="-webkit-box-sizing: border-box;box-sizing: border-box;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;border-right: 10px solid transparent;border-left: 10px solid transparent;">
                                        <h3 class="section-title"
                                            style="-webkit-box-sizing: border-box;box-sizing: border-box;color: #085b8a;font-weight: bold;padding: 30px 0 20px;margin: 0;background-color: #fff;text-align: center;font-size: 21px;">
                                            Login Notification</h3>
                                        <div id="sectionTwo"
                                             style="-webkit-box-sizing: border-box;box-sizing: border-box;background-color: #fff;border: 1px solid #a0a0a0;text-align: center;">
                                            <p style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-size: 14px;">
                                                We noticed a login to your account from a new device or location. If this was you, no further action is needed. If you did not log in, please secure your account by following the link below.</p>
                                            <div style="-webkit-box-sizing: border-box;box-sizing: border-box;text-align: center;">
                                                <a href="%%SECURE_ACCOUNT_LINK%%" class="btn btn-primary login"
                                                   style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;border-left: 1px solid #000;padding-right: .5rem;color: #ffffff;text-decoration: none;background-color: #99c35c;border-radius: 0;border-color: transparent;width: 250px;padding: 12px 0;-webkit-box-shadow: 0 6px 2px -2px #648732;box-shadow: 0 6px 2px -2px #648732;margin: 20px auto;font-weight: bold;font-size: 18px;display: block;text-align: center;">Secure Your Account</a>
                                            </div>
                                        </div>
                                        <h3 class="section-title"
                                            style="-webkit-box-sizing: border-box;box-sizing: border-box;color: #085b8a;font-weight: bold;padding: 30px 0 20px;margin: 0;background-color: #fff;text-align: center;font-size: 21px;">
                                            Getting Started</h3>
                                    </td>
                                </tr>
                            </table>
                            <table style="-webkit-box-sizing: border-box;box-sizing: border-box;width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                <tr style="-webkit-box-sizing: border-box;box-sizing: border-box;">
                                    <td id="sectionThree"
                                        style="-webkit-box-sizing: border-box;box-sizing: border-box;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #e6f2f8;padding: 40px 0;margin-bottom: 20px;text-align: center;border-bottom: 24px solid transparent;border-right: 20px solid transparent;border-left: 20px solid transparent;">
                                        <h3 class="title"
                                            style="-webkit-box-sizing: border-box;box-sizing: border-box;color: #0f5b8e;margin: 0;font-weight: normal;">Thank you for choosing Nifi Payments</h3>
                                        <p style="-webkit-box-sizing: border-box;box-sizing: border-box;margin: 20px 0;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-size: 16px;">
                                            If you have any questions, feel free to contact our support team.</p>
                                        <div style="-webkit-box-sizing: border-box;box-sizing: border-box;text-align: center;">
                                            <a href="%%SUPPORT_LINK%%" class="btn btn-secondary contact-us"
                                               style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;border-left: 1px solid #000;padding-right: .5rem;color: #ffffff;text-decoration: none;background-color: #085b8a;border-radius: 0;border-color: transparent;width: 250px;padding: 12px 0;-webkit-box-shadow: 0 6px 2px -2px #054370;box-shadow: 0 6px 2px -2px #054370;margin: 20px auto;font-weight: bold;font-size: 18px;display: block;text-align: center;">Contact Support</a>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table style="-webkit-box-sizing: border-box;box-sizing: border-box;width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                <tr style="-webkit-box-sizing: border-box;box-sizing: border-box;">
                                    <td id="footer"
                                        style="-webkit-box-sizing: border-box;box-sizing: border-box;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;padding: 20px;text-align: center;background-color: #f4f6f9;">
                                        <p style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-size: 12px;color: #aaa;">
                                            &copy; 2024 Nifi Payments. All rights reserved.</p>
                                    </td>
                                </tr>
                            </table>
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
            sendSmtpEmail.subject = "Nifi Payments Login Successfully ";
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



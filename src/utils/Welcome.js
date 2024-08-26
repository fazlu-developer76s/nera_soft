import { decrypt } from '../utils/Encrypt_decrypt.js';
import SibApiV3Sdk from 'sib-api-v3-sdk';
var defaultClient = SibApiV3Sdk.ApiClient.instance;
const sendWelcomeTemplate  = async (User,res) => {
   
    const sender_name = "Nera Soft";
    const sender_email = "amit.developer2024@gmail.com";

    let user_id = "fazlu@123";
    let to_email = "fazlu.developer@gmail.com";
    let to_name = "dev sharma";
    let password = "dev@123";
    let security_pin = "12345";
    let subject ="Registerd Successfully";
    // let user_id = decrypt(User.user_id);
    // return res.json(user_id);
    // let email_req = decrypt(User.email);
    // let name = decrypt(User.name);
    // let password = decrypt(User.password);
    // let security_pin = decrypt(User.security_pin);
    let message = `<!DOCTYPE html><html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/><meta name="viewport"content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"><title>companyName Welcome Registration E-mail</title></head><body style="-webkit-box-sizing: border-box;box-sizing: border-box;margin: 0 auto;padding: 0;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100% !important;width: 100% !important;"><table id="bodyTable"style="-webkit-box-sizing: border-box;box-sizing: border-box;width: 100% !important;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0 auto;padding: 0;background-color: #f4f6f9;font-family: sans-serif;height: 100% !important;">
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
                                <td class="top-menu-container"
                                    style="-webkit-box-sizing: border-box;box-sizing: border-box;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;width: 1%;">
                                    <table style="-webkit-box-sizing: border-box;box-sizing: border-box;width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                        <tr style="-webkit-box-sizing: border-box;box-sizing: border-box;">
                                            <td style="-webkit-box-sizing: border-box;box-sizing: border-box;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                <a class="live-chat" href="#"
                                                   style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;padding-right: 0.1rem;padding-left: .5rem;text-decoration: none;color: #000;white-space: nowrap;"></a></td>
                                            <td style="-webkit-box-sizing: border-box;box-sizing: border-box;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                
                                            </td>
                                        </tr>
                                    </table>
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
                                    <p class="content"
                                       style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #656565;">
                                        You'r almost ready to trade more than <strong
                                            style="-webkit-box-sizing: border-box;box-sizing: border-box;">300+
                                        markets</strong>
                                    </p>
                                </td>
                            </tr>
                        </table>
                        <table style="-webkit-box-sizing: border-box;box-sizing: border-box;width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <tr style="-webkit-box-sizing: border-box;box-sizing: border-box;">
                                <td id="sectionTwoContainer"
                                    style="-webkit-box-sizing: border-box;box-sizing: border-box;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;border-right: 10px solid transparent;border-left: 10px solid transparent;">
                                    <h3 class="section-title"
                                        style="-webkit-box-sizing: border-box;box-sizing: border-box;color: #085b8a;font-weight: bold;padding: 30px 0 20px;margin: 0;background-color: #fff;text-align: center;font-size: 21px;">
                                        Account Details</h3>
                                    <div id="sectionTwo"
                                         style="-webkit-box-sizing: border-box;box-sizing: border-box;background-color: #fff;border: 1px solid #a0a0a0;text-align: center;">
                                        <p class="username"
                                           style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-size: 13px;">
                                            Name:</p>
                                        <p style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                            <strong style="-webkit-box-sizing: border-box;box-sizing: border-box;">${to_name}</strong>
                                        </p>
                                        <p class="username"
                                           style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-size: 13px;">
                                            Email:</p>
                                        <p style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                            <strong style="-webkit-box-sizing: border-box;box-sizing: border-box;">${to_email}</strong>
                                        </p>
                                        <p class="username"
                                           style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-size: 13px;">
                                            User Id:</p>
                                        <p style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                            <strong style="-webkit-box-sizing: border-box;box-sizing: border-box;">${user_id}</strong>
                                        </p>
                                        <p class="username"
                                           style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-size: 13px;">
                                            Password</p>
                                        <p style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                            <strong style="-webkit-box-sizing: border-box;box-sizing: border-box;">${password}</strong>
                                        </p>
                                        <p class="username"
                                           style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-size: 13px;">
                                            Pin:</p>
                                        <p style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                            <strong style="-webkit-box-sizing: border-box;box-sizing: border-box;">${security_pin}</strong>
                                        </p>
                                        <div style="-webkit-box-sizing: border-box;box-sizing: border-box;text-align: center;">
                                            <a href="#" class="btn  btn-primary login"
                                               style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;border-left: 1px solid #000;padding-right: .5rem;color: #ffffff;text-decoration: none;background-color: #99c35c;border-radius: 0;border-color: transparent;width: 250px;padding: 12px 0;-webkit-box-shadow: 0 6px 2px -2px #648732;box-shadow: 0 6px 2px -2px #648732;margin: 20px auto;font-weight: bold;font-size: 18px;display: block;text-align: center;">Login</a>
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
                                        style="-webkit-box-sizing: border-box;box-sizing: border-box;color: #0f5b8e;margin: 0;font-weight: normal;">
                                        Upload Documents</h3>
                                    <img src="https://nifipayments.com/assets/images/logo.png" alt="upload icon"
                                         style="-webkit-box-sizing: border-box;box-sizing: border-box;border: 0;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;margin: 30px auto 15px;">
                                    <p class="max-width-580 content"
                                       style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;max-width: 580px;margin: 0 auto;padding: 0 10px;font-size: 13px;line-height: 21px;margin-bottom: 40px;">
                                        As part of our regulatory requirements, we need copies of your ID and proof of
                                        address in order
                                        to verify you as a client
                                    </p>
                                    <a class="btn btn-primary upload" href="#"
                                       style="-webkit-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;border-radius: 30px;background-color: #085b8a;border-color: transparent;width: 250px;padding: 15px 38px;margin-top: 30px;color: white;text-decoration: none;">Upload
                                        your documents</a>
                                </td>
                            </tr>
                        </table>
                       
</body>
</html>`;
    try {
        if(to_email)
            {
                var apiKey = defaultClient.authentications['api-key'];
                apiKey.apiKey = process.env.BREVO_API_KEY;
                
                let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
                let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
                sendSmtpEmail.to = [{ 'email': to_email, 'name': to_name}];
                sendSmtpEmail.sender = { 'name': sender_name, 'email': sender_email };
                sendSmtpEmail.subject = subject;
                sendSmtpEmail.htmlContent = message;
                // res.status(200).json({message : sendSmtpEmail});
                //   the email
                apiInstance.sendTransacEmail(sendSmtpEmail).then(
                    function(data) {
                        return true;
                        res.status(200).json({message: "Email Sent Successfully"});
    
                    },
                    function(error) {
                        res.status(500).json({message: error});
    
                    }
                );
            }
            else
            {
                res.status(200).json({message: "Invalid Email"});
            }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}





export { sendWelcomeTemplate }



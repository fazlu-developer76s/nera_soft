import SibApiV3Sdk from 'sib-api-v3-sdk';
import axios from 'axios';
var defaultClient = SibApiV3Sdk.ApiClient.instance;
const sendEmail  = async (to_email, to_name, subject, htmlContent) => {
    const sender_name = "Nera Soft";
    const sender_email = "amit.developer2024@gmail.com";
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
                sendSmtpEmail.htmlContent = htmlContent;
                // res.status(200).json({message : sendSmtpEmail});
                //   the email
                apiInstance.sendTransacEmail(sendSmtpEmail).then(
                    function(data) {
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

const sendmobileOTP = async (mobile_no,otp,name) => {
    const UserId = "NERASOFT1";
    const Password = "111321";
    const SenderID = "NRSOFT";
    const Msg = "Dear " + name +" Your OTP For Registration in nera soft is " + otp +" Valid For 10 Minutes. we request you to don't share with anyone .Thanks NSAFPL";
    const EntityID = "1701159540601889654";
    const TemplateID="1707164805234023036";
    const url = 'http://sms.nerasoft.in/api/SmsApi/SendSingleApi?UserID=' + UserId + '&Password='+ Password + '&SenderID=' + SenderID + '&Phno='+ mobile_no + '&Msg='+Msg+'&EntityID='+ EntityID +'&TemplateID=' + TemplateID;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export { sendEmail, sendmobileOTP }
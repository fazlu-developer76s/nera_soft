var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;
app.use(express.json())
const email  = async (to_email, to_name, subject, htmlContent) => {
    const sender_name = "Nera Soft";
    const sender_email = "amit.developer2024@gmail.com";
    try {
        if(to_email)
            {
                var apiKey = defaultClient.authentications['api-key'];
                apiKey.apiKey = BREVO_API_KEY;
                
                let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
                let randomFourDigit = getRandomFourDigit();
                let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
                sendSmtpEmail.to = [{ 'email': to_email, 'name': to_name}];
                sendSmtpEmail.sender = { 'name': sender_name, 'email': sender_email };
                sendSmtpEmail.subject = subject;
                sendSmtpEmail.htmlContent = htmlContent;
                // res.status(200).json({message : sendSmtpEmail});
                // Send the email
                apiInstance.sendTransacEmail(sendSmtpEmail).then(
                    function(data) {
                        res.status(200).json({message: randomFourDigit});
    
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

export { email }
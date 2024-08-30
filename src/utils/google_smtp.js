import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"fazlu.developer@gmail.com",
        pass:"anqbnaprfuaxsnmc"
    },

})

const mailOptions = {
    from:"fazlu.developer@gmail.com",
    to:"fazlu.developer@gmail.com",
    subject:"Welcome to Nera Soft",
    text:"Welcome to our platform, Please click on the link below to activate your account",
    html:`<h1>Welcome to Nera Soft</h1>
    <p>Welcome to our platform, Please click on the link below to activate your account</p>
    <a href="http://localhost:3000/activate/">Activate Now</a>`,
}
transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
        console.log("Error",error);
    }
    else{
        console.log("Email sent",info.response);
    }
})

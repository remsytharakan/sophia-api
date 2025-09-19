require('dotenv').config({
    path: `../shared/environment/${process.env.NODE_ENV || 'development'}.env`,
});

exports.otpTemplate = async (otp, phoneNumber) => {
    return new Promise((resolve, reject) => {
        let url = process.env.URL +
            "?username=" + process.env.Username +
            "&api_password=" + process.env.API_PASSWORD +
            "&sender=" + process.env.sender +
            "&to=" + phoneNumber +
            "&message=" + process.env.OTP_message + otp.otp +
            "&priority=" + process.env.priority;

            resolve(url);
    })
}

module.exports = {
    mail_host         : {
        host: process.env.HOST,
        port: 25,
        secure: false,
        auth: {
            user: process.env.SENDGRID_USER,
            pass: process.env.PASSWORD,
        },
    },
    mailOptions:{
        from: process.env.MAIL_FROM,
        to: '',
        subject: process.env.Email_Subject,
        html: '',
    },

}
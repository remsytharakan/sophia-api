require('dotenv').config({
    path: `../shared/environment/${process.env.NODE_ENV || 'development'}.env`,
});
console.log("env", process.env.MONGODB_URI_LOCAL)
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
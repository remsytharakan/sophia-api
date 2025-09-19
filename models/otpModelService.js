const otpModel = require('./otp');

exports.generateOTP = async (phoneNumber, type) => {
    return new Promise((resolve, reject) => {
        let OTP = Math.ceil(Math.random() * 1000000);
        let trimmedOTP = OTP.toString().slice(0, 5)
        newOTP = new otpModel({
            phoneNumber: phoneNumber,
            otp: trimmedOTP,
            generatedOn: new Date(),
            active: true,
            type: type
        });
        newOTP.save()
        .then((savedOTP) => resolve(savedOTP))
        .catch((err) => reject(err));
    })
}

exports.verifyOTP = async (otp, phoneNumber) => {
    return new Promise(async (resolve, reject) => {
        await otpModel.findOne({otp: otp, active: true, phoneNumber: phoneNumber})
        .then((otp) => {
            if(otp) {
               
                otp.active = false;
                otp.save();
                resolve(otp)
            }
            else resolve(null)
        })
        .catch((err) => reject(err));
    })
}

exports.studentVerifyOTP = async (otp, phoneNumber) => {
    return new Promise(async (resolve, reject) => {
        console.log("otp: ", otp);
        console.log("phoneNumber: ", phoneNumber);
        await otpModel.findOne({otp: otp, active: true, phoneNumber: phoneNumber})
        .then((otp) => {
            console.log("otp: ", otp);
            if(otp) {
                console.log("otp1: ", otp);
                otp.active = false;
                otp.save();
                resolve(otp)
            }
            else resolve(null)
        })
        .catch((err) => reject(err));
    })
}
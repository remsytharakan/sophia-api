require('dotenv').config({
    path: `../shared/environment/${process.env.NODE_ENV || 'development'}.env`,
});

const otpEmailTemplate = require('../shared/templates/email/otpTemplate')
const otpSMSTemplate = require('../shared/templates/sms/otpTemplate')
const request = require('request');
const nodemailer = require('nodemailer');
const TEXTLOCAL_SMS_API_KEY = process.env.TEXTLOCAL_SMS_API_KEY


exports.sendOTP = async (generatedOtp, phoneNumber) => {

    return new Promise(async (resolve, reject) => {
        // Sending SMS

        // let otp = generatedOtp.otp;
        // let acceptedTemplate = `OTP for registration on appsophia.com is ${otp.slice(0, 5)}. Meantr`
        // request.post({
        //     url: `https://api.textlocal.in/send`,
        //     form: { apikey: TEXTLOCAL_SMS_API_KEY, message: acceptedTemplate, sender: 'Meantr', numbers: phoneNumber }
        // }, function (err, httpResponse, body) {
        //     resolve(true);
        //     console.log(body);
        //     // console.log(httpResponse);
        // }
        // );

        let otp = generatedOtp.otp;
        let acceptedTemplate = `OTP for registration on appsophia.com is ${otp.slice(0, 5)} Sophia Academy`
        request.post({
            url: `https://api.textlocal.in/send`,
            form: { apikey: TEXTLOCAL_SMS_API_KEY, message: acceptedTemplate, sender: 'SopApp', numbers: phoneNumber }
        }, function (err, httpResponse, body) {
            resolve(true);
            console.log(body);
            // console.log(httpResponse);
        }
        );
    });
};

exports.loginOTP = async (generatedOtp, phoneNumber) => {

    return new Promise(async (resolve, reject) => {
        // Sending SMS

        // let otp = generatedOtp.otp;
        // let acceptedTemplate = `OTP for registration on appsophia.com is ${otp.slice(0, 5)}. Meantr`
        // request.post({
        //     url: `https://api.textlocal.in/send`,
        //     form: { apikey: TEXTLOCAL_SMS_API_KEY, message: acceptedTemplate, sender: 'Meantr', numbers: phoneNumber }
        // }, function (err, httpResponse, body) {
        //     resolve(true);
        //     console.log(body);
        //     // console.log(httpResponse);
        // }
        // );

        let otp = generatedOtp.otp;
        let acceptedTemplate = `OTP for Login on appsophia.com is ${otp.slice(0, 5)} Sophia Academy`
        request.post({
            url: `https://api.textlocal.in/send`,
            form: { apikey: TEXTLOCAL_SMS_API_KEY, message: acceptedTemplate, sender: 'SopApp', numbers: phoneNumber }
        }, function (err, httpResponse, body) {
            resolve(true);
            console.log(body);
            // console.log(httpResponse);
        }
        );
    });
};

exports.sendForgotOTP = async (generatedOtp, phoneNumber) => {

    return new Promise(async (resolve, reject) => {
        // Sending SMS
        // let templateUrl = await otpSMSTemplate.otpTemplate(otp, phoneNumber);
        // console.log('otp',otp);
        // request.get({ url: templateUrl}).on('response', function(response) {
        //     console.log(response.statusCode) // 200
        //     if (response.statusCode == 200) resolve(response);
        //   }).on('error', function(err) {
        //     console.error(err)
        //     reject(err);
        //   })

        let otp = generatedOtp.otp;
        let acceptedTemplate = `OTP to reset password on appsophia.com is ${otp.slice(0, 5)} Meantr`
        request.post({
            url: `https://api.textlocal.in/send`,
            form: { apikey: TEXTLOCAL_SMS_API_KEY, message: acceptedTemplate, sender: 'Meantr', numbers: phoneNumber }
        }, function (err, httpResponse, body) {
            resolve(true);
            // console.log(body);
            // console.log(httpResponse);
        }
        );
    });
};

exports.sendStudentCode = async (studentCode, phoneNumber) => {

    return new Promise(async (resolve, reject) => {
        // Sending SMS
        
        // let otp = studentCode.toString();
        // console.log("studentCode: ", studentCode);
        // console.log("phoneNumber: ", phoneNumber);
        // let acceptedTemplate = `Your student code on appsophia.com is ${otp}. Meantr`
        // request.post({
        //     url: `https://api.textlocal.in/send`,
        //     form: { apikey: TEXTLOCAL_SMS_API_KEY, message: acceptedTemplate, sender: 'Meantr', numbers: phoneNumber }
        // }, function (err, httpResponse, body) {
        //     resolve(true);
        //     // console.log(body);
        //     // console.log(httpResponse);
        // }
        // );

        let otp = studentCode.toString();
        console.log("studentCode: ", studentCode);
        console.log("phoneNumber: ", phoneNumber);
        let acceptedTemplate = `Your student code on appsophia.com is ${otp} Sophia Academy`
        request.post({
            url: `https://api.textlocal.in/send`,
            form: { apikey: TEXTLOCAL_SMS_API_KEY, message: acceptedTemplate, sender: 'SopApp', numbers: phoneNumber }
        }, function (err, httpResponse, body) {
            resolve(true);
            console.log(body);
            console.log(httpResponse);
        }
        );
    });
};
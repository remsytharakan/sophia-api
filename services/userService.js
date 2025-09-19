require('dotenv').config({
    path: `./shared/environment/${process.env.NODE_ENV || 'development'}.env`,
});
const userModelService = require('../models/userModelService');
const otpModelService = require('../models/otpModelService');
const notificationService = require('./notificationService')
const profileService = require('./profileService');
const profileModelService = require('../models/profileModelService');
const jwt = require('jsonwebtoken');

exports.verifyPhoneNumber = async (req, res, next) => {
    await userModelService.findUserByNumber(req.params.number)
        .then(async user => {
            console.log('user:', user);
            if (!user) await otpModelService.generateOTP(req.params.number, "REGISTER")
                .then((otp) => notificationService.sendOTP(otp, req.params.number)
                    .then((response) => {
                        return verifyPhoneNumberResponse(res, otp, response.statusCode, 'NEW')
                    }));
            else {
                console.log('user:', user);
                let userData = {
                    phoneNumber: req.params.number,
                    userType: "User"
                }
                await userModelService.authenticate(userData)
                    .then((token) => {
                        if (!token) {
                            message = 'User Not Found'
                            return sendResponse(res, req.body, message, 'NOT_FOUND');
                        }
                        else {
                            message = 'Authentication SUCCESS '
                            return sendResponse(res, token, message, 'SUCCESS')
                        }
                    }).catch((error) => {
                        message = 'Authentication FAILED '
                        return sendResponse(res, error, message, 'ERROR');
                    })
                // user.email = null;
                // return verifyPhoneNumberResponse(res, user, 'EXISTING');
            }
        }).catch((err) => { return verifyPhoneNumberResponse(res, err, 'ERROR') });
}

exports.verifyOTP = async (req, res, next) => {
    let message;
    await otpModelService.verifyOTP(req.params.otp, req.query.phoneNumber)
        .then(async (otp) => {
            if (otp.type == 'REGISTER') await userModelService.registerUser(otp.phoneNumber)
                .then(user => {
                    let data = {};
                    user.email = null;
                    message = 'The OTP is Verified'
                    // Creating token for Autologin
                    let jwtpayload = {};
                    jwtpayload.phoneNumber = otp.phoneNumber;
                    jwtpayload.email = user.email;
                    jwtpayload.id = user._id;
                    jwtpayload.verfied = user.verified;
                    jwtpayload.schoolSubscription = user.schoolSubscription;
                    const token = jwt.sign(jwtpayload, process.env.SECRET);

                    data._id = user._id;
                    data.phoneNumber = user.phoneNumber;
                    data.email = user.email;
                    data.verified = user.verified;
                    data.token = token;

                    return sendResponse(res, data, message, 'SUCCESS')
                });
            else if (otp.type === 'LOGIN') {
                message = 'The Login OTP is Verified'
                await userModelService.findUserByNumber(req.query.phoneNumber)
                    .then(async user => {
                        if (!user) {
                            message = "User Not Found";
                            return sendResponse(res, null, message, 'NOT_FOUND')
                        }
                        await userModelService.auth(user)
                            .then((result) => {
                                // Saving jwt token for two device login
                                if (user.flag == 1) { user.jwtToken1 = result.token; user.flag = 2; }
                                else if (user.flag == 2) { user.jwtToken2 = result.token; user.flag = 1; }
                                user.save();
                                return sendResponse(res, result, message, 'SUCCESS')
                            })

                    });
            }
            else {
                message = 'OTP Not matching/inactive '
                return sendResponse(res, 'Inactive', message, 'NOT_FOUND')
            }
        }).catch(err => {
            message = 'Cant check OTP, Internal Server Error '
            return sendResponse(res, err, message, 'ERROR')
        })
}

exports.createProfile = async (req, res, next) => {
    let message; let userDetails = { profiles: [] }; let profileDetails = {};
    await userModelService.findUserById(req.params.id)
        .then(async user => {
            if (!user) {
                message = "User Not Found";
                return sendResponse(res, null, message, 'NOT_FOUND')
            }
            await profileService.createProfile(req.params.id, req.body)
                .then(async (profile) => {
                    profileDetails.id = profile._id;
                    profileDetails.name = profile.name;
                    profileDetails.city = profile.city;
                    profileDetails.board = profile.board;
                    profileDetails.gradeId = profile.gradeId;
                    profileDetails.grade = profile.grade;
                    profileDetails.code = profile.code;
                    if (profile.stream) profileDetails.stream = profile.stream;

                })
                .then(async () => {
                    userDetails.profiles.push(profileDetails.id);
                    if (!user.email && req.body.email) {
                        userDetails = {
                            _id: req.params.id,
                            email: req.body.email,
                            password: req.body.password,
                            defaultProfile: profileDetails.id,
                            profiles: []
                        }
                    }
                    userDetails.profiles.push(profileDetails.id);
                    await userModelService.updateUser(req.params.id, userDetails);

                    // else {
                    //     userDetails = {
                    //         $push: { profiles: profileDetails.id }
                    //     }
                    //     await userModelService.updateUser(req.params.id, userDetails);
                    // }
                })
                .then(async () => {
                    let user = await userModelService.findUserById(req.params.id);
                    message = 'Successfully Registered';
                    profileDetails.phoneNumber = user.phoneNumber;
                    profileDetails.email = user.email;
                    profileDetails.profiles = user.profiles;
                    profileDetails.userId = user._id;
                    return sendResponse(res, profileDetails, message, 'SUCCESS')
                });
        }).catch((err) => {
            message = "Internal Server Error"
            return sendResponse(res, err, message, 'ERROR')
        })
}

exports.login = async (req, res, next) => {
    let message;

    if (req.body.phoneNumber == '' || req.body.userType == '') {
        message = 'Please fill empty fields ';

        return sendResponse(res, req.body, message, 'NOT_FOUND');
    }
    await userModelService.authenticate(req.body)
        .then((token) => {
            if (!token) {
                message = 'User Not Found'
                return sendResponse(res, req.body, message, 'NOT_FOUND');
            }
            else {
                message = 'Authentication SUCCESS '
                return sendResponse(res, token, message, 'SUCCESS')
            }
        }).catch((error) => {
            message = 'Authentication FAILED '
            return sendResponse(res, error, message, 'ERROR');
        })

}

exports.getUser = async (req, res, next) => {
    let message; let userDetails = {};
    await userModelService.findUserById(req.params.id)
        .then(async (user) => {
            if (user) {
                console.log("user Details: ", user)
                message = 'User Details found for ' + req.params.id;
                userDetails.id = user._id;
                userDetails.phoneNumber = user.phoneNumber;
                userDetails.email = user.email;
                userDetails.name = user.name;
                userDetails.profiles = user.profiles;
                console.log("user Details: ", user)

                if (user.profiles && user.profiles.length > 0) {
                    let profileDetails = await profileService.getProfileDetails(user.profiles[0], user);
                    console.log("Profiles Details: ", profileDetails)
                    if (profileDetails) {
                        userDetails.profileId = profileDetails._id
                        userDetails.name = profileDetails.name;
                        userDetails.board = profileDetails.board;
                        userDetails.boardId = profileDetails.boardId;
                        userDetails.grade = profileDetails.grade;
                        userDetails.stream = profileDetails.stream;
                        userDetails.streamId = profileDetails.streamId;
                        userDetails.city = profileDetails.city;
                        userDetails.gradeId = profileDetails.gradeId;
                        userDetails.studentCode = profileDetails.code;
                    }
                }
                sendResponse(res, userDetails, message, 'SUCCESS');
            } else {
                message = 'User Not Found'
                sendResponse(res, null, message, 'NOT_FOUND');
            }
        }).catch((err) => sendResponse(res, err, message, 'ERROR'));
}


exports.verifyUserByStudentCode = async (req, res, next) => {
    let message; let userDetails = {};
    await profileModelService.findStudentByCode(req.params.student_code)
        .then(async (student) => {
            if (!student) {
                message = 'Student Not Found'
                sendResponse(res, null, message, 'NOT_FOUND');
            }
            await userModelService.findUserById(student.user_id)
                .then(async (user) => {
                    if (!user) {
                        message = 'User Not Found'
                        sendResponse(res, null, message, 'NOT_FOUND');
                    }
                    await otpModelService.generateOTP(user.phoneNumber)
                        .then((otp) => notificationService.sendOTP(otp, user.phoneNumber)
                            .then((response) => {
                                return verifyPhoneNumberResponse(res, otp, response.statusCode, 'NEW')
                            }));
                });
        }).catch((err) => sendResponse(res, err, message, 'ERROR'));
}

exports.studentVerifyOTP = async (req, res, next) => {
    let message;
    await otpModelService.studentVerifyOTP(req.params.otp, req.query.phoneNumber)
        .then(async (otp) => {
            console.log("otp: ", otp);
            if (otp) {
                userModelService.findUserByNumber(req.query.phoneNumber)
                    .then(async (user) => {
                        console.log("user: ", user);
                        if (!user) {
                            message = 'User Not Found'
                            sendResponse(res, null, message, 'NOT_FOUND');
                        }
                        let jwtpayload = {};

                        jwtpayload.phoneNumber = user.phoneNumber;
                        jwtpayload.id = user._id;
                        jwtpayload.email = user.email;
                        jwtpayload.defaultProfile = user.defaultProfile;
                        jwtpayload.verfied = user.verfied;
                        jwtpayload.schoolSubscription = user.schoolSubscription;

                        const token = jwt.sign(jwtpayload, process.env.SECRET);

                        let userDetails = {
                            profiles: []
                        };
                        message = 'User Details found for ' + otp.phoneNumber;
                        userDetails.id = user.id;
                        userDetails.phoneNumber = user.phoneNumber;
                        userDetails.email = user.email;
                        userDetails.token = token;

                        if (user.profiles.length > 0) {
                            for (let userProfile of user.profiles) {
                                let profile = {}
                                let profileDetails = await profileService.getProfileDetails(userProfile);
                                if (profileDetails) {
                                    profile.id = profileDetails._id;
                                    profile.name = profileDetails.name;
                                    profile.board = profileDetails.board;
                                    profile.grade = profileDetails.grade;
                                    profile.stream = profileDetails.stream;
                                    profile.city = profileDetails.city;
                                    profile.gradeId = profileDetails.gradeId;
                                    profile.process_fee_paid = profileDetails.process_fee_paid;
                                }
                                userDetails.profiles.push(profile);
                            }
                        }

                        sendResponse(res, userDetails, message, 'SUCCESS');
                    })
            }
            else {
                message = 'OTP Not matching/inactive '
                return sendResponse(res, 'Inactive', message, 'NOT_FOUND')
            }
        }).catch(err => {
            message = 'Cant check OTP, Internal Server Error '
            return sendResponse(res, err, message, 'ERROR')
        })
}

// Create Account from Admin
exports.createAccount = async (req, res, next) => {
    await userModelService.findUserByNumber(req.body.number)
        .then(async user => {

            if (!user) {
                await userModelService.registerUserByAdmin(req.body.number)
                    .then(user => {
                        let data = {};
                        user.email = null;
                        message = 'Account Created Successfully'
                        data._id = user._id;
                        data.phoneNumber = user.phoneNumber;
                        data.email = user.email;
                        data.verified = user.verified;

                        return sendResponse(res, data, message, 'SUCCESS')
                    })
            }
            else if (user) {
                message = 'Please Create Profile,  Account already existing.';
                user.email = null;
                return sendResponse(res, user, message, 'EXISTING');
            }
        }).catch(err => {
            message = 'Cant create Account, Internal Server Error '
            return sendResponse(res, err, message, 'ERROR')
        })
}

// Create Profile By Admin
exports.createProfileByAdmin = async (req, res, next) => {
    let message; let userDetails = { profiles: [] }; let profileDetails = {}; let studentCode;
    await userModelService.findUserById(req.params.id)
        .then(async user => {
            if (!user) {
                message = "User Not Found";
                return sendResponse(res, null, message, 'NOT_FOUND')
            }
            await profileService.createProfile(req.params.id, req.body)
                .then(async (profile) => {
                    profileDetails.id = profile._id;
                    profileDetails.name = profile.name;
                    profileDetails.city = profile.city;
                    profileDetails.board = profile.board;
                    profileDetails.boardId = profile.boardId;
                    profileDetails.gradeId = profile.gradeId;
                    profileDetails.grade = profile.grade;
                    profileDetails.code = profile.code;
                    profileDetails.student_code = profile.student_code;
                    profileDetails.school_code = profile.school_code;
                    if (profile.stream) profileDetails.stream = profile.stream;
                    if (profile.streamId) profileDetails.streamId = profile.streamId;
                    studentCode = profile.student_code;
                })
                .then(async () => {
                    console.log("email: ", user.email);
                    if (!user.email) {
                        userDetails = {
                            _id: req.params.id,
                            email: req.body.email,
                            password: req.body.password,
                            defaultProfile: profileDetails.id,
                            profiles: []
                        }
                        userDetails.profiles.push(profileDetails.id);
                        await userModelService.updateUser(req.params.id, userDetails);
                    }
                    // else {
                    //     userDetails = {
                    //         $push: { profiles: profileDetails.id }
                    //     }
                    //     await userModelService.updateUser(req.params.id, userDetails);
                    // }
                })
                .then(async () => {
                    let user = await userModelService.findUserById(req.params.id);
                    message = 'Successfully Registered';
                    profileDetails.phoneNumber = user.phoneNumber;
                    profileDetails.email = user.email;
                    profileDetails.profiles = user.profiles;
                    profileDetails.userId = user._id;
                    let sendStudentCodesms = await notificationService.sendStudentCode(studentCode, user.phoneNumber)
                    console.log("sendStudentCodesms: ", sendStudentCodesms)
                    return sendResponse(res, profileDetails, message, 'SUCCESS')
                });
        }).catch((err) => {
            message = "Internal Server Error"
            return sendResponse(res, err, message, 'ERROR')
        })
}

// Create Account from Admin
exports.assignPackagesToStudent = async (req, res, next) => {

    await profileService.getProfileDetails(req.params.profileId)
        .then(async profile => {

            if (!profile) {
                message = 'Student Not Found'
                sendResponse(res, null, message, 'NOT_FOUND');
            }
            else if (profile) {
                profileModelService.assignPackagesToStudent(req.params.profileId, profile, req.body.packages)
                    .then((response) => {
                        message = 'Assigned packages to student ' + profile.name;
                        return sendResponse(res, response, message, 'SUCCESS')
                    })
            }
        }).catch(err => {
            message = 'Cant assign packages, Internal Server Error '
            return sendResponse(res, err, message, 'ERROR')
        })
}


async function verifyPhoneNumberResponse(res, otp, response, status) {
    console.log(response);
    switch (status) {
        case 'NEW': {
            return res.status(200).send({
                success: true,
                message: "The OTP has sent to your MobileNumber",
                data: response,
                otp: otp
            })
        } break;
        case 'ERROR': {
            return res.status(500).send({
                success: false,
                message: "Cant send the OTP, Please try again later",
                err: response
            })
        } break;
        case 'EXISTING': {

            return res.status(409).send({
                success: false,
                message: "The Number is already registered, please try login",
                data: response
            })
        } break;
    }
}

async function sendResponse(res, response, message, status) {
    switch (status) {
        case 'SUCCESS': {
            return res.status(200).send({
                success: true,
                message: message,
                data: response
            })
        } break;
        case 'ERROR': {
            return res.status(500).send({
                success: false,
                message: message,
                err: response
            })
        } break;

        case 'NOT_FOUND': {
            return res.status(409).send({
                success: false,
                message: message,
                data: response
            })
        } break;

        case 'EXISTING': {
            return res.status(200).send({
                success: true,
                message: message,
                data: response
            })
        } break;
    }
}

async function verifyOTPResponse(res, response, status) {
    switch (status) {
        case 'SUCCESS': {
            return res.status(200).send({
                success: true,
                message: "The OTP is Verified ",
                response: response
            })
        } break;
        case 'ERROR': {
            return res.status(500).send({
                success: false,
                message: "Cant verify OTP, Please try again later ",
                err: response
            })
        } break;

        case 'NOT_FOUND': {
            return res.status(409).send({
                success: false,
                message: "OTP Not matching ",
                response: response
            })
        } break;
    }
}

exports.updateVerifyPhoneNumber = async (req, res, next) => {
    let message;
    if (req.body.phoneNumber == '' || req.body.password == '') {
        message = 'Please fill empty fields ';
        return sendResponse(res, req.body, message, 'NOT_FOUND');
    }

    await userModelService.authenticatePassword(req.body)
        .then(async (result) => {
            if (result) {
                await userModelService.findUserByNumber(req.params.number)
                    .then(async user => {
                        if (!user) await otpModelService.generateOTP(req.params.number)
                            .then((otp) => notificationService.sendOTP(otp, req.params.number)
                                .then((response) => {
                                    return verifyPhoneNumberResponse(res, otp, response.statusCode, 'NEW')
                                }));

                        else {
                            user.email = null;
                            return verifyPhoneNumberResponse(res, user, 'EXISTING');
                        }
                    }).catch((err) => { return verifyPhoneNumberResponse(res, err, 'ERROR') });
            }

        })

}


//me


exports.updatePhoneNumber = async (req, res, next) => {
    let message;
    await otpModelService.verifyOTP(req.params.otp, req.query.phoneNumber)
        .then(async (otp) => {
            console.log("mmmo", otp)
            if (otp) await userModelService.updatePhoneNumber(req.params.id, otp.phoneNumber)
                .then(user => {
                    console.log("user", user)
                    message = 'phoneNumber verified successfully'

                    return sendResponse(res, user, message, 'SUCCESS')
                })
            else {
                message = 'enter correct otp'
                return sendResponse(res, 'Inactive', message, 'NOT_FOUND')
            }
        }).catch(err => {
            message = 'Cant send the OTP, Internal Server Error '
            return sendResponse(res, err, message, 'ERROR')
        })
}

exports.resetPassword = async (req, res, next) => {
    let message;
    if (req.body.oldPassword == '' || req.body.newPassword == '') {
        message = 'Please fill empty fields ';
        return sendResponse(res, req.body, message, 'NOT_FOUND');
    }
    await userModelService.resetPassword(req.params.id, req.body)
        .then(async (result) => {
            if (result) {
                let resetPassword = {}
                resetPassword.password = req.body.newPassword;
                await userModelService.updateUser(req.params.id, resetPassword)
                    .then((updated) => {
                        console.log(updated)
                        message = 'password reset success'
                        return sendResponse(res, updated, message, 'SUCCESS')
                    })

            }
        })
        .catch((err) => {
            message = 'password reset failed'
            return sendResponse(res, err, message, 'ERROR')
        })

}


exports.forgotPasswordPhone = async (req, res, next) => {
    await userModelService.findUserByNumber(req.params.number)
        .then(async user => {
            if (user) await otpModelService.generateOTP(req.params.number)
                .then((otp) => notificationService.sendForgotOTP(otp, req.params.number)
                    .then((response) => {
                        return verifyPhoneNumberResponse(res, otp, response.statusCode, 'NEW')
                    }));

            else {
                message = 'phoneNumber not found'
                return sendResponse(res, user, message, 'NOT_FOUND');
            }
        }).catch((err) => {
            message = 'Cant send the OTP, Please try again later'
            return sendResponse(res, err, message, 'ERROR')
        });
}

exports.forgotPasswordOTP = async (req, res, next) => {
    let message;
    await otpModelService.verifyOTP(req.params.otp, req.query.phoneNumber)
        .then(async (otp) => {
            if (otp) {
                message = 'The OTP is Verified'
                return sendResponse(res, otp, message, 'SUCCESS')
            }
            else {
                message = 'OTP Not matching/inactive '
                return sendResponse(res, 'Inactive', message, 'NOT_FOUND')
            }
        }).catch(err => {
            message = 'Cant send the OTP, Internal Server Error '
            return sendResponse(res, err, message, 'ERROR')
        })
}


exports.forgotPassword = async (req, res, next) => {
    let message;
    if (req.body.phoneNumber == '' || req.body.newPassword == '') {
        message = 'Please fill empty fields ';
        return sendResponse(res, req.body, message, 'NOT_FOUND');
    }
    let forgotPassword = {}
    forgotPassword.password = req.body.newPassword;
    await userModelService.updateUser1(req.body.phoneNumber, forgotPassword)
        .then((updated) => {
            console.log(updated)
            message = 'New password set successfully'
            return sendResponse(res, updated, message, 'SUCCESS')
        })

        .catch((err) => {
            message = 'New password set failed'
            return sendResponse(res, err, message, 'ERROR')
        })

}


exports.activeInactiveAccount = async (req, res, next) => {
    let message;
    if (req.body.active) {
        console.log("req.body", req.body);
        await userModelService.activeInactiveAccount(req.params.id, req.body)
            .then((result) => {
                message = 'Account updated Successfully'
                return sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Account updation Failed'
                return sendResponse(res, err, message, 'ERROR')
            })

    }
}

/*exports.forgotPassword = async (req, res, next) => {
    let message;
    if (req.body.phoneNumber == '' || req.body.newPassword == '') {
        message = 'Please fill empty fields ';
        return sendResponse(res, req.body, message, 'NOT_FOUND');
    }
    await userModelService.forgotPassword(req.params.number, req.body)
    .then(result => {
        if (result)  {
                message = 'password reset success'
                return sendResponse(res, result, message, 'SUCCESS')
            }
        else {
            message = 'password reset failed '
            return sendResponse(res, err, message, 'ERROR')
        }
    }).catch(err => {
        message = 'reset password failed!!!!'
        return sendResponse(res, err, message, 'ERROR')
    })

}*/

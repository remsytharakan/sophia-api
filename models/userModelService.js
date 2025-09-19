const userModel = require('./user');
const teacherModel = require('./teacher');
const superAdminModel = require('./superAdmin');
const schoolAdminModel = require('./schoolAdmin');
const profileModel = require('./profile');
const BaseModel = require('./baseModel');
const jwt = require('jsonwebtoken');
const otpModelService = require('./otpModelService');
const notificationService = require('../services/notificationService')
const userModelService = require('./userModelService')

exports.registerUser = async (userPhoneNumber) => {
    return new Promise((resolve, reject) => {
        let user = new userModel({
            phoneNumber: userPhoneNumber,
            userType: "User",
            verified: true,
            schoolSubscription: false
        })
        console.log(user);
        user.save()
            .then((savedUser) => resolve(savedUser))
            .catch((err) => reject(err));
    })
}

exports.registerUserByAdmin = async (userPhoneNumber) => {
    return new Promise((resolve, reject) => {
        let user = new userModel({
            phoneNumber: userPhoneNumber,
            userType: "User",
            schoolSubscription: true
        })
        // user.schoolSubscription = true;
        user.save()
            .then((savedUser) => resolve(savedUser))
            .catch((err) => reject(err));
    })
}

exports.updateUser = async (id, userDetails) => {
    console.log('userDetails', userDetails)
    return new Promise(async (resolve, reject) => {
        await BaseModel.saveUser(id, userDetails, userModel)
            .then((updated) => resolve(updated))
            .catch((err) => {
                console.log('err', err)
                reject(err)
            });
    })
}

exports.authenticate = async (userData) => {
    return new Promise(async (resolve, reject) => {

        if (userData.userType == "User") {
            await BaseModel.findUserByNumber(userData.phoneNumber, userModel)
                .then(async (user) => {
                    console.log("user found", user)
                    if (user) {
                        await otpModelService.generateOTP(userData.phoneNumber, 'LOGIN')
                            .then((otp) => notificationService.loginOTP(otp, userData.phoneNumber)
                                .then((response) => {
                                    resolve(otp)
                                }));
                        // user.comparePassword(userData.password, user.password, async function (err, isMatch) {
                        //     if (isMatch) {
                        //         await auth(user)
                        //             .then((result) => {
                        //                 resolve(result)
                        //             })
                        //     }
                        //     else if (err) reject(err)
                        //     else reject('Authentication Failed.Wrong Password');

                        // })
                    } else resolve(null);
                }).catch(err => reject(err));
        }
        else if (userData.userType == "Teacher") {
            await BaseModel.findUserByNumber(userData.phoneNumber, teacherModel)
                .then(async (user) => {
                    if (user) {
                        user.comparePassword(userData.password, user.password, async function (err, isMatch) {
                            if (isMatch) {
                                await userModelService.auth(user)
                                    .then((result) => {
                                        resolve(result)
                                    })
                            }
                            else if (err) reject(err)
                            else reject('Authentication Failed.Wrong Password');

                        })
                    } else resolve(null);
                }).catch(err => reject(err));
        }
        else if (userData.userType == "SchoolAdmin") {
            await BaseModel.findUserByNumber(userData.phoneNumber, schoolAdminModel)
                .then(async (user) => {
                    if (user) {
                        user.comparePassword(userData.password, user.password, async function (err, isMatch) {
                            if (isMatch) {
                                await userModelService.auth(user)
                                    .then((result) => {
                                        resolve(result)
                                    })
                            }
                            else if (err) reject(err)
                            else reject('Authentication Failed.Wrong Password');

                        })
                    } else resolve(null);
                }).catch(err => reject(err));
        }
        else if (userData.userType == "SuperAdmin") {
            await BaseModel.findUserByNumber(userData.phoneNumber, superAdminModel)
                .then(async (user) => {
                    if (user) {
                        user.comparePassword(userData.password, user.password, async function (err, isMatch) {
                            if (isMatch) {
                                await userModelService.auth(user)
                                    .then((result) => {
                                        resolve(result)
                                    })
                            }
                            else if (err) reject(err)
                            else reject('Authentication Failed.Wrong Password');

                        })
                    } else resolve(null);
                }).catch(err => reject(err));
        }
    })
}
// async function auth(user) {
//     return new Promise(async (resolve, reject) => {
//         let jwtpayload = {};
//         jwtpayload.id = user._id;
//         jwtpayload.phoneNumber = user.phoneNumber;
//         jwtpayload.email = user.email;
//         jwtpayload.defaultProfile = user.defaultProfile;
//         jwtpayload.verfied = user.verfied;
//         jwtpayload.schoolSubscription = user.schoolSubscription;
//         jwtpayload.studentCode = user.code;
//         const token = jwt.sign(jwtpayload, process.env.SECRET, { expiresIn: 1000000 });
//         let response = {
//             code: user.code,
//             id: user._id,
//             token: token
//         }
//         resolve(response);
//     })
// }

exports.auth = async (user) => {
    return new Promise(async (resolve, reject) => {
        let jwtpayload = {};
        jwtpayload.id = user._id;
        jwtpayload.phoneNumber = user.phoneNumber;
        jwtpayload.email = user.email;
        jwtpayload.defaultProfile = user.defaultProfile;
        jwtpayload.verfied = user.verfied;
        jwtpayload.schoolSubscription = user.schoolSubscription;
        jwtpayload.studentCode = user.code;
        const token = jwt.sign(jwtpayload, process.env.SECRET, { expiresIn: 1000000 });
        let response = {
            code: user.code,
            id: user._id,
            token: token
        }
        resolve(response);
    })
}

exports.findUserByNumber = async (number) => {
    return new Promise(async (resolve, reject) => {
        console.log("number: ", number);
        await userModel.findOne({ phoneNumber: number })
            .then((user) => {
                console.log("user: ", user);
                if (user) resolve(user);
                else resolve(null);

            })
            .catch((err) => reject(err));
    })
}

exports.findUserById = async (id) => {
    return new Promise(async (resolve, reject) => {
        await BaseModel.findById(id, userModel)
            .then(async (user) => {
                if (user) {
                    resolve(user);
                } else {
                    await BaseModel.findById(id, superAdminModel)
                        .then((user) => {
                            if (user) {
                                resolve(user);
                            } else resolve(null);
                        })
                }
            }).catch((err) => reject(err));

    })
}

exports.getAllProfiles = async (id) => {
    return new Promise(async (resolve, reject) => {
        await BaseModel.find(userModel)
            .then((user) => {
                if (user) {
                    resolve(user);
                } else resolve(null);
            }).catch((err) => reject(err));

    })
}
exports.authenticatePassword = async (userData) => {
    return new Promise(async (resolve, reject) => {
        await BaseModel.findUserByNumber(userData.phoneNumber, userModel)
            .then((user) => {
                console.log("ph", user)
                user.comparePassword(userData.password, user.password, function (err, isMatch) {
                    if (isMatch)
                        resolve(isMatch)
                    else
                        reject(err)
                })
            })
    })
}

exports.updatePhoneNumber = async (id, number) => {
    return new Promise(async (resolve, reject) => {
        let updateUser = {}
        updateUser.phoneNumber = number;
        updateUser.verified = true
        await BaseModel.updateOne(id, updateUser, userModel)
            .then((updateUser) => resolve(updateUser))
            .catch((err) => reject(err));
    })
}

exports.resetPassword = async (id, userData) => {
    return new Promise(async (resolve, reject) => {
        await BaseModel.findById(id, userModel)
            .then((data) => {
                if (data) {
                    data.comparePassword(userData.oldPassword, data.password, function (err, isMatch) {
                        if (isMatch)
                            resolve(isMatch)
                        else
                            reject(err)
                    })
                }

            })

    })


}

exports.updateUser1 = async (number, userDetails) => {
    console.log('userDetails', userDetails)
    return new Promise(async (resolve, reject) => {
        await BaseModel.saveUser1(number, userDetails, userModel)
            .then((updated) => resolve(updated))
            .catch((err) => reject(err));
    })
}


exports.activeInactiveAccount = async (id, data) => {
    return new Promise(async (resolve, reject) => {
        let updateUser = {}
        if (data.active) {
            if (data.active == "1")
                updateUser.active = true
            else if (data.active == "0")
                updateUser.active = false
        }
        await BaseModel.updateOne(id, updateUser, userModel)
            .then((updateUser) => resolve(updateUser))
            .catch((err) => reject(err));
    })
}
const ProfileModel = require('../models/profile');
const profileModelService = require('../models/profileModelService');
const SharedService = require('./sharedService');
const userModelService = require('../models/userModelService');
const OrderModel = require('../models/order')
const paymentService = require('../services/PayuMoneyService')

exports.createProfile = async (id, profileDetails) => {
    return new Promise(async (resolve, reject) => {
        let profileData = new ProfileModel({
            user_id: id,
            name: profileDetails.name,
            address: profileDetails.address,
            board: profileDetails.board,
            boardId: profileDetails.boardId,
            reference: profileDetails.reference,
            gradeId: profileDetails.gradeId,
            grade: profileDetails.grade,
            city: profileDetails.city,
            schoolSubscription: true
        });
        if (profileDetails.stream) profileData.stream = profileDetails.stream;
        if (profileDetails.streamId) profileData.streamId = profileDetails.streamId;

        if (profileDetails.school_code) profileData.school_code = profileDetails.school_code;
        await profileModelService.createProfile(profileData)
            .then((profileDetails) => resolve(profileDetails))
            .catch((err) => reject(err));

    })
}

exports.getAllProfiles = async (req, res, next) => {
    let message; let profiles = [];
    await userModelService.getAllProfiles()
        .then(async (users) => {
            if (users.length > 0) {
                for (let user of users) {
                    if (user.profiles.length > 0) {
                        for (let profile of user.profiles) {
                            let profileDetails = await this.getProfileDetails(profile, user);
                            profiles.push(profileDetails);
                        }
                    }
                }
                message = "Profile details fetched successfully"
                return SharedService.sendResponse(res, profiles, message, 'SUCCESS');
            } else {
                message = 'Users Not Found'
                return SharedService.sendResponse(res, null, message, 'NOT_FOUND');
            }
        }).catch((err) => {
            message = 'Error';
            return SharedService.sendResponse(res, err, message, 'ERROR')
        });
}

exports.getProfileDetails = async (id, user) => {
    return new Promise(async (resolve, reject) => {
        await profileModelService.getProfile(id)
            .then((profile) => {
                let profileDetails = {
                    userId: user._id,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    verified: user.verified,
                    schoolSubscription: user.schoolSubscription,
                    active: user.active,
                    stream: profile.stream,
                    process_fee_paid: profile.process_fee_paid,
                    profileId: profile._id,
                    name: profile.name,
                    board: profile.board,
                    reference: profile.reference,
                    grade: profile.grade,
                    city: profile.city,
                    school_code: profile.school_code,
                    student_code: profile.student_code,
                    gradeId: profile.gradeId,
                }

                resolve(profileDetails)
            })
            .catch((err) => reject(err));
    })
}

exports.getProfileById = async (id) => {
    return new Promise(async (resolve, reject) => {
        await profileModelService.getProfile(id)
            .then((profile) => {
                let profileDetails = {
                    packages: profile.packages,
                    stream: profile.stream,
                    process_fee_paid: profile.process_fee_paid,
                    profileId: profile._id,
                    name: profile.name,
                    board: profile.board,
                    grade: profile.grade,
                    reference: profile.reference,
                    city: profile.city,
                    school_code: profile.school_code,
                    student_code: profile.student_code,
                    gradeId: profile.gradeId,
                }

                resolve(profileDetails)
            })
            .catch((err) => reject(err));
    })
}

exports.getAllProfiless = async () => {
    return new Promise(async (resolve, reject) => {
        await profileModelService.getAllProfiless()
            .then((profile) => resolve(profile))
            .catch((err) => reject(err));
    })
}

exports.payProcessingFee = async (req, res, next) => {
    console.log("req.params.id ", req.params.id)
    await profileModelService.payProcessingFee(req.params.id)
        .then(async (profile) => {
            await profileModelService.getProfile(id)
                .then((profile) => {
                    message = 'Payment Done Successfully'
                    return SharedService.sendResponse(res, profile, message, 'SUCCESS')
                })

        }).catch((err) => {
            message = 'Payment Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })
}

exports.saveMCQScore = async (req, res, next) => {
    let message;
    await profileModelService.saveMCQScore(req.body)
        .then((response) => {
            message = "Stored MCQ Data Successfully"
            return SharedService.sendResponse(res, response, message, 'SUCCESS');
        }).catch((err) => {
            message = 'Failed to save MCQ score'
            return SharedService.sendResponse(res, err, message, 'ERROR');
        })
}

exports.saveTotalScore = async (req, res, next) => {
    let message;
    await profileModelService.saveTotalScore(req.body)
        .then((res) => {
            message = "Stored total score Successfully"
            return SharedService.sendResponse(res, response, message, 'SUCCESS');
        }).catch((err) => {
            message = 'Failed to save total score'
            return SharedService.sendResponse(res, err, message, 'ERROR');
        })
}

exports.getMCQScore = async (req, res, next) => {
    let message;
    console.log('req.params.profileId', req.params.profileId);
    console.log('req.query.mcqId: ', req.query.mcqId)
    await profileModelService.getMCQScore(req.params.profileId, req.query.mcqId)
        .then((score) => {
            message = 'MCQ score retrieved'
            return SharedService.sendResponse(res, score, message, 'SUCCESS')
        }).catch((err) => {
            message = 'Failed to retrieve MCQ score'
            return SharedService.sendResponse(res, err, message, 'ERROR');
        })
}


exports.saveMCQScore = async (req, res, next) => {
    let message;
    await profileModelService.saveMCQScore(req.body)
        .then((response) => {
            message = "Stored MCQ Data Successfully"
            return SharedService.sendResponse(res, response, message, 'SUCCESS');
        }).catch((err) => {
            message = 'Failed to save MCQ score'
            return SharedService.sendResponse(res, err, message, 'ERROR');
        })
}


exports.saveChat = async (req, res, next) => {
    let message;
    await profileModelService.saveChat(req)
        .then((response) => {
            message = "Stored Chat Data Successfully"
            return SharedService.sendResponse(res, response, message, 'SUCCESS');
        }).catch((err) => {
            message = 'Failed to save Chat'
            return SharedService.sendResponse(res, err, message, 'ERROR');
        })
}
exports.updateChat = async (req, res, next) => {
    let message;
    await profileModelService.updateChat(req.params.id, req.body)
        .then((response) => {
            message = "Stored Chat Data Successfully"
            return SharedService.sendResponse(res, response, message, 'SUCCESS');
        }).catch((err) => {
            message = 'Failed to save Chat'
            return SharedService.sendResponse(res, err, message, 'ERROR');
        })
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
    }
}


exports.updateProfile = async (req, res, next) => {
    let message;
    if (req.body.name) {
        console.log("req.body", req.body);
        profileModelService.updateProfile(req.params.id, req.body)
            .then((result) => {
                message = 'profile updated Successfully'
                return sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Profile updation Failed'
                return sendResponse(res, err, message, 'ERROR')
            })

    }
}

exports.createOrder = async (req, res, next) => {
    if (req.body.amount) {
        let newOrder = new OrderModel({
            user_id: req.params.id,
            profile_id: req.body.profile_id,
            amount: req.body.amount,
            packageId: req.body.packageId
        });

        //   if () { }
        //console.log("req.body", req.body);
        profileModelService.createOrder(newOrder)
            .then(async (orderCreated) => {
                //If zero payment come after appling Coupon
                if (req.body.amount == 0) {

                    await OrderModel.updateOne({ orderId: orderCreated.orderId }, { paymentStatus: 'Successful' });
                    // const redirectUrl = "https://payment-success-fail.web.app/payment-success";
                    // res.redirect(redirectUrl);
                    message = 'Order Created Successfully'
                    result = {
                        "url": "SUCCESS",
                        "orderId": orderCreated.orderId
                    }//SUCCESS
                    return sendResponse(res, result, message, 'SUCCESS')

                }
                else {
                    let userDetails = await userModelService.findUserById(req.params.id);
                    let profileDetails = await profileModelService.getProfile(req.body.profile_id);
                    orderCreated.phoneNumber = userDetails.phoneNumber;
                    orderCreated.name = profileDetails.name;
                    //console.log("userDetails", userDetails);
                    //console.log("profileDetails", profileDetails);
                    //console.log("orderCreated", orderCreated);
                    paymentService.makePayment(orderCreated, (error, result) => {

                        if (error) {
                            console.log('error', error)
                            message = 'Order Creation Failed'
                            return sendResponse(res, error, message, 'ERROR')
                        } else {
                            console.log("userDetails", userDetails);
                            message = 'Order Created Successfully'
                            result.orderId = orderCreated.orderId;
                            return sendResponse(res, result, message, 'SUCCESS')
                        }
                    });
                }
            })
            .catch((err) => {
                message = 'Order Creation Failed'
                return sendResponse(res, err, message, 'ERROR')
            })

    }
}

exports.paymentFailure = async (req, res, next) => {
    console.log("PayU money Failure Response: ", req.body)
    await OrderModel.updateOne({ orderId: req.txnid }, { paymentStatus: 'Failed' });
    const redirectUrl = "https://payment-success-fail.web.app/payment-failed"
    res.redirect(redirectUrl);
}

exports.paymentSuccess = async (req, res, next) => {
    console.log("PayU money Success Response: ", req.body)
    await OrderModel.updateOne({ orderId: req.body.txnid }, { paymentStatus: 'Successful' });
    // await orderService.updateOrderStatus(req.body.txnid, req.body.mihpayid)
    // .then((orderUpdated) => {
    //     let orderCode = orderUpdated._id
    const redirectUrl = "https://payment-success-fail.web.app/payment-success";
    res.redirect(redirectUrl);
    // }).catch(error => {
    //     console.log("Internal Error: ", error);
    //     const redirectUrl = "http://lazzanew.efcynt.com/failure"
    //   res.redirect(redirectUrl);
    // })
}

exports.paymentStatus = async (req, res, next) => {
    await OrderModel.findOne({ orderId: req.params.orderId })
        .then((response) => {
            let paymentStatus = response.paymentStatus;
            message = 'Payment Status fetched Successfully'
            return sendResponse(res, paymentStatus, message, 'SUCCESS')
        }).catch((err) => {
            message = 'Payment Status fetching Failed'
            return sendResponse(res, err, message, 'ERROR')
        })
}
const express = require('express');
const app = express();
const router = new express.Router();
const passport = require('passport');
const userService = require('../services/userService');
const profileService = require('../services/profileService');
const MasterService = require('../services/masterService')

const authware = passport.authenticate('jwt', { session: false });
app.use(passport.initialize());
require('../config/passport')(passport);

// Phone Number Verification
router.get('/verifyPhoneNumber/:number', userService.verifyPhoneNumber);

router.get('/verifyOTP/:otp', userService.verifyOTP);

router.post('/authenticate', userService.login);

router.post('/createProfile/:id', authware, userService.createProfile);

router.get('/getUser/:id', authware, userService.getUser);

router.get('/verifyUserByStudentCode/:student_code', userService.verifyUserByStudentCode);

router.get('/studentVerifyOTP/:otp', userService.studentVerifyOTP);

router.put('/payProcessingFee/:id', authware, profileService.payProcessingFee);

router.post('/saveMCQScore', authware, profileService.saveMCQScore);

router.post('/saveTotalScore', authware, profileService.saveTotalScore);

router.get('/getMCQScore/:profileId', authware, profileService.getMCQScore);

router.get('/getStudentPackagesbySubject/:subjectId', authware, MasterService.getStudentsPackagesbySubjectId);

router.get('/getProfile/:id', authware, profileService.getProfileDetails);

router.get('/getAllProfiles', profileService.getAllProfiles);


router.get('/getAllProfiless', profileService.getAllProfiless);

router.post('/saveChat/:id', authware, profileService.saveChat);

router.put('/updateChat/:id', authware, profileService.updateChat);

router.put('/updateProfile/:id', authware, profileService.updateProfile);

router.get('/updateVerifyPhoneNumber/:number', userService.updateVerifyPhoneNumber);

router.put('/updatePhoneNumber/:otp/:id', userService.updatePhoneNumber);

router.put('/resetPassword/:id', authware, userService.resetPassword);

router.get('/forgotPasswordPhone/:number', userService.forgotPasswordPhone);

router.get('/forgotPasswordOTP/:otp', userService.forgotPasswordOTP);

router.put('/forgotPassword', userService.forgotPassword);

router.post('/createOrder/:id', authware, profileService.createOrder);
//router.post('/createOrder/:id', profileService.createOrder);//for trial checking without auth

router.post('/paymentSuccess', profileService.paymentSuccess);

router.post('/paymentFailure', profileService.paymentFailure);

router.get('/getPaymentStatus/:orderId', authware, profileService.paymentStatus)

// router.get('/getProfile/:id', profileService.getProfile);
// $2b$10$pxGrp1ybobb4QnyNDJR3jeNTM4BjiwBb2oOt0FvC9fzWXxg5Kd5CO
module.exports = router;




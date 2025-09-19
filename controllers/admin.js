const express = require('express');
const router = new express.Router();
const MasterService = require('../services/masterService')
const UserService = require('../services/userService')
const ProfileService = require('../services/profileService')
const multipart = require('connect-multiparty');
const { Router } = require('express');
const multipartMiddleware = multipart({
  uploadDir: './public/images'
});



// Create Category
router.post('/createCategory', MasterService.createCategories);

// Create Board
router.post('/createBoard', MasterService.createBoards);

// Create Grade
router.post('/createGrade', MasterService.createGrades);

// Create Stream
router.post('/createStream', MasterService.createStreams);

//Create Package Category
router.post('/createPackageCategory', MasterService.createPackageCategories)

// Create Subject
router.post('/createSubject', multipartMiddleware, MasterService.createSubject);

// Create Lesson
router.post('/createLesson', MasterService.createLesson);

// Create Topic
router.post('/createTopic', multipartMiddleware, MasterService.createTopic);

// Create Video Links
router.post('/addVideoLinks', MasterService.addVideoLinks);

// Create MCQs
router.post('/createMCQs', MasterService.createMCQs);

// Create Package
router.post('/createPackage', MasterService.createPackage);

//Create Tuition Teachers
router.post('/createTuitionTeacher', MasterService.createTuitionTeacher);

//Create Tuition Students 
router.post('/addTuitionStudent', MasterService.addTuitionStudent);

// Create TimeTable
router.post('/createTimeTable', MasterService.createTimeTable);
// Create Teacher
router.post('/createTeacher', multipartMiddleware, MasterService.createTeacher);

// Create SchoolAdmin
router.post('/SchoolAdmin', MasterService.createSchoolAdmin);

// Create SuperAdmin
router.post('/SuperAdmin', MasterService.createSuperAdmin);





// Get All Category
router.get('/getAllCategory', MasterService.getAllCategory);

// Get All Boards
router.get('/getBoards', MasterService.getBoards);

// Get All Grades
router.get('/getAllGrade', MasterService.getAllGrade);

// Get All Streams
router.get('/getAllStreams', MasterService.getAllStreams);

//Get All packageCategories
router.get('/getAllPackageCategories', MasterService.getAllPackageCategories);

// Get All Subject
router.get('/getAllSubject', MasterService.getAllSubject);

// Get All Lesson
router.get('/getAllLesson', MasterService.getAllLesson);

// Get All Topic
router.get('/getAllTopic', MasterService.getAllTopic);

// Get All VideoLink
router.get('/getAllVideoLinks', MasterService.getAllVideoLinks);

//Get All Teachers
router.get('/getAllTeachers', MasterService.getAllTeachers);
//Get All TimeTable
router.get('/getAllTimeTable', MasterService.getAllTimeTable);

//Get All Tuition Teachers
router.get('/getAllTuitionTeachers', MasterService.getAllTuitionTeachers);

// Get All Packages 
router.get('/getAllPackages', MasterService.getPackages);

//Get All Tuition Students
router.get('/getAllTuitionStudents', MasterService.getAllTuitionStudents);

// Get All school admin
router.get('/getAllSchoolAdmin', MasterService.getAllSchoolAdmin);

// Get All mcq
router.get('/getAllMcq', MasterService.getAllMcq);



//Get All Tuition Teachers by Subject, Grade, Board, Stream
router.get('/getAllTuitionTeachersBySubject/:subject', MasterService.getAllTuitionTeachersBySubject);

// Get Grades by board
router.get('/getGrades/:boardId', MasterService.getGradesbyBoard);

// Get Stream by grade
router.get('/getStreams/:gradeId', MasterService.getStreamsbyGrade);

// Get Subjects by gradeid and Stream Name
router.get('/getSubjects/:gradeId', MasterService.getSubjectsbyGrade);

// get Lesson by Subject
router.get('/getLessons/:subjectId', MasterService.getLessonsbySubject);

// get Topic by Lesson
router.get('/getTopics/:lessonId', MasterService.getTopicsbyLesson);

// get Videos by Topic
router.get('/getVideos/:topicId', MasterService.getVideosbyTopic);

// get MCQ by Topic
router.get('/getMCQs/:topicId', MasterService.getMCQsbyTopic);

// get TimeTable by Topic
router.get('/getTimetable', MasterService.getTimetable);

// Get Packages by gradeid and Stream Name
router.get('/getPackages/:gradeId', MasterService.getPackagesbyGrade);

// Get Packages by Subjectid, gradeid and Stream Name
router.get('/getPackagesbySubject/:subjectId', MasterService.getPackagesbySubject);

// get MCQ by Topic
router.get('/getMCQs/:topicId', MasterService.getMCQsbyTopic);

// Get Packages by gradeid and Stream Name
router.get('/getPackages/:gradeId', MasterService.getPackagesbyGrade);

// Get Packages by Subjectid, gradeid and Stream Name
router.get('/getPackagesbySubject/:subjectId', MasterService.getPackagesbySubject);

//Get Packages by PackageCategoryId
router.get('/getPackagesByPackageCategoryId/:packageCategoryId', MasterService.getPackagesByPackageCategoryId);

//Get All Active Package Categories
router.get('/getAllActivePackageCategories', MasterService.getAllActivePackageCategories);




//Get Tuition Teacher by Id
router.get('/getTuitionTeacherbyId/:id', MasterService.getTuitionTeacherbyId);

//Get Tuition Student by Id
router.get('/getTuitionStudentbyId/:tuitionstudentId', MasterService.getTuitionStudentbyId);

//Get Teacher by Id
router.get('/getTeacherbyId/:teacherId', MasterService.getTeacherbyId);

// get TimeTable by Id
router.get('/getTimetableById/:id', MasterService.getTimetableById);

//Get school admin by Id
router.get('/getSchoolAdminById/:id', MasterService.getSchoolAdminById);

//Get category by Id
router.get('/getCategoryById/:id', MasterService.getCategoryById);

//Get board by Id
router.get('/getBoardById/:id', MasterService.getBoardById);

//Get grade by Id
router.get('/getGradeById/:id', MasterService.getGradeById);

//Get stream by Id
router.get('/getStreamById/:id', MasterService.getStreamById);

//Get package category by Id
router.get('/getPackageCategoryById/:id', MasterService.getPackageCategoryById)

//Get subject by Id
router.get('/getSubjectById/:id', MasterService.getSubjectById);

//Get Lesson by Id
router.get('/getLessonById/:id', MasterService.getLessonById);

//Get Topic by Id
router.get('/getTopicById/:id', MasterService.getTopicById);

//Get VideoLinks by Id
router.get('/getVideoLinksById/:id', MasterService.getVideoLinksById);

//Get Package by Id
router.get('/getPackageById/:id', MasterService.getPackageById);

//Get mcq by Id
router.get('/getMcqById/:id', MasterService.getMcqById);



//  User Account routes

// Create Account
router.post('/createAccount', UserService.createAccount);

// Create Profile by Admin
router.post('/createProfileByAdmin/:id', UserService.createProfileByAdmin);

router.get('/getAllProfiles', ProfileService.getAllProfiles);

router.post('/assignPackagesToStudent/:profileId', UserService.assignPackagesToStudent);

router.put('/activeInactiveAccount/:id', UserService.activeInactiveAccount);






//update Category
router.put('/updateCategory/:categoryId', MasterService.updateCategory);

// update Board
router.put('/updateBoard/:boardId', MasterService.updateBoards);

// update Package Category
router.put('/updatePackageCategory/:packageCategoryId', MasterService.updatePackageCategories)

//update Grade
router.put('/updateGrade/:gradeId', MasterService.updateGrades);

// update Stream
router.put('/updateStream/:streamId', MasterService.updateStreams);

// update Subject
router.put('/updateSubject/:subjectId', multipartMiddleware, MasterService.updateSubject);

// update Lesson
router.put('/updateLesson/:lessonId', MasterService.updateLesson);

// update Topic
router.put('/updateTopic/:topicId', multipartMiddleware, MasterService.updateTopic);

// update Video Links
router.put('/updateVideoLinks/:videoLinkId', MasterService.updateVideoLinks);

//update Teacher
router.put('/updateTeacher/:teacherId', multipartMiddleware, MasterService.updateTeacher);

//update Tuition Teachers
router.put('/updateTuitionTeacher/:id', multipartMiddleware, MasterService.updateTuitionTeacher);

//update Tuition Students
router.put('/updateTuitionStudent/:tuitionstudentId', MasterService.updateTuitionStudent);

//update Timetable
router.put('/updateTimeTable/:id', MasterService.updateTimeTable);

// update Package
router.put('/updatePackage/:id', MasterService.updatePackage);

//update MCQ'S
router.put('/updateMCQs/:id', MasterService.updateMCQs);

// update schooladmin
router.put('/updateSchoolAdmin/:schoolid', MasterService.updateSchoolAdmin);

// update superadmin
router.put('/updateSuperAdmin/:superid', MasterService.updateSuperAdmin);









//delete Category
router.delete('/deleteCategory/:category', MasterService.deleteCategory);

//delete Board
router.delete('/deleteBoard/:id', MasterService.deleteBoard);

//delete Grade
router.delete('/deleteGrade/:id', MasterService.deleteGrade);

//delete Stream
router.delete('/deleteStream/:id', MasterService.deleteStream);

//delete Package Category
router.delete('/deletePackageCategory/:id', MasterService.deletePackageCategory);

//delete Subject
router.delete('/deleteSubject/:id', MasterService.deleteSubject);

//delete Lesson
router.delete('/deleteLesson/:id', MasterService.deleteLesson);

//delete Topic
router.delete('/deleteTopic/:id', MasterService.deleteTopic);

//delete VideoLink
router.delete('/deleteVideoLink/:id', MasterService.deleteVideoLink);

//delete mcq
router.delete('/deleteMcq/:id', MasterService.deleteMcq);

//delete Package
router.delete('/deletePackage/:id', MasterService.deletePackage);


//delete Timetable
router.delete('/deleteTimeTable/:timetable', MasterService.deleteTimeTable);

// delete Timetable hour
router.delete('/deleteHour/:timetableId/:day/:hourId', MasterService.deleteHour)

//delete Teacher
router.delete('/deleteTeacher/:teacherId', multipartMiddleware, MasterService.deleteTeacher);

//delete Tuition Student
router.delete('/deleteTuitionStudent/:tuitionstudentId', MasterService.deleteTuitionStudent);

//delete Tuition Teacher
router.delete('/deleteTuitionTeacher/:id', multipartMiddleware, MasterService.deleteTuitionTeacher);

//delete SchoolAdmin
router.delete('/deleteSchoolAdmin/:schoolid', MasterService.deleteSchoolAdmin);


//  ******* Coupon APIs  ************//
router.post('/createCoupon', MasterService.createCoupon);
router.post('/checkCouponValidity', MasterService.checkCouponValidity);
router.get('/getAllCoupon', MasterService.getAllCoupon);
router.put('/updateCoupon', MasterService.updateCouponById);
router.delete('/deleteCoupon', MasterService.deleteCouponById);


module.exports = router;
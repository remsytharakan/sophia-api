const BaseModel = require('./baseModel');
const SchoolAdminModel = require('./schoolAdmin');
const SuperAdminModel = require('./superAdmin');
const CategoryModel = require('./category')
const BoardModel = require('./board');
const GradeModel = require('./grade');
const StreamModel = require('./stream');
const SubjectModel = require('./subject');
const LessonModel = require('./lesson');
const TopicModel = require('./topic');
const VideoLinkModel = require('./videoLink');
const lesson = require('./lesson');
const PackageModel = require('./package');
const MCQModel = require('./mcq');
const TeacherModel = require('./teacher');
const TuitionTeacherModel = require('./tuitionTeacher');
const TuitionStudentModel = require('./tuitionStudent');
const TimeTableModel = require('./timetable');
const StudentPackageModel = require('./studentPackages');
const SharedService = require('../services/sharedService');
const PackageCategoryModel = require('./packageCategory');
const stream = require('./stream');
const packageCategory = require('./packageCategory');
const couponModel = require('../models/coupon');


exports.createCategory = async (category) => {
    return new Promise((resolve, reject) => {
        let categoryData = new CategoryModel({
            categoryName: category
        })

        BaseModel.save(categoryData)
            .then((categorySaved) => resolve(categorySaved))
            .catch((err) => reject(err));
    })
}

exports.updateCategory = async (id, category) => {
    return new Promise(async (resolve, reject) => {
        let updateCategoryData = {}
        if (category.categoryName)
            updateCategoryData.categoryName = category.categoryName
        if (category.active) {
            if (category.active == "0")
                updateCategoryData.active = false
            else if (category.active == "1")
                updateCategoryData.active = true
        }
        await BaseModel.updateOne(id, updateCategoryData, CategoryModel)
            .then((updatedCategoryData) => resolve(updatedCategoryData))
            .catch((err) => reject(err));
    })
}
exports.getAllCategory = async () => {
    return new Promise((resolve, reject) => {

        BaseModel.find(CategoryModel)
            .then((CategoryData) => resolve(CategoryData))
            .catch((err) => reject(err));
    })
}
exports.createBoard = async (board) => {
    return new Promise((resolve, reject) => {
        let boardData = new BoardModel({
            categoryId: board.categoryId,
            board: board.board,
            boardName: board.boardName
        })

        BaseModel.save(boardData)
            .then((boardData) => resolve(boardData))
            .catch((err) => reject(err));
    })
}

exports.createGrade = async (grade) => {
    return new Promise((resolve, reject) => {
        let gradeData = new GradeModel({
            categoryId: grade.categoryId,
            boardId: grade.boardId,
            grade: grade.grade,
            gradeName: grade.gradeName,
            isStream: grade.isStream
        })
        if (grade.isStream === 1) gradeData.isStream = true;
        else if (grade.isStream === 0) gradeData.isStream = false;

        BaseModel.save(gradeData)
            .then((gradeData) => resolve(gradeData))
            .catch((err) => reject(err));
    })
}

exports.createStream = async (stream) => {
    return new Promise((resolve, reject) => {
        let streamData = new StreamModel({
            categoryId: stream.categoryId,
            boardId: stream.boardId,
            gradeId: stream.gradeId,
            streamName: stream.streamName
        })

        BaseModel.save(streamData)
            .then((streamData) => resolve(streamData))
            .catch((err) => reject(err));
    })
}

exports.createPackageCategory = async (packageCategory) => {
    return new Promise((resolve, reject) => {
        let packageCategoryData = new PackageCategoryModel({
            categoryId: packageCategory.categoryId,
            packageCategoryName: packageCategory.packageCategoryName,

        })
        BaseModel.save(packageCategoryData)
            .then((packageCategoryData) => resolve(packageCategoryData))
            .catch((err) => reject(err));
    })
}


exports.getCategoryById = async (categoryId) => {
    return new Promise((resolve, reject) => {

        BaseModel.findById(categoryId, CategoryModel)
            .then((categoryData) => resolve(categoryData))
            .catch((err) => reject(err));
    })
}

exports.getBoardById = async (boardId) => {
    return new Promise((resolve, reject) => {

        BaseModel.findById(boardId, BoardModel)
            .then((boardData) => resolve(boardData))
            .catch((err) => reject(err));
    })
}

exports.getGradeById = async (gradeId) => {
    return new Promise((resolve, reject) => {

        BaseModel.findById(gradeId, GradeModel)
            .then((gradeData) => resolve(gradeData))
            .catch((err) => reject(err));
    })
}

exports.getStreamById = async (streamId) => {
    return new Promise((resolve, reject) => {

        BaseModel.findById(streamId, StreamModel)
            .then((streamData) => resolve(streamData))
            .catch((err) => reject(err));
    })
}

exports.getPackageCategoryById = async (packageCategoryID) => {
    return new Promise((resolve, reject) => {
        BaseModel.findById(packageCategoryID, PackageCategoryModel)
            .then((packageCategoryData) => resolve(packageCategoryData))
            .catch((err) => reject(err));
    })
}

exports.createSubject = async (subject, image) => {
    return new Promise((resolve, reject) => {
        let subjectData = new SubjectModel({
            categoryId: subject.categoryId,
            boardId: subject.boardId,
            gradeId: subject.gradeId,
            streamId: subject.streamId,
            streamName: subject.streamName,
            subjectName: subject.subjectName,
            description: subject.description,
            color: subject.color,
        })
        if (image != undefined) {
            if (image.subjectImage != undefined) {
                let file = image.subjectImage;
                subjectData.image_fieldName = file.fieldName;
                subjectData.image_original_filename = file.originalFilename;
                subjectData.image_size = file.size;
                subjectData.image_type = file.type;
                subjectData.image_name = file.name;
                subjectData.image_path = file.path;
            }
        }

        BaseModel.save(subjectData)
            .then((subjectData) => resolve(subjectData))
            .catch((err) => reject(err));
    })
}
exports.createLesson = async (lesson) => {
    return new Promise((resolve, reject) => {
        let lessonData = new LessonModel({
            categoryId: lesson.categoryId,
            boardId: lesson.boardId,
            gradeId: lesson.gradeId,
            streamId: lesson.streamId,
            subjectId: lesson.subjectId,
            lessonName: lesson.lessonName,
            lessonNumber: lesson.lessonNumber,
            description: lesson.description,
        })

        BaseModel.save(lessonData)
            .then((lessonData) => resolve(lessonData))
            .catch((err) => reject(err));
    })
}

exports.createTopic = async (topic, image) => {
    return new Promise((resolve, reject) => {
        let topicData = new TopicModel({
            categoryId: topic.categoryId,
            boardId: topic.boardId,
            gradeId: topic.gradeId,
            streamId: topic.streamId,
            subjectId: topic.subjectId,
            lessonId: topic.lessonId,
            topicName: topic.topicName,
            description: topic.description,
        })
        if (image != undefined) {
            if (image.topicImage != undefined) {
                let file = image.topicImage;
                topicData.image_fieldName = file.fieldName;
                topicData.image_original_filename = file.originalFilename;
                topicData.image_size = file.size;
                topicData.image_type = file.type;
                topicData.image_name = file.name;
                topicData.image_path = file.path;
            }
        }

        BaseModel.save(topicData)
            .then((topicData) => resolve(topicData))
            .catch((err) => reject(err));
    })
}

exports.addVideoLinks = async (videoLink) => {
    return new Promise((resolve, reject) => {
        let videoLinkData = new VideoLinkModel({
            categoryId: videoLink.categoryId,
            boardId: videoLink.boardId,
            gradeId: videoLink.gradeId,
            streamId: videoLink.streamId,
            subjectId: videoLink.subjectId,
            lessonId: videoLink.lessonId,
            topicId: videoLink.topicId,
            videoName: videoLink.videoName,
            videoLink: videoLink.videoLink,
            videoType: videoLink.videoType,
            description: videoLink.description,
        })
        BaseModel.save(videoLinkData)
            .then((videoLinkData) => resolve(videoLinkData))
            .catch((err) => reject(err));
    })
}

exports.createMCQ = async (mcq) => {
    return new Promise((resolve, reject) => {
        let mcqData = new MCQModel({
            categoryId: mcq.categoryId,
            boardId: mcq.boardId,
            gradeId: mcq.gradeId,
            streamId: mcq.streamId,
            subjectId: mcq.subjectId,
            lessonId: mcq.lessonId,
            topicId: mcq.topicId,
            totalMarks: parseInt(mcq.totalMarks),
            title: mcq.title,
            time: parseInt(mcq.time),
        })
        if (mcq.questions.length > 0) {
            for (let question of mcq.questions) {
                let questionData = {
                    mark: parseInt(question.mark),
                    question: question.question,
                    option1: question.option1,
                    option2: question.option2,
                    option3: question.option3,
                    option4: question.option4,
                    correctOption: question.correctOption,
                }
                if (question.explanation) questionData.explanation = question.explanation;
                mcqData.questions.push(questionData);

            }
        }
        BaseModel.save(mcqData)
            .then((mcqData) => resolve(mcqData))
            .catch((err) => reject(err));
    })
}

exports.createPackage = async (package) => {
    return new Promise((resolve, reject) => {

        console.log("Package", package);
        let packageData = new PackageModel({
            categoryId: package.categoryId,
            packageCategoryId: package.packageCategoryId,
            boardId: package.boardId,
            gradeId: package.gradeId,
            streamName: package.streamName,
            packageName: package.packageName,
            price: package.price,
            description: package.description,
        })
        // console.log("packageData ", package.subjects);

        // for (let subject of package.subjects) {
        //     let subjects = { lessons: [] }
        //     for (let lesson of subject.lessons) {
        //         console.log("lesson ", lesson)
        //         let lessons = { topicIds: [] }
        //         for (let topicId of lesson.topicIds) {

        //             lessons.topicIds.push(topicId)
        //         }
        //         lessons.lessonId = lesson.lessonId
        //         subjects.lessons.push(lessons)
        //     }
        //     subjects.subjectId = subject.subjectId;
        //     packageData.subjects.push(subjects);
        // }


        console.log("packageData ", package.subjects);
        if (package.subjects.length > 0) {
            for (let subject of package.subjects) {
                let subjects = { lessons: [] }
                if (subject.lessons.length > 0) {
                    for (let lesson of subject.lessons) {
                        console.log("lesson ", lesson)
                        let lessons = { topicIds: [] }
                        if (lesson.topicIds.length > 0) {
                            for (let topicId of lesson.topicIds) {

                                lessons.topicIds.push(topicId)
                            }
                        }
                        lessons.lessonId = lesson.lessonId
                        subjects.lessons.push(lessons)
                    }
                }

                subjects.subjectId = subject.subjectId;
                packageData.subjects.push(subjects);
            }
        }
        BaseModel.save(packageData)
            .then((packageData) => resolve(packageData))
            .catch((err) => reject(err));
    })
}

exports.createTimeTable = async (timetable) => {
    return new Promise((resolve, reject) => {

        let timeTableData = new TimeTableModel({
            categoryId: timetable.categoryId,
            boardId: timetable.boardId,
            gradeId: timetable.gradeId,
            streamId: timetable.streamId,
            month: timetable.month,
            monthName: timetable.monthName,
            week: timetable.week
        })
        if (timetable.monday.length > 0) {
            for (let item of timetable.monday) {
                let timetableDetails = {
                    schoolCode: item.schoolCode,
                    facultyId: item.facultyId,
                    subjectId: item.subjectId,
                    videoLinkId: item.videoLinkId,
                    topicId: item.topicId,
                    title: item.title,
                    facultyName: item.facultyName,
                    subjectName: item.subjectName,
                    lessonName: item.lessonName,
                    topicName: item.topicName,
                    videoLink: item.videoLink,
                    videoName: item.videoName,
                    day: item.day,
                    dayValue: item.dayValue,
                    date: item.date,
                    timeFrom: item.timeFrom,
                    timeFromPeriod: item.timeFromPeriod,
                    timeTo: item.timeTo,
                    timeToPeriod: item.timeToPeriod,
                    zoomLink: item.zoomLink,
                    zoomTimeFrom: item.zoomTimeFrom,
                    zoomTimeFromPeriod: item.zoomTimeFromPeriod,
                    zoomTimeTo: item.zoomTimeTo,
                    zoomTimeToPeriod: item.zoomTimeToPeriod,
                    hour: item.hour,
                }
                timeTableData.monday.push(timetableDetails);
            }
        }
        if (timetable.tuesday.length > 0) {
            for (let item of timetable.tuesday) {
                let timetableDetails = {
                    schoolCode: item.schoolCode,
                    facultyId: item.facultyId,
                    subjectId: item.subjectId,
                    videoLinkId: item.videoLinkId,
                    topicId: item.topicId,
                    title: item.title,
                    facultyName: item.facultyName,
                    subjectName: item.subjectName,
                    lessonName: item.lessonName,
                    topicName: item.topicName,
                    videoLink: item.videoLink,
                    videoName: item.videoName,
                    day: item.day,
                    dayValue: item.dayValue,
                    date: item.date,
                    timeFrom: item.timeFrom,
                    timeFromPeriod: item.timeFromPeriod,
                    timeTo: item.timeTo,
                    timeToPeriod: item.timeToPeriod,
                    zoomLink: item.zoomLink,
                    zoomTimeFrom: item.zoomTimeFrom,
                    zoomTimeFromPeriod: item.zoomTimeFromPeriod,
                    zoomTimeTo: item.zoomTimeTo,
                    zoomTimeToPeriod: item.zoomTimeToPeriod,
                    hour: item.hour,
                }
                timeTableData.tuesday.push(timetableDetails);
            }
        }
        if (timetable.wednesday.length > 0) {
            for (let item of timetable.wednesday) {
                let timetableDetails = {
                    schoolCode: item.schoolCode,
                    facultyId: item.facultyId,
                    subjectId: item.subjectId,
                    videoLinkId: item.videoLinkId,
                    topicId: item.topicId,
                    title: item.title,
                    facultyName: item.facultyName,
                    subjectName: item.subjectName,
                    lessonName: item.lessonName,
                    topicName: item.topicName,
                    videoLink: item.videoLink,
                    videoName: item.videoName,
                    day: item.day,
                    dayValue: item.dayValue,
                    date: item.date,
                    timeFrom: item.timeFrom,
                    timeFromPeriod: item.timeFromPeriod,
                    timeTo: item.timeTo,
                    timeToPeriod: item.timeToPeriod,
                    zoomLink: item.zoomLink,
                    zoomTimeFrom: item.zoomTimeFrom,
                    zoomTimeFromPeriod: item.zoomTimeFromPeriod,
                    zoomTimeTo: item.zoomTimeTo,
                    zoomTimeToPeriod: item.zoomTimeToPeriod,
                    hour: item.hour,
                }
                timeTableData.wednesday.push(timetableDetails);
            }
        }
        if (timetable.thursday.length > 0) {
            for (let item of timetable.thursday) {
                let timetableDetails = {
                    schoolCode: item.schoolCode,
                    facultyId: item.facultyId,
                    subjectId: item.subjectId,
                    videoLinkId: item.videoLinkId,
                    topicId: item.topicId,
                    title: item.title,
                    facultyName: item.facultyName,
                    subjectName: item.subjectName,
                    lessonName: item.lessonName,
                    topicName: item.topicName,
                    videoLink: item.videoLink,
                    videoName: item.videoName,
                    day: item.day,
                    dayValue: item.dayValue,
                    date: item.date,
                    timeFrom: item.timeFrom,
                    timeFromPeriod: item.timeFromPeriod,
                    timeTo: item.timeTo,
                    timeToPeriod: item.timeToPeriod,
                    zoomLink: item.zoomLink,
                    zoomTimeFrom: item.zoomTimeFrom,
                    zoomTimeFromPeriod: item.zoomTimeFromPeriod,
                    zoomTimeTo: item.zoomTimeTo,
                    zoomTimeToPeriod: item.zoomTimeToPeriod,
                    hour: item.hour,
                }
                timeTableData.thursday.push(timetableDetails);
            }
        }
        if (timetable.friday.length > 0) {
            for (let item of timetable.friday) {
                let timetableDetails = {
                    schoolCode: item.schoolCode,
                    facultyId: item.facultyId,
                    subjectId: item.subjectId,
                    videoLinkId: item.videoLinkId,
                    topicId: item.topicId,
                    title: item.title,
                    facultyName: item.facultyName,
                    subjectName: item.subjectName,
                    lessonName: item.lessonName,
                    topicName: item.topicName,
                    videoLink: item.videoLink,
                    videoName: item.videoName,
                    day: item.day,
                    dayValue: item.dayValue,
                    date: item.date,
                    timeFrom: item.timeFrom,
                    timeFromPeriod: item.timeFromPeriod,
                    timeTo: item.timeTo,
                    timeToPeriod: item.timeToPeriod,
                    zoomLink: item.zoomLink,
                    zoomTimeFrom: item.zoomTimeFrom,
                    zoomTimeFromPeriod: item.zoomTimeFromPeriod,
                    zoomTimeTo: item.zoomTimeTo,
                    zoomTimeToPeriod: item.zoomTimeToPeriod,
                    hour: item.hour,
                }
                timeTableData.friday.push(timetableDetails);
            }
        }
        if (timetable.saturday.length > 0) {
            for (let item of timetable.saturday) {
                let timetableDetails = {
                    schoolCode: item.schoolCode,
                    facultyId: item.facultyId,
                    subjectId: item.subjectId,
                    videoLinkId: item.videoLinkId,
                    topicId: item.topicId,
                    title: item.title,
                    facultyName: item.facultyName,
                    subjectName: item.subjectName,
                    lessonName: item.lessonName,
                    topicName: item.topicName,
                    videoLink: item.videoLink,
                    videoName: item.videoName,
                    day: item.day,
                    dayValue: item.dayValue,
                    date: item.date,
                    timeFrom: item.timeFrom,
                    timeFromPeriod: item.timeFromPeriod,
                    timeTo: item.timeTo,
                    timeToPeriod: item.timeToPeriod,
                    zoomLink: item.zoomLink,
                    zoomTimeFrom: item.zoomTimeFrom,
                    zoomTimeFromPeriod: item.zoomTimeFromPeriod,
                    zoomTimeTo: item.zoomTimeTo,
                    zoomTimeToPeriod: item.zoomTimeToPeriod,
                    hour: item.hour,
                }
                timeTableData.saturday.push(timetableDetails);
            }
        }
        console.log(timeTableData)
        BaseModel.save(timeTableData)
            .then((timetableResult) => {
                resolve(timetableResult);
            })
            .catch((err) => reject(err));
    })
}

exports.getBoard = async () => {
    return new Promise((resolve, reject) => {

        BaseModel.find(BoardModel)
            .then((boardData) => resolve(boardData))
            .catch((err) => reject(err));
    })
}
exports.getAllGrade = async () => {
    return new Promise((resolve, reject) => {
        BaseModel.find(GradeModel)
            .then((gradeData) => resolve(gradeData))
            .catch((err) => reject(err));
    })
}

exports.getAllStreams = async () => {
    return new Promise((resolve, reject) => {
        BaseModel.find(StreamModel)
            .then((streamData) => resolve(streamData))
            .catch((err) => reject(err));
    })
}
exports.getAllPackageCategories = async () => {
    return new Promise((resolve, reject) => {
        BaseModel.find(PackageCategoryModel)
            .then((packageCategoryData) => resolve(packageCategoryData))
            .catch((err) => reject(err));
    })
}

exports.getAllSubject = async () => {
    return new Promise((resolve, reject) => {
        BaseModel.find(SubjectModel)
            .then((subjectData) => resolve(subjectData))
            .catch((err) => reject(err));
    })
}

exports.getAllLesson = async () => {
    return new Promise((resolve, reject) => {
        BaseModel.find(LessonModel)
            .then((lessonData) => resolve(lessonData))
            .catch((err) => reject(err));
    })
}

exports.getAllTopic = async () => {
    return new Promise((resolve, reject) => {
        BaseModel.find(TopicModel)
            .then((topicData) => resolve(topicData))
            .catch((err) => reject(err));
    })
}

exports.getAllVideoLinks = async () => {
    return new Promise((resolve, reject) => {
        BaseModel.find(VideoLinkModel)
            .then((videoLinkData) => resolve(videoLinkData))
            .catch((err) => reject(err));
    })
}

exports.getGrades = async (boardId) => {
    return new Promise((resolve, reject) => {

        BaseModel.findByBoardId(boardId, GradeModel)
            .then((gradeData) => resolve(gradeData))
            .catch((err) => reject(err));
    })
}


exports.getStreams = async (gradeId) => {
    return new Promise((resolve, reject) => {

        BaseModel.findByGradeId(gradeId, StreamModel)
            .then((streamData) => resolve(streamData))
            .catch((err) => reject(err));
    })
}

exports.getSubjects = async (gradeId, stream) => {
    return new Promise((resolve, reject) => {

        BaseModel.findSubjectsByGradeId(gradeId, stream, SubjectModel)
            .then((subjectData) => resolve(subjectData))
            .catch((err) => reject(err));
    })
}

exports.getLessons = async (subjectId) => {
    return new Promise((resolve, reject) => {

        BaseModel.findBySubjectId(subjectId, LessonModel)
            .then((lessonData) => resolve(lessonData))
            .catch((err) => reject(err));
    })
}

exports.getSubjectById = async (subjectId) => {
    return new Promise((resolve, reject) => {

        BaseModel.findById(subjectId, SubjectModel)
            .then((subjectData) => resolve(subjectData))
            .catch((err) => reject(err));
    })
}

exports.getLessonById = async (lessonId) => {
    return new Promise((resolve, reject) => {

        BaseModel.findById(lessonId, LessonModel)
            .then((lessonData) => resolve(lessonData))
            .catch((err) => reject(err));
    })
}

exports.getTopics = async (lessonId) => {
    return new Promise((resolve, reject) => {

        BaseModel.findByLessonId(lessonId, TopicModel)
            .then((topicData) => resolve(topicData))
            .catch((err) => reject(err));
    })
}

exports.getTopicById = async (topicId) => {
    return new Promise((resolve, reject) => {

        BaseModel.findById(topicId, TopicModel)
            .then((topicData) => resolve(topicData))
            .catch((err) => reject(err));
    })
}
exports.getVideoLinksById = async (videoId) => {
    return new Promise((resolve, reject) => {

        BaseModel.findById(videoId, VideoLinkModel)
            .then((videoData) => resolve(videoData))
            .catch((err) => reject(err));
    })
}
exports.getPackageById = async (packageId) => {
    return new Promise((resolve, reject) => {

        BaseModel.findById(packageId, PackageModel)
            .then((packageData) => resolve(packageData))
            .catch((err) => reject(err));
    })
}
exports.getMcqById = async (McqId) => {
    return new Promise((resolve, reject) => {

        BaseModel.findById(McqId, MCQModel)
            .then((mcqData) => resolve(mcqData))
            .catch((err) => reject(err));
    })
}
exports.getVideos = async (topicId) => {
    return new Promise((resolve, reject) => {

        BaseModel.findVideosByTopicId(topicId, VideoLinkModel)
            .then((videoLinkData) => resolve(videoLinkData))
            .catch((err) => reject(err));
    })
}

exports.getMCQs = async (topicId) => {
    return new Promise((resolve, reject) => {

        BaseModel.findByTopicId(topicId, MCQModel)
            .then((mcqData) => resolve(mcqData))
            .catch((err) => reject(err));
    })
}
exports.getTimetable = async (getData) => {
    return new Promise(async (resolve, reject) => {
        let monthWeekData = await SharedService.getMonthAndWeek();
        console.log("monthAndWeek: ", monthWeekData)
        BaseModel.findTimeTable(getData, TimeTableModel, monthWeekData)
            .then((timeTable) => resolve(timeTable))
            .catch((err) => reject(err));
    })
}

exports.updatePackage = async (id, package) => {
    return new Promise(async (resolve, reject) => {
        console.log("Packagee", package.active);
        let updatePackageData = {}
        if (package.categoryId)
            updatePackageData.categoryId = package.categoryId;

        if (package.packageCategoryId)
            updatePackageData.packageCategoryId = package.packageCategoryId;

        if (package.boardId)
            updatePackageData.boardId = package.boardId;

        if (package.gradeId)
            updatePackageData.gradeId = package.gradeId;

        if (package.streamName)
            updatePackageData.streamName = package.streamName;

        if (package.packageName)
            updatePackageData.packageName = package.packageName;

        if (package.subjects) {
            updatePackageData.subjects = [];
            if (package.subjects.length > 0) {
                for (let subject of package.subjects) {
                    let subjects = { lessons: [] }
                    console.log("subject ", subject)
                    if (subject.lessons.length > 0) {
                        for (let lesson of subject.lessons) {
                            console.log("lesson ", lesson)
                            let lessons = { topicIds: [] }
                            if (lesson.topicIds.length > 0) {
                                console.log("lesson.topicIds ", lesson.topicIds)
                                for (let topicId of lesson.topicIds) {
                                    console.log("topicId ", topicId)
                                    lessons.topicIds.push(topicId)
                                    console.log("lessons ", lessons)
                                }
                            }
                            lessons.lessonId = lesson.lessonId
                            subjects.lessons.push(lessons)
                        }
                    }
                    subjects.subjectId = subject.subjectId;
                    updatePackageData.subjects.push(subjects)
                }
            }
        }
        if (package.price)
            updatePackageData.price = package.price;

        if (package.description)
            updatePackageData.description = package.description;

        if (package.active) {
            if (package.active == "0")
                updatePackageData.active = false
            else if (package.active == "1")
                updatePackageData.active = true
        }
        await BaseModel.updateOne(id, updatePackageData, PackageModel)
            .then((updatePackageData) => resolve(updatePackageData))
            .catch((err) => reject(err));
    })
}

exports.getAllPackages = async () => {
    return new Promise((resolve, reject) => {

        BaseModel.find(PackageModel)
            .then((packageData) => resolve(packageData))
            .catch((err) => reject(err));
    })
}

exports.getPackages = async (gradeId, stream) => {
    return new Promise((resolve, reject) => {

        BaseModel.findPackagesByGradeId(gradeId, stream, PackageModel)
            .then((subjectData) => resolve(subjectData))
            .catch((err) => reject(err));
    })
}
exports.getTimetableById = async (id) => {
    return new Promise((resolve, reject) => {

        BaseModel.findById(id, TimeTableModel)
            .then((timeTableData) => resolve(timeTableData))
            .catch((err) => reject(err));
    })
}
exports.getPackageById = async (id) => {
    return new Promise((resolve, reject) => {

        BaseModel.findById(id, PackageModel)
            .then((packageData) => resolve(packageData))
            .catch((err) => reject(err));
    })
}

exports.getPackagesbySubject = async (subjectId, gradeId, stream) => {
    return new Promise((resolve, reject) => {

        BaseModel.findPackagesByGradeId(gradeId, stream, PackageModel)
            .then((subjectData) => resolve(subjectData))
            .catch((err) => reject(err));
    })
}

exports.getPackagesbySubjectId = async (subjectId, gradeId, stream) => {
    return new Promise((resolve, reject) => {

        BaseModel.findPackagesBySubjectId(subjectId, gradeId, stream, PackageModel)
            .then((subjectData) => resolve(subjectData))
            .catch((err) => reject(err));
    })
}

exports.getPackagesByPackageCategoryId = async (packageCategoryId, subjectId, gradeId, stream) => {
    return new Promise((resolve, reject) => {

        BaseModel.findPackagesByPackageCategoryId(packageCategoryId, subjectId, gradeId, stream, PackageModel)
            .then((subjectData) => resolve(subjectData))
            .catch((err) => reject(err));
    })
}

exports.getAllActivePackageCategories = async () => {
    return new Promise((resolve, reject) => {
        let query = { active: true };
        BaseModel.findByQuery(query, PackageCategoryModel)
            .then((packageCategoryData) => resolve(packageCategoryData))
            .catch((err) => reject(err));
    })
}


exports.getStudentsPackagesbySubjectId = async (subjectId, gradeId, stream, profileId) => {
    return new Promise((resolve, reject) => {

        BaseModel.findStudentPackagesBySubjectId(subjectId, gradeId, stream, profileId, StudentPackageModel)
            .then((subjectData) => resolve(subjectData))
            .catch((err) => reject(err));
    })
}


exports.updateBoards = async (id, board) => {
    return new Promise(async (resolve, reject) => {
        let updateBoardData = {}
        if (board.categoryId)
            updateBoardData.categoryId = board.categoryId
        if (board.board)
            updateBoardData.board = board.board
        if (board.boardName)
            updateBoardData.boardName = board.boardName
        if (board.active) {
            if (board.active == "0")
                updateBoardData.active = false
            else if (board.active == "1")
                updateBoardData.active = true
        }
        await BaseModel.updateOne(id, updateBoardData, BoardModel)

            .then((updateBoardData) => resolve(updateBoardData))
            .catch((err) => reject(err))
    })

}

exports.updatePackageCategories = async (id, packageCategory) => {
    return new Promise(async (resolve, reject) => {
        let updatePackageCategoryData = {};
        if (packageCategory.categoryId)
            updatePackageCategoryData.categoryId = packageCategory.categoryId;
        if (packageCategory.packageCategoryName)
            updatePackageCategoryData.packageCategoryName = packageCategory.packageCategoryName;
        if (packageCategory.active) {
            if (packageCategory.active == "0")
                updatePackageCategoryData.active = false
            else if (packageCategory.active == "1")
                updatePackageCategoryData.active = true
        }
        await BaseModel.updateOne(id, updatePackageCategoryData, PackageCategoryModel)

            .then((updatePackageCategoryData) => resolve(updatePackageCategoryData))
            .catch((err) => reject(err))

    })
}

exports.updateGrade = async (id, grade) => {
    return new Promise(async (resolve, reject) => {
        let updateGradeData = {}
        if (grade.categoryId)
            updateGradeData.categoryId = grade.categoryId;
        if (grade.boardId)
            updateGradeData.boardId = grade.boardId;
        if (grade.grade)
            updateGradeData.grade = grade.grade;
        if (grade.gradeName)
            updateGradeData.gradeName = grade.gradeName;
        if (grade.isStream) {
            if (grade.isStream == "0")
                updateGradeData.isStream = false
            else
                updateGradeData.isStream = true
        }
        if (grade.active) {
            if (grade.active == "0")
                updateGradeData.active = false
            else if (grade.active == "1")
                updateGradeData.active = true
        }
        await BaseModel.updateOne(id, updateGradeData, GradeModel)

            .then((updateGradeData) => resolve(updateGradeData))
            .catch((err) => reject(err));
    })
}

exports.updateStream = async (id, stream) => {
    return new Promise(async (resolve, reject) => {
        let updateStreamData = {}

        if (stream.categoryId) {
            updateStreamData.categoryId = stream.categoryId;
            if (stream.boardId)
                updateStreamData.boardId = stream.boardId;
            if (stream.gradeId)
                updateStreamData.gradeId = stream.gradeId;
            if (stream.streamName)
                updateStreamData.streamName = stream.streamName
        }
        if (stream.active) {
            if (stream.active == "0")
                updateStreamData.active = false
            else if (stream.active == "1")
                updateStreamData.active = true
        }
        await BaseModel.updateOne(id, updateStreamData, StreamModel)

            .then((updateStreamData) => resolve(updateStreamData))
            .catch((err) => reject(err));
    })
}

exports.updateSubject = async (id, subject, image) => {
    return new Promise(async (resolve, reject) => {
        let updateSubjectData = {}
        console.log("updateSubject: ", subject)
        if (subject.categoryId)
            updateSubjectData.categoryId = subject.categoryId;
        if (subject.boardId)
            updateSubjectData.boardId = subject.boardId;
        if (subject.gradeId)
            updateSubjectData.gradeId = subject.gradeId;
        if (subject.streamId)
            updateSubjectData.streamId = subject.streamId;
        if (subject.streamName)
            updateSubjectData.streamName = subject.streamName;
        if (subject.subjectName)
            updateSubjectData.subjectName = subject.subjectName;
        if (subject.description)
            updateSubjectData.description = subject.description;
        if (subject.color)
            updateSubjectData.color = subject.color;
        if (subject.active) {
            if (subject.active == "0")
                updateSubjectData.active = false
            else if (subject.active == "1")
                updateSubjectData.active = true
        }
        if (image != undefined) {
            if (image.subjectImage != undefined) {
                let file = image.subjectImage;
                updateSubjectData.image_fieldName = file.fieldName;
                updateSubjectData.image_original_filename = file.originalFilename;
                updateSubjectData.image_size = file.size;
                updateSubjectData.image_type = file.type;
                updateSubjectData.image_name = file.name;
                updateSubjectData.image_path = file.path;
            }
        }

        await BaseModel.updateOne(id, updateSubjectData, SubjectModel)
            .then((updateSubjectData) => resolve(updateSubjectData))
            .catch((err) => reject(err));
    })
}
exports.updateTimeTable = async (timetable, timetableId) => {
    return new Promise(async (resolve, reject) => {

        let updateTimeTableData = {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
        }
        if (timetable.categoryId)
            updateTimeTableData.categoryId = timetable.categoryId;
        if (timetable.boardId)
            updateTimeTableData.boardId = timetable.boardId;
        if (timetable.gradeId)
            updateTimeTableData.gradeId = timetable.gradeId;
        if (timetable.streamId)
            updateTimeTableData.streamId = timetable.streamId;
        if (timetable.active) {
            if (timetable.active == "1")
                updateTimeTableData.active = true
            else (timetable.active == "0")
            updateTimeTableData.active = false
        }

        if (timetable.monday.length > 0) {
            for (let item of timetable.monday) {
                let timetableDetails = {
                    schoolCode: item.schoolCode,
                    facultyId: item.facultyId,
                    subjectId: item.subjectId,
                    videoLinkId: item.videoLinkId,
                    topicId: item.topicId,
                    title: item.title,
                    facultyName: item.facultyName,
                    subjectName: item.subjectName,
                    lessonName: item.lessonName,
                    topicName: item.topicName,
                    videoLink: item.videoLink,
                    videoName: item.videoName,
                    day: item.day,
                    dayValue: item.dayValue,
                    date: item.date,
                    timeFrom: item.timeFrom,
                    timeFromPeriod: item.timeFromPeriod,
                    timeTo: item.timeTo,
                    timeToPeriod: item.timeToPeriod,
                    zoomLink: item.zoomLink,
                    zoomTimeFrom: item.zoomTimeFrom,
                    zoomTimeFromPeriod: item.zoomTimeFromPeriod,
                    zoomTimeTo: item.zoomTimeTo,
                    zoomTimeToPeriod: item.zoomTimeToPeriod,
                    hour: item.hour,
                }
                updateTimeTableData.monday.push(timetableDetails);
            }
        }
        if (timetable.tuesday.length > 0) {
            for (let item of timetable.tuesday) {
                let timetableDetails = {
                    schoolCode: item.schoolCode,
                    facultyId: item.facultyId,
                    subjectId: item.subjectId,
                    videoLinkId: item.videoLinkId,
                    topicId: item.topicId,
                    title: item.title,
                    facultyName: item.facultyName,
                    subjectName: item.subjectName,
                    lessonName: item.lessonName,
                    topicName: item.topicName,
                    videoLink: item.videoLink,
                    videoName: item.videoName,
                    day: item.day,
                    dayValue: item.dayValue,
                    date: item.date,
                    timeFrom: item.timeFrom,
                    timeFromPeriod: item.timeFromPeriod,
                    timeTo: item.timeTo,
                    timeToPeriod: item.timeToPeriod,
                    zoomLink: item.zoomLink,
                    zoomTimeFrom: item.zoomTimeFrom,
                    zoomTimeFromPeriod: item.zoomTimeFromPeriod,
                    zoomTimeTo: item.zoomTimeTo,
                    zoomTimeToPeriod: item.zoomTimeToPeriod,
                    hour: item.hour,
                }
                updateTimeTableData.tuesday.push(timetableDetails);
            }
        }
        if (timetable.wednesday.length > 0) {
            for (let item of timetable.wednesday) {
                let timetableDetails = {
                    schoolCode: item.schoolCode,
                    facultyId: item.facultyId,
                    subjectId: item.subjectId,
                    videoLinkId: item.videoLinkId,
                    topicId: item.topicId,
                    title: item.title,
                    facultyName: item.facultyName,
                    subjectName: item.subjectName,
                    lessonName: item.lessonName,
                    topicName: item.topicName,
                    videoLink: item.videoLink,
                    videoName: item.videoName,
                    day: item.day,
                    dayValue: item.dayValue,
                    date: item.date,
                    timeFrom: item.timeFrom,
                    timeFromPeriod: item.timeFromPeriod,
                    timeTo: item.timeTo,
                    timeToPeriod: item.timeToPeriod,
                    zoomLink: item.zoomLink,
                    zoomTimeFrom: item.zoomTimeFrom,
                    zoomTimeFromPeriod: item.zoomTimeFromPeriod,
                    zoomTimeTo: item.zoomTimeTo,
                    zoomTimeToPeriod: item.zoomTimeToPeriod,
                    hour: item.hour,
                }
                updateTimeTableData.wednesday.push(timetableDetails);
            }
        }
        if (timetable.thursday.length > 0) {
            for (let item of timetable.thursday) {
                let timetableDetails = {
                    schoolCode: item.schoolCode,
                    facultyId: item.facultyId,
                    subjectId: item.subjectId,
                    videoLinkId: item.videoLinkId,
                    topicId: item.topicId,
                    title: item.title,
                    facultyName: item.facultyName,
                    subjectName: item.subjectName,
                    lessonName: item.lessonName,
                    topicName: item.topicName,
                    videoLink: item.videoLink,
                    videoName: item.videoName,
                    day: item.day,
                    dayValue: item.dayValue,
                    date: item.date,
                    timeFrom: item.timeFrom,
                    timeFromPeriod: item.timeFromPeriod,
                    timeTo: item.timeTo,
                    timeToPeriod: item.timeToPeriod,
                    zoomLink: item.zoomLink,
                    zoomTimeFrom: item.zoomTimeFrom,
                    zoomTimeFromPeriod: item.zoomTimeFromPeriod,
                    zoomTimeTo: item.zoomTimeTo,
                    zoomTimeToPeriod: item.zoomTimeToPeriod,
                    hour: item.hour,
                }
                updateTimeTableData.thursday.push(timetableDetails);
            }
        }
        if (timetable.friday.length > 0) {
            for (let item of timetable.friday) {
                let timetableDetails = {
                    schoolCode: item.schoolCode,
                    facultyId: item.facultyId,
                    subjectId: item.subjectId,
                    videoLinkId: item.videoLinkId,
                    topicId: item.topicId,
                    title: item.title,
                    facultyName: item.facultyName,
                    subjectName: item.subjectName,
                    lessonName: item.lessonName,
                    topicName: item.topicName,
                    videoLink: item.videoLink,
                    videoName: item.videoName,
                    day: item.day,
                    dayValue: item.dayValue,
                    date: item.date,
                    timeFrom: item.timeFrom,
                    timeFromPeriod: item.timeFromPeriod,
                    timeTo: item.timeTo,
                    timeToPeriod: item.timeToPeriod,
                    zoomLink: item.zoomLink,
                    zoomTimeFrom: item.zoomTimeFrom,
                    zoomTimeFromPeriod: item.zoomTimeFromPeriod,
                    zoomTimeTo: item.zoomTimeTo,
                    zoomTimeToPeriod: item.zoomTimeToPeriod,
                    hour: item.hour,
                }
                updateTimeTableData.friday.push(timetableDetails);
            }
        }
        if (timetable.saturday.length > 0) {
            for (let item of timetable.saturday) {
                let timetableDetails = {
                    schoolCode: item.schoolCode,
                    facultyId: item.facultyId,
                    subjectId: item.subjectId,
                    videoLinkId: item.videoLinkId,
                    topicId: item.topicId,
                    title: item.title,
                    facultyName: item.facultyName,
                    subjectName: item.subjectName,
                    lessonName: item.lessonName,
                    topicName: item.topicName,
                    videoLink: item.videoLink,
                    videoName: item.videoName,
                    day: item.day,
                    dayValue: item.dayValue,
                    date: item.date,
                    timeFrom: item.timeFrom,
                    timeFromPeriod: item.timeFromPeriod,
                    timeTo: item.timeTo,
                    timeToPeriod: item.timeToPeriod,
                    zoomLink: item.zoomLink,
                    zoomTimeFrom: item.zoomTimeFrom,
                    zoomTimeFromPeriod: item.zoomTimeFromPeriod,
                    zoomTimeTo: item.zoomTimeTo,
                    zoomTimeToPeriod: item.zoomTimeToPeriod,
                    hour: item.hour,
                }
                updateTimeTableData.saturday.push(timetableDetails);
            }
        }
        await BaseModel.updateOne(timetableId, updateTimeTableData, TimeTableModel)
            .then((updateTimeTableData) => resolve(updateTimeTableData))
            .catch((err) => reject(err));
    });
}
exports.updateLesson = async (id, lesson) => {
    return new Promise(async (resolve, reject) => {
        let updateLessonData = {}

        if (lesson.categoryId)
            updateLessonData.categoryId = lesson.categoryId;
        if (lesson.boardId)
            updateLessonData.boardId = lesson.boardId;
        if (lesson.gradeId)
            updateLessonData.gradeId = lesson.gradeId;
        if (lesson.streamId)
            updateLessonData.streamId = lesson.streamId;
        if (lesson.subjectId)
            updateLessonData.subjectId = lesson.subjectId;
        if (lesson.lessonName)
            updateLessonData.lessonName = lesson.lessonName;
        if (lesson.lessonNumber)
            updateLessonData.lessonNumber = lesson.lessonNumber;
        if (lesson.descriptio)
            updateLessonData.description = lesson.description;
        if (lesson.active) {
            if (lesson.active == "0")
                updateLessonData.active = false
            else if (lesson.active == "1")
                updateLessonData.active = true
        }
        await BaseModel.updateOne(id, updateLessonData, LessonModel)
            .then((updateLessonData) => resolve(updateLessonData))
            .catch((err) => reject(err));
    })
}
exports.updateTopic = async (id, topic, image) => {
    return new Promise(async (resolve, reject) => {
        let updateTopicData = {}
        console.log("Image: ", image)
        if (topic.categoryId)
            updateTopicData.categoryId = topic.categoryId;
        if (topic.boardId)
            updateTopicData.boardId = topic.boardId;
        if (topic.gradeId)
            updateTopicData.gradeId = topic.gradeId;
        if (topic.streamId)
            updateTopicData.streamId = topic.streamId;
        if (topic.subjectId)
            updateTopicData.subjectId = topic.subjectId;
        if (topic.lessonId)
            updateTopicData.lessonId = topic.lessonId;
        if (topic.topicName)
            updateTopicData.topicName = topic.topicName;
        if (topic.description)
            updateTopicData.description = topic.description;
        if (topic.active) {
            if (topic.active == "0")
                updateTopicData.active = false
            else if (topic.active == "1")
                updateTopicData.active = true
        }

        if (image != undefined) {
            if (image.topicImage != undefined) {
                let file = image.topicImage;
                updateTopicData.image_fieldName = file.fieldName;
                updateTopicData.image_original_filename = file.originalFilename;
                updateTopicData.image_size = file.size;
                updateTopicData.image_type = file.type;
                updateTopicData.image_name = file.name;
                updateTopicData.image_path = file.path;
            }
        }

        await BaseModel.updateOne(id, updateTopicData, TopicModel)
            .then((updateTopicData) => resolve(updateTopicData))
            .catch((err) => reject(err));
    })
}
// exports.getPackages = async (gradeId, stream) => {
//     return new Promise((resolve, reject) => {

//         BaseModel.findPackagesByGradeId(gradeId, stream, PackageModel)
//             .then((subjectData) => resolve(subjectData))
//             .catch((err) => reject(err));
//     })
// }

exports.updateVideoLinks = async (id, videoLink) => {
    return new Promise(async (resolve, reject) => {
        let updateVideoLinkData = {}

        if (videoLink.categoryId)
            updateVideoLinkData.categoryId = videoLink.categoryId;
        if (videoLink.boardId)
            updateVideoLinkData.boardId = videoLink.boardId;
        if (videoLink.gradeId)
            updateVideoLinkData.gradeId = videoLink.gradeId;
        if (videoLink.streamId)
            updateVideoLinkData.streamId = videoLink.streamId;
        if (videoLink.subjectId)
            updateVideoLinkData.subjectId = videoLink.subjectId;
        if (videoLink.lessonId)
            updateVideoLinkData.lessonId = videoLink.lessonId;
        if (videoLink.topicId)
            updateVideoLinkData.topicId = videoLink.topicId;
        if (videoLink.videoName)
            updateVideoLinkData.videoName = videoLink.videoName;
        if (videoLink.videoLink)
            updateVideoLinkData.videoLink = videoLink.videoLink;
        if (videoLink.videoType)
            updateVideoLinkData.videoType = videoLink.videoType;
        if (videoLink.description)
            updateVideoLinkData.description = videoLink.description;
        if (videoLink.active) {
            if (videoLink.active == "0")
                updateVideoLinkData.active = false
            else if (videoLink.active == "1")
                updateVideoLinkData.active = true
        }
        await BaseModel.updateOne(id, updateVideoLinkData, VideoLinkModel)
            .then((updateVideoLinkData) => resolve(updateVideoLinkData))
            .catch((err) => reject(err));
    })
}

exports.createTeacher = async (teacher, image) => {
    return new Promise((resolve, reject) => {
        let teacherData = new TeacherModel({
            boardId: teacher.boardId,
            gradeId: teacher.gradeId,
            streamId: teacher.streamId,
            firstName: teacher.firstName,
            middleName: teacher.middleName,
            lastName: teacher.lastName,
            userType: teacher.userType,
            password: teacher.password,
            dateOfBirth: teacher.dateOfBirth,
            gender: teacher.gender,
            bloodGroup: teacher.bloodGroup,
            subject: teacher.subject,
            class: teacher.class,
            maritalStatus: teacher.martialStatus,
            birthPlace: teacher.birthPlace,
            aadharNo: teacher.aadharNo,
            nationality: teacher.nationality,
            motherTongue: teacher.motherTongue,
            position: teacher.position,
            yearOfExperience: teacher.yearOfExperience
        })
        if (image != undefined) {
            if (image.teacherImage != undefined) {
                let file = image.teacherImage;
                teacherData.image_fieldName = file.fieldName;
                teacherData.image_original_filename = file.originalFilename;
                teacherData.image_size = file.size;
                teacherData.image_type = file.type;
                teacherData.image_name = file.name;
                teacherData.image_path = file.path;
            }
        }
        BaseModel.save(teacherData)
            .then((teacherData) => resolve(teacherData))
            .catch((err) => {
                console.log("Error: ", err)
                reject(err)
            });
    })
}

exports.createTuitionTeacher = async (tuitionTeacher) => {
    return new Promise((resolve, reject) => {
        let TuitionTeacherData = new TuitionTeacherModel({
            firstName: tuitionTeacher.firstName,
            middleName: tuitionTeacher.middleName,
            // lastName: tuitionTeacher.lastName,
            // dateOfBirth: tuitionTeacher.dateOfBirth,
            // gender: tuitionTeacher.gender,
            // bloodGroup: tuitionTeacher.bloodGroup,
            // maritalStatus: tuitionTeacher.martialStatus,
            // birthPlace: tuitionTeacher.birthPlace,
            // aadharNo: tuitionTeacher.aadharNo,
            // nationality: tuitionTeacher.nationality,
            // motherTongue: tuitionTeacher.motherTongue,
            position: tuitionTeacher.position,
            yearOfExperience: tuitionTeacher.yearOfExperience
        })
        if (tuitionTeacher.subjects.length > 0) {
            for (let item of tuitionTeacher.subjects) {
                let tuitionTeacherDetails = {
                    title: item.title,
                    subjectName: item.subjectName,
                    board: item.board,
                    grade: item.grade,
                    stream: item.stream,
                    tuitionTime: item.tuitionTime,
                    // period: item.period,
                }
                TuitionTeacherData.subjects.push(tuitionTeacherDetails);
            }
        }

        // if (image != undefined) {
        //     if (image.tuitionTeacherImage != undefined) {
        //         let file = image.tuitionTeacherImage;
        //         tuitionTeacherData.image_fieldName = file.fieldName;
        //         tuitionTeacherData.image_original_filename = file.originalFilename;
        //         tuitionTeacherData.image_size = file.size;
        //         tuitionTeacherData.image_type = file.type;
        //         tuitionTeacherData.image_name = file.name;
        //         tuitionTeacherData.image_path = file.path;
        //     }
        // }
        BaseModel.save(TuitionTeacherData)
            .then((TuitionTeacherData) => resolve(TuitionTeacherData))
            .catch((err) => reject(err));
    })
}

exports.addTuitionStudent = async (tuitionStudent) => {
    return new Promise((resolve, reject) => {
        let TuitionStudentData = new TuitionStudentModel({
            userId: tuitionStudent.userId,
            tuitionTeacherId: tuitionStudent.tuitionTeacherId,
            studentCode: tuitionStudent.studentCode,
            subjectName: tuitionStudent.subjectName,
            tuitionTeacherName: tuitionStudent.tuitionTeacherName,
            paymentStatus: tuitionStudent.paymentStatus,
        })

        BaseModel.save(TuitionStudentData)
            .then((TuitionStudentData) => resolve(TuitionStudentData))
            .catch((err) => reject(err));
    })
}
exports.getTuitionTeacherbyId = async (id) => {
    return new Promise((resolve, reject) => {

        BaseModel.findById(id, TuitionTeacherModel)
            .then((tuitionteacherData) => resolve(tuitionteacherData))
            .catch((err) => reject(err));
    })
}

exports.getTuitionStudentbyId = async (tuitionstudentId) => {
    return new Promise((resolve, reject) => {

        BaseModel.findById(tuitionstudentId, TuitionStudentModel)
            .then((TuitionStudentData) => resolve(TuitionStudentData))
            .catch((err) => reject(err));
    })
}
exports.getTeacherbyId = async (Id) => {
    return new Promise((resolve, reject) => {

        BaseModel.findById(teacherId, TeacherModel)
            .then((teacherData) => resolve(teacherData))
            .catch((err) => reject(err));
    })
}

exports.getAllTuitionTeachers = async () => {
    return new Promise((resolve, reject) => {

        BaseModel.find(TuitionTeacherModel)
            .then((tuitionTeacherData) => resolve(tuitionTeacherData))
            .catch((err) => reject(err));
    })
}

exports.getAllTuitionTeachersBySubject = async (req) => {
    return new Promise((resolve, reject) => {
        console.log("Req: ", req.query)
        let query = { subjects: { $elemMatch: { subjectName: req.params.subject, board: req.query.board, stream: req.query.stream, grade: req.query.grade } }, active: true }
        BaseModel.findByQuery(query, TuitionTeacherModel)
            .then((tuitionTeacherData) => resolve(tuitionTeacherData))
            .catch((err) => reject(err));
    })
}

exports.getAllTuitionStudents = async () => {
    return new Promise((resolve, reject) => {

        BaseModel.find(TuitionStudentModel)
            .then((TuitionStudentData) => resolve(TuitionStudentData))
            .catch((err) => reject(err));
    })
}
exports.getAllTeachers = async () => {
    return new Promise((resolve, reject) => {

        BaseModel.find(TeacherModel)
            .then((teacherData) => resolve(teacherData))
            .catch((err) => reject(err));
    })
}
exports.getAllTimeTable = async () => {
    return new Promise((resolve, reject) => {

        BaseModel.find(TimeTableModel)
            .then((timeTableData) => resolve(timeTableData))
            .catch((err) => reject(err));
    })
}

exports.updateTeacher = async (id, teacher, image) => {
    return new Promise(async (resolve, reject) => {
        let updateTeacherData = {}

        if (teacher.firstName)
            updateTeacherData.firstName = teacher.firstName;
        if (teacher.middleName)
            updateTeacherData.middleName = teacher.middleName;
        if (teacher.lastName)
            updateTeacherData.lastName = teacher.lastName;
        if (teacher.dateOfBirth)
            updateTeacherData.dateOfBirth = teacher.dateOfBirth;
        if (teacher.gender)
            updateTeacherData.gender = teacher.gender;
        if (teacher.bloodGroup)
            updateTeacherData.bloodGroup = teacher.bloodGroup;
        if (teacher.subject)
            updateTeacherData.subject = teacher.subject;
        if (teacher.class)
            updateTeacherData.class = teacher.class;
        if (teacher.maritalStatus)
            updateTeacherData.maritalStatus = teacher.maritalStatus;
        if (teacher.active) {
            if (teacher.active == "1")
                updateTeacherData.active = true
            else if (teacher.active == "0")
                updateTeacherData.active = false
        }
        if (image != undefined) {
            if (image.teacherImage != undefined) {
                let file = image.teacherImage;
                updateTeacherData.image_fieldName = file.fieldName;
                updateTeacherData.image_original_filename = file.originalFilename;
                updateTeacherData.image_size = file.size;
                updateTeacherData.image_type = file.type;
                updateTeacherData.image_name = file.name;
                updateTeacherData.image_path = file.path;
            }
        }

        await BaseModel.updateOne(Id, updateTeacherData, TeacherModel)
            .then((updateTeacherData) => resolve(updateTeacherData))
            .catch((err) => reject(err));
    });
}

exports.updateTuitionTeacher = async (id, tuitionTeacher, image) => {
    return new Promise(async (resolve, reject) => {
        let updateTuitionTeacherData = {
            subjects: [],
        }

        if (tuitionTeacher.firstName)
            updateTuitionTeacherData.firstName = tuitionTeacher.firstName;
        if (tuitionTeacher.middleName)
            updateTuitionTeacherData.middleName = tuitionTeacher.middleName;
        if (tuitionTeacher.lastName)
            updateTuitionTeacherData.lastName = tuitionTeacher.lastName;
        if (tuitionTeacher.dateOfBirth)
            updateTuitionTeacherData.dateOfBirth = tuitionTeacher.dateOfBirth;
        if (tuitionTeacher.gender)
            updateTuitionTeacherData.gender = tuitionTeacher.gender;
        if (tuitionTeacher.bloodGroup)
            updateTuitionTeacherData.bloodGroup = tuitionTeacher.bloodGroup;
        if (tuitionTeacher.maritalStatus)
            updateTuitionTeacherData.maritalStatus = tuitionTeacher.maritalStatus;
        if (tuitionTeacher.birthPlace)
            updateTuitionTeacherData.birthPlace = tuitionTeacher.birthPlace;
        if (tuitionTeacher.aadharNo)
            updateTuitionTeacherData.aadharNo = tuitionTeacher.aadharNo;
        if (tuitionTeacher.nationality)
            updateTuitionTeacherData.nationality = tuitionTeacher.nationality;
        if (tuitionTeacher.motherTongue)
            updateTuitionTeacherData.motherTongue = tuitionTeacher.motherTongue;
        if (tuitionTeacher.position)
            updateTuitionTeacherData.position = tuitionTeacher.position;
        if (tuitionTeacher.yearOfExperience)
            updateTuitionTeacherData.yearOfExperience = tuitionTeacher.yearOfExperience;
        if (tuitionTeacher.active) {
            if (tuitionTeacher.active == "1")
                updateTuitionTeacherData.active = true
            else if (tuitionTeacher.active == "0")
                updateTuitionTeacherData.active = false
        }
        if (tuitionTeacher.subjects.length > 0) {
            for (let item of tuitionTeacher.subjects) {
                let tuitionTeacherDetails = {
                    title: item.title,
                    subjectName: item.subjectName,
                    class: item.class,
                    tuitionTime: item.tuitionTime,
                    period: item.period,
                }
                updateTuitionTeacherData.subjects.push(tuitionTeacherDetails);
            }
        }
        if (image != undefined) {
            if (image.tuitionTeacherImage != undefined) {
                let file = image.tuitionTeacherImage;
                updateTuitionTeacherData.image_fieldName = file.fieldName;
                updateTuitionTeacherData.image_original_filename = file.originalFilename;
                updateTuitionTeacherData.image_size = file.size;
                updateTuitionTeacherData.image_type = file.type;
                updateTuitionTeacherData.image_name = file.name;
                updateTuitionTeacherData.image_path = file.path;
            }
        }

        await BaseModel.updateOne(id, updateTuitionTeacherData, TuitionTeacherModel)
            .then((updateTuitionTeacherData) => resolve(updateTuitionTeacherData))
            .catch((err) => reject(err));
    });
}

exports.updateTuitionStudent = async (tuitionstudentId, tuitionStudent) => {
    return new Promise(async (resolve, reject) => {
        let updateTuitionStudentData = {}

        if (tuitionStudent.userId)
            updateTuitionStudentData.userId = tuitionStudent.userId;
        if (tuitionStudent.tuitionTeacherId)
            updateTuitionStudentData.tuitionTeacherId = tuitionStudent.tuitionTeacherId;
        if (tuitionStudent.studentCode)
            updateTuitionStudentData.studentCode = tuitionStudent.studentCode;
        if (tuitionStudent.subjectName)
            updateTuitionStudentData.subjectName = tuitionStudent.subjectName;
        if (tuitionStudent.tuitionTeacherName)
            updateTuitionStudentData.tuitionTeacherName = tuitionStudent.tuitionTeacherName;
        if (tuitionStudent.paymentStatus)
            updateTuitionStudentData.paymentStatus = tuitionStudent.paymentStatus;

        await BaseModel.updateOne(tuitionstudentId, updateTuitionStudentData, TuitionStudentModel)
            .then((updateTuitionStudentData) => resolve(updateTuitionStudentData))
            .catch((err) => reject(err));
    })
}
exports.deleteTeacher = async (id) => {
    return new Promise(async (resolve, reject) => {

        await BaseModel.deleteOne(id, TeacherModel)
            .then((deleteTeacherData) => resolve(deleteTeacherData))
            .catch((err) => reject(err));
    });
}

exports.deleteTuitionTeacher = async (id) => {
    return new Promise(async (resolve, reject) => {

        await BaseModel.deleteOne(id, TuitionTeacherModel)
            .then((deletetuitionTeacherData) => resolve(deletetuitionTeacherData))
            .catch((err) => reject(err));
    });
}

exports.deleteTuitionStudent = async (tuitionstudentId) => {
    return new Promise(async (resolve, reject) => {

        await BaseModel.deleteOne(tuitionstudentId, TuitionStudentModel)
            .then((deleteTuitionStudentData) => resolve(deleteTuitionStudentData))
            .catch((err) => reject(err));
    });
}
exports.deleteCategory = async (category) => {
    return new Promise(async (resolve, reject) => {

        let categry = false;
        await BaseModel.findByCategoryId(category, BoardModel)
            .then(async (categoryy) => {
                if (categoryy.length > 0) {
                    categry = true
                }
                else {
                    await BaseModel.findByCategoryId(category, GradeModel)
                        .then(async (grade) => {
                            if (grade.length > 0) {
                                categry = true
                            }
                            else {
                                await BaseModel.findByCategoryId(category, StreamModel)
                                    .then(async (stream) => {
                                        if (stream.length > 0) {
                                            categry = true
                                        }
                                        else {
                                            await BaseModel.findByCategoryId(category, SubjectModel)
                                                .then(async (subject) => {
                                                    if (subject.length > 0) {
                                                        categry = true

                                                    }
                                                    else {
                                                        await BaseModel.findByCategoryId(category, LessonModel)
                                                            .then(async (lesson) => {
                                                                if (lesson.length > 0) {
                                                                    categry = true
                                                                }
                                                                else {
                                                                    await BaseModel.findByCategoryId(category, TopicModel)
                                                                        .then(async (topic) => {
                                                                            if (topic.length > 0) {
                                                                                categry = true
                                                                            }
                                                                            else {
                                                                                await BaseModel.findByCategoryId(category, VideoLinkModel)
                                                                                    .then(async (video) => {
                                                                                        if (video.length > 0) {
                                                                                            categry = true
                                                                                        }
                                                                                        else {
                                                                                            categry = false
                                                                                        }
                                                                                    })
                                                                            }
                                                                        })
                                                                }
                                                            })
                                                    }
                                                })
                                        }
                                    })
                            }
                        })
                }
            })
        if (categry == false) {
            await BaseModel.deleteOne(category, CategoryModel)
                .then((categoryData) => resolve(categoryData))
                .catch((err) => reject(err));
        }
        else {
            resolve(true)
        }
    });
}
exports.deleteBoard = async (id) => {
    return new Promise(async (resolve, reject) => {

        let bord = false;
        await BaseModel.findByBoardId(id, GradeModel)
            .then(async (grade) => {
                if (grade.length > 0) {
                    bord = true
                }
                else {
                    await BaseModel.findByBoardId(id, StreamModel)
                        .then(async (stream) => {
                            if (stream.length > 0) {
                                bord = true
                            }
                            else {
                                await BaseModel.findByBoardId(id, SubjectModel)
                                    .then(async (subject) => {
                                        if (subject.length > 0) {
                                            bord = true

                                        }
                                        else {
                                            await BaseModel.findByBoardId(id, LessonModel)
                                                .then(async (lesson) => {
                                                    if (lesson.length > 0) {
                                                        bord = true
                                                    }
                                                    else {
                                                        await BaseModel.findByBoardId(id, TopicModel)
                                                            .then(async (topic) => {
                                                                if (topic.length > 0) {
                                                                    bord = true
                                                                }
                                                                else {
                                                                    await BaseModel.findByBoardId(id, VideoLinkModel)
                                                                        .then(async (video) => {
                                                                            if (video.length > 0) {
                                                                                bord = true
                                                                            }
                                                                            else {
                                                                                bord = false
                                                                            }
                                                                        })
                                                                }
                                                            })
                                                    }
                                                })
                                        }
                                    })
                            }
                        })
                }
            })
        if (bord == false) {
            await BaseModel.deleteOne(id, BoardModel)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        }
        else {
            resolve(true)
        }
    });
}

exports.deletePackageCategory = async (id) => {
    return new Promise(async (resolve, reject) => {
        let pckgctgry = false;
        await BaseModel.findByPackageCategoryId(id, PackageModel)
            .then(async (package) => {
                if (package.length > 0) {
                    pckgctgry = true
                }
                else {
                    pckgctgry = false
                }
            })

        if (pckgctgry == false) {
            await BaseModel.deleteOne(id, PackageCategoryModel)
                .then((packageCategoryData) => resolve(packageCategoryData))
                .catch((err) => reject(err));
        }
        else {
            resolve(true)
        }
    });
}

exports.deleteGrade = async (id) => {
    return new Promise(async (resolve, reject) => {

        let grde = false;
        await BaseModel.findByGradeId(id, StreamModel)
            .then(async (stream) => {
                if (stream.length > 0) {
                    grde = true
                }
                else {
                    await BaseModel.findByGradeId(id, SubjectModel)
                        .then(async (subject) => {
                            if (subject.length > 0) {
                                grde = true

                            }
                            else {
                                await BaseModel.findByGradeId(id, LessonModel)
                                    .then(async (lesson) => {
                                        if (lesson.length > 0) {
                                            grde = true
                                        }
                                        else {
                                            await BaseModel.findByGradeId(id, TopicModel)
                                                .then(async (topic) => {
                                                    if (topic.length > 0) {
                                                        grde = true
                                                    }
                                                    else {
                                                        await BaseModel.findByGradeId(id, VideoLinkModel)
                                                            .then(async (video) => {
                                                                if (video.length > 0) {
                                                                    grde = true
                                                                }
                                                                else {
                                                                    grde = false
                                                                }
                                                            })
                                                    }
                                                })
                                        }
                                    })
                            }
                        })
                }
            })
        if (grde == false) {
            await BaseModel.deleteOne(id, GradeModel)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        }
        else {
            resolve(true)
        }
    });
}
exports.deleteStream = async (id) => {
    return new Promise(async (resolve, reject) => {

        let strm = false;
        await BaseModel.findByStreamId(id, SubjectModel)
            .then(async (subject) => {
                if (subject.length > 0) {
                    strm = true

                }
                else {
                    await BaseModel.findByStreamId(id, LessonModel)
                        .then(async (lesson) => {
                            if (lesson.length > 0) {
                                strm = true
                            }
                            else {
                                await BaseModel.findByStreamId(id, TopicModel)
                                    .then(async (topic) => {
                                        if (topic.length > 0) {
                                            strm = true
                                        }
                                        else {
                                            await BaseModel.findByStreamId(id, VideoLinkModel)
                                                .then(async (video) => {
                                                    if (video.length > 0) {
                                                        strm = true
                                                    }
                                                    else {
                                                        strm = false
                                                    }
                                                })
                                        }
                                    })
                            }
                        })
                }
            })
        if (strm == false) {
            await BaseModel.deleteOne(id, StreamModel)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        }
        else {
            resolve(true)
        }
    });
}
exports.deleteSubject = async (id) => {
    return new Promise(async (resolve, reject) => {

        let subjct = false;
        await BaseModel.findBySubjectId(id, LessonModel)
            .then(async (lesson) => {
                if (lesson.length > 0) {
                    subjct = true
                }
                else {
                    await BaseModel.findBySubjectId(id, TopicModel)
                        .then(async (topic) => {
                            if (topic.length > 0) {
                                subjct = true
                            }
                            else {
                                await BaseModel.findBySubjectId(id, VideoLinkModel)
                                    .then(async (video) => {
                                        if (video.length > 0) {
                                            subjct = true
                                        }
                                        else {
                                            subjct = false
                                        }
                                    })
                            }
                        })
                }
            })
        if (subjct == false) {
            await BaseModel.deleteOne(id, SubjectModel)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        }
        else {
            resolve(true)
        }
    });
}
exports.deleteLesson = async (id) => {
    return new Promise(async (resolve, reject) => {

        let leson = false;
        await BaseModel.findByLessonId(id, TopicModel)
            .then(async (topic) => {
                if (topic.length > 0) {
                    leson = true
                }
                else {
                    await BaseModel.findByLessonId(id, VideoLinkModel)
                        .then(async (video) => {
                            if (video.length > 0) {
                                leson = true
                            }
                            else {
                                leson = false
                            }
                        })
                }
            })
        if (leson == false) {
            await BaseModel.deleteOne(id, LessonModel)
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        }
        else {
            resolve(true)
        }
    });
}

exports.deleteTopic = async (id) => {
    return new Promise(async (resolve, reject) => {

        await BaseModel.findByTopicId(id, VideoLinkModel)
            .then(async (video) => {
                if (!video) {
                    await BaseModel.deleteOne(id, TopicModel)
                        .then((data) => resolve(data))
                        .catch((err) => reject(err));
                }
                else {
                    resolve(true)
                }
            })
    });
}
exports.deleteVideoLink = async (id) => {
    return new Promise(async (resolve, reject) => {

        await BaseModel.deleteOne(id, VideoLinkModel)
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    });
}
exports.deleteTimeTable = async (timetable) => {
    return new Promise(async (resolve, reject) => {

        await BaseModel.deleteOne(timetable, TimeTableModel)
            .then((deletetimeTableData) => resolve(deletetimeTableData))
            .catch((err) => reject(err));
    });
}

exports.deleteHour = async (timetableId, day, hourId) => {
    return new Promise(async (resolve, reject) => {

        await BaseModel.deleteHour(timetableId, day, hourId, TimeTableModel)
            .then((deletetimeTableData) => resolve(deletetimeTableData))
            .catch((err) => reject(err));
    });
}

exports.deleteMcq = async (id) => {
    return new Promise(async (resolve, reject) => {

        await BaseModel.deleteOne(id, MCQModel)
            .then((deleteData) => resolve(deleteData))
            .catch((err) => reject(err));
    });
}
exports.deletePackage = async (id) => {
    return new Promise(async (resolve, reject) => {

        await BaseModel.deleteOne(id, PackageModel)
            .then((deleteData) => resolve(deleteData))
            .catch((err) => reject(err));
    });
}
exports.updateMCQ = async (id, mcq) => {
    return new Promise((resolve, reject) => {
        console.log("MCQ: ", mcq)
        let updateMcqData = {}
        if (mcq.categoryId)
            updateMcqData.categoryId = mcq.categoryId;
        console.log("1: ", 1)
        if (mcq.boardId)
            updateMcqData.boardId = mcq.boardId;

        if (mcq.gradeId)
            updateMcqData.gradeId = mcq.gradeId;

        if (mcq.streamId)
            updateMcqData.streamId = mcq.streamId;

        if (mcq.subjectId)
            updateMcqData.subjectId = mcq.subjectId;

        if (mcq.lessonId)
            updateMcqData.lessonId = mcq.lessonId;

        if (mcq.topicId)
            updateMcqData.topicId = mcq.topicId;

        if (mcq.totalMarks)
            updateMcqData.totalMarks = parseInt(mcq.totalMarks);

        if (mcq.title)
            updateMcqData.title = mcq.title;

        if (mcq.time)
            updateMcqData.time = parseInt(mcq.time);

        if (mcq.questions) {
            if (mcq.questions.length > 0) {
                updateMcqData.questions = [];
                console.log("Questions: ", mcq.questions);
                for (let question of mcq.questions) {
                    console.log("question: ", question);
                    let questionData = {
                        mark: parseInt(question.mark),
                        question: question.question,
                        option1: question.option1,
                        option2: question.option2,
                        option3: question.option3,
                        option4: question.option4,
                        correctOption: question.correctOption,
                    }
                    if (question.explanation) questionData.explanation = question.explanation;
                    updateMcqData.questions.push(questionData);
                    console.log("questionData: ", questionData);
                }
            }
        }

        if (mcq.active) {
            if (mcq.active == "0")
                updateMcqData.active = false
            else if (mcq.active == "1")
                updateMcqData.active = true
        }
        console.log("updateMcqData: ", updateMcqData);

        BaseModel.updateOne(id, updateMcqData, MCQModel)
            .then((updateMcqData) => resolve(updateMcqData))
            .catch((err) => reject(err));
    })
}

exports.createSchoolAdmin = async (School) => {
    return new Promise((resolve, reject) => {
        let SchoolAdmin = new SchoolAdminModel({
            userType: School.userType,
            password: School.password,
            schoolName: School.schoolName,
            email: School.email,
            schoolAddress: School.schoolAddress,
            phoneNumber: School.phoneNumber
        })

        BaseModel.save(SchoolAdmin)
            .then((schoolAdmin) => resolve(schoolAdmin))
            .catch((err) => reject(err));
    })
}

exports.getAllSchoolAdmin = async () => {
    return new Promise((resolve, reject) => {

        BaseModel.find(SchoolAdminModel)
            .then((schoolAdminData) => resolve(schoolAdminData))
            .catch((err) => reject(err));
    })
}
exports.getAllMcq = async () => {
    return new Promise((resolve, reject) => {

        BaseModel.find(MCQModel)
            .then((mcqData) => resolve(mcqData))
            .catch((err) => reject(err));
    })
}
exports.updateSchoolAdmin = async (id, schoolAdmin) => {
    return new Promise(async (resolve, reject) => {
        let updateSchoolAdminData = {}

        if (schoolAdmin.userType)
            updateSchoolAdminData.userType = schoolAdmin.userType;
        if (schoolAdmin.schoolName)
            updateSchoolAdminData.schoolName = schoolAdmin.schoolName;
        if (schoolAdmin.email)
            updateSchoolAdminData.email = schoolAdmin.email;
        if (schoolAdmin.schoolAddress)
            updateSchoolAdminData.schoolAddress = schoolAdmin.schoolAddress;
        if (schoolAdmin.phoneNumber)
            updateSchoolAdminData.phoneNumber = schoolAdmin.phoneNumber;
        if (schoolAdmin.active) {
            if (schoolAdmin.active == "0")
                updateSchoolAdminData.active = false
            else if (schoolAdmin.active == "1")
                updateSchoolAdminData.active = true
        }
        await BaseModel.updateOne(id, updateSchoolAdminData, SchoolAdminModel)

            .then((updateSchoolAdminData) => resolve(updateSchoolAdminData))
            .catch((err) => reject(err));
    })
}

exports.deleteSchoolAdmin = async (schoolid) => {
    return new Promise(async (resolve, reject) => {

        await BaseModel.deleteOne(schoolid, SchoolAdminModel)
            .then((deleteSchoolAdminData) => resolve(deleteSchoolAdminData))
            .catch((err) => reject(err));
    });
}
exports.getSchoolAdminById = async (id) => {
    return new Promise((resolve, reject) => {

        BaseModel.findById(id, SchoolAdminModel)
            .then((schooladminData) => resolve(schooladminData))
            .catch((err) => reject(err));
    })
}
exports.createSuperAdmin = async (admin) => {
    return new Promise((resolve, reject) => {
        let SuperAdmin = new SuperAdminModel({
            userType: admin.userType,
            password: admin.password,
            name: admin.name,
            email: admin.email,
            phoneNumber: admin.phoneNumber
        })

        BaseModel.save(SuperAdmin)
            .then((superAdmin) => resolve(superAdmin))
            .catch((err) => reject(err));
    })
}

exports.updateSuperAdmin = async (id, superAdmin) => {
    return new Promise(async (resolve, reject) => {
        let updateSuperAdminData = {}

        if (superAdmin.userType)
            updateSuperAdminData.userType = superAdmin.userType;
        if (superAdmin.name)
            updateSuperAdminData.name = superAdmin.name;
        if (superAdmin.phoneNumber)
            updateSuperAdminData.phoneNumber = superAdmin.phoneNumber;
        if (superAdmin.email)
            updateSuperAdminData.email = superAdmin.email;
        if (superAdmin.schoolAddress)
            updateSuperAdminData.schoolAddress = superAdmin.schoolAddress;
        if (superAdmin.active) {
            if (superAdmin.active == "0")
                updateSuperAdminData.active = false
            else if (superAdmin.active == "1")
                updateSuperAdminData.active = true
        }
        await BaseModel.updateOne(id, updateSuperAdminData, SuperAdminModel)

            .then((updateSuperAdminData) => resolve(updateSuperAdminData))
            .catch((err) => reject(err));
    })
}


exports.createCoupons = async (body) => {
    return new Promise((resolve, reject) => {
        let couponData = new couponModel({
            couponCode: body.couponCode,
            description: body.description,
            value: body.value,
            isActive: body.isActive

        })

        BaseModel.save(couponData)
            .then((savedCoupon) => resolve(savedCoupon))
            .catch((err) => reject(err));
    })

};



exports.updateCouponsById = async (id, body, prevData) => {
    return new Promise(async (resolve, reject) => {
        let dataToUpdate = {

            couponCode: body.couponCode || prevData.couponCode,
            description: body.description || prevData.description,
            value: body.value || prevData.coupon,
            isActive: body.isActive || prevData.isActive,
        };

        await BaseModel.updateOne(id, dataToUpdate, couponModel)

            .then((updatedCoupon) => resolve(updatedCoupon))
            .catch((err) => reject(err));
    })
};

exports.deleteCouponsById = async (id) => {
    return new Promise(async (resolve, reject) => {

        await BaseModel.deleteOne(id, couponModel)
            .then((deletedCoupon) => resolve(deletedCoupon))
            .catch((err) => reject(err));
    })
};

exports.checkCouponsValidity = async (query) => {
    return new Promise(async (resolve, reject) => {

        await BaseModel.findOneByQuery({ couponCode: query.couponCode }, couponModel)
            .then((foundCoupon) => {
                if (!foundCoupon) throw (`No Such Coupon Found`)

                let couponResult = {
                    _id: foundCoupon._id,
                    couponCode: foundCoupon.couponCode,
                    value: foundCoupon.value,
                    isActive: foundCoupon.isActive
                }
                resolve(couponResult)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            });
    })
};


exports.getAllCoupons = async () => {
    return new Promise(async (resolve, reject) => {

        await BaseModel.findByQuery({}, couponModel)
            .then((foundCoupons) => {
                if (!foundCoupons || foundCoupons.length == 0) throw (`No Coupons Found`)
                couponResponseArray = [];
                //Setting the required output fields for Coupon
                foundCoupons.map(eachCoupon => {
                    let couponResult = {
                        _id: eachCoupon._id,
                        couponCode: eachCoupon.couponCode,
                        value: eachCoupon.value,
                        isActive: eachCoupon.isActive
                    }
                    couponResponseArray.push(couponResult);
                })

                resolve(couponResponseArray)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            });
    })
};
const MasterModelService = require('../models/masterModelService');
const SharedService = require('./sharedService');
const BaseModel = require('../models/baseModel');
const BoardModel = require('../models/board')
const GradeModel = require('../models/grade')
const StreamModel = require('../models/stream')
const SubjectModel = require('../models/subject')
const TopicModel = require('../models/topic')
const couponModel = require('../models/coupon');
const LessonModel = require('../models/lesson')
const VideoLinkModel = require('../models/videoLink')
const PackageModel = require('../models/package');
const ProfileService = require('../services/profileService');
//////////// category ///////////////////////////////
exports.createCategories = async (req, res, next) => {
    let message;
    if (req.body.categoryName) {
        MasterModelService.createCategory(req.body.categoryName)
            .then((result) => {
                message = 'Category Created Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Category Creation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })

    }
}

exports.getAllCategory = async (req, res, next) => {
    let message;
    MasterModelService.getAllCategory()
        .then((result) => {
            if (result.length > 0) {
                message = 'Details are Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Details are Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Details are fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}
exports.createBoards = async (req, res, next) => {
    let message;
    if (req.body.board) {
        MasterModelService.createBoard(req.body)
            .then((result) => {
                message = 'Board Created Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Board Creation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })

    }
}

exports.createGrades = async (req, res, next) => {
    let message;
    if (req.body.grade) {
        MasterModelService.createGrade(req.body)
            .then((result) => {
                message = 'Grade Created Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Grade Creation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })

    }
}

exports.createPackageCategories = async (req, res) => {
    let message;
    if (req.body.packageCategoryName) {
        MasterModelService.createPackageCategory(req.body)
            .then((result) => {
                message = 'Package Category Created Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Package Category Creation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })
    }
}



exports.createStreams = async (req, res, next) => {
    let message;
    if (req.body.streamName) {
        MasterModelService.createStream(req.body)
            .then((result) => {
                message = 'Stream Created Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Stream Creation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })

    }
}

exports.createSubject = async (req, res, next) => {
    let message;
    if (req.body.subjectName) {
        MasterModelService.createSubject(req.body, req.files)
            .then((result) => {
                message = 'Subject Created Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Subject Creation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })

    }
}

exports.createLesson = async (req, res, next) => {
    let message;
    if (req.body.lessonName) {
        MasterModelService.createLesson(req.body)
            .then((result) => {
                message = 'Lesson Created Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Lesson Creation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })

    }
}

exports.createTopic = async (req, res, next) => {
    let message;
    if (req.body.topicName) {
        MasterModelService.createTopic(req.body, req.files)
            .then((result) => {
                message = 'Topic Created Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Topic Creation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })

    }
}

exports.addVideoLinks = async (req, res, next) => {
    let message;
    if (req.body.videoName) {
        MasterModelService.addVideoLinks(req.body)
            .then((result) => {
                message = 'Video links added Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Video link addition Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })

    }
}

exports.createMCQs = async (req, res, next) => {
    let message;
    if (req.body.title) {
        MasterModelService.createMCQ(req.body)
            .then((result) => {
                console.log("result", result)
                message = 'MCQ Questions added Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                console.log("err", err)
                message = 'MCQ Questions addition Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })

    }
}

exports.createPackage = async (req, res, next) => {
    let message;
    if (req.body.packageName) {
        console.log("req.body", req.body);
        MasterModelService.createPackage(req.body)
            .then((result) => {
                message = 'Package Created Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Package Creation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })

    }
}

exports.createTimeTable = async (req, res, next) => {
    let message;

    MasterModelService.createTimeTable(req.body)
        .then((result) => {
            console.log("resilst: ", result);
            message = 'TimeTable Created Successfully'
            return SharedService.sendResponse(res, result, message, 'SUCCESS')
        })
        .catch((err) => {
            message = 'TimeTable Creation Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })
}

exports.createTeacher = async (req, res, next) => {
    let message;
    if (req.body.firstName) {
        console.log("req.body", req.body);
        MasterModelService.createTeacher(req.body, req.files)
            .then((result) => {
                message = 'Account Created Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Account Creation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })
    }
}

exports.createTuitionTeacher = async (req, res, next) => {
    let message;
    MasterModelService.createTuitionTeacher(req.body)
        .then((result) => {
            message = 'Account Created Successfully'
            return SharedService.sendResponse(res, result, message, 'SUCCESS')
        })
        .catch((err) => {
            message = 'Account Creation Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.addTuitionStudent = async (req, res, next) => {
    let message;
    MasterModelService.addTuitionStudent(req.body)
        .then((result) => {
            message = 'Student details added Successfully'
            return SharedService.sendResponse(res, result, message, 'SUCCESS')
        })
        .catch((err) => {
            message = 'Student addition Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })
}


exports.getBoards = async (req, res, next) => {
    let message;
    MasterModelService.getBoard()
        .then((result) => {
            if (result.length > 0) {
                message = 'Board details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Board details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Board details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.getAllGrade = async (req, res, next) => {
    let message;
    MasterModelService.getAllGrade()
        .then((result) => {
            if (result.length > 0) {
                message = 'Grade details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Grade details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Grade details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.getAllStreams = async (req, res, next) => {
    let message;
    MasterModelService.getAllStreams()
        .then((result) => {
            if (result.length > 0) {
                message = 'Streams details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Streams details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Streams details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.getAllPackageCategories = async (req, res, next) => {
    let message;
    MasterModelService.getAllPackageCategories()
        .then((result) => {
            if (result.length > 0) {
                message = 'Package Category details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Package Category details Not Found '
            }
        })
        .catch((err) => {
            message = 'Package Category details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })
}

exports.getAllSubject = async (req, res, next) => {
    let message;
    MasterModelService.getAllSubject()
        .then(async (result) => {
            if (result.length > 0) {
                let subjects = [];
                for (let data of result) {
                    await BaseModel.findById(data.gradeId, GradeModel)
                        .then((response) => {
                            let subject = {
                                active: data.active,
                                _id: data._id,
                                categoryId: data.categoryId,
                                boardId: data.boardId,
                                gradeId: data.gradeId,
                                gradeName: response.gradeName,
                                streamId: data.streamId,
                                streamName: data.streamName,
                                subjectName: data.subjectName,
                                description: data.description,
                                image_fieldName: data.image_fieldName,
                                image_original_filename: data.image_original_filename,
                                image_size: data.image_size,
                                image_type: data.image_type,
                                image_name: data.image_name,
                                image_path: data.image_path,
                                color: data.color,

                            }

                            subjects.push(subject);
                        })
                }

                message = 'Subject details Fetched'
                return SharedService.sendResponse(res, subjects, message, 'SUCCESS')
            } else {
                message = 'Subject details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Subject details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.getAllLesson = async (req, res, next) => {
    let message;
    MasterModelService.getAllLesson()
        .then(async (result) => {
            let lessonData = [];
            if (result.length > 0) {
                for (let item of result) {
                    console.log("GradeId: ", item.gradeId);
                    console.log("SubjectId", item.subjectId)
                    let lesson = {
                        active: item.active,
                        _id: item._id,
                        categoryId: item.categoryId,
                        boardId: item.boardId,
                        gradeId: item.gradeId,
                        streamId: item.streamId,
                        subjectId: item.subjectId,
                        lessonName: item.lessonName,
                        lessonNumber: item.lessonNumber,
                        description: item.description,
                    }
                    if (item.gradeId != undefined) {
                        await MasterModelService.getGradeById(item.gradeId).then(data => {
                            console.log("grade", data)
                            if (data) {
                                lesson.gradeName = data.gradeName;
                            }
                        });
                    }
                    if (item.subjectId != undefined) {
                        await MasterModelService.getSubjectById(item.subjectId).then(data => {
                            console.log("data", data)
                            if (data) {
                                lesson.subjectName = data.subjectName;
                            }
                        });
                    }

                    lessonData.push(lesson);
                }
                message = 'Lesson details Fetched'
                return SharedService.sendResponse(res, lessonData, message, 'SUCCESS')
            } else {
                message = 'Lesson details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Lesson details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.getAllTopic = async (req, res, next) => {
    let message;
    MasterModelService.getAllTopic()
        .then(async (result) => {
            let topicData = [];
            if (result.length > 0) {
                for (let item of result) {
                    let topic = {
                        active: item.active,
                        _id: item._id,
                        categoryId: item.categoryId,
                        boardId: item.boardId,
                        gradeId: item.gradeId,
                        streamId: item.streamId,
                        subjectId: item.subjectId,
                        lessonId: item.lessonId,
                        topicName: item.topicName,
                        description: item.description,
                        image_fieldName: item.image_fieldName,
                        image_original_filename: item.image_original_filename,
                        image_size: item.image_size,
                        image_type: item.image_type,
                        image_name: item.image_name,
                        image_path: item.image_path,
                    }
                    await MasterModelService.getGradeById(item.gradeId).then(data => {
                        if (data) {
                            topic.gradeName = data.gradeName;
                        }
                    });
                    await MasterModelService.getSubjectById(item.subjectId).then(data => {
                        if (data) {
                            topic.subjectName = data.subjectName;
                        }
                    });
                    await MasterModelService.getLessonById(item.lessonId).then(data => {
                        if (data) {
                            topic.lessonName = data.lessonName;
                        }
                    });
                    topicData.push(topic);
                }
                message = 'Topic details Fetched'
                return SharedService.sendResponse(res, topicData, message, 'SUCCESS')
            } else {
                message = 'Topic details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Topic details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.getAllVideoLinks = async (req, res, next) => {
    let message;
    MasterModelService.getAllVideoLinks()
        .then((result) => {
            if (result.length > 0) {
                message = 'VideoLink details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'VideoLink details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'VideoLink details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.getGradesbyBoard = async (req, res, next) => {
    let message;
    MasterModelService.getGrades(req.params.boardId)
        .then((result) => {
            if (result.length > 0) {
                message = 'Grades details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Grades details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Grades details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.getStreamsbyGrade = async (req, res, next) => {
    let message;
    MasterModelService.getStreams(req.params.gradeId)
        .then((result) => {
            if (result.length > 0) {
                message = 'Streams details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Streams details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Streams details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.getSubjectsbyGrade = async (req, res, next) => {
    let message;
    MasterModelService.getSubjects(req.params.gradeId, req.query.streamName)
        .then((result) => {
            if (result.length > 0) {
                message = 'Subject details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Subject details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Subject details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.getLessonsbySubject = async (req, res, next) => {
    let message;
    MasterModelService.getLessons(req.params.subjectId)
        .then((result) => {
            if (result.length > 0) {
                message = 'Lessons details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Lessons details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Lessons details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.getTopicsbyLesson = async (req, res, next) => {
    let message;
    MasterModelService.getTopics(req.params.lessonId)
        .then((result) => {
            if (result.length > 0) {
                message = 'Topic details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Topic details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Topic details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.getVideosbyTopic = async (req, res, next) => {
    let message;
    MasterModelService.getVideos(req.params.topicId)
        .then((result) => {
            if (result.length > 0) {
                message = 'Video details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Video details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Video details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.getMCQsbyTopic = async (req, res, next) => {
    let message;
    MasterModelService.getMCQs(req.params.topicId)
        .then((result) => {
            if (result) {
                message = 'MCQs details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'MCQs details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'MCQs details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.getTimetable = async (req, res, next) => {
    let message;
    MasterModelService.getTimetable(req.query)
        .then((result) => {
            if (result) {
                message = 'TimeTable details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'TimeTable details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'TimeTable details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })
}

exports.getPackages = async (req, res, next) => {
    let message;
    MasterModelService.getAllPackages()
        .then(async (result) => {
            console.log("result", result)
            if (result.length == 0) {
                message = 'Package details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }
            let packages = [];
            for (let item of result) {
                console.log("item", item)
                let package = {
                    packageId: item._id,
                    packageCategoryId: item.packageCategoryId,
                    categoryId: item.categoryId,
                    boardId: item.boardId,
                    gradeId: item.gradeId,
                    streamName: item.streamName,
                    packageName: item.packageName,
                    description: item.description,
                    price: item.price,
                    active: item.active,
                    packages: []
                }
                await MasterModelService.getCategoryById(item.categoryId).then(data => {
                    console.log("category", data)
                    if (data) {
                        package.categoryName = data.categoryName;
                    }
                });
                await MasterModelService.getBoardById(item.boardId).then(data => {
                    console.log("Board", data)
                    if (data) {
                        package.boardName = data.boardName;
                    }
                });

                await MasterModelService.getGradeById(item.gradeId).then(data => {
                    console.log("grade", data)
                    if (data) {
                        package.gradeName = data.gradeName;
                    }
                });
                if (item.subjects.length > 0) {
                    // item.subjects.map(subject => {
                    for (let subject of item.subjects) {
                        // if (subject.subjectId == req.params.subjectId) {
                        let subjectData = {
                            _id: subject._id,
                            subjectId: subject.subjectId,
                            lessons: []
                        }
                        await MasterModelService.getSubjectById(subject.subjectId).then(data => {
                            console.log("data", data)
                            if (data) {
                                subjectData.subjectName = data.subjectName;
                                subjectData.description = data.description;
                                subjectData.image_path = data.image_path;
                            }
                            console.log("subjectData", subjectData)
                        });
                        if (subject.lessons.length > 0) {
                            // subject.lessons.map( async lesson => {
                            for (let lesson of subject.lessons) {
                                let lessonData = {
                                    lessonId: lesson.lessonId,
                                    topicIds: []
                                }
                                await MasterModelService.getLessonById(lesson.lessonId).then(data => {
                                    if (data) {
                                        lessonData.lessonName = data.lessonName;
                                        lessonData.lessonNumber = data.lessonNumber;
                                        lessonData.description = data.description;
                                    }
                                    console.log("lessonData", lessonData)
                                });
                                if (lesson.topicIds.length > 0) {
                                    // lesson.topicIds.map(async topicId => {
                                    for (let topicId of lesson.topicIds) {
                                        let topicData = {
                                            topicId: topicId,
                                        }
                                        await MasterModelService.getTopicById(topicId).then(topic => {
                                            if (topic) {
                                                topicData.topicName = topic.topicName;
                                                topicData.description = topic.description;
                                                topicData.image_path = topic.image_path;
                                            }
                                            console.log("topicData", topicData)
                                        });
                                        lessonData.topicIds.push(topicData);
                                    }
                                }
                                subjectData.lessons.push(lessonData);
                                // package.packages.push(lessonData);
                            }
                        }
                        // }
                        package.packages.push(subjectData);
                    }
                    packages.push(package);
                }

            }
            message = 'Package details Fetched'
            return SharedService.sendResponse(res, packages, message, 'SUCCESS')


        })
        .catch((err) => {
            message = 'Package details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.getPackagesbyGrade = async (req, res, next) => {
    let message;
    MasterModelService.getPackages(req.params.gradeId, req.query.streamName)
        .then(async (result) => {
            // if (result.length > 0) {
            if (result.length == 0) {
                message = 'Package details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }
            let packages = [];
            for (let item of result) {
                console.log("item", item)
                // Checking package is purchased by user
                let isPackage = false;
                let profileData = await ProfileService.getProfileById(req.query.profileId);
                let position = profileData.packages.indexOf(item._id)
                if (position >= 0) isPackage = true;
                let package = {
                    packageId: item._id,
                    packageCategoryId: item.packageCategoryId,
                    categoryId: item.categoryId,
                    boardId: item.boardId,
                    gradeId: item.gradeId,
                    streamName: item.streamName,
                    packageName: item.packageName,
                    description: item.description,
                    price: item.price,
                    active: item.active,
                    packages: []
                }
                if (isPackage == true) package.purchased = true;
                else package.purchased = false;

                await MasterModelService.getCategoryById(item.categoryId).then(data => {
                    console.log("category", data)
                    if (data) {
                        package.categoryName = data.categoryName;
                    }
                });
                await MasterModelService.getBoardById(item.boardId).then(data => {
                    console.log("Board", data)
                    if (data) {
                        package.boardName = data.boardName;
                    }
                });

                await MasterModelService.getGradeById(item.gradeId).then(data => {
                    console.log("grade", data)
                    if (data) {
                        package.gradeName = data.gradeName;
                    }
                });
                if (item.subjects.length > 0) {
                    // item.subjects.map(subject => {
                    for (let subject of item.subjects) {
                        // if (subject.subjectId == req.params.subjectId) {
                        let subjectData = {
                            _id: subject._id,
                            subjectId: subject.subjectId,
                            lessons: []
                        }
                        await MasterModelService.getSubjectById(subject.subjectId).then(data => {
                            console.log("data", data)
                            if (data) {
                                subjectData.subjectName = data.subjectName;
                                subjectData.description = data.description;
                                subjectData.image_path = data.image_path;
                            }
                            console.log("subjectData", subjectData)
                        });
                        if (subject.lessons.length > 0) {
                            // subject.lessons.map( async lesson => {
                            for (let lesson of subject.lessons) {
                                let lessonData = {
                                    lessonId: lesson.lessonId,
                                    topicIds: []
                                }
                                await MasterModelService.getLessonById(lesson.lessonId).then(data => {
                                    if (data) {
                                        lessonData.lessonName = data.lessonName;
                                        lessonData.lessonNumber = data.lessonNumber;
                                        lessonData.description = data.description;
                                    }
                                    console.log("lessonData", lessonData)
                                });
                                if (lesson.topicIds.length > 0) {
                                    // lesson.topicIds.map(async topicId => {
                                    for (let topicId of lesson.topicIds) {
                                        let topicData = {
                                            topicId: topicId,
                                        }
                                        await MasterModelService.getTopicById(topicId).then(topic => {
                                            if (topic) {
                                                topicData.topicName = topic.topicName;
                                                topicData.description = topic.description;
                                                topicData.image_path = topic.image_path;
                                            }
                                            console.log("topicData", topicData)
                                        });
                                        lessonData.topicIds.push(topicData);
                                    }
                                }
                                subjectData.lessons.push(lessonData);
                                // package.packages.push(lessonData);
                            }
                        }
                        // }
                        package.packages.push(subjectData);
                    }
                    packages.push(package);
                }

            }
            message = 'Package details Fetched'
            return SharedService.sendResponse(res, packages, message, 'SUCCESS')
            // } else {
            //     message = 'Package details Not Found'
            //     return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            // }

        })
        .catch((err) => {
            message = 'Package details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}
exports.getTimetableById = async (req, res, next) => {
    let message;
    MasterModelService.getTimetableById(req.params.id)
        .then((result) => {
            if (result) {
                message = 'timetable details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'timetable details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'timetable details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}
exports.getPackagesbySubject = async (req, res, next) => {
    let message;
    MasterModelService.getPackagesbySubjectId(req.params.subjectId, req.query.gradeId, req.query.streamName)
        .then(async (result) => {
            console.log("Result: ", result)
            if (result.length > 0) {
                let packages = [];
                for (let item of result) {
                    // Checking package is purchased by user
                    let isPackage = false;
                    let profileData = await ProfileService.getProfileById(req.query.profileId);
                    let position = profileData.packages.indexOf(item._id)
                    if (position >= 0) isPackage = true;
                    let package = {
                        packageName: item.packageName,
                        packageId: item._id,
                        packages: [],
                        price: item.price,
                    }
                    if (isPackage == true) package.purchased = true;
                    else package.purchased = false;

                    if (item.subjects.length > 0) {
                        // item.subjects.map(subject => {
                        for (let subject of item.subjects) {
                            if (subject.subjectId == req.params.subjectId) {
                                let subjectData = {
                                    _id: subject._id,
                                    subjectId: subject.subjectId,
                                    lessons: []
                                }
                                if (subject.lessons.length > 0) {
                                    // console.log("subject.lessons", subject.lessons)
                                    for (let lesson of subject.lessons) {
                                        let lessonData = {
                                            lessonId: lesson.lessonId,
                                            topicIds: []
                                        }
                                        await MasterModelService.getLessonById(lesson.lessonId).then(data => {
                                            if (data) {
                                                lessonData.lessonName = data.lessonName;
                                                lessonData.lessonNumber = data.lessonNumber;
                                                lessonData.description = data.description;
                                            }
                                            // console.log("lessonData", lessonData)
                                        });
                                        if (lesson.topicIds.length > 0) {
                                            // lesson.topicIds.map(async topicId => {
                                            for (let topicId of lesson.topicIds) {
                                                let topicData = {
                                                    topicId: topicId,
                                                }
                                                await MasterModelService.getTopicById(topicId).then(topic => {
                                                    if (topic) {
                                                        topicData.topicName = topic.topicName;
                                                        topicData.description = topic.description;
                                                        topicData.image_path = topic.image_path;
                                                    }
                                                });
                                                lessonData.topicIds.push(topicData);
                                            }
                                        }
                                        // subjectData.lessons.push(lessonData);
                                        package.packages.push(lessonData);
                                    }
                                }
                            }
                            //    package.subjects.push(subjectData); 
                        }
                        console.log("package", package)

                        packages.push(package);
                    }

                }
                // console.log("packages" ,packages[0].subjects[0].lessons)
                message = 'Package details Fetched'
                return SharedService.sendResponse(res, packages, message, 'SUCCESS')
            } else {
                message = 'Package details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Package details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.getPackagesByPackageCategoryId = async (req, res, next) => {
    let message;
    MasterModelService.getPackagesByPackageCategoryId(req.params.packageCategoryId, req.query.subjectId, req.query.gradeId, req.query.streamName)
        .then(async (result) => {
            console.log("Result: ", result[0].subjects)
            if (result.length > 0) {
                let packages = [];
                for (let item of result) {
                    let package = {
                        packageName: item.packageName,
                        packageCategoryId: item.packageCategoryId,
                        packages: []
                    }
                    if (item.subjects.length > 0) {
                        // item.subjects.map(subject => {
                        for (let subject of item.subjects) {
                            if (subject.subjectId == req.query.subjectId) {
                                let subjectData = {
                                    _id: subject._id,
                                    subjectId: subject.subjectId,
                                    lessons: []
                                }
                                if (subject.lessons.length > 0) {
                                    // subject.lessons.map( async lesson => {
                                    for (let lesson of subject.lessons) {
                                        let lessonData = {
                                            lessonId: lesson.lessonId,
                                            topicIds: []
                                        }
                                        await MasterModelService.getLessonById(lesson.lessonId).then(data => {
                                            if (data) {
                                                lessonData.lessonName = data.lessonName;
                                                lessonData.lessonNumber = data.lessonNumber;
                                                lessonData.description = data.description;
                                            }
                                            console.log("lessonData", lessonData)
                                        });
                                        if (lesson.topicIds.length > 0) {
                                            // lesson.topicIds.map(async topicId => {
                                            for (let topicId of lesson.topicIds) {
                                                let topicData = {
                                                    topicId: topicId,
                                                }
                                                await MasterModelService.getTopicById(topicId).then(topic => {
                                                    if (topic) {
                                                        topicData.topicName = topic.topicName;
                                                        topicData.description = topic.description;
                                                        topicData.image_path = topic.image_path;
                                                    }
                                                    console.log("topicData", topicData)
                                                });
                                                lessonData.topicIds.push(topicData);
                                            }
                                        }
                                        // subjectData.lessons.push(lessonData);
                                        package.packages.push(lessonData);
                                    }
                                }
                            }
                            //    package.subjects.push(subjectData); 
                        }
                        packages.push(package);
                    }

                }
                // console.log("packages" ,packages[0].subjects[0].lessons)
                message = 'Package details Fetched'
                return SharedService.sendResponse(res, packages, message, 'SUCCESS')
            } else {
                message = 'Package details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Package details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.getAllActivePackageCategories = async (req, res, next) => {
    let message;
    MasterModelService.getAllActivePackageCategories()
        .then(async (result) => {
            if (result.length > 0) {
                message = 'Active Package Categories Fetched.';
                return SharedService.sendResponse(res, result, message, 'SUCCESS');
            } else {
                message = 'Active Package Categories Not Found';
                return SharedService.sendResponse(res, result, message, 'ERROR');
            }
        })
        .catch((err) => {
            message = 'Active Package Categories Fetching Failed'
        })
}

exports.getStudentsPackagesbySubjectId = async (req, res, next) => {
    let message;
    MasterModelService.getStudentsPackagesbySubjectId(req.params.subjectId, req.query.gradeId, req.query.streamName, req.query.profileId)
        .then(async (result) => {
            console.log("Result: ", result)
            if (result) {
                if (result.packages.length > 0) {
                    let packages = [];
                    for (let package of result.packages) {
                        await MasterModelService.getPackageById(package)
                            .then(async (item) => {
                                let package = {
                                    packageName: item.packageName,
                                    packages: []
                                }
                                if (item.subjects.length > 0) {
                                    // item.subjects.map(subject => {
                                    for (let subject of item.subjects) {
                                        if (subject.subjectId == req.params.subjectId) {
                                            let subjectData = {
                                                _id: subject._id,
                                                subjectId: subject.subjectId,
                                                lessons: []
                                            }
                                            if (subject.lessons.length > 0) {
                                                // subject.lessons.map( async lesson => {
                                                for (let lesson of subject.lessons) {
                                                    let lessonData = {
                                                        lessonId: lesson.lessonId,
                                                        topicIds: []
                                                    }
                                                    await MasterModelService.getLessonById(lesson.lessonId).then(data => {
                                                        if (data) {
                                                            lessonData.lessonName = data.lessonName;
                                                            lessonData.lessonNumber = data.lessonNumber;
                                                            lessonData.description = data.description;
                                                        }
                                                        console.log("lessonData", lessonData)
                                                    });
                                                    if (lesson.topicIds.length > 0) {
                                                        // lesson.topicIds.map(async topicId => {
                                                        for (let topicId of lesson.topicIds) {
                                                            let topicData = {
                                                                topicId: topicId,
                                                            }
                                                            await MasterModelService.getTopicById(topicId).then(topic => {
                                                                if (topic) {
                                                                    topicData.topicName = topic.topicName;
                                                                    topicData.description = topic.description;
                                                                    topicData.image_path = topic.image_path;
                                                                }
                                                                console.log("topicData", topicData)
                                                            });
                                                            lessonData.topicIds.push(topicData);
                                                        }
                                                    }
                                                    // subjectData.lessons.push(lessonData);
                                                    package.packages.push(lessonData);
                                                }
                                            }
                                        }
                                        //    package.subjects.push(subjectData); 
                                    }
                                    packages.push(package);
                                    console.log("Packages: ", packages)
                                }
                            })
                    }
                    // console.log("packages" ,packages[0].subjects[0].lessons)
                    message = 'Package details Fetched'
                    return SharedService.sendResponse(res, packages, message, 'SUCCESS')
                }

                message = 'Package details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')

            } else {
                message = 'Package details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Package details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}
exports.updateCategory = async (req, res, next) => {
    let message;
    if (req.body.categoryName || req.body.active) {
        MasterModelService.updateCategory(req.params.categoryId, req.body)
            .then((result) => {
                message = 'Category updated Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Category updation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })

    }
}

exports.updateBoards = async (req, res, next) => {
    let message;
    if (req.body.board || req.body.active) {
        MasterModelService.updateBoards(req.params.boardId, req.body)
            .then((result) => {
                message = 'Board updated Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Board updation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })

    }
}

exports.updatePackageCategories = async (req, res, next) => {
    let message;
    if (req.body.packageCategoryName || req.body.active) {
        MasterModelService.updatePackageCategories(req.params.packageCategoryId, req.body)
            .then((result) => {
                message = 'Package Category Updated Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Package Category Updation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })

    }
}

exports.updateGrades = async (req, res, next) => {
    let message;
    if (req.body.gradeName || req.body.active) {
        MasterModelService.updateGrade(req.params.gradeId, req.body)
            .then((result) => {
                message = 'Grade updated Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Grade updation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })

    }
}

exports.updateStreams = async (req, res, next) => {
    let message;
    if (req.body.streamName || req.body.active) {
        MasterModelService.updateStream(req.params.streamId, req.body)
            .then((result) => {
                message = 'Stream updated Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Stream updation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })

    }
}

exports.updateSubject = async (req, res, next) => {
    let message;
    if (req.body.subjectName || req.body.active) {
        MasterModelService.updateSubject(req.params.subjectId, req.body, req.files)
            .then((result) => {
                message = 'Subject updated Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Subject updation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })

    }
}

exports.updateLesson = async (req, res, next) => {
    let message;
    if (req.body.lessonName || req.body.active) {
        MasterModelService.updateLesson(req.params.lessonId, req.body)
            .then((result) => {
                message = 'Lesson updated Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Lesson updation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })

    }
}

exports.updateTopic = async (req, res, next) => {
    let message;
    if (req.body.topicName || req.body.active) {
        MasterModelService.updateTopic(req.params.topicId, req.body, req.files)
            .then((result) => {
                message = 'Topicupdated Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Topic updation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })

    }
}

exports.updateVideoLinks = async (req, res, next) => {
    let message;
    if (req.body.videoName || req.body.active) {
        MasterModelService.updateVideoLinks(req.params.videoLinkId, req.body)
            .then((result) => {
                message = 'Video links updated Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Video link updation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })

    }
}

exports.updatePackage = async (req, res, next) => {
    let message;
    if (req.body.packageName || req.body.active) {
        console.log("req.body", req.body);
        MasterModelService.updatePackage(req.params.id, req.body)
            .then((result) => {
                message = 'Package updated Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Package updation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })

    }
}

exports.getTeacherbyId = async (req, res, next) => {
    let message;
    MasterModelService.getTeacherbyId(req.params.teacherId)
        .then((result) => {
            if (result) {
                message = 'Details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}
exports.getTuitionTeacherbyId = async (req, res, next) => {
    let message;
    MasterModelService.getTuitionTeacherbyId(req.params.id)
        .then((result) => {
            if (result) {
                message = 'Details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.getTuitionStudentbyId = async (req, res, next) => {
    let message;
    MasterModelService.getTuitionStudentbyId(req.params.tuitionstudentId)
        .then((result) => {
            if (result) {
                message = 'Student details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Student details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.getAllTuitionStudents = async (req, res, next) => {
    let message;
    MasterModelService.getAllTuitionStudents()
        .then((result) => {
            if (result.length > 0) {
                message = 'Student Details are Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Student Details are Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Details are fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}
exports.getAllTuitionTeachers = async (req, res, next) => {
    let message;
    MasterModelService.getAllTuitionTeachers()
        .then((result) => {
            if (result.length > 0) {
                message = 'Details are Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Details are Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Details are fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.getAllTuitionTeachersBySubject = async (req, res, next) => {
    let message;
    MasterModelService.getAllTuitionTeachersBySubject(req)
        .then((teachers) => {
            let teachersData = [];
            if (teachers.length > 0) {
                for (let teacher of teachers) {
                    if (teacher.subjects.length > 0) {
                        for (let item of teacher.subjects) {
                            if (item.subjectName = req.params.subject) {
                                let teacherDetails = {
                                    teacherId: item._id,
                                    firstName: teacher.firstName,
                                    middleName: teacher.middleName,
                                    position: teacher.position,
                                    yearOfExperience: teacher.yearOfExperience,
                                    subject: {
                                        title: item.title,
                                        subjectName: item.subjectName,
                                        board: item.board,
                                        grade: item.grade,
                                        stream: item.stream,
                                        tuitionTime: item.tuitionTime,
                                    }
                                }
                                teachersData.push(teacherDetails);
                            }

                        }
                    }
                }
                message = 'Details are Fetched'
                return SharedService.sendResponse(res, teachersData, message, 'SUCCESS')
            } else {
                message = 'Details are Not Found'
                return SharedService.sendResponse(res, teachers, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Details are fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}
exports.getAllTeachers = async (req, res, next) => {
    let message;
    MasterModelService.getAllTeachers()
        .then((result) => {
            if (result.length > 0) {
                message = 'Details are Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Details are Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Details are fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}
exports.getAllTimeTable = async (req, res, next) => {
    let message;
    MasterModelService.getAllTimeTable()
        .then((result) => {
            if (result.length > 0) {
                message = 'Details are Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Details are Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Details are fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}
exports.updateTeacher = async (req, res, next) => {
    let message;
    MasterModelService.updateTeacher(req.params.teacherId, req.body, req.files)
        .then((result) => {
            message = 'Details updated Successfully'
            return SharedService.sendResponse(res, result, message, 'SUCCESS')
        })
        .catch((err) => {
            message = 'Updation Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })


}

exports.updateTuitionTeacher = async (req, res, next) => {
    let message;
    MasterModelService.updateTuitionTeacher(req.params.id, req.body, req.files)
        .then((result) => {
            message = 'Details updated Successfully'
            return SharedService.sendResponse(res, result, message, 'SUCCESS')
        })
        .catch((err) => {
            message = 'Updation Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.updateTuitionStudent = async (req, res, next) => {
    let message;
    MasterModelService.updateTuitionStudent(req.params.tuitionstudentId, req.body)
        .then((result) => {
            message = 'Student Details updated Successfully'
            return SharedService.sendResponse(res, result, message, 'SUCCESS')
        })
        .catch((err) => {
            message = 'Student Details Updation Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}
exports.updateTimeTable = async (req, res, next) => {
    let message;
    MasterModelService.updateTimeTable(req.body, req.params.id)
        .then((result) => {
            message = 'Timetable updated Successfully'
            return SharedService.sendResponse(res, result, message, 'SUCCESS')
        })
        .catch((err) => {
            message = 'Timetable updation Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}
exports.deleteCategory = async (req, res, next) => {
    let message;
    MasterModelService.deleteCategory(req.params.category)
        .then((result) => {
            console.log(result)
            if (result != true) {
                message = 'category Deleted Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            }
            else {
                message = 'category deletion not allowed'
                return SharedService.sendResponse(res, "ERROR", message, 'ERROR')
            }
        })
        .catch((err) => {
            message = 'Timetable Deletion Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })


}
exports.deleteBoard = async (req, res, next) => {
    let message;
    MasterModelService.deleteBoard(req.params.id)
        .then((result) => {
            console.log(result)
            if (result != true) {
                message = ' Deleted Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            }
            else {
                message = ' deletion not allowed'
                return SharedService.sendResponse(res, "ERROR", message, 'ERROR')
            }
        })
        .catch((err) => {
            message = 'Timetable Deletion Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })


}

exports.deleteGrade = async (req, res, next) => {
    let message;
    MasterModelService.deleteGrade(req.params.id)
        .then((result) => {
            console.log(result)
            if (result != true) {
                message = ' Deleted Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            }
            else {
                message = ' deletion not allowed'
                return SharedService.sendResponse(res, "ERROR", message, 'ERROR')
            }
        })
        .catch((err) => {
            message = ' Deletion Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })


}

exports.deletePackageCategory = async (req, res, next) => {
    let message;
    MasterModelService.deletePackageCategory(req.params.id)
        .then((result) => {
            console.log(result)
            if (result != true) {
                message = 'Package Category Deleted Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            }
            else {
                message = 'Package Category Deletion not allowed'
                return SharedService.sendResponse(res, "ERROR", message, 'ERROR')
            }
        })
        .catch((err) => {
            message = 'Package Category Deletion Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        });

}

exports.deleteStream = async (req, res, next) => {
    let message;
    MasterModelService.deleteStream(req.params.id)
        .then((result) => {
            console.log(result)
            if (result != true) {
                message = ' Deleted Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            }
            else {
                message = ' deletion not allowed'
                return SharedService.sendResponse(res, "ERROR", message, 'ERROR')
            }
        })
        .catch((err) => {
            message = 'Deletion Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })


}

exports.deleteSubject = async (req, res, next) => {
    let message;
    MasterModelService.deleteSubject(req.params.id)
        .then((result) => {
            console.log(result)
            if (result != true) {
                message = ' Deleted Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            }
            else {
                message = ' deletion not allowed'
                return SharedService.sendResponse(res, "ERROR", message, 'ERROR')
            }
        })
        .catch((err) => {
            message = ' Deletion Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })


}

exports.deleteLesson = async (req, res, next) => {
    let message;
    MasterModelService.deleteLesson(req.params.id)
        .then((result) => {
            console.log(result)
            if (result != true) {
                message = ' Deleted Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            }
            else {
                message = ' deletion not allowed'
                return SharedService.sendResponse(res, "ERROR", message, 'ERROR')
            }
        })
        .catch((err) => {
            message = 'Deletion Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })


}

exports.deleteTopic = async (req, res, next) => {
    let message;
    MasterModelService.deleteTopic(req.params.id)
        .then((result) => {
            console.log(result)
            if (result != true) {
                message = ' Deleted Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            }
            else {
                message = ' deletion not allowed'
                return SharedService.sendResponse(res, "ERROR", message, 'ERROR')
            }
        })
        .catch((err) => {
            message = ' Deletion Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })


}

exports.deleteVideoLink = async (req, res, next) => {
    let message;
    MasterModelService.deleteVideoLink(req.params.id)
        .then((result) => {
            message = ' Deleted Successfully'
            return SharedService.sendResponse(res, result, message, 'SUCCESS')
        })
        .catch((err) => {
            message = ' Deletion Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })


}
exports.deleteTimeTable = async (req, res, next) => {
    let message;
    MasterModelService.deleteTimeTable(req.params.timetable)
        .then((result) => {
            message = 'Timetable Deleted Successfully'
            return SharedService.sendResponse(res, result, message, 'SUCCESS')
        })
        .catch((err) => {
            message = 'Timetable Deletion Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })


}

exports.deleteHour = async (req, res, next) => {
    let message;
    MasterModelService.deleteHour(req.params.timetableId, req.params.day, req.params.hourId)
        .then((result) => {
            message = 'Timetable Hour Deleted Successfully'
            return SharedService.sendResponse(res, result, message, 'SUCCESS')
        })
        .catch((err) => {
            message = 'Timetable Hour Deletion Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })


}

exports.deleteMcq = async (req, res, next) => {
    let message;
    MasterModelService.deleteMcq(req.params.id)
        .then((result) => {
            message = 'Mcq Deleted Successfully'
            return SharedService.sendResponse(res, result, message, 'SUCCESS')
        })
        .catch((err) => {
            message = 'Mcq Deletion Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })


}
exports.deletePackage = async (req, res, next) => {
    let message;
    MasterModelService.deletePackage(req.params.id)
        .then((result) => {
            message = 'Package Deleted Successfully'
            return SharedService.sendResponse(res, result, message, 'SUCCESS')
        })
        .catch((err) => {
            message = 'Package Deletion Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })


}
exports.deleteTeacher = async (req, res, next) => {
    let message;
    MasterModelService.deleteTeacher(req.params.teacherId, req.body, req.files)
        .then((result) => {
            message = 'Deleted Successfully'
            return SharedService.sendResponse(res, result, message, 'SUCCESS')
        })
        .catch((err) => {
            message = 'Deletion Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })



}

exports.deleteTuitionTeacher = async (req, res, next) => {
    let message;
    MasterModelService.deleteTuitionTeacher(req.params.id, req.body, req.files)
        .then((result) => {
            message = 'Deleted Successfully'
            return SharedService.sendResponse(res, result, message, 'SUCCESS')
        })
        .catch((err) => {
            message = 'Deletion Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })


}

exports.deleteTuitionStudent = async (req, res, next) => {
    let message;
    MasterModelService.deleteTuitionStudent(req.params.tuitionstudentId, req.body)
        .then((result) => {
            message = 'Student Details deleted Successfully'
            return SharedService.sendResponse(res, result, message, 'SUCCESS')
        })
        .catch((err) => {
            message = 'Deletion Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })


}

exports.updateMCQs = async (req, res, next) => {
    let message;
    console.log('req.body: ', req.body);
    if (req.body.title || req.body.active) {
        MasterModelService.updateMCQ(req.params.id, req.body)
            .then((result) => {
                message = 'MCQ Questions updated Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'MCQ Questions updation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })

    }
}

////////////////////////////create school///////////////////////////

exports.createSchoolAdmin = async (req, res, next) => {
    let message;
    if (req.body.schoolName) {
        console.log("req.body", req.body);
        MasterModelService.createSchoolAdmin(req.body)
            .then((result) => {
                message = 'Created Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Creation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })
    }
}

exports.getAllSchoolAdmin = async (req, res, next) => {
    let message;
    MasterModelService.getAllSchoolAdmin()
        .then((result) => {
            if (result.length > 0) {
                message = 'Details are Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Details are Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Details are fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}
exports.getAllMcq = async (req, res, next) => {
    let message;
    MasterModelService.getAllMcq()
        .then((result) => {
            if (result.length > 0) {
                message = 'Details are Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Details are Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Details are fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}
exports.updateSchoolAdmin = async (req, res, next) => {
    let message;
    if (req.body.schoolName || req.body.active) {
        MasterModelService.updateSchoolAdmin(req.params.schoolid, req.body)
            .then((result) => {
                message = 'updated Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'updation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })

    }
}

exports.deleteSchoolAdmin = async (req, res, next) => {
    let message;
    MasterModelService.deleteSchoolAdmin(req.params.schoolid, req.body)
        .then((result) => {
            message = 'Details deleted Successfully'
            return SharedService.sendResponse(res, result, message, 'SUCCESS')
        })
        .catch((err) => {
            message = 'Deletion Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })


}

exports.getSchoolAdminById = async (req, res, next) => {
    let message;
    MasterModelService.getSchoolAdminById(req.params.id)
        .then((result) => {
            if (result) {
                message = 'Details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}
exports.getCategoryById = async (req, res, next) => {
    let message;
    MasterModelService.getCategoryById(req.params.id)
        .then((result) => {
            if (result) {
                message = 'Details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}
exports.getBoardById = async (req, res, next) => {
    let message;
    MasterModelService.getBoardById(req.params.id)
        .then((result) => {
            if (result) {
                message = 'Details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.getGradeById = async (req, res, next) => {
    let message;
    MasterModelService.getGradeById(req.params.id)
        .then((result) => {
            if (result) {
                message = 'Details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}
exports.getStreamById = async (req, res, next) => {
    let message;
    MasterModelService.getStreamById(req.params.id)
        .then((result) => {
            if (result) {
                message = 'Details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}

exports.getPackageCategoryById = async (req, res, next) => {
    let message;
    MasterModelService.getPackageCategoryById(req.params.id)
        .then((result) => {
            if (result) {
                message = 'Details Fetched';
                return SharedService.sendResponse(res, result, message, 'SUCCESS');
            } else {
                message = 'Details Not Found';
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND');
            }
        })
        .catch((err) => {
            message = 'Details Fetching Failed';
            return SharedService.sendResponse(res, err, message, 'ERROR');
        })
}

exports.getSubjectById = async (req, res, next) => {
    let message;
    MasterModelService.getSubjectById(req.params.id)
        .then((result) => {
            if (result) {
                message = 'Details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}
exports.getLessonById = async (req, res, next) => {
    let message;
    MasterModelService.getLessonById(req.params.id)
        .then((result) => {
            if (result) {
                message = 'Details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}
exports.getTopicById = async (req, res, next) => {
    let message;
    MasterModelService.getTopicById(req.params.id)
        .then((result) => {
            if (result) {
                message = 'Details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}
exports.getVideoLinksById = async (req, res, next) => {
    let message;
    MasterModelService.getVideoLinksById(req.params.id)
        .then((result) => {
            if (result) {
                message = 'Details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}
exports.getPackageById = async (req, res, next) => {
    let message;
    MasterModelService.getPackageById(req.params.id)
        .then((result) => {
            if (result) {
                message = 'Details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}
exports.getMcqById = async (req, res, next) => {
    let message;
    MasterModelService.getMcqById(req.params.id)
        .then((result) => {
            if (result) {
                message = 'Details Fetched'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            } else {
                message = 'Details Not Found'
                return SharedService.sendResponse(res, result, message, 'NOT_FOUND')
            }

        })
        .catch((err) => {
            message = 'Details fetching failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

}
////////////////////////////create superadmin///////////////////////////

exports.createSuperAdmin = async (req, res, next) => {
    let message;
    if (req.body.name) {
        console.log("req.body", req.body);
        MasterModelService.createSuperAdmin(req.body)
            .then((result) => {
                message = 'Account Created Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'Account Creation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })
    }
}

exports.updateSuperAdmin = async (req, res, next) => {
    let message;
    if (req.body.name || req.body.active) {
        MasterModelService.updateSuperAdmin(req.params.superid, req.body)
            .then((result) => {
                message = ' updated Successfully'
                return SharedService.sendResponse(res, result, message, 'SUCCESS')
            })
            .catch((err) => {
                message = 'updation Failed'
                return SharedService.sendResponse(res, err, message, 'ERROR')
            })

    }
};


exports.createCoupon = async (req, res) => {
    try {
        let { body } = req;
        let { couponCode, value, description, isActive } = body;
        if (!couponCode || !value || !isActive)
            throw 'Creation Failed: Missing Mandotory Inputs in Request'

        let couponExists = await BaseModel.validateExistence({ couponCode, value }, couponModel);

        if (couponExists)
            throw 'Data Already Exists '


        let createdCoupon = await MasterModelService.createCoupons(body);

        let message = ' Created Successfully'
        return SharedService.sendResponse(res, createdCoupon, message, 'SUCCESS')


    } catch (error) {
        //console.error(error)
        message = 'Creation Failed'
        return SharedService.sendResponse(res, error, message, 'ERROR')

    }
};

exports.updateCouponById = async (req, res, next) => {

    let { query, body } = req;
    let message;

    if (!query || !query.couponId) {
        message = 'updation Failed : Missing Mandotory Inputs in Request '
        return SharedService.sendResponse(res, null, message, 'ERROR')
    }

    let couponExists = await BaseModel.validateExistence({ _id: query.couponId }, couponModel);

    if (!couponExists) {
        let message = 'No Data Found '
        return SharedService.sendResponse(res, null, message, 'ERROR')
    }

    await MasterModelService.updateCouponsById(query.couponId, body, couponExists)
        .then((result) => {
            message = ' updated Successfully'
            return SharedService.sendResponse(res, result, message, 'SUCCESS')
        })
        .catch((err) => {
            message = 'updation Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })


};

exports.deleteCouponById = async (req, res, next) => {

    let { query } = req;
    let message;

    if (!query || !query.couponId) {
        message = 'updation Failed : Missing Mandotory Inputs in Request '
        return SharedService.sendResponse(res, null, message, 'ERROR')
    }

    let couponExists = await BaseModel.validateExistence({ _id: query.couponId }, couponModel);

    if (!couponExists) {
        let message = 'No Data Found '
        return SharedService.sendResponse(res, null, message, 'ERROR')
    }

    await MasterModelService.deleteCouponsById(query.couponId)
        .then((result) => {
            message = ' Deleted Successfully'
            return SharedService.sendResponse(res, result, message, 'SUCCESS')
        })
        .catch((err) => {
            message = 'Deletion Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })


};

exports.checkCouponValidity = async (req, res) => {
    let { query, body } = req;
    let message;

    if (!query || !query.couponCode) {
        message = 'Bad Request : Missing Mandotory Inputs in Request '
        return SharedService.sendResponse(res, null, message, 'ERROR')
    }

    await MasterModelService.checkCouponsValidity(query)
        .then((result) => {
            message = ' Fetched Successfully'
            return SharedService.sendResponse(res, result, message, 'SUCCESS')
        })
        .catch((err) => {
            message = 'Fetching Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

};

exports.getAllCoupon = async (req, res) => {

    let message;
    await MasterModelService.getAllCoupons()
        .then((result) => {
            message = ' Fetched Successfully'
            return SharedService.sendResponse(res, result, message, 'SUCCESS')
        })
        .catch((err) => {
            message = 'Fetching Failed'
            return SharedService.sendResponse(res, err, message, 'ERROR')
        })

};
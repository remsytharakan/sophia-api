const profileModel = require('./profile');
const baseModel = require('./baseModel');
const mcqScoreModel = require('./mcqScore');
const ChatModel = require('./chat');
const totalScoreModel = require('./totalScore')
const studentPackagesModel = require('./studentPackages')

exports.createProfile = async (profileDetails) => {
    return new Promise(async (resolve, reject) => {
        await baseModel.save(profileDetails)
            .then((profileDetails) => resolve(profileDetails))
            .catch((err) => reject(err));

    })
}

exports.getProfile = async (id) => {
    return new Promise(async (resolve, reject) => {
        await baseModel.findById(id, profileModel)
            .then((profile) => resolve(profile))
            .catch((err) => reject(err));
    })
}
exports.getAllProfiless = async () => {
    return new Promise(async (resolve, reject) => {
        await baseModel.find(profileModel)
            .then((profile) => resolve(profile))
            .catch((err) => reject(err));
    })
}
exports.findStudentByCode = async (student_code) => {
    return new Promise(async (resolve, reject) => {
        await baseModel.findByStudentCode(student_code, profileModel)
            .then((profile) => resolve(profile))
            .catch((err) => reject(err));
    })
}

exports.payProcessingFee = async (id) => {
    return new Promise(async (resolve, reject) => {
        data = { process_fee_paid: true }
        await baseModel.updateOne(id, data, profileModel)
            .then((profile) => resolve())
            .catch((err) => reject(err));
    })
}

exports.saveMCQScore = async (scoreDetails) => {
    return new Promise(async (resolve, reject) => {
        let mcqScore = new mcqScoreModel({
            userId: scoreDetails.userId,
            profileId: scoreDetails.profileId,
            mcqId: scoreDetails.mcqId,
            questionId: scoreDetails.questionId,
            optionGiven: scoreDetails.optionGiven,
            correctOption: scoreDetails.correctOption,
            mark: scoreDetails.mark,
            timeTaken: scoreDetails.timeTaken,
        })
        if (scoreDetails.isCorrect) {
            if (scoreDetails.isCorrect == "1") mcqScore.isCorrect = true;
            else if (scoreDetails.isCorrect == "0") mcqScore.isCorrect = false;
        }
        await baseModel.save(mcqScore)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    })
}

exports.saveTotalScore = async (totalScore) => {
    return new Promise(async (resolve, reject) => {
        console.log("totalScore")
        let totalScoreData = new totalScoreModel({
            userId: totalScore.userId,
            profileId: totalScore.profileId,
            testId: totalScore.testId,
            totalMark: totalScore.totalMark,
            timeTaken: totalScore.timeTaken,
        })

        await baseModel.save(totalScoreData)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    })
}

exports.getMCQScore = async (profileId, mcqId) => {
    return new Promise(async (resolve, reject) => {
        let query = {
            profileId: profileId,
            mcqId: mcqId
        }
        baseModel.findByQuery(query, mcqScoreModel)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    })
}



exports.assignPackagesToStudent = async (profileId, profile, packages) => {
    return new Promise(async (resolve, reject) => {
        console.log("studentPackages")
        await studentPackagesModel.findOne({ profileId: profileId, gradeId: profile.gradeId, stream: profile.stream })
            .then(async (foundObject) => {
                if (foundObject) {
                    if (packages.length > 0) {
                        for (let package of packages) {
                            foundObject.packages.push(package);
                        }
                    }
                    await baseModel.save(foundObject)
                        .then((result) => resolve(result))
                        .catch((err) => reject(err));
                } else {

                    let studentPackages = new studentPackagesModel({
                        userId: profile.user_id,
                        profileId: profileId,
                        gradeId: profile.gradeId,
                        stream: profile.stream,
                    })
                    if (packages.length > 0) {
                        for (let package of packages) {
                            studentPackages.packages.push(package);
                        }
                    }

                    await baseModel.save(studentPackages)
                        .then((result) => resolve(result))
                        .catch((err) => reject(err));
                }

            })

    })
}

exports.saveChat = async (req) => {
    return new Promise(async (resolve, reject) => {
        let chatData = new ChatModel({
            userId: req.params.id,
            profileId: req.body.profileId,
            topicId: req.body.topicId,
            subjectId: req.body.subjectId,
            videoLinkId: req.body.videoLinkId,
            chatMessage: req.body.chatMessage,
        })

        await baseModel.save(chatData)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    })
}

exports.updateChat = async (id, chat) => {
    return new Promise(async (resolve, reject) => {
        let updateChatData = {}

        if (chat.profileId)
            updateChatData.profileId = chat.profileId;
        if (chat.topicId)
            updateChatData.topicId = chat.topicId;
        if (chat.subjectId)
            updateChatData.subjectId = chat.subjectId;
        if (chat.videoLinkId)
            updateChatData.videoLinkId = chat.videoLinkId;
        if (chat.chatMessage)
            updateChatData.chatMessage = chat.chatMessage;

        await baseModel.updateOne(id, updateChatData, ChatModel)
            .then((updateChatData) => resolve(updateChatData))
            .catch((err) => reject(err));
    })
}

exports.updateProfile = async (profileId, profileDetails) => {
    return new Promise(async (resolve, reject) => {
        let updateProfileData = {}

        if (profileDetails.name)
            updateProfileData.name = profileDetails.name;
        if (profileDetails.address)
            updateProfileData.address = profileDetails.address;
        if (profileDetails.user_id)
            updateProfileData.user_id = profileDetails.user_id;
        if (profileDetails.board)
            updateProfileData.board = profileDetails.board;
        if (profileDetails.gradeId)
            updateProfileData.gradeId = profileDetails.gradeId;
        if (profileDetails.grade)
            updateProfileData.grade = profileDetails.grade;
        if (profileDetails.city)
            updateProfileData.city = profileDetails.city;
        if (profileDetails.stream)
            updateProfileData.stream = profileDetails.stream;

        await baseModel.updateOne(profileId, updateProfileData, profileModel)
            .then((updateProfileData) => resolve(updateProfileData))
            .catch((err) => reject(err));
    })
}

exports.createOrder = async (orderDetails) => {
    return new Promise(async (resolve, reject) => {
        await baseModel.save(orderDetails)
            .then(async (orderDetails) => {
                console.log("orderDetails", orderDetails)

                for (let packageId of orderDetails.packageId) {
                    let updateProfileData = { $push: { packages: packageId } }
                    await baseModel.updateOne(orderDetails.profile_id, updateProfileData, profileModel);
                }
                resolve(orderDetails);
            })
            .catch((err) => reject(err));

    })
}
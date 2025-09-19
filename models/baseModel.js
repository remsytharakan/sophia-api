
exports.findById = async function (id, Model) {
    return new Promise(async (resolve, reject) => {
        await Model.findById({ _id: id })
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    })

}

exports.find = async function (Model) {
    return new Promise(async (resolve, reject) => {
        await Model.find()
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    })

}

exports.findTimeTable = async (data, Model, monthWeekData) => {
    return new Promise(async (resolve, reject) => {
        await Model.findOne({ boardId: data.boardId, gradeId: data.gradeId, streamId: data.streamId, month: monthWeekData.month, week: monthWeekData.week })
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    })
}

exports.findByQuery = async function (query, Model) {
    return new Promise(async (resolve, reject) => {
        console.log('Query: ', query)
        await Model.find(query)
            .then((data) => {
                console.log('data: ', data)
                resolve(data)
            })
            .catch((err) => reject(err));
    })

}

exports.save = async function (data) {
    console.log(data)
    return new Promise(async (resolve, reject) => {
        await data.save()
            .then((saved) => resolve(saved))
            .catch((err) => reject(err));
    })
}

exports.saveUser = async function (id, data, Model) {
    return new Promise(async (resolve, reject) => {
        Model.updateOne({ _id: id }, data)
            .then((profile) => { resolve(profile) })
            .catch((err) => reject(err));
    })
}

exports.updateOne = async function (id, data, Model) {
    console.log('Id: ', id);
    console.log('Data: ', data);
    return new Promise(async (resolve, reject) => {
        Model.updateOne({ _id: id }, data)
            .then((updated) => {
                console.log("updated", updated)
                resolve(updated)
            })
            .catch((err) => reject(err));
    })
}
exports.updateUserPackage = async function (id, data, Model) {
    console.log('Id: ', id);
    console.log('Data: ', data);
    return new Promise(async (resolve, reject) => {
        Model.updateOne({ _id: id }, { $push: { packages: data } })
            .then((updated) => {
                console.log("updated", updated)
                resolve(updated)
            })
            .catch((err) => reject(err));
    })
}

exports.findByCategoryId = async function (id, Model) {
    return new Promise(async (resolve, reject) => {
        await Model.find({ categoryId: id, active: true })
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    })

}
exports.findByStreamId = async function (id, Model) {
    return new Promise(async (resolve, reject) => {
        await Model.find({ streamId: id, active: true })
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    })

}
exports.findByBoardId = async function (id, Model) {
    return new Promise(async (resolve, reject) => {
        await Model.find({ boardId: id, active: true })
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    })

}

exports.findByPackageCategoryId = async function (id, Model) {
    return new Promise(async (resolve, reject) => {
        await Model.find({ packageCategoryId: id, active: true })
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    })

}

exports.findByGradeId = async function (id, Model) {
    return new Promise(async (resolve, reject) => {
        await Model.find({ gradeId: id, active: true })
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    })

}

exports.findSubjectsByGradeId = async function (id, stream, Model) {
    return new Promise(async (resolve, reject) => {
        await Model.find({ gradeId: id, streamName: stream, active: true })
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    })

}

exports.findBySubjectId = async function (id, Model) {
    return new Promise(async (resolve, reject) => {
        await Model.find({ subjectId: id, active: true })
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    })

}

exports.findByLessonId = async function (id, Model) {
    return new Promise(async (resolve, reject) => {
        await Model.find({ lessonId: id, active: true })
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    })

}

exports.findByTopicId = async function (id, Model) {
    return new Promise(async (resolve, reject) => {
        await Model.findOne({ topicId: id, active: true })
            .then((data) => {
                console.log("Mcq data", data)
                resolve(data)
            })
            .catch((err) => reject(err));
    })

}

exports.findVideosByTopicId = async function (id, Model) {
    return new Promise(async (resolve, reject) => {
        await Model.find({ topicId: id, active: true })
            .then((data) => {
                console.log("Mcq data", data)
                resolve(data)
            })
            .catch((err) => reject(err));
    })

}

exports.findUserByNumber = async (number, Model) => {
    return new Promise((resolve, reject) => {
        Model.findOne({ phoneNumber: number })
            .then((user) => resolve(user))
            .catch((err) => reject(err));
    })
}

exports.findPackagesByGradeId = async function (id, stream, Model) {
    return new Promise(async (resolve, reject) => {
        await Model.find({ gradeId: id, streamName: stream, active: true })
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    })

}

exports.findPackagesBySubjectId = async function (id, gradeId, stream, Model) {
    return new Promise(async (resolve, reject) => {
        await Model.find({ subjects: { $elemMatch: { subjectId: id } }, gradeId: gradeId, streamName: stream, active: true })
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    })

}

exports.findPackagesByPackageCategoryId = async function (id, subjectId, gradeId, stream, Model) {
    return new Promise(async (resolve, reject) => {
        await Model.find({ packageCategoryId: id, subjects: { $elemMatch: { subjectId: subjectId } }, gradeId: gradeId, streamName: stream, active: true })
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    })

}

exports.findStudentPackagesBySubjectId = async function (id, gradeId, stream, profileId, Model) {
    return new Promise(async (resolve, reject) => {
        await Model.findOne({ profileId: profileId, gradeId: gradeId, stream: stream, active: true })
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    })

}

exports.findByStudentCode = async function (student_code, Model) {
    return new Promise(async (resolve, reject) => {
        await Model.findOne({ student_code: student_code })
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    })
}

exports.deleteOne = async function (id, Model) {
    return new Promise(async (resolve, reject) => {
        Model.deleteOne({ _id: id })
            .then((deleted) => {
                console.log("deleted", deleted)
                resolve(deleted)
            })
            .catch((err) => reject(err));
    })
}

exports.deleteHour = async function (id, dayData, hourId, Model) {
    return new Promise(async (resolve, reject) => {
        let day = dayData;
        Model.updateOne({ _id: id }, { $pull: { [`${day}`]: { _id: hourId } } })
            .then((deleted) => {
                console.log("deleted", deleted)
                resolve(deleted)
            })
    })
}

exports.saveUser1 = async function (number, data, Model) {
    return new Promise(async (resolve, reject) => {
        Model.findOneAndUpdate({ phoneNumber: number }, data)
            .then((profile) => { resolve(profile) })
            .catch((err) => reject(err));
    })
}


exports.validateExistence = async (query, Model) => {
    return new Promise(async (resolve, reject) => {
        console.log('query :', query);
        Model.findOne(query)
            .then((data) => {
                console.log('existingData :', data)
                resolve(data)
            })
            .catch((err) => reject(err));
    })

};


exports.findOneByQuery = async (query, Model) => {
    return new Promise(async (resolve, reject) => {
        await Model.findOne(query)
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    })
}
const moment = require('moment');

exports.sendResponse = async (res, response, message, status) => {
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

exports.getMonthAndWeek = async () => {
    return new Promise(async (resolve, reject) => {
        let date = new Date();
        let adjustedDate = date.getDate() + date.getDay();
        let prefixes = ['0', '1', '2', '3', '4', '5'];


        function getWeekIndexInMonth(day) {
            const startOfMonth = moment(day).startOf('month');
            const endOfMonth = moment(day).endOf('month');

            let currentMomentDate = moment(startOfMonth);
            const weeks = [];
            while (currentMomentDate.isBefore(endOfMonth)) {
                weeks.push(currentMomentDate.week());
                currentMomentDate.add(1, "weeks").startOf("week");
            }
            console.log("day.format(): ", day.format())

            return weeks.indexOf(day.week())
        }
        let monthAndWeek = {
            month: date.getMonth() + 1,
            week: getWeekIndexInMonth(moment()) + 1
        }
        console.log("Month and Week: ", monthAndWeek)
        resolve(monthAndWeek)
    })
}


const scheduleModel = require('../models/scheduleModel');

const getAllSchedule = async (req, res, next) => {
    try {
        const result = await scheduleModel.selectAllData();
        if (result === undefined)
            res.status(200).json({ success: false, message: '이것은 에러'});
        res.send(result);
    } catch(err) {
        next(err);
    }
}

const createSchedule = async (req, res, next) => {
    try {
        const result = await scheduleModel.insertData(req.body);
        if(result === "success")
		    res.status(201).json({ success: true});
        else if (result === "cant")
            res.status(200).json({ success: false, message: '해당 시간에 상영관이 비어있지 않습니다'});
        else {
            res.status(200).json({ success: false, message: '삽입 에러'});
	    }
    }catch(err) {
        next(err);
    }
}

const updateSchedule = async (req, res, next) => {
    try {
        // console.log("update");
        const data = req.body;
        const schedule_num = req.params.sche_num;
        const result = await scheduleModel.updateData(schedule_num, data);
        if(result === "success")
		    res.status(201).json({ success: true});
            else if (result === "cant")
            res.status(200).json({ success: false, message: '해당 시간에 상영관이 비어있지 않습니다'});
        else {
            res.status(200).json({ success: false, message: '수정 에러'});
	    }
    }catch(err) {
        next(err);
    }
}

const deleteSchedule = async (req, res, next) => {
    try {
        const schedule_num = req.params.sche_num;
        const result = await scheduleModel.deleteData(schedule_num);
        if(result === "success")
		    res.status(201).json({ success: true});
        else {
            res.status(200).json({ success: false, message: '삭제 에러'});
	    }
    }catch(err) {
        next(err);
    }
}
module.exports = {
    getAllSchedule: getAllSchedule,
    createSchedule: createSchedule,
    updateSchedule: updateSchedule,
    deleteSchedule: deleteSchedule,
}
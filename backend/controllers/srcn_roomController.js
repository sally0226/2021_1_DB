const bcrypt = require('bcrypt');
const scrn_roomModel = require('../models/scrn_roomModel');

const getAllRoom = async (req, res, next) => {
    try {
        const result = await scrn_roomModel.selectAllData();
        if (result === undefined)
            res.status(200).json({ success: false, message: '이것은 에러'});
        res.send(result)
    } catch(err) {
        next(err);
    }
}

const createRoom = async (req, res, next) => {
    try {
        const result = await scrn_roomModel.insertData(req.body);
        if(result === "success")
		    res.status(201).json({ success: true});
        else {
            res.status(200).json({ success: false, message: '삽입 에러'});
	    }
    }catch(err) {
        next(err);
    }
}

const deleteRoom = async (req, res, next) => {
    try {
        const room_num = req.params.room_num;
        const result = await scrn_roomModel.deleteData(room_num);
        if(result === "success")
		    res.status(201).json({ success: true});
        else {
            res.status(200).json({ success: false, message: '삭제 에러'});
	    }
    }catch(err) {
        next(err);
    }
}
const getAllRoomId = async (req, res, next) => {
    try {
        const result = await scrn_roomModel.selectRoomID();
        if (result === undefined)
            res.status(200).json({ success: false, message: '이것은 에러'});
		console.log(result);
        res.send(result)
    } catch(err) {
        next(err);
    }
}
module.exports = {
    getAllRoom: getAllRoom,
    createRoom: createRoom,
    deleteRoom: deleteRoom,
	getAllRoomId:getAllRoomId,
}
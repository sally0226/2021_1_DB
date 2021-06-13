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
module.exports = {
    getAllRoom: getAllRoom,
}
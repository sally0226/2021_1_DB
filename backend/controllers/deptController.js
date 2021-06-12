const bcrypt = require('bcrypt');
const deptModel = require('../models/deptModel');

const getAllDept = async (req, res, next) => {
    try {
        const result = await deptModel.selectAllDept();
        if (result === undefined)
            res.status(200).json({ success: false, message: '이것은 에러'});
        res.send(result);
    } catch(err) {
        next(err)
    } 
}

module.exports = {
    getAllDept: getAllDept
}

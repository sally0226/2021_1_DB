const bcrypt = require('bcrypt');
const empModel = require('../models/empModel');

const createEmp = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await empModel.insertData(data);
        console.log(result);
        if(result === "success")
		    res.status(201).json({ success: true});
        else {
            res.status(200).json({ success: false, message: '이것은 에러'});
	    }
    }catch(err) {
        next(err)
    }
}


module.exports = {
    createEmp:createEmp,
}
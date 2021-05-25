const testModel = require('../models/testModel');

async function insertItem(req,res) {
    const item = {
        'id': 1,
        'data': "this is test data"
    };
    console.log("dddd");
    testModel.insertData(item, (result) => {
        if (result) {
            console.log(result);
        }
    })
}

module.exports ={
    insertItem:insertItem
}
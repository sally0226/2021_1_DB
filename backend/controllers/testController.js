// testModel (test table) 관련 함수?들을 처리하는 컨트롤러 
// MVC 패턴에 대한 개념적인 내용은 구글 검색을 추천드립니다 
const testModel = require('../models/testModel'); // Test model 가져옴 

async function insertItem(req,res) { //insert 하는 함수 
    const item = { //삽입할 value 설정 
        'id': 1,
        'data': "this is test data"
    };
    testModel.insertData(item, (result) => { // 모델에 해당 데이터 삽입 
        if (result) {
            console.log(result);
        }
    })
}

module.exports ={
    insertItem:insertItem // insertItem 함수를 insertItem이라는 이름으로 export한다는 것 -> 다른 파일에서 가져다 쓸 수 있게 
}
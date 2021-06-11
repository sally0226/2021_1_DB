// MOVIE, TRAILER_SHOT, TRAILER_VIDEO 테이블 관련 함수들 
const conn = require('../models/database');

function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '-' + month + '-' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

async function insertData(movieData, images, videos){
    const movie_rating = movieData.rating; 
    var movie_num;
    try{
        const movie_rating_code = 20001; // 임시코드..ㅎㅎ 코드 테이블에 영화등급관련 레코드가 아직 없음 
        //await conn.simpleExecute().then(
            // result => {
            //     if ()
            // }
        date = new Date(movieData.startDate)
        date = getFormatDate(date);
        // console.log(date);
        const movieSql =`INSERT INTO MOVIE VALUES(
            MOVIE_NUM.NEXTVAL, 
            '${movieData.name}', 
            ${movieData.scrnTime}, 
            '${movieData.director}',
            '${movieData.actors}',
            '${movieData.genre}',
            '${movieData.intro}',
            DEFAULT,
            '${movieData.country}',
            TO_DATE('${date}', 'YYYY-MM-DD'),
            NULL, 
            ${movie_rating_code}
            )`;
        await conn.simpleExecute(movieSql); 

        await conn.simpleExecute(`SELECT MOVIE_NUM.CURRVAL FROM DUAL`).then((result) => {
            // console.log(result.rows[0].CURRVAL);
            movie_num = result.rows[0].CURRVAL;
        });
        
    } catch(e){
        return e.errorNum
    }
    
    //image, video 생성 
    try {
        for (var i=0; i<images.length;i++) {
            // console.log(images[i]);
            const imageSql = `INSERT INTO TRAILER_SHOT VALUES(${movie_num}, TRAILER_SHOT_NUM.NEXTVAL, '${images[i]}')`;
            await conn.simpleExecute(imageSql);
        }
       
        for (var i=0; i<videos.length;i++) {
            // console.log(videos[i]);
            const videoSql = `INSERT INTO TRAILER_VIDEO VALUES(${movie_num}, TRAILER_VIDEO_NUM.NEXTVAL, '${videos[i]}')`;
            await conn.simpleExecute(videoSql);
        }
       
    } catch(e){
        return e.errorNum
    }
    return "success";
}

module.exports = {
    insertData: insertData,
}
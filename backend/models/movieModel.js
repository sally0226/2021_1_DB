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
        await conn.simpleExecute(movieSql).then((result) => {
            //console.log(result);
        }); 
        //console.log("movie insert success");
        await conn.simpleExecute(`SELECT LAST_NUMBER from USER_SEQUENCES where SEQUENCE_NAME = 'MOVIE_NUM'`).then((result) => {
            //console.log(result);
            movie_num = result.rows[0].LAST_NUMBER;
            //console.log(movie_num);
        });
        
    } catch(e){
        return e.errorNum
    }
    
    //image, video 생성 
    try {
        for (var i=0; i < images.length; i++) {
            // console.log(images[i]);
            const imageSql = `INSERT INTO TRAILER_SHOT VALUES(${movie_num-1}, TRAILER_SHOT_NUM.NEXTVAL, '${images[i]}')`;
            await conn.simpleExecute(imageSql);
        }
        
        for (var i=0; i < videos.length; i++) {
            // console.log(videos[i]);
            const videoSql = `INSERT INTO TRAILER_VIDEO VALUES(${movie_num-1}, TRAILER_VIDEO_NUM.NEXTVAL, '${videos[i]}')`;
            await conn.simpleExecute(videoSql);
        }
       
    } catch(e){
        return e.errorNum
    }
    return "success";
}

async function selectAllMovie() {
    var data;
    try {
        //영화 포스터는 필요없음?? 
        const sql = `SELECT MOVIE_NUM, MOVIE_NAME, MOVIE_RATING_CODE, AVG_STARS, SCRN_STATUS FROM MOVIE`;
        
        await conn.simpleExecute(sql).then((result) => {
            data = result;
            console.log(data.length);
            console.log(data[0]);
        });
    } catch(e){
        return e.errorNum
    }
}
module.exports = {
    insertData: insertData,
    selectAllMovie: selectAllMovie,
}
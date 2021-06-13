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
    console.log("insert movie");
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
            movie_num = result.rows[0].LAST_NUMBER-1;
            console.log(movie_num);
        });
        
    } catch(e){
        console.log(e);
        return e.errorNum
    }
    
    //image, video 생성 
    try {
        for (var i=0; i < images.length; i++) {
            console.log(images[i]);
            const imageSql = `INSERT INTO TRAILER_SHOT VALUES(TRAILER_SHOT_NUM.NEXTVAL,${movie_num},  '${images[i]}')`;
            await conn.simpleExecute(imageSql);
        }
        
        for (var i=0; i < videos.length; i++) {
            // console.log(videos[i]);
            const videoSql = `INSERT INTO TRAILER_VIDEO VALUES(TRAILER_VIDEO_NUM.NEXTVAL,${movie_num},  '${videos[i]}')`;
            await conn.simpleExecute(videoSql);
        }
       
    } catch(e){
        console.log(e);
        return e.errorNum
    }
    return "success";
}

async function selectAllMovie() {
    var movies;
    var posters;
    try {
        const sql = `SELECT MOVIE_NUM, MOVIE_NAME, MOVIE_RATING_CODE, AVG_STARS, SCRN_STATUS, TO_CHAR(RELEASE_DATE,'YYYY-MM-DD') AS RELEASE_DATE FROM MOVIE`;
        
        await conn.simpleExecute(sql).then((result) => {
            movies = result.rows;
        });

        // 각 영화별 첫 번째 사진 가져오기 (포스터)
        const selectPosterSql = `SELECT * FROM TRAILER_SHOT where trailer_shot_num in 
        (SELECT MIN(trailer_shot_num) FROM TRAILER_SHOT GROUP BY MOVIE_NUM) order by MOVIE_NUM`;

        await conn.simpleExecute(selectPosterSql).then((result) => {
            posters = result.rows;
        });
        for (var i=0;i<movies.length;i++){
            const temp_movie_num = movies[i].MOVIE_NUM;
            const poster = posters.find(element => element.MOVIE_NUM == temp_movie_num);
            if (poster === undefined) {
                movies[i].POSTER = null;
            }
               
            else 
                movies[i].POSTER = poster.TRAILER_SHOT_ROUTE;
        }
        return movies;
    } catch(e){
        return e.errorNum
    }
}

module.exports = {
    insertData: insertData,
    selectAllMovie: selectAllMovie,
}
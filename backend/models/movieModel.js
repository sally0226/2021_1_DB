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
    var movies;
    var posters;
    try {
        const sql = `SELECT MOVIE_NUM, MOVIE_NAME, MOVIE_RATING_CODE, AVG_STARS, SCRN_STATUS, TO_CHAR(RELEASE_DATE,'YYYY-MM-DD') AS RELEASE_DATE FROM MOVIE`;
        
        await conn.simpleExecute(sql).then((result) => {
            movies = result.rows;
            console.log(movies.length);
        });

        // 각 영화별 첫 번째 사진 가져오기 (포스터)
        const selectPosterSql = `SELECT * FROM TRAILER_SHOT where trailer_shot_num in 
        (SELECT MIN(trailer_shot_num) FROM TRAILER_SHOT GROUP BY MOVIE_NUM) order by MOVIE_NUM`;

        await conn.simpleExecute(selectPosterSql).then((result) => {
            posters = result.rows;
            console.log(posters);
        });
        for (var i=0;i<movies.length;i++){
            const temp_movie_num = movies[i].MOVIE_NUM;
            const poster = posters.find(element => element.MOVIE_NUM == temp_movie_num);
            console.log(poster);
            if (poster === undefined) {
                movies[i].POSTER = null;
            }
               
            else 
                movies[i].POSTER = poster.TRAILER_SHOT_ROUTE;
            console.log(movies[i]);
        }
        return movies;
    } catch(e){
        console.log(e.errorNum);
        return e.errorNum
    }
}

async function modifyMovie(movie, type) {
    if (type === 'DELETE') { // 해당 레코드 삭제 
        const deleteSql = `DELETE FROM MOVIE WHERE MOVIE_NUM = ${movie.MOVIE_NUM}`;
        try {  
            await conn.simpleExecute(deleteSql);

        }catch(e){
            return e.errorNum
        }
    } 
    else if (type === 'SCRN_END'){ // update
        const updateSql = `UPDATE MOVIE SET SCRN_STATUS='N'`;
        try {  
            await conn.simpleExecute(updateSql);

        }catch(e){
            return e.errorNum
        }
    } 
    else if (type === 'MODIFY'){
        const updateSql = `UPDATE MOVIE SET 
                            MOVIE_NAME = ${movie.MOVIE_NAME},
                            SCRN_TIME = ${movie.SCRN_TIME},
                            DIRECTOR = ${movie.DIRECTOR},
                            CAST = ${movie.CAST},
                            GENRE = ${movie.GENRE},
                            MOVIE_INTRO = ${movie.MOVIE_INTRO},
                            COUNTRY = ${movie.COUNTRY},
                            RELEASE_DATE = ${movie.RELEASE_DATE},
                            COUNTRY = ${movie.COUNTRY},
                            MOVIE_RATING_CODE = ${'값만들기'}
                            `;
        try {  
            await conn.simpleExecute(updateSql);

        }catch(e){
            return e.errorNum
        }
    }
}

module.exports = {
    insertData: insertData,
    selectAllMovie: selectAllMovie,
}
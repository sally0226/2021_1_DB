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
    var movie_num;
    try{
        date = new Date(movieData.startDate)
        date = getFormatDate(date);

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
            ${movieData.rating}
            )`;
		//console.log(movieSql);
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
            // console.log(images[i]);
            const imageSql = `INSERT INTO TRAILER_SHOT VALUES(TRAILER_SHOT_NUM.NEXTVAL, ${movie_num-1}, '${images[i]}')`;
            await conn.simpleExecute(imageSql);
        }
        
        for (var i=0; i < videos.length; i++) {
            // console.log(videos[i]);
            const videoSql = `INSERT INTO TRAILER_VIDEO VALUES(TRAILER_VIDEO_NUM.NEXTVAL, ${movie_num-1}, '${videos[i]}')`;
            await conn.simpleExecute(videoSql);
        }
       
    } catch(e){
        console.log(e);
        return e.errorNum
    }
    return "success";
}

async function deleteData(movie_num){
    try {
        // TODO : 해당 영화에 존재하는 상영일정이 없을 때 삭제해야함  

        // 사진, 비디오 먼저 삭제 후 영화 삭제 
        const delImgSql = `DELETE FROM TRAILER_SHOT WHERE MOVIE_NUM=${movie_num}`;
        const delVideoSql = `DELETE FROM TRAILER_VIDEO WHERE MOVIE_NUM=${movie_num}`;
        const sql = `DELETE FROM MOVIE WHERE MOVIE_NUM=${movie_num}`;
        await conn.simpleExecute(delImgSql);
        await conn.simpleExecute(delVideoSql);
        await conn.simpleExecute(sql);
    }catch(e){
        return e
    }
    return "success";
}

async function updateData(movieData, imageData, videoData){
    try {
        console.log(movieData);
        const sql = `UPDATE MOVIE SET MOVIE_NAME = '${movieData.MOVIE_NAME}',
                                        ${movieData.SCRN_TIME !== undefined ? `SCRN_TIME = ${movieData.SCRN_TIME},` : ``}
                                        ${movieData.DIRECTOR !== undefined ? `DIRECTOR = '${movieData.DIRECTOR}',` : ``}
                                        ${movieData.CAST !== undefined ? `CAST = '${movieData.CAST}',` : ``}
                                        ${movieData.GENRE !== undefined ? `GENRE = '${movieData.GENRE}',` : ``}
                                        ${movieData.MOVIE_INTRO !== undefined ? `MOVIE_INTRO = '${movieData.MOVIE_INTRO}',` : ``}
                                        SCRN_STATUS = '${movieData.SCRN_STATUS}',
                                        ${movieData.COUNTRY !== undefined ? `COUNTRY = '${movieData.COUNTRY}',` : ``}
                                        RELEASE_DATE = TO_DATE('${getFormatDate(new Date(movieData.RELEASE_DATE))}','YYYY-MM-DD'),
                                        MOVIE_RATING_CODE = ${movieData.MOVIE_RATING_CODE}
                        WHERE MOVIE_NUM = ${movieData.MOVIE_NUM}`;
        console.log(sql);
        await conn.simpleExecute(sql);

        const movie_num = movieData.MOVIE_NUM;
        if (imageData !== undefined) {
            // 해당 영화 img 전부 지우고 새로 추가 
            const delImgSql = `DELETE FROM TRAILER_SHOT WHERE MOVIE_NUM=${movie_num}`;
            await conn.simpleExecute(delImgSql);
            for (var i=0; i < imageData.length; i++) {
                // console.log(images[i]);
                const imageSql = `INSERT INTO TRAILER_SHOT VALUES(TRAILER_SHOT_NUM.NEXTVAL, ${movie_num}, '${imageData[i]}')`;
                await conn.simpleExecute(imageSql);
            }
        }
        if (videoData !== undefined) {
            // 해당 영화 video 전부 지우고 새로 추가 
            const delVideoSql = `DELETE FROM TRAILER_VIDEO WHERE MOVIE_NUM=${movie_num}`;
            await conn.simpleExecute(delVideoSql);
            for (var i=0; i < videoData.length; i++) {
                // console.log(videos[i]);
                const videoSql = `INSERT INTO TRAILER_VIDEO VALUES(TRAILER_VIDEO_NUM.NEXTVAL, ${movie_num}, '${videoData[i]}')`;
                await conn.simpleExecute(videoSql);
            }
        }
    }catch(e){
        return e
    }
    return "success";
}
async function selectAllMovie() {
    var movies;
    var posters;
	var vids;
    try {
        const sql = `SELECT MOVIE_NUM, MOVIE_NAME, MOVIE_RATING_CODE, AVG_STARS, SCRN_STATUS, TO_CHAR(RELEASE_DATE,'YYYY-MM-DD') AS RELEASE_DATE FROM MOVIE`;
        
        await conn.simpleExecute(sql).then((result) => {
            movies = result.rows;
            //console.log(movies.length);
        });

        // 각 영화별 첫 번째 사진 가져오기 (포스터)
        const selectPosterSql = `SELECT * FROM TRAILER_SHOT where trailer_shot_num in 
        (SELECT MIN(trailer_shot_num) FROM TRAILER_SHOT GROUP BY MOVIE_NUM) order by MOVIE_NUM`;

        await conn.simpleExecute(selectPosterSql).then((result) => {
            posters = result.rows;
            //console.log(posters);
        });
        for (var i=0;i<movies.length;i++){
            const temp_movie_num = movies[i].MOVIE_NUM;
            const poster = posters.find(element => element.MOVIE_NUM == temp_movie_num);
            //console.log(poster);
            if (poster === undefined) {
                movies[i].POSTER = null;
            }
               
            else 
                movies[i].POSTER = poster.TRAILER_SHOT_ROUTE;
            //console.log(movies[i]);
        }

		 // 각 영화별 첫 번째 비디오 가져오기 (비디오) main페이지의 carousel에 들어감!
		 const selectVidSql = `SELECT * FROM TRAILER_VIDEO where TRAILER_VIDEO_NUM in 
		 (SELECT MIN(TRAILER_VIDEO_NUM) FROM TRAILER_VIDEO GROUP BY MOVIE_NUM) order by MOVIE_NUM`;
 
		 await conn.simpleExecute(selectVidSql).then((result) => {
			 vids = result.rows;
		 });
		 for (var i=0;i<movies.length;i++){
			 const temp_movie_num = movies[i].MOVIE_NUM;
			 const video = vids.find(element => element.MOVIE_NUM == temp_movie_num);
			 if (video === undefined) {
				 movies[i].VIDEO = null;
			 }
				
			 else 
				 movies[i].VIDEO = video.TRAILER_VIDEO_ROUTE;
			 //console.log(movies[i]);
		 }
        return movies;
    } catch(e){
        return e.errorNum
    }
}

// 영화 상세보기 페이지
async function selectOneMovie(id) {
	var results = [];
    var movies;
    var posters;
	var vids;
	var reviews;
    try {
        
        await conn.simpleExecute(`SELECT * FROM MOVIE WHERE MOVIE_NUM=${id}`)
		.then((result) => {
            movies = result.rows;
			results.push(movies[0]);
        });

        // 그 영화에 해당하는 사진 가지고오기
        const selectShotSql = `SELECT TRAILER_SHOT_NUM, TRAILER_SHOT_ROUTE FROM TRAILER_SHOT where movie_num=${id}`;

        await conn.simpleExecute(selectShotSql)
		.then((result) => {
            posters = result.rows;
			results.push(posters);
        });

		// 그 영화의 비디오
		const selectVidSql = `SELECT TRAILER_VIDEO_NUM, TRAILER_VIDEO_ROUTE FROM TRAILER_VIDEO where movie_num=${id}`;

        await conn.simpleExecute(selectVidSql)
		.then((result) => {
            vids = result.rows;
			results.push(vids);
        });

		//그 영화의 후기
		const selectReviewSql = `SELECT REVIEW_NUM, STARS, COMMENTS FROM REVIEW WHERE MOVIE_NUM=${id}`

		await conn.simpleExecute(selectReviewSql)
		.then((result)=>{
			reviews = result.rows;
			results.push(reviews);
		})

        return results;
    } catch(e){
        console.log(e);
        return "failed"
    }
}

module.exports = {
    insertData: insertData,
    deleteData: deleteData,
    updateData: updateData,
    selectAllMovie: selectAllMovie,
	selectOneMovie: selectOneMovie,
}
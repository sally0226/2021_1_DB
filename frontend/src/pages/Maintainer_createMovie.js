import React, { useState } from 'react';
import { Header } from '../components';
import { Grid, TextField, Button, makeStyles } from '@material-ui/core';
// import {AiOutlineLink} from 'react-icons';
import DatePicker from "react-datepicker";
import CalendarContainer from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css'


const styles = makeStyles((theme) => ({
	input: {
		color: "#000000",
	  }
}));

function CreateMovie() {
	const classes = styles();
    const [startDate, setStartDate] = useState(new Date());
    // const [movieName, setMovieName] = useState("");
    // const [startDate, setStartDate] = useState(Date());
    // const [endDate, setendDate] = useState("");
    // const [genre, setGenre] = useState("");
    // const [actor, setActor] = useState("");
    // const [director, setDirector] = useState("");
    // const [country, setCountry] = useState("");
    // const [runningTime, setRunningTime] = useState("");
    const info = {
        name: "", //영화명 
        startDate: new Date(), //상영예정일
        scrnTime: "0", //상영시간
        rating: "0", //상영등급
        director: "", //감독
        actors: "", //배우
        genre: "", //장르
        intro: "", //영화소개
        country: "", //국가
        //예고 영상
        //예고 사진
    };
    const [movieInfo, setMovieInfo] = useState(info);
    
    console.log(Date());
     
    return (
        <div className="createMovie">
            <Header/>
            <div className="page">
            <div className="input-div">
                <div className="label-form">
                    <div className="label">영화 이름</div>
                    <TextField
                        variant="filled"
                        margin="normal"
                        placeholder={movieInfo.name}
                        required
                        autoFocus
                        style={{
                            backgroundColor: '#ffffff',
                        }}
                        InputProps={{
                            className: classes.input
                        }}
                        value={movieInfo.name}
                        onChange={(e)=>{
                            var newState = movieInfo;
                            newState.name = e.target.value;
                            setMovieInfo(newState);
                            console.log(movieInfo);
                        }}
                    />
                </div>
                <div className="label-form">
                    <div className="label">상영 예정일</div>
                    {/* <TextField
                        variant="filled"
                        margin="normal"
                        //placeholder={movieInfo.startDate}
                        required
                        autoFocus
                        style={{
                            backgroundColor: '#ffffff',
                        }}
                        InputProps={{
                            className: classes.input
                        }}
                        value={movieInfo.startDate}
                        onChange={(e)=> {
                            var newState = movieInfo;
                            newState.startDate = e.target.value;
                            setMovieInfo(newState);
                            console.log(movieInfo);
                        }}
                    /> */}
                    <DatePicker
                        selected={movieInfo.startDate}
                        onChange={(date) => {
                            let newState = movieInfo;
                            newState.startDate = date;
                            setMovieInfo(newState);
                            console.log(movieInfo);
                        }}
                        
                    />
                </div>
                <div className="label-form">
                    <div className="label">상영 시간</div>
                    <TextField
                        variant="filled"
                        margin="normal"
                        placeholder={movieInfo.scrnTime}
                        required
                        autoFocus
                        style={{
                            backgroundColor: '#ffffff',
                        }}
                        InputProps={{
                        className: classes.input
                        }}
                        value={movieInfo.scrnTime}
                        onChange={(e)=> {
                            let newState = movieInfo;
                            newState.scrnTime = e.target.value;
                            setMovieInfo({newState});
                            console.log(movieInfo);
                        }}
                    />
                </div>
                <div className="label-form">
                    <div className="label">상영 등급</div>
                    <TextField
                        variant="filled"
                        margin="normal"
                        placeholder={movieInfo.rating}
                        required
                        autoFocus
                        style={{
                            backgroundColor: '#ffffff',
                        }}
                        InputProps={{
                        className: classes.input
                        }}
                        value={movieInfo.rating}
                        onChange={(e)=> {
                            let newState = movieInfo;
                            newState.rating = e.target.value;
                            setMovieInfo({newState});
                            console.log(movieInfo);
                        }}
                    />
                </div>
                <div className="label-form">
                    <div className="label">감독</div>
                    <TextField
                        variant="filled"
                        margin="normal"
                        placeholder={movieInfo.director}
                        required
                        autoFocus
                        style={{
                            backgroundColor: '#ffffff',
                        }}
                        InputProps={{
                        className: classes.input
                        }}
                        value={movieInfo.director}
                        onChange={(e)=> {
                            let newState = movieInfo;
                            newState.director = e.target.value;
                            setMovieInfo({newState});
                            console.log(movieInfo);
                        }}
                    />
                </div>
                <div className="label-form">
                    <div className="label">배우</div>
                    <TextField
                        variant="filled"
                        margin="normal"
                        placeholder={movieInfo.actors}
                        required
                        autoFocus
                        style={{
                            backgroundColor: '#ffffff',
                        }}
                        InputProps={{
                        className: classes.input
                        }}
                        value={movieInfo.actors}
                        onChange={(e)=> {
                            let newState = movieInfo;
                            newState.actors = e.target.value;
                            setMovieInfo({newState});
                            console.log(movieInfo);
                        }}
                    />
                </div>
                <div className="label-form">
                    <div className="label">장르</div>
                    <TextField
                        variant="filled"
                        margin="normal"
                        placeholder={movieInfo.genre}
                        required
                        autoFocus
                        style={{
                            backgroundColor: '#ffffff',
                        }}
                        InputProps={{
                        className: classes.input
                        }}
                        value={movieInfo.genre}
                        onChange={(e)=> {
                            let newState = movieInfo;
                            newState.genre = e.target.value;
                            setMovieInfo({newState});
                            console.log(movieInfo);
                        }}
                    />
                </div>
                <div className="label-form">
                    <div className="label">영화 소개</div>
                    <TextField
                        variant="filled"
                        margin="normal"
                        placeholder={movieInfo.intro}
                        required
                        autoFocus
                        style={{
                            backgroundColor: '#ffffff',
                        }}
                        InputProps={{
                        className: classes.input
                        }}
                        value={movieInfo.intro}
                        onChange={(e)=> {
                            let newState = movieInfo;
                            newState.intro = e.target.value;
                            setMovieInfo({newState});
                            console.log(movieInfo);
                        }}
                        multiline
                        rows={4}
                        fullWidth
                    />
                </div>
                <div className="label-form">
                    <div className="label">국가</div>
                    <TextField
                        variant="filled"
                        margin="normal"
                        placeholder={movieInfo.country}
                        required
                        autoFocus
                        style={{
                            backgroundColor: '#ffffff',
                        }}
                        InputProps={{
                        className: classes.input
                        }}
                        value={movieInfo.country}
                        onChange={(e)=> {
                            let newState = movieInfo;
                            newState.country = e.target.value;
                            setMovieInfo({newState});
                            console.log(movieInfo);
                        }}
                    />
                </div>
            </div>
            <div className="input-div">
            <div className="label-form">
                <div className="label">예고 사진</div>
                    <TextField
                        variant="filled"
                        margin="normal"
                        placeholder={movieInfo.scrnTime}
                        required
                        autoFocus
                        style={{
                            backgroundColor: '#ffffff',
                        }}
                        InputProps={{
                        className: classes.input
                        }}
                        value={movieInfo.scrnTime}
                        onChange={(e)=> {
                            let newState = movieInfo;
                            newState.scrnTime = e.target.value;
                            setMovieInfo({newState});
                            console.log(movieInfo);
                        }}
                    />
                </div>
            </div>
            <Button variant="contained" href="nextpage" 
                // onClick={
                // }
            >
            등록하기
            </Button>
            </div>
        </div>
    )
}

export default CreateMovie;
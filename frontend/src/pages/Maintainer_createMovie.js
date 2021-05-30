import React, { useState } from 'react';
import { Header } from '../components';
import { Grid, TextField, Button, makeStyles } from '@material-ui/core';
import {AiOutlineLink} from 'react-icons';

const styles = makeStyles((theme) => ({
	input: {
		color: "#000000",
	  }
}));

function CreateMovie() {
	const classes = styles();

    // const [movieName, setMovieName] = useState("");
    // const [startDate, setStartDate] = useState(Date());
    // const [endDate, setendDate] = useState("");
    // const [genre, setGenre] = useState("");
    // const [actor, setActor] = useState("");
    // const [director, setDirector] = useState("");
    // const [country, setCountry] = useState("");
    // const [runningTime, setRunningTime] = useState("");
    const info = {
        name: "",
        startDate: Date(),
        endDate: Date(),
    };
    const [movieInfo, setMovieInfo] = useState(info);
    
    return (
        <div className="createMovie">
            <Header/>
            <div className="input-div">
                <TextField
                    variant="filled"
                    margin="normal"
                    fullWidth
                    placeholder="영화 이름"
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
                        let newState = movieInfo;
                        newState.name = e.target.value;
                        setMovieInfo({
                            newState
                        });
                        console.log(movieInfo);
                    }}
				/>
                <TextField
                    variant="filled"
                    margin="normal"
                    fullWidth
                    placeholder="상영 시작 날짜"
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
                        let newState = movieInfo;
                        newState.startDate = e.target.value;
                        setMovieInfo({
                            newState
                        });
                        console.log(movieInfo);
                    }}
				/>
            </div>
        </div>
    )
}

export default CreateMovie;
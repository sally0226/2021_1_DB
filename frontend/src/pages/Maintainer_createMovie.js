import React, { useReducer, useState } from 'react';
import { Header } from '../components';
import { Grid, TextField, Button, makeStyles, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
// import {AiOutlineLink} from 'react-icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css'


const styles = makeStyles((theme) => ({
	input: {
		color: "#000000",
	  }
}));
function imageReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.item);
        case 'DELETE':
            return state.filter(image => image !== action.item);
        //case 'MODIFY':
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}
function CreateMovie() {
	const classes = styles();
    const [movieInfo, setMovieInfo] = useState({
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
    });
    const [images, imageDispather] = useReducer(imageReducer, ["sad","sfdsf"]);
    const updateField = e => {
        setMovieInfo({
          ...movieInfo,
          [e.target.name]: e.target.value
        });
        console.log(movieInfo);
      };
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
                        name="name"
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
                        onChange={updateField}
                    />
                </div>
                <div className="label-form">
                    <div className="label">상영 예정일</div>
                    <DatePicker
                        selected={movieInfo.startDate}
                        onChange={(date) => {
                            setMovieInfo({
                                ...movieInfo,
                                ["startDate"]: date
                            });
                            console.log(movieInfo);
                        }}
                        
                    />
                </div>
                <div className="label-form">
                    <div className="label">상영 시간</div>
                    <TextField
                        variant="filled"
                        margin="normal"
                        name="scrnTime"
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
                        onChange={updateField}
                    />
                </div>
                <div className="label-form">
                    <div className="label">상영 등급</div>
                    <TextField
                        variant="filled"
                        margin="normal"
                        name="rating"
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
                        onChange={updateField}
                    />
                </div>
                <div className="label-form">
                    <div className="label">감독</div>
                    <TextField
                        variant="filled"
                        margin="normal"
                        name="director"
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
                        onChange={updateField}
                    />
                </div>
                <div className="label-form">
                    <div className="label">배우</div>
                    <TextField
                        variant="filled"
                        margin="normal"
                        name="actors"
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
                        onChange={updateField}
                    />
                </div>
                <div className="label-form">
                    <div className="label">장르</div>
                    <TextField
                        variant="filled"
                        margin="normal"
                        name="genre"
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
                        onChange={updateField}
                    />
                </div>
                <div className="label-form">
                    <div className="label">영화 소개</div>
                    <TextField
                        variant="filled"
                        margin="normal"
                        name="intro"
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
                        onChange={updateField}
                        multiline
                        rows={4}
                    />
                </div>
                <div className="label-form">
                    <div className="label">국가</div>
                    <TextField
                        variant="filled"
                        margin="normal"
                        name="country"
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
                        onChange={updateField}
                    />
                </div>
            </div>
            <div className="input-div">
                <div className="label-form">
                    <div className="label">예고 사진</div>
                    <div className="forms">
                    <TextField
                            id="imageInput"
                            variant="filled"
                            margin="normal"
                            // placeholder="
                            required
                            autoFocus
                            style={{
                            
                                backgroundColor: '#ffffff',
                                
                            }}
                            InputProps={{
                                className: classes.input
                            }}
                            //value=""
                            //margin="normal"
                    />
                    <IconButton aria-label="add_photo" 
                    onClick={
                        console.log(document.getElementById("imageInput"))
                        //</div>imageDispather();
                    }>
                    <AddCircleIcon/>
                    </IconButton>
                    {images.map(image => (
                        <TextField
                            variant="filled"
                            margin="normal"
                            placeholder={image}
                            required
                            autoFocus
                            style={{
                                backgroundColor: '#ffffff',
                            }}
                            InputProps={{
                                readOnly: true,
                                className: classes.input
                            }}
                            value={image}
                        />
                    ))}
                    </div>
                    
                    
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
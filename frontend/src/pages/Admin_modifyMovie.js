import React, { useEffect, useReducer, useState } from 'react';
import { Header } from '../components';
import { TextField, Button, makeStyles, IconButton, Select, MenuItem, FormHelperText, FormControl } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
// import {AiOutlineLink} from 'react-icons';
import DatePicker from "react-datepicker";
import axios from 'axios';
import { API_URL } from '../CommonVariable';
import { useMovieRatingState } from '../MVVM/model/CodeModel';

const styles = makeStyles((theme) => ({
	input: {
		color: "#000000",
	  }
}));
function imageReducer(state, action) {
    switch (action.type) {
        case 'SET':
            return action.data;
        case 'CREATE':
            return state.concat(action.item);
        case 'DELETE':
            return state.filter(image => image !== action.item);
        //case 'MODIFY':
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}
function videoReducer(state, action) {
    switch (action.type) {
        case 'SET':
            return action.data;
        case 'CREATE':
            return state.concat(action.item);
        case 'DELETE':
            return state.filter(video => video !== action.item);
        //case 'MODIFY':
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function ModifyMovie({match}) {
    const movieid = match.params.movieid;
	const classes = styles();
	const rating = useMovieRatingState();
    const [movieInfo, setMovieInfo] = useState({});
	
    useEffect(()=> {
        axios.get(`${API_URL}/movie/${movieid}`)
		.then(response=>{
            var movie = response.data.data[0];
            movie.RELEASE_DATE = new Date(movie.RELEASE_DATE);
            setMovieInfo(movie);
            const imgs = response.data.data[1].map(element => element.TRAILER_SHOT_ROUTE);
            // console.log(imgs);
            imageDispatch({
                type: 'SET',
                data: imgs,
            });
            const vids = response.data.data[2].map(element => element.TRAILER_VIDEO_ROUTE);
            videoDispatch({
                type: 'SET',
                data: vids,
            });    
		});
    },[]);

    const [images, imageDispatch] = useReducer(imageReducer, []);
    const [videos, videoDispatch] = useReducer(videoReducer, []);
    const SubmitHandler = (event) => {
        event.preventDefault();
        let body = {
            movie: movieInfo,
            images: images,
            videos: videos,
        }
        axios.put(`${API_URL}/movie/${movieInfo.MOVIE_NUM}`, body)
        .then(response=>{
            if(response.data.success){
                alert(`영화가 수정되었습니다.`);
                window.location.href='/adminmovielist';
            }
            else
                alert(response.data.message);
        })
    }
    function handelClick(e) {
        console.log(e.currentTarget.name);
        if (e.currentTarget.name === "image") {
            imageDispatch({
                type: 'CREATE',
                item: imageInput
            });
            setImageInput("");
        }
        else if (e.currentTarget.name === "video") {
            videoDispatch({
                type: 'CREATE',
                item: videoInput
            });
            setVideoInput("");
        }
    }
    const [imageInput, setImageInput] = useState("");
    const [videoInput, setVideoInput] = useState("");
    const updateField = e => {
		const name = e.target.name
        setMovieInfo({
          ...movieInfo,
          [name]: e.target.value
        });
      };
	var temp = movieInfo.MOVIE_RATING_CODE
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
                        name="MOVIE_NAME"
                        placeholder={movieInfo.MOVIE_NAME}
                        required
                        autoFocus
                        style={{
                            backgroundColor: '#ffffff',
                        }}
                        InputProps={{
                            className: classes.input
                        }}
                        value={movieInfo.MOVIE_NAME}
                        onChange={updateField}
                    />
                </div>
                <div className="label-form">
                    <div className="label">상영 예정일</div>
                    <DatePicker
                        selected={movieInfo.RELEASE_DATE}
                        onChange={(date) => {
                            setMovieInfo({
                                ...movieInfo,
                                ["startDate"]: date
                            });
                        }}
                        
                    />
                </div>
                <div className="label-form">
                    <div className="label">상영 시간</div>
                    <TextField
                        variant="filled"
                        margin="normal"
                        name="SCRN_TIME"
                        placeholder={movieInfo.SCRN_TIME}
                        required
                        autoFocus
                        style={{
                            backgroundColor: '#ffffff',
                        }}
                        InputProps={{
                        className: classes.input
                        }}
                        value={movieInfo.SCRN_TIME}
                        onChange={updateField}
                    />
                </div>
                <div className="label-form">
                    <div className="label">상영 등급</div>
					<FormControl>
					<Select
							name="MOVIE_RATING_CODE"
							variant="filled"
							margin="normal"
							required
							autoFocus
							style={{
								backgroundColor: '#ffffff',
							}}
							value={movieInfo.MOVIE_RATING_CODE}
							placeholder={movieInfo.MOVIE_RATING_CODE}
							onChange={updateField}
						>
							{rating.map((r) => (
								<MenuItem value={r.COMMON_CODE}>
									{r.CODE_NAME}
								</MenuItem>
							))}
						</Select>
						<FormHelperText style={{color: 'white'}}>현재 값 : {movieInfo.MOVIE_RATING_CODE}</FormHelperText>
					</FormControl>
                </div>
                <div className="label-form">
                    <div className="label">감독</div>
                    <TextField
                        variant="filled"
                        margin="normal"
                        name="DIRECTOR"
                        placeholder={movieInfo.DIRECTOR}
                        required
                        autoFocus
                        style={{
                            backgroundColor: '#ffffff',
                        }}
                        InputProps={{
                        className: classes.input
                        }}
                        value={movieInfo.DIRECTOR}
                        onChange={updateField}
                    />
                </div>
                <div className="label-form">
                    <div className="label">배우</div>
                    <TextField
                        variant="filled"
                        margin="normal"
                        name="CAST"
                        placeholder={movieInfo.CAST}
                        required
                        autoFocus
                        style={{
                            backgroundColor: '#ffffff',
                        }}
                        InputProps={{
                        className: classes.input
                        }}
                        value={movieInfo.CAST}
                        onChange={updateField}
                    />
                </div>
                <div className="label-form">
                    <div className="label">장르</div>
                    <TextField
                        variant="filled"
                        margin="normal"
                        name="GENRE"
                        placeholder={movieInfo.GENRE}
                        required
                        autoFocus
                        style={{
                            backgroundColor: '#ffffff',
                        }}
                        InputProps={{
                        className: classes.input
                        }}
                        value={movieInfo.GENRE}
                        onChange={updateField}
                    />
                </div>
                <div className="label-form">
                    <div className="label">영화 소개</div>
                    <TextField
                        variant="filled"
                        margin="normal"
                        name="MOVIE_INTRO"
                        placeholder={movieInfo.MOVIE_INTRO}
                        required
                        autoFocus
                        style={{
                            backgroundColor: '#ffffff',
                        }}
                        InputProps={{
                        className: classes.input
                        }}
                        value={movieInfo.MOVIE_INTRO}
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
                        name="COUNTRY"
                        placeholder={movieInfo.COUNTRY}
                        required
                        autoFocus
                        style={{
                            backgroundColor: '#ffffff',
                        }}
                        InputProps={{
                        className: classes.input
                        }}
                        value={movieInfo.COUNTRY}
                        onChange={updateField}
                    />
                </div>
            </div>
            <div className="input-div">
                <div className="label-form">
                    <div className="label">예고 사진</div>
                    <div className="form">
                        <TextField
                                id="imageInput"
                                variant="filled"
                                margin="normal"
                                name="image"
                                // placeholder="
                                required
                                autoFocus
                                style={{
                                    backgroundColor: '#ffffff',
                                }}
                                InputProps={{
                                    className: classes.input
                                }}
                                value={imageInput}
                                //margin="normal"
                                onChange={(e)=>{
                                    console.log(e.target.value);
                                    setImageInput(e.target.value)}}
                        />
                        <IconButton 
                            aria-label="add image"
                            name="image"
                            onClick = {handelClick}>
                            <AddCircleIcon/>
                        </IconButton>
                    </div>
                </div>
                <div className="list">
                {images.map(image => (
                    <div className="item">
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
                            onClick={(e)=>{
                                imageDispatch({
                                    type: 'DELETE',
                                    item: e.target.value
                                });
                            }}
                        />
                    </div>
                ))}
                </div>   
            </div>
            <div className="input-div">
            <div className="label-form">
                    <div className="label">예고 영상</div>
                    <div className="form">
                        <TextField
                                id="videoInput"
                                variant="filled"
                                margin="normal"
                                name="video"
                                // placeholder="
                                required
                                autoFocus
                                style={{
                                    backgroundColor: '#ffffff',
                                }}
                                InputProps={{
                                    className: classes.input
                                }}
                                value={videoInput}
                                //margin="normal"
                                onChange={(e)=>{
                                    console.log(e.target.value);
                                    setVideoInput(e.target.value)}}
                        />
                        <IconButton 
                            aria-label="add video"
                            name="video"
                            onClick = {handelClick}>
                            <AddCircleIcon/>
                        </IconButton>
                    </div>
                </div>
                <div className="list">
                {videos.map(video => (
                    <div className="item">
                        <TextField
                            variant="filled"
                            margin="normal"
                            placeholder={video}
                            required
                            autoFocus
                            style={{
                                backgroundColor: '#ffffff',
                            }}
                            InputProps={{
                                readOnly: true,
                                className: classes.input
                            }}
                            value={video}
                            onClick={(e)=>{
                                videoDispatch({
                                    type: 'DELETE',
                                    item: e.target.value
                                });
                            }}
                        />
                    </div>
                ))}
                </div>
            </div>
            <Button variant="contained" href="nextpage" 
                style={{
                    width: '100px',
                    backgroundColor: '#DA8181',
                    borderRadius: 0,
                    padding: '10px 0',
                    marginLeft: '100px',
                    marginBottom: '30px'
                }}
                onClick={
                    SubmitHandler
                }
            >
            수정하기
            </Button>
            </div>
        </div>
    )
}

export default ModifyMovie;
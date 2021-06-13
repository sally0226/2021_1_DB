import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from '../components';
import { TextField, Button, makeStyles, IconButton, Select, MenuItem } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
// import {AiOutlineLink} from 'react-icons';
import DatePicker from "react-datepicker";
import { API_URL } from '../CommonVariable';
import { useMovieRatingState } from '../MVVM/model/CodeModel';

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
function videoReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.item);
        case 'DELETE':
            return state.filter(video => video !== action.item);
        //case 'MODIFY':
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function CreateMovie() {
	const classes = styles();
	const rating = useMovieRatingState();
	
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
    const [images, imageDispatch] = useReducer(imageReducer, []);
    const [videos, videoDispatch] = useReducer(videoReducer, []);

    const SubmitHandler = (event) => {
        event.preventDefault();
		let body = {
            movie: movieInfo,
            images: images,
            videos: videos,
        }
		axios.post(`${API_URL}/movie`, body)
		.then(response=>{
			if(response.data.success){
				alert(`영화가 등록되었습니다.`);
				window.location.href='/';
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
        setMovieInfo({
          ...movieInfo,
          [e.target.name]: e.target.value
        });
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
					<Select
						name="rating"
						variant="filled"
						margin="normal"
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
                    >
						{rating.map((r) => (
							<MenuItem value={r.COMMON_CODE}>
								{r.CODE_NAME}
							</MenuItem>
						))}
                    </Select>
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
                onClick={SubmitHandler
                    // 등록된 영화 목록 페이지로 이동 
                    // 백엔드에 영화정보 보내서 레코드 생성되게 하기
                }
            >
            등록하기
            </Button>
            </div>
        </div>
    )
}

export default CreateMovie;
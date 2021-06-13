import React, { useEffect, useReducer, useState } from 'react';
import { Header } from '../components';
import { Button, makeStyles, IconButton } from '@material-ui/core';
import { Table,TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import { useMovieState } from '../MVVM/model/MovieModel';
import dateToString from '../function/DateToString';

import axios from 'axios';
import { API_URL } from '../CommonVariable';

function dataReducer(state, action) {
    switch (action.type) {
        case 'SET':
            return action.data;
        case 'DELETE':
            return state.filter(item => item.MOVIE_NUM != action.index);
        case 'END':
            return state.map(item =>
                item.MOVIE_NUM == action.index ? {...item, SCRN_STATUS: false} : item);

        //case 'MODIFY':
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}
function AdminMovieList(){
    const [reset, setReset] = useState(false);
    useEffect(()=> {
        axios.get(`${API_URL}/movie`)
		.then(response=>{
			const movieData = response.data;
            dataDispatch({
                type: 'SET',
                data: movieData
            });
		});
    },[reset]);
   
    const [data, dataDispatch] = useReducer(dataReducer, []); 
    // console.log(data);
    function handelClick(e) {
        if (e.currentTarget.name === "delete-btn") {
            // console.log(e.currentTarget.id);
            axios.delete(`${API_URL}/movie/${e.currentTarget.id}`)
		    .then(response=>{
                if(response.data.success){
                    alert(`영화가 삭제되었습니다.`);
                    //window.location.href='';
                    axios.get(`${API_URL}/movie`)
                    .then(response=>{
                        const movieData = response.data;
                        dataDispatch({
                            type: 'SET',
                            data: movieData
                        });
		            });
                }
                else
                    alert(response.data.message);
            });
            
        } 
        else if (e.currentTarget.name === 'scrn-end-btn') {
            //console.log(e.currentTarget.id);
            console.log(data);
            console.log(e.currentTarget.id);
            var body =data.filter(item => item.MOVIE_NUM == e.currentTarget.id)[0];
            console.log(body);
            body.SCRN_STATUS = body.SCRN_STATUS==='Y'? 'N' : 'Y';
            axios.put(`${API_URL}/movie/${e.currentTarget.id}`, body)
		    .then(response=>{
                if(response.data.success){
					body.SCRN_STATUS==='Y' ? alert('영화 상영 시작합니다.') : alert(`영화가 상영 종료 되었습니다.`);
                    //window.location.href='';
                    axios.get(`${API_URL}/movie`)
                    .then(response=>{
                        const movieData = response.data;
                        dataDispatch({
                            type: 'SET',
                            data: movieData
                        });
		            });
                }
                else
                    alert(response.data.message);
            });
        }
        else if (e.currentTarget.name === 'modify-btn') {
            // 영화 등록 페이지로 넘겨서 칸 기본값을 기존 값으로 채워놓기 

        }
    }
    return(
        <div className="adminMovieList">
            <Header/>
            <div className="page">
                <Table className="movieTable"  size="small" aria-label="simple table">
                    <TableHead>
						<TableCell>영화명</TableCell>
						<TableCell>상영 시작일자</TableCell>
						<TableCell>상영중 여부</TableCell>
						<TableCell>수정</TableCell>
						<TableCell>상영 종료</TableCell>
						<TableCell>삭제</TableCell>
                    </TableHead>
                    <TableBody>
                        {data.map((row)=>(
                            <TableRow key={row.MOVIE_NUM}>
                            <TableCell component="th" scope="row">
                              {row.MOVIE_NAME}
                            </TableCell>
                            <TableCell align="left">{row.RELEASE_DATE}</TableCell>
                            <TableCell align="left">{row.SCRN_STATUS ==='Y' ? 1 : 0}</TableCell>
                            <TableCell align="left">
                                <IconButton 
                                    aria-label="modify btn"
                                    name="modify-btn"
                                    id={row.MOVIE_NUM}
                                    //onClick = {handelClick}
                                    href={`/modifymovie/${row.MOVIE_NUM}`}
                                >
                                    <EditIcon/>
                                </IconButton>
                            </TableCell>
                            <TableCell align="left">
                                <IconButton 
                                    aria-label="scrn end btn"
                                    name="scrn-end-btn"
                                    id={row.MOVIE_NUM}
                                    onClick = {handelClick}
                                >
                                    <CancelIcon/>
                                </IconButton>
                            </TableCell>
                            <TableCell align="left"> 
                                <IconButton 
                                    aria-label="delete btn"
                                    name="delete-btn"
                                    id={row.MOVIE_NUM}
                                    onClick = {handelClick}
                                >
                                    <DeleteForeverIcon/>
                                </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        </div>
    )
}
export default AdminMovieList

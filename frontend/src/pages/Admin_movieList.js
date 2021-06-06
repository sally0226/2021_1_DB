import React, { useReducer, useState } from 'react';
import { Header } from '../components';
import { Button, makeStyles, IconButton } from '@material-ui/core';
import { Table,TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
// import { AutoSizer, Column, Table } from 'react-virtualized';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import { useMovieState } from '../MVVM/model/MovieModel'
function dateToString(date){
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
}
function dataReducer(state, action) {
    switch (action.type) {
        case 'DELETE':
            return state.filter(item => item.id != action.index);
        case 'END':
            return state.map(item =>
                item.id == action.index ? {...item, isScreen: false} : item);

        //case 'MODIFY':
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}
function AdminMovieList(){
    // TODO: 초기값 []로 바꾸고 useEffect 사용해서 back에서 불러와서 state설정하는 것으로 변경 
    const movieData = useMovieState();
    const [data, dataDispatch] = useReducer(dataReducer, movieData);
    function handelClick(e) {
        //console.log(e.currentTarget.id);
        if (e.currentTarget.name === "delete-btn") {
            dataDispatch({
                type: 'DELETE',
                index: e.currentTarget.id
            })
        } 
        else if (e.currentTarget.name === 'scrn-end-btn') {
            //console.log(e.currentTarget.id);
            dataDispatch({
                type: 'END',
                index: e.currentTarget.id
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
                        <TableRow>
                            <TableCell>영화명</TableCell>
                            <TableCell>상영 시작일자</TableCell>
                            <TableCell>상영중 여부</TableCell>
                            <TableCell>수정</TableCell>
                            <TableCell>상영 종료</TableCell>
                            <TableCell>삭제</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row)=>(
                            <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="left">{dateToString(row.Date)}</TableCell>
                            <TableCell align="left">{row.isScreen ? 1 : 0}</TableCell>
                            <TableCell align="left">
                                <IconButton 
                                    aria-label="modify btn"
                                    name="modify-btn"
                                    id={row.id}
                                    //onClick = {handelClick}
                                    href={`/modifymovie/${row.id}`}
                                >
                                    <EditIcon/>
                                </IconButton>
                            </TableCell>
                            <TableCell align="left">
                                <IconButton 
                                    aria-label="scrn end btn"
                                    name="scrn-end-btn"
                                    id={row.id}
                                    onClick = {handelClick}
                                >
                                    <CancelIcon/>
                                </IconButton>
                            </TableCell>
                            <TableCell align="left"> 
                                <IconButton 
                                    aria-label="delete btn"
                                    name="delete-btn"
                                    id={row.id}
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

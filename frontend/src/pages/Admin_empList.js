import React, { useReducer, useState, useEffect } from 'react';
import { Header } from '../components';
import { Button, makeStyles, IconButton } from '@material-ui/core';
import { Table,TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import dateToString from '../function/DateToString';

import axios from 'axios';
import { API_URL } from '../CommonVariable';

function dataReducer(state, action) {
    //console.log(action.index);
    switch (action.type) {
        case 'SET':
            return action.data;
        case 'DELETE':
            return state.filter(item => item.emp_num != action.index);
        case 'END':
            return state.map(item =>
                item.emp_num == action.index ? {...item, isScreen: false} : item);

        //case 'MODIFY':
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}
function AdminEMPList(){
    // TODO: 초기값 []로 바꾸고 useEffect 사용해서 back에서 불러와서 state설정하는 것으로 변경 
    useEffect(()=> {
        axios.get(`${API_URL}/emp`)
		.then(response=>{
            dataDispatch({
                type: 'SET',
                data: response.data
            });
		});
    },[]);
    useEffect(()=> {
        axios.get(`${API_URL}/dept`)
		.then(response=>{
            setDeptList(response.data);
		});
    },[]);
    const [deptList, setDeptList] = useState([]);
    const [data, dataDispatch] = useReducer(dataReducer, []);
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
        <div className="adminEmpList">
            <Header/>
            <div className="page">
                <Table className="empTable"  size="small" aria-label="simple table">
                    <TableHead>
						<TableCell>이름</TableCell>
						<TableCell>소속 부서</TableCell>
						<TableCell>직급</TableCell>
                        <TableCell>전화번호</TableCell>
						<TableCell>수정</TableCell>
						<TableCell>삭제</TableCell>
                    </TableHead>
                    <TableBody>
                        {data.map((row)=>(
                            <TableRow key={row.EMP_NUM}>
                            <TableCell component="th" scope="row">
                              {row.EMP_NAME}
                            </TableCell>
                            <TableCell align="left">{
                                (deptList.filter(element => element.DEPT_NUM == row.DEPT_NUM)[0]===undefined) ? 
                                '' : deptList.filter(element => element.DEPT_NUM == row.DEPT_NUM)[0].DEPT_NAME
                                }
                            </TableCell>
                            <TableCell align="left">{row.TITLE}</TableCell>
                            <TableCell align="left">{row.EMP_CONTACT}</TableCell>
                            <TableCell align="left">
                                <IconButton 
                                    aria-label="modify btn"
                                    name="modify-btn"
                                    id={row.emp_num}
                                    //onClick = {handelClick}
                                    href={`/modifyemp/${row.EMP_NUM}`}
                                >
                                    <EditIcon/>
                                </IconButton>
                            </TableCell>
                            <TableCell align="left"> 
                                <IconButton 
                                    aria-label="delete btn"
                                    name="delete-btn"
                                    id={row.emp_num}
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
export default AdminEMPList;

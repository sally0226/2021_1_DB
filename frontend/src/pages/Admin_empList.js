import React, { useReducer, useState } from 'react';
import { Header } from '../components';
import { Button, makeStyles, IconButton } from '@material-ui/core';
import { Table,TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import dateToString from '../function/DateToString';

function dataReducer(state, action) {
    console.log(action.index);
    switch (action.type) {
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
    const empData = [{
        emp_num: 1,
        name: "김바다",
        dept_num: 2,
        contact: '01034343434',
        reg_num: '9807251111111',
        title: '회장',
        work_start_date: '1998-07-25',
    },
    {
        emp_num: 2,
        name: "김바다",
        dept_num: 2,
        contact: '01034343434',
        reg_num: '9807251111111',
        title: '사장',
        work_start_date: '1998-07-25',
    },
    {
        emp_num: 3,
        name: "김바다",
        dept_num: 2,
        contact: '01034343434',
        reg_num: '9807251111111',
        title: '부장',
        work_start_date: '1998-07-25',
    }];
    const deptData = ['1번부서','2번부서','3번부서'];
    const [data, dataDispatch] = useReducer(dataReducer, empData);
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
                            <TableRow key={row.emp_num}>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="left">{deptData[row.dept_num-1]}</TableCell>
                            <TableCell align="left">{row.title}</TableCell>
                            <TableCell align="left">{row.contact}</TableCell>
                            <TableCell align="left">
                                <IconButton 
                                    aria-label="modify btn"
                                    name="modify-btn"
                                    id={row.emp_num}
                                    //onClick = {handelClick}
                                    href={`/modifyemp/${row.emp_num}`}
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

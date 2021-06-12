import React, { useEffect, useReducer, useState } from 'react';
import { Header } from '../components';
import { TextField, Button, makeStyles, IconButton, Select, MenuItem } from '@material-ui/core';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css'
import axios from 'axios';
import { API_URL } from '../CommonVariable';

const styles = makeStyles((theme) => ({
	input: {
		color: "#000000",
	  }
}));

// TODO: back에서 dept list 받아서 정보 집어넣고 시작하는걸로 바꿔야함 
const deptList = ["총무부", "팝콘부", "상영관부", "미화부"]; 
function CreateEMP(){
    const classes = styles();
    const [deptList, setDeptList] = useState([]);
    const [empInfo, setEmpInfo] = useState({
        name: "", //직원명
        startDate: new Date(), //근무시작일
        title: "", //직급
        dept: "", //부서번호? 부서명? 
        reg_num: "", //주민등록번호
        contact: "" //연락처
    })
    useEffect(()=> {
        axios.get(`${API_URL}/dept`)
		.then(response=>{
            setDeptList(response.data);
		});
    },[]);
    const SubmitHandler = (event) => {
        event.preventDefault();
		let body = empInfo;
		axios.post(`${API_URL}/emp`, body)
		.then(response=>{
			if(response.data.success){
				alert(`직원이 등록되었습니다.`);
				window.location.href='/adminemplist';
			}
			else
				alert(response.data.message);
		})
    }
    const updateField = e => {
        console.log(e.target.name);
        setEmpInfo({
          ...empInfo,
          [e.target.name]: e.target.value
          
        });
        console.log(empInfo);
      };
      
    return(
        <div className="createEMP">
            <Header/>
            <div className="page">
                <div className="input-div">
                    <div className="label-form">
                        <div className="label">이름</div>
                        <TextField
                            variant="filled"
                            margin="normal"
                            name='name'
                            placeholder={empInfo['name']}
                            required
                            autoFocus
                            style={{
                                backgroundColor: '#ffffff',
                            }}
                            InputProps={{
                                className: classes.input
                            }}
                            value={empInfo['name']}
                            onChange={updateField}>
                        </TextField>
                    </div>
                    <div className="label-form">
                        <div className="label">근무 시작일</div>
                        <DatePicker
                        selected={empInfo.startDate}
                        onChange={(date) => {
                            setEmpInfo({
                                ...empInfo,
                                ["startDate"]: date
                            });
                            //console.log(empInfo);
                        }}
                        
                    />
                    </div>
                    <div className="label-form">
                        <div className="label">직급</div>
                        <TextField
                            variant="filled"
                            margin="normal"
                            name='title'
                            placeholder={empInfo['title']}
                            required
                            autoFocus
                            style={{
                                backgroundColor: '#ffffff',
                            }}
                            InputProps={{
                                className: classes.input
                            }}
                            value={empInfo['title']}
                            onChange={updateField}>
                        </TextField>
                    </div>
                    <div className="label-form">
                        <div className="label">부서</div>
                        <Select
                            variant="filled"
                            margin="normal"
                            name="dept"
                            placeholder={empInfo.dept}
                            required
                            autoFocus
                            style={{
                                backgroundColor: '#ffffff',
                            }}
                            InputProps={{
                                className: classes.input
                            }}
                            value={empInfo.dept}
                            onChange={updateField}
                        >
                            {deptList.map((dept) => (
                                <MenuItem value={dept.DEPT_NUM}>
                                    {dept.DEPT_NAME}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className="label-form">
                        <div className="label">주민등록번호</div>
                        <TextField
                            variant="filled"
                            margin="normal"
                            name='reg_num'
                            placeholder={empInfo['reg_num']}
                            required
                            autoFocus
                            style={{
                                backgroundColor: '#ffffff',
                            }}
                            InputProps={{
                                className: classes.input
                            }}
                            value={empInfo['reg_num']}
                            onChange={updateField}>
                        </TextField>
                    </div>
                    <div className="label-form">
                        <div className="label">연락처</div>
                        <TextField
                            variant="filled"
                            margin="normal"
                            name='contact'
                            placeholder={empInfo['contact']}
                            required
                            autoFocus
                            style={{
                                backgroundColor: '#ffffff',
                            }}
                            InputProps={{
                                className: classes.input
                            }}
                            value={empInfo['contact']}
                            onChange={updateField}>
                        </TextField>
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
                    onClick={SubmitHandler}
                >
                등록하기
                </Button>
            </div>
        </div>
        
    )
}
export default CreateEMP
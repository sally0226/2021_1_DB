import React, { useReducer, useState } from 'react';
import { Header } from '../components';
import { TextField, Button, makeStyles, IconButton, Select, MenuItem } from '@material-ui/core';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css'

const styles = makeStyles((theme) => ({
	input: {
		color: "#000000",
	  }
}));
function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
// TODO: back에서 dept list 받아서 정보 집어넣고 시작하는걸로 바꿔야함 
const deptList = ["총무부", "팝콘부", "상영관부", "미화부"]; 

function ModifyEMP(){
    const classes = styles();
    const [empInfo, setEmpInfo] = useState({ //movieid값 back에 넘겨서 해당하는 movie정보 받아서 초기화하기
        name: "", //직원명
        startDate: new Date(), //근무시작일
        title: "", //직급
        dept: "", //부서번호? 부서명? 
        reg_num: "", //주민등록번호
        contact: "" //연락처
    })
    const updateField = e => {
        setEmpInfo({
          ...empInfo,
          [e.target.name]: e.target.value
          
        });
        console.log(empInfo);
      };
      
    function TextForm(props) {
        //console.log(props.test);
        return (
            <TextField
            variant="filled"
            margin="normal"
            name={props.name}
            placeholder={empInfo[props.name]}
            required
            autoFocus
            style={{
                backgroundColor: '#ffffff',
            }}
            InputProps={{
                className: classes.input
            }}
            value={empInfo[props.name]}
            onChange={updateField}>
        </TextField>
        )
    }
    return(
        <div className="createEMP">
            <Header/>
            <div className="page">
                <div className="input-div">
                    <div className="label-form">
                        <div className="label">이름</div>
                        <TextForm name="name"></TextForm>
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
                        <TextForm name="title"></TextForm>
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
                            {deptList.map((deptName) => (
                                <MenuItem value={deptName}>
                                    {deptName}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className="label-form">
                        <div className="label">주민등록번호</div>
                        <TextForm name="reg_num"></TextForm>
                    </div>
                    <div className="label-form">
                        <div className="label">연락처</div>
                        <TextForm name="contact"></TextForm>
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
                // onClick={
                //     // 등록된 영화 목록 페이지로 이동 
                //     // 백엔드에 영화정보 보내서 레코드 생성되게 하기
                // }
            >
            등록하기
            </Button>
            </div>
            
        </div>
        
    )
}
export default ModifyEMP;
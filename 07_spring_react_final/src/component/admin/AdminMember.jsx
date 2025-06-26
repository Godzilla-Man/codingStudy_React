import { useEffect, useState } from "react";
import createInstance from "../../axios/Interceptor";
import PageNavi from "../common/PageNavi";

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


//회원 목록
export default function AdminMember(){
    const serverUrl = import.meta.env.VITE_BACK_SERVER;
    const axiosInstance = createInstance();

    //회원 목록 저장 변수
    const [memberList, setMemberList] = useState([]);
    const [reqPage, setReqPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({});

    useEffect(function(){
        let options = {};
        options.url = serverUrl + "/admin/member/" + reqPage;
        options.method = 'get';

        axiosInstance(options)
        .then(function(res){
            setMemberList(res.data.resData.memberList);
            setPageInfo(res.data.resData.pageInfo);
        });
        
    },[reqPage]);

    return (
        <>
            <div className="page-title">회원 관리</div>
            <table className="tbl">
                <thead>
                    <tr>
                        <th style={{width:"25%"}}>아이디</th>
                        <th style={{width:"25%"}}>이름</th>
                        <th style={{width:"25%"}}>전화번호</th>
                        <th style={{width:"25%"}}>등급</th>
                    </tr>
                </thead>
                <tbody>
                    {memberList.map(function(member, index){
                        return <Member key={"member"+index} member={member} memberList={memberList} setMemberList={setMemberList} />
                    })}
                </tbody>
            </table>
            <div className="admin-page-wrap" style={{marginTop : "30px"}}>
                <PageNavi pageInfo={pageInfo} reqPage={reqPage} setReqPage={setReqPage} />
            </div>
        </>
    );
}

//회원 1명
function Member(props) {
    const member = props.member;
    const memberList = props.memberList;
    const setMemberList = props.setMemberList;

    const serverUrl = import.meta.env.VITE_BACK_SERVER;
    const axiosInstance = createInstance();

    function handleChange(e){
        member.memberLevel = e.target.value;

        let options = {};
        options.url = serverUrl + "/admin/member";
        options.method = 'patch';
        options.data = {memberId : member.memberId, memberLevel : member.memberLevel};

        axiosInstance(options)
        .then(function(res){
            if(res.data.resData){
                setMemberList([...memberList]);
            }
        });
    }

    return (
        <tr>
            <td>{member.memberId}</td>
            <td>{member.memberName}</td>
            <td>{member.memberPhone}</td>
            <td>
                <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">등급</InputLabel>
                    <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={member.memberLevel}
                            label="Grade"
                            onChange={handleChange} >
                    
                        <MenuItem value={1}>관리자</MenuItem>
                        <MenuItem value={2}>일반회원</MenuItem>                        
                    </Select>
                </FormControl>
                </Box>
            </td>
        </tr>
    );
}
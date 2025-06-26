import { useEffect, useState } from "react";
import createInstance from "../../axios/Interceptor";
import PageNavi from "../common/PageNavi";
import * as React from 'react';
import Switch from '@mui/material/Switch';

//게시글 목록
export default function AdminBoard(){
    const serverUrl = import.meta.env.VITE_BACK_SERVER;
    const axiosInstance = createInstance();

    //게시글 목록 저장 변수
    const [boardList, setBoardList] = useState([]);
    //요청 페이지(초기에 1페이지 요청하므로 초기값은 1)
    const [reqPage, setReqPage] = useState(1);
    //페이지 하단 페이지 네비게이션 저장 변수
    const [pageInfo, setPageInfo] = useState({});

    useEffect(function(){
        
        let options = {};
        options.url = serverUrl + '/admin/board/' + reqPage;
        options.method = 'get';

        axiosInstance(options)
        .then(function(res){
            //res.data.resData == boardMap
            setBoardList(res.data.resData.boardList);
            setPageInfo(res.data.resData.pageInfo);
        });

        //reqPage 변경 시, useEffect 내부 함수 재실행
    }, [reqPage]);



    return (
        <>
            <div className="page-title">게시글 관리</div>
            <table className="tbl">
                <thead>
                    <tr>
                        <th style={{width:"10%"}}>글번호</th>
                        <th style={{width:"40%"}}>제목</th>
                        <th style={{width:"15%"}}>작성자</th>
                        <th style={{width:"15%"}}>작성일</th>
                        <th style={{width:"20%"}}>상태</th>
                    </tr>
                </thead>
                <tbody>
                   {boardList.map(function(board, index){
                        return <BoardItem key={"board"+index} board={board} boardList={boardList} setBoardList={setBoardList} />
                   })}
                </tbody>
            </table>
            <div className="admin-page-wrap" style={{marginTop : "30px"}}>
                <PageNavi pageInfo={pageInfo} reqPage={reqPage} setReqPage={setReqPage} />
            </div>
        </>
    );
}

//게시글 1개
function BoardItem(props) {
    const board = props.board;
    const boardList = props.boardList;
    const setBoardList = props.setBoardList;

    const serverUrl = import.meta.env.VITE_BACK_SERVER;
    const axiosInstance = createInstance();

    //상태 값을 변경했을 때, 호출 함수(onChange)   
    function handleChange(){
        board.boardStatus = board.boardStatus == 1? 2 : 1; //현재 값이 1이면 2로 변경하고, 아니면 1로 변경

        let options = {};
        options.url = serverUrl + '/admin/board';
        options.method = 'patch';
        options.data = {boardNo : board.boardNo, boardStatus : board.boardStatus};

        axiosInstance(options)
        .then(function(res){
            //DB 정상 변경되었을 때, 화면에 반영
            if(res.data.resData){
                setBoardList([...boardList]);
            }
        });
    }
    
    return (
        <tr>
            <td>{board.boardNo}</td>
            <td>{board.boardTitle}</td>
            <td>{board.boardWriter}</td>
            <td>{board.boardDate}</td>            
            <td>
                <Switch checked={board.boardStatus == 1} onChange={handleChange} />
            </td>
       </tr>
    );
}
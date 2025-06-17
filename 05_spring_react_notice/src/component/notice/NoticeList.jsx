import { useEffect, useState } from "react"

//서버에 비동기 요청을 보내기 위한 axios 모듈 import
import axios from "axios";
import { Link } from "react-router-dom";

export default function NoticeList(){

    //서버에서 조회한 게시글 목록
    let [noticeList, setNoticeList] = useState([
        {noticeNo : 1, noticeTitle : "게시글1", noticeContent : "게시글 내용1", noticeWriter : "user01", noticeDate : "2025-06-17"},
        {noticeNo : 2, noticeTitle : "게시글2", noticeContent : "게시글 내용2", noticeWriter : "user02", noticeDate : "2025-06-17"},
        {noticeNo : 3, noticeTitle : "게시글3", noticeContent : "게시글 내용3", noticeWriter : "user03", noticeDate : "2025-06-17"}
    ]);

    /*
    useEffect(실행함수, 의존성 배열) : React Hook 중에 하나이며, 컴포넌트 렌더링이 일어난 후 실행되는 함수
    - useEffect의 첫번 째 매개변수로 전달한 '실행함수'가 실행되는 조건
        (1) 첫 렌더링 이후(첫 마운트)
        (2) 두번 째 매개변수로 전달한 의존성 배열 요소가 변경되었을 때
        
    */
   
    useEffect(function(){
        
        //서버에 게시글 목록 요청
        let options = {};
        options.url = "http://localhost:9999/notice/getList"
        options.method = "get";
        
        axios(options)
        .then(function(res){ //응답 정보 객체 /* 정상 수행 시 */
            //console.log(res); 컨트롤러에서 응답해준 데이터는 res의 data라는 속성에 있다.
            setNoticeList(res.data); //state 변수를 변경하기 위해서, setter 메소드에 응답받은 데이터 전달.
        })
        .catch(function(err){ /* 에러 발생 시 */
    
        });

    }, []);



    return (
        <>
            <h1>게시글 목록 화면</h1>

            <div className="write-wrap">
            <Link to="/notice/write">작성하기</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>                        
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {noticeList.map(function(notice, index){
                        return <tr key={"notice"+index}>
                                    <td>{notice.noticeNo}</td>
                                    <td><Link to={"/notice/detail/" + notice.noticeNo}>{notice.noticeTitle}</Link></td>
                                    <td>{notice.noticeWriter}</td>
                                    <td>{notice.noticeDate}</td>
                               </tr>
                    })}

                </tbody>
            </table>

        </>
    )
}
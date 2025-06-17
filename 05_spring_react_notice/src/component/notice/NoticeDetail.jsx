import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"

export default function NoticeDetail(){

    //URL을 통해 전달된 파라미터 추출
    const params = useParams();
    
    //App 컴포넌트에 라우터 등록 시, 파라미터 추출 명칭을 noticeNo로 지정했음.
    //console.log(params.noticeNo);

    //게시글 상세 정보 저장할 State 변수
    const [notice, setNotice] = useState({
        noticeNo : "", noticeTitle : "", noticeContent : "", noticeWriter : "", noticeDate : ""
    });

    let options = {};
    options.url = "http://localhost:9999/notice/detail/" + params.noticeNo;
    options.method = "get";

    useEffect(function(){
        
        axios(options)
        .then(function(res){
            console.log(res);
            setNotice(res.data);
        })
        .catch(function(err){
            console.log(err);
        });
        
    },[]);

    //컴포넌트 전환을 위한 Hook
    const navigate = useNavigate();

    //삭제하기 버튼 클릭 시, 동작 함수
    function deleteNotice(){
        let options = {};
        options.url = "http://localhost:9999/notice/delete/" + params.noticeNo;
        options.method = "get"

        axios(options)
        .then(function(res){
            if(res.data > 0){
                //NoticeList 컴포넌트로 전환
                navigate("/notice/list");
            }
        })
        .catch(function(err){
            console.log(err);
        });
    }    


    return (
        <div>
            <h1>게시글 상세보기</h1>

            <hr/>

            <div>
                <table border={1}>
                    <tbody>
                        <tr>
                            <th>제목</th>
                            <td colSpan={5}>{notice.noticeTitle}</td>
                        </tr>
                        <tr>
                            <th>번호</th>
                            <td>{notice.noticeNo}</td>
                            <th>작성자</th>
                            <td>{notice.noticeWriter}</td>
                            <th>작성일</th>
                            <td>{notice.noticeDate}</td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td colSpan={5}>{notice.noticeContent}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={deleteNotice}>삭제하기</button>     
                    <Link to={"/notice/update/" + notice.noticeNo}>수정하기</Link>
                </div>
            </div>
        </div>
    )
}
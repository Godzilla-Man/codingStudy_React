import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"


export default function NoticeUpdate(){

    //URL에 포함되어 전달된 파라미터 추출을 위한 Hook    
    const params = useParams();
    const noticeNo = params.noticeNo;
        
    //게시글 정보를 저장할 State 변수 선언    
    const [notice, setNotice] = useState({noticeNo : "", noticeTitle : "", noticeContent : "", noticeWriter : "", noticeDate : ""});

    //서버에 게시글 정보 조회    
    useEffect(function(){

        //게시글 상세보기 재사용
        let options = {};
        options.url = "http://localhost:9999/notice/detail/" + params.noticeNo;
        options.method = "get";
        
        axios(options)
        .then(function(res){
            console.log(res);
            setNotice(res.data);
        })
        .catch(function(err){
            console.log(err);
        });
        
    },[]);

    /*
    function updTitle(e){
        let titleVal = e.target.value; //사용자가 변경한 제목 값
        notice.noticeTitle = titleVal; //state 변수(객체) 속성에 재할당
        setNotice({...notice}); //setter 메소드에 '새'객체 전달하여, 리렌더링 유도
    }

    function updWriter(e){
        let writerVal = e.target.value;
        notice.noticeWriter = writerVal;
        setNotice({...notice});
    }

    function updContent(e){
        let contentVal = e.target.value;
        notice.noticeContent = contentVal;
        setNotice({...notice});
    }
    */

    function chgNotice(e){
        //e.target => 이벤트 발생 요소 객체
        //e.target.id=> 각 입력 요소에 id 속성값 
        /*
        객체의 속성에 접근하는 방법
        (1) 객체명.속성명 = 변경값
        (2) 객체명[속성명] = 변경값
        */

        notice[e.target.id] = e.target.value;
        setNotice({...notice});
    }    

    const navigate = useNavigate();

    //수정하기 버튼 클릭 시, 동작 함수
    function updateNotice(){
        let options = {};
        options.url = "http://localhost:9999/notice/update";
        options.method = "post";
        options.data = notice; //전달 데이터(게시글 정보 객체)
        
        axios(options)
        .then(function(res){
            //수정이 잘 되었을 때
            if(res.data > 0){
                //상세보기 컴포넌트로 전환
                //상세보기 컴포넌트 == NoticeDetail
                navigate("/notice/detail/" + noticeNo);
            }
        })
        .catch(function(err){
            console.log(err);
        })
    }

    return (
        <div>
            <h1>게시글 수정하기</h1>

            <hr/>

            <div>
                <table border={1}>
                    <tbody>
                        <tr>
                            <th>제목</th>
                            <td colSpan={5}>
                                <input type="text" id="noticeTitle" value={notice.noticeTitle} onChange={chgNotice} />                                
                            </td>
                        </tr>
                        <tr>
                            <th>번호</th>
                            <td>{notice.noticeNo}</td>
                            <th>작성자</th>
                            <td>
                                <input type="text" id="noticeWriter" value={notice.noticeWriter} onChange={chgNotice} />
                            </td>
                            <th>작성일</th>
                            <td>{notice.noticeDate}</td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td colSpan={5}>
                                <textarea id="noticeContent" value={notice.noticeContent} onChange={chgNotice}></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={updateNotice}>수정하기</button>
                </div>
            </div>
        </div>
    )
}
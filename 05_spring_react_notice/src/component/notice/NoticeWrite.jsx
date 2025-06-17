import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function NoticeWrite(){

    //사용자 입력값 상태 관리 변수
    let [noticeTitle, setNoticeTitle] = useState("");
    let [noticeWriter, setNoticeWriter] = useState("");
    let [noticeContent, setNoticeContent] = useState("");

    function updNoticeTitle(e){
        setNoticeTitle(e.target.value);
    }
    function updNoticeWriter(e){
        setNoticeWriter(e.target.value);
    }
    function updNoticeContent(e){
        setNoticeContent(e.target.value);
    }

    //스크립트에서, Link와 같이 컴포넌트 전환을 하기 위해 사용되는 Hook
    const navigate = useNavigate();

    //작성하기 버튼 클릭 시, 동작 함수
    function regNotice(){
        let options = {};
        options.url = "http://localhost:9999/notice/write";
        options.method = "post";
        options.data = {
            noticeTitle : noticeTitle,
            noticeWriter : noticeWriter,
            noticeContent : noticeContent
        };

        axios(options)
        .then(function(res){
            //정상 등록 되었을 때, NoticeList 컴포넌트로 전환
            //console.log(res);
            if(res.data > 0){
                navigate("/notice/list");
            }
        })
        .catch(function(err){
            console.log(err);
        })

    }

    return (
        <>
            <h1>게시글 작성</h1>

            <hr/>

            <div>
                <div>
                    <label htmlFor="noticeTitle">제목</label>
                    <input type="text" id="noticeTitle" value={noticeTitle} onChange={updNoticeTitle}></input>
                </div>
                <div>
                    <label htmlFor="noticeWriter">작성자</label>
                    <input type="text" id="noticeWriter" value={noticeWriter} onChange={updNoticeWriter}></input>
                </div>
                <div>
                    <label htmlFor="niceContent">내용</label>
                    <textarea id="noticeContent" value={noticeContent} onChange={updNoticeContent}></textarea>
                </div>
                <div>
                    <button onClick={regNotice}>작성하기</button>
                </div>
            </div>
        </>
    )
}
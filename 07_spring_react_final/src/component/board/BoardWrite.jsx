import { useState } from "react";
import useUserStore from "../../store/useUserStore";
import createInstance from "../../axios/Interceptor";
import BoardFrm from './BoardFrm';
import ToastEditor from "../common/ToastEditor";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

//게시글 작성
export default function BoardWrite(){

    const {loginMember} = useUserStore();   //작성하기 Form에서, 작성자 아이디를 표기하기 위함. 작성하기 클릭 시, boardWriter에 회원 아이디가 들어가야 함. 

    const [boardTitle, setBoardTitle] = useState("");       //게시글 제목
    const [boardThumb, setBoardThumb] = useState(null);     //게시글 썸네일 이미지 파일 객체
    const [boardContent, setBoardContent] = useState("");   //게시글 내용
    const [boardFile, setBoardFile] = useState([]);         //게시글에 대한 첨부파일 객체's

    const serverUrl = import.meta.env.VITE_BACK_SERVER;
    const axiosInstace = createInstance();

    const navigate = useNavigate();

    //등록하기 버튼 클릭 시, 동작 함수
    function boardWrite(){
        if(boardTitle != '' && boardContent != ''){
            const form = new FormData(); //파일 업로드 시, 사용할 수 있는 내장 객체

            //첫번째로 작성하는 문자열 ==> input의 name 속성값 역할을 함.
            form.append("boardTitle", boardTitle);
            form.append("boardContent", boardContent);
            form.append("boardWriter", loginMember.memberId);

            if(boardThumb != null){ //썸네일 이미지 업로드 한 경우에만
                form.append("boardThumb", boardThumb)
            }

            for(let i=0; i<boardFile.length; i++){  //첨부파일 업로드한 경우에만
                form.append("boardFile", boardFile[i]); //모두 동일한 이름으로 append
            }

            let options = {};
            options.method = 'post';
            options.url = serverUrl + '/board';
            options.data = form;
            options.headers = {};
            options.headers.contentType = "multipart/form-data";
            options.headers.processData = false; //쿼리스트링으로 변환하지 않도록 설정

            axiosInstace(options)
            .then(function(res){
                //게시글 정상 등록 시, BoardList 컴포넌트로 전환
                navigate('/board/list');
            });

        }else {
            Swal.fire({
                title : '알림',
                text : '게시글 제목과 내용은 필수 입력값입니다.',
                icon : "warning"
            });
        }

    }

    return(
        <section className="section board-content-wrap">
            <div className="page-title">게시글 작성</div>
            <form className="board-write-frm" onSubmit={function(e){
                e.preventDefault();
                boardWrite(); //등록하기 함수 호출
            }}>
                
                {/* 게시글 작성과 수정하기 모두 UI는 동일하므로, 입력 요소들은 별도의 컴포넌트로 분리하여 작성. 
                    props로 State 변수와 변경할 때 호출할 함수's 전달. 
                */}
                <BoardFrm loginMember={loginMember}
                            boardTitle={boardTitle}
                            setBoardTitle={setBoardTitle}
                            boardThumb={boardThumb}
                            setBoardThumb={setBoardThumb}
                            boardFile={boardFile}
                            setBoardFile={setBoardFile} />

                <div className="board-content-wrap">
                    <ToastEditor boardContent={boardContent} setBoardContent={setBoardContent} type={0}/>
                </div>
                <div className="button-zone">
                    <button type="submit" className="btn-primary lg">
                        등록하기
                    </button>
                </div>
            </form>
        </section>
    );
}
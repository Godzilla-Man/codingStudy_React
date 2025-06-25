import { useParams } from "react-router-dom";
import createInstance from "../../axios/Interceptor";
import { useEffect } from "react";
import { useState } from "react";
import BoardFrm from "./BoardFrm";
import ToastEditor from "../common/ToastEditor";
import {useNavigate} from "react-router-dom";
import useUserStore from '../../store/useUserStore';


//게시글 수정
export default function BoardUpdate(){
    const param = useParams(); //BoardView에서 URL에 포함시켜 전달한 게시글 번호 추출을 위함.
    const boardNo = param.boardNo;

    const serverUrl = import.meta.env.VITE_BACK_SERVER;
    const axiosInstance = createInstance();

    //BoardWirte에서 사용했던 State 변수와 동일하게 선언.
    const {loginMember} = useUserStore();   //작성하기 Form에서, 작성자 아이디를 표기하기 위함. 작성하기 클릭 시, boardWriter에 회원 아이디가 들어가야 함. 

    const [boardTitle, setBoardTitle] = useState("");       //게시글 제목
    const [boardThumb, setBoardThumb] = useState(null);     //게시글 썸네일 이미지 파일 객체
    const [boardContent, setBoardContent] = useState("");   //게시글 내용
    const [boardFile, setBoardFile] = useState([]);         //게시글에 대한 첨부파일 객체's

    //수정할 때에는 기존 DB 정보를 보여주어야 하기 때문에, 기존 정보를 보여줄 변수 선언
    const [preveThumbPath, setPrevThumPath] = useState(null);           //기존 썸네일 서버 저장 파일명
    const [prevBoardFileList, setPrevBoardFileList] = useState([]);     //BoardFile 객체 리스트
    const [delBoardFileNo, setDelBoardFileNo] = useState([]);           //삭제 대상 파일 번호 저장 배열
     

    useEffect(function(){
        let options = {};
        options.url = serverUrl + '/board/' + boardNo; //상세보기 진입 시, 사용 API 재사용
        options.method = 'get'

        axiosInstance(options)
        .then(function(res){
            const board = res.data.resData;

            setBoardTitle(board.boardTitle);      //기존 제목  
            setBoardContent(board.boardContent);  //기존 본문 내용
            setPrevThumPath(board.boardThumbPath); //2025062416200775_04771.jpg
            setPrevBoardFileList(board.fileList); //BoardFile 객체 배열
        });


    }, []);
    
    const navigate = useNavigate();
    //수정하기 버튼 클릭 시, 동작 함수
    function updateBoard(){
        /*
        console.log(boardNo);
        console.log(boardTitle);
        console.log(boardContent);
        console.log(boardThumb);
        console.log(boardFile);
        console.log(delBoardFileNo);
        console.log(preveThumbPath);        
        */
       if(boardTitle != null && boardContent != null){
        const form = new FormData();

        form.append('boardNo', boardNo);            //게시글 번호
        form.append('boardTitle', boardTitle);      //게시글 제목
        form.append('boardContent', boardContent);  //게시글 본문 내용

        //기존 썸네일 파일명
        if(preveThumbPath != null){
            form.append('prevThumbPath', preveThumbPath);
        }
        //새롭게 등록한 썸네일 파일 객체
        if(boardThumb != null){
            form.append('boardThumb', boardThumb);
        }
        //추가 첨부파일
        for(let i=0; i<boardFile.length; i++){
            form.append('boardFile', boardFile[i]);
        }
        //기존 첨부파일 중, 삭제 대상 파일
        for(let i=0; i<delBoardFileNo.length; i++){
            form.append('delBoardFileNo', delBoardFileNo[i]);
        }

        let options = {};
        options.url = serverUrl + '/board';
        options.method = 'patch'; //수정 == PUT or PATCH == 일부 컬럼 정보 수정 == PATCH
        options.data = form;
        options.headers = {};
        options.headers.contentType = 'multipart/form-data';
        options.headers.processData = false; //쿼리 스트링 변환 X

        axiosInstance(options)
        .then(function(res){
            if(res.data.resData){
                navigate('/board/view/' + boardNo);
            }
        });
       }
    }


    return (
        <section className="section board-content-wrap">
            <div className="page-title">게시글 수정</div>
            <form className="board-write-frm" onSubmit={function(e){
                e.preventDefault();
                updateBoard(); //수정하기 함수 호출
            }}> 
                {/* BoardWrite에서 호출했던 BoardFrm 재사용. 작성하기와 수정하기는 UI는 동일하고, 기존 정보가 보이느냐 보이지 않느냐의 차이이므로 재사용이 가능하다. 
                    기존 정보가 입력 폼에 보여야 하므로, 전달해야하는 데이터들이 더 많을 뿐.
                */}
                <BoardFrm loginMember={loginMember}
                          boardTitle={boardTitle}
                          setBoardTitle={setBoardTitle}
                          boardThumb={boardThumb}
                          setBoardThumb={setBoardThumb}
                          boardFile={boardFile}
                          setBoardFile={setBoardFile} 
                          preveThumbPath={preveThumbPath}
                          setPrevThumPath={setPrevThumPath}
                          prevBoardFileList={prevBoardFileList}
                          setPrevBoardFileList={setPrevBoardFileList}
                          delBoardFileNo={delBoardFileNo}
                          setDelBoardFileNo={setDelBoardFileNo}
                          />                
                <div className="board-content-wrap">
                    <ToastEditor boardContent={boardContent}
                                 setBoardContent={setBoardContent} type={1} />                                 
                </div>
                <div className="button-zone">
                    <button type="submit" className="btn-primary lg">
                        수정하기
                    </button>
                </div>
            </form>
        </section>
    );
}
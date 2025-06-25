import { useRef, useState } from "react";

//게시글 작성 및 수정 시, 입력폼 컴포넌트
export default function BoardFrm(props){

    //부모 컴포넌트에서 전달 받은 데이터 추출
    const loginMember = props.loginMember;
    const boardTitle = props.boardTitle;
    const setBoardTitle = props.setBoardTitle;
    const boardThumb = props.boardThumb;
    const setBoardThumb = props.setBoardThumb;
    const boardFile = props.boardFile;
    const setBoardFile = props.setBoardFile;

    
    //수정 시, 전달 데이터 추출
    const preveThumbPath = props.preveThumbPath;
    const setPrevThumPath = props.setPrevThumPath;
    const prevBoardFileList = props.prevBoardFileList;
    const setPrevBoardFileList = props.setPrevBoardFileList;
    const delBoardFileNo = props.delBoardFileNo;
    const setDelBoardFileNo = props.setDelBoardFileNo
    const serverUrl = import.meta.env.VITE_BACK_SERVER;


    //제목 변경 시, 호출 함수(onChange)
    function chgBoardTitle(e){
        setBoardTitle(e.target.value);
    }

    //썸네일 이미지 미리보기용 변수(서버에 전송 X)
    const [thumbImg, setThumbImg] = useState(null);

    //input type=file인 썸네일 업로드 요소와 연결하여 사용.
    const thumbFileEl = useRef(null);

    //썸네일 이미지 변경 시, 호출 함수(onChange)
    function chgThumbFile(e){

        const files = e.target.files;

        if(files.length != 0 && files[0] != null){
            setBoardThumb(files[0]);    //게시글 등록하기 클릭 시, 서버에 전송될 썸네일 파일 객체

            //썸네일 이미지 화면에 보여주기
            const reader = new FileReader();    //브라우저에서 파일을 비동기적으로 읽을 수 있게 해주는 객체
            reader.readAsDataURL(files[0]);     //파일 데이터 읽어오기
            reader.onloadend = function(){       //모두 읽어오면, 실행할 함수 작성
                setThumbImg(reader.result);     //미리보기용 State 변수에 세팅
            }
        }else{
            //업로드 팝업 취소한 경우, 썸네일 파일 객체와 미리보기용 변수 초기화
            setBoardThumb(null);
            setThumbImg(null);
        }
    }

    //사용자가 업로드한 첨부파일을 화면에 보여주기 위한 용도의 변수
    const [boardFileImg, setBoardFileImg] = useState([]); //업로드한 파일명 

    //첨부파일 업로드 시, 동작 함수(onChange)
    function chgBoardFile(e){
        const files = e.target.files;       //유사 배열이라 배열에서 제공되는 map 함수 사용 불가

        const fileArr = new Array();        //부모 컴포넌트에서 전달한 첨부파일 배열 state 변수에 매개변수로 전달할 배열
        const fileNameArr = new Array();    //화면에 첨부파일 목록을 노출시키기 위한 배열

        for(let i=0; i<files.length; i++){  //사용자가 업로드한 파일's 순회
            fileArr.push(files[i]);
            fileNameArr.push(files[i].name);
        }
        /*
        fileArr, fileNameArr 앞에 전개 연산자(...)를 생략하면, 배열 자체가 하나의 요소로 추가된다. 

        let aArr = ['a', 'b'];
        let bArr = ['c', 'd'];

        [...aArr, ...bArr]  =>  ['a', 'b', 'c', 'd']
        [...aArr, bArr]     =>  ['a', 'b', ['c','d']]

        */
        //State 변수 변경
        setBoardFile([...boardFile, ...fileArr]);           //파일 객체 배열
        setBoardFileImg([...boardFileImg, ...fileNameArr]); //파일 이름 배열
    }


    return (
        <div>
            <div className="board-thumb-wrap">
                {/*
                (1) 마우스로 img 요소 클릭
                (2) img 요소 click 이벤트 핸들러 내부에서, useRef로 연결한 input type=file인 요소가 동적으로 클릭 됨.
                (3) 브라우저에 이미지를 선택할 수 있는 파일 탐색기가 오픈이 되고, 이미지를 선택
                (4) input type=file인 요소의 onChange 이벤트 핸들러가 동작함. 
                (5) onChange 이벤트 핸들러 내부(파일을 읽어와서, thumbImg 변수에 읽어온 값 세팅)
                (6) thumbImg(State변수)가 변경되었으므로, 리렌더링이 일어나고, 값에 따라서 선택한 이미지가 화면에 보여짐. 
                */}

                {thumbImg
                 ?
                    <img src={thumbImg} onClick={function(e){
                        //e.target == img 요소 객체
                        //e.target의 속성을 이용해서, 다음 요소인 input을 동적으로 click 하는게 가능하지만, React에서 권장하지 않음.
                        //useRef라는 훅을 이용하여, 자바스크립트 변수와 input요소를 연결시키고, 해당 변수를 이용하여 컨트롤이 가능하다.
                        thumbFileEl.current.click(); 
                    }}></img>                
                 :
                    preveThumbPath
                    ?
                    <img src={serverUrl + "/board/thumb/" + preveThumbPath.substring(0, 8) + "/" + preveThumbPath} onClick={function(){
                        thumbFileEl.current.click(); 
                    }} />
                    :
                    <img src="/images/default_img.png" onClick={function(e){
                        //e.target == img 요소 객체
                        //e.target의 속성을 이용해서, 다음 요소인 input을 동적으로 click 하는게 가능하지만, React에서 권장하지 않음.
                        //useRef라는 훅을 이용하여, 자바스크립트 변수와 input요소를 연결시키고, 해당 변수를 이용하여 컨트롤이 가능하다.
                        thumbFileEl.current.click(); 
                    }}></img>   
                }
                <input type="file" accept="image/*" style={{display : 'none'}} ref={thumbFileEl} onChange={chgThumbFile}/>
            </div>
            <div className="board-info-wrap">
                <table className="tbl">
                    <tbody>
                        <tr>
                            <th style={{width : "30%"}}>
                                <label htmlFor="boardTitle">제목</label>
                            </th>
                            <td>
                                <div className="input-item">
                                    <input type="text" 
                                           id="boardTitle" 
                                           name="boardTitle" 
                                           value={boardTitle}
                                           onChange={chgBoardTitle}                                           
                                           />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td className="left">{loginMember.memberId}</td>
                        </tr>
                        <tr>
                            <th>
                                <label>첨부파일</label>
                            </th>
                            <td className="left">
                                <label htmlFor="boardFile" className="btn-primary sm">파일첨부</label>
                                <input type="file" id="boardFile" style={{display : 'none'}} multiple onChange={chgBoardFile} />
                            </td>
                        </tr>
                        <tr>
                            <th>첨부파일 목록</th>
                            <td>
                                <div className="board-file-wrap">
                                    {
                                        prevBoardFileList
                                        ? prevBoardFileList.map(function(oldFile, index){

                                            //기존 파일 삭제 아이콘 클릭 시, 호출 함수
                                            function deleteFile(){
                                                const newFileList = prevBoardFileList.filter(function(fOldFile, fIndex){
                                                    return oldFile != fOldFile;
                                                })
                                                setPrevBoardFileList(newFileList); //화면에서 삭제

                                                //서버에서도 파일 삭제를 위해, 삭제 아이콘을 클릭한 파일의 파일 번호를 변수에 세팅
                                                setDelBoardFileNo([...delBoardFileNo, oldFile.boardFileNo]);
                                            }

                                            //oldFile == BoardFile 객체
                                            return <p key={"old-file"+index}>
                                                        <span className="fileName">{oldFile.fileName}</span> 
                                                        <span className="material-icons del-file-icon" onClick={deleteFile}>
                                                            delete
                                                        </span>
                                                   </p>
                                          })
                                        : ''
                                    }
                                    {
                                        boardFileImg.map(function(fileName, index){

                                            //배열의 각 요소마다 적용되는 함수
                                            function deleteFile(){
                                                
                                                //파일 이름 배열에서 제거
                                                boardFileImg.splice(index, 1);
                                                setBoardFileImg([...boardFileImg]);

                                                //파일 객체 배열에서 제거
                                                boardFile.splice(index, 1);
                                                setBoardFile([...boardFile]);
                                            }


                                            return <p key={"new-file"+index}>
                                                        <span className="fileName">{fileName}</span>
                                                        <span className="material-icons del-file-icon" onClick={deleteFile}>
                                                            delete
                                                        </span>
                                                   </p>
                                        })
                                    }                                    
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
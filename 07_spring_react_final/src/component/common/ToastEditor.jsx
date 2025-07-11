import '@toast-ui/editor/dist/toastui-editor.css';
import {Editor} from '@toast-ui/react-editor';
import { useRef } from 'react';
import createInstance from '../../axios/Interceptor';


//게시글 본문 내용 작성을 위한 에디터
export default function ToastEditor(props){

    const boardContent = props.boardContent;
    const setBoardContent = props.setBoardContent;
    const type = props.type; //등록 : 0, 수정 : 1

    const serverUrl = import.meta.env.VITE_BACK_SERVER;
    const axiosInstace = createInstance();

    const editorRef = useRef(null); //에디터와 연결할 ref 변수
    
    function changeContent(){
        //에디터 본문에 작성한 내용 STATE 변수의 셋팅
        const editorText = editorRef.current.getInstance().getHTML(); //<u>밑줄</u>

        setBoardContent(editorText);
    }


    //에디터 상단, 이미지 아이콘 클릭하여 이미지 업로드 후, OK 버튼 클릭 시 동작 함수
    /*
    에디터 이미지 업로드 시, 처리 순서
    (1) 서버에 비동기 요청하여 이미지를 업로드
    (2) 서버에서는 업로드한 이미지 파일 경로를 응답
    (3) 매개변수로 전달받은 callbackFunc에 이미지 경로를 작성하여, 에디터 내부에 이미지를 표기
    */
    function uploadImg(file, callbackFunc){

        //파일 업로드 처리(post, multipart/form-data)
        const form = new FormData(); //웹 API (자바스크립트 내장 객체)
        form.append("image", file);

        let options = {};
        options.url = serverUrl + "/board/editorImage";
        options.method = 'post';
        options.data = form;
        options.headers = {};
        options.headers.contentType = "multipart/form-data";
        options.headers.processData = false;    //전송 데이터를 쿼리스트링으로 변환할지에 대한 여부. (기본값 true)


        axiosInstace(options)
        .then(function(res){
            //res.data.resData => "/editor/20250624/20250624151520485_00485.jpg"
            
            /*
            리액트로 생성한 정적 웹 사이트는 보안상의 이유로 파일 시스템(C 드라이브)에 직접적으로 접근할 수 없음.
            파일 시스템에 저장된 이미지를 브라우저에 보여주고자 할 때, 백엔드 서버에 요청을 해야 함. 

            http://localhost:9999/editor/20250624/20250624151520485_00485.jpg
            */           
            callbackFunc(serverUrl + res.data.resData, '이미지');
        });
    }


    return (
        <div style={{width : '100%', marginTop : '20px'}}>
            {/*
                initialEditType="wysiwyg"   =>  HTML 작성 없이, 일반 텍스트로 작성 가능

                아래 조건식 작성 이유 

                수정인경우 BoardUpdate가 렌더링 되면서, 호출하고 있는 에디터도 렌더링 됨.
                이후, 서버에서 조회해온 게시글 정보로 State 변수를 변경하면 리렌더링이 일어남. 
                이 때, 에디터가 다시 그려지지 않는다. 

                (1) BoardUpdate 컴포넌트로 전환 시, boardContent는 초기값인 빈 문자열을 가지고 있다. 
                    이때, 에디터는 렌더링 되지 않음. 
                (2) BoardUpdate의 useEffect에 전달한 함수가 실행되고, boardContent 변수를 변경함. 
                    이때, boardContent는 빈 문자열이 아니므로, 아래 조건식에 만족하여
                    에디터가 렌더링 된다. 
                
            */}
            {type == 0 || (type == 1 && boardContent != '')            
                ? <Editor ref={editorRef}
                    initialValue={boardContent}
                    initialEditType="wysiwyg"
                    language="ko-KR"
                    height="600px"
                    onChange={changeContent}
                    hooks={{
                        addImageBlobHook : uploadImg
                    }}>
                  </Editor>
                : ''            
            }
        </div>
    )
}
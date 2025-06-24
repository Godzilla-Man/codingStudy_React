import { Link } from "react-router-dom";
import createInstance from "../../axios/Interceptor";
import { useEffect, useState } from "react";
import useUserStore from "../../store/useUserStore";
import PageNavi from "../common/PageNavi";

//게시글 목록
export default function BoardList(){
    const serverUrl = import.meta.env.VITE_BACK_SERVER;
    const axiosInstace = createInstance();

    const [boardList, setBoardList] = useState([]); //게시글 리스트 저장 변수
    const [reqPage, setReqPage] = useState(1);      //요청 페이지(페이지네이션 1페이지부터 시작 선언)
    const [pageInfo, setPageInfo] = useState({});   //페이지 네비게이션
    const {isLogined} = useUserStore();             //로그인 여부(글쓰기 버튼 표출을 위함.)

    useEffect(function(){
        let options = {};
        options.url = serverUrl + "/board/list/" + reqPage;
        options.method = 'get';

        axiosInstace(options)
        .then(function(res){
            setBoardList(res.data.resData.boardList);
            setPageInfo(res.data.resData.pageInfo);
        });

        /*
        useEffect 함수의 첫번째 매개변수로 전달한 function이 실행되는 조건
        (1) 컴포넌트 첫 렌더링(마운트) 이후
        (2) 두번째 매개변수로 전달한 의존성 배열 요소가 변경되었을 때
        */
    }, [reqPage]);

    return(
        <section className="section board-list">
            <div className="page-title">자유게시판</div>
            {isLogined
            ? <Link to="/board/write" className="btn-primary">글쓰기</Link>
            : ''}
            <div className="board-list-wrap">
                <ul className="posting-wrap">
                    {boardList.map(function(board, index){
                        //게시글 1개에 대한 JSX를 BoardItem이 return한 JSX로
                        return <BoardItem key={"board" + index} board={board} serverUrl={serverUrl} />
                    })}
                </ul>
            </div>
            <div className="board-paging-wrap">
                    {/* 페이지 네비게이션 제작 컴포넌트 별도 분리하여 작성하고, 필요 시 재사용 */}
                    <PageNavi pageInfo={pageInfo} reqPage={reqPage} setReqPage={setReqPage} />
            </div>
        </section>
    )
}

//게시글 1개
function BoardItem(props) {
    const board = props.board;
    const serverUrl = props.serverUrl;

    return (
        <li className="posting-item">
            <div className="posting-img">
                {/* 썸네일 이미지가 등록된 경우에는 백엔드로 요청하고, 등록되지 않은 경우에는 기본 이미지 표기되도록 처리 */}
                <img src={board.boardThumbPath ? serverUrl + "/board/thumb/" + board.boardThumbPath.substring(0,8) + "/" + board.boardThumbPath
                                               : "/images/default_img.png"}/>
            </div>
            <div className="posting-info">
                <div className="posting-title">{board.boardTitle}</div>
                <div className="posting-sub-info">
                    <span>{board.boardWriter}</span> 
                    <span>{board.boardDate}</span>
                </div>
            </div>
        </li>
    );
}
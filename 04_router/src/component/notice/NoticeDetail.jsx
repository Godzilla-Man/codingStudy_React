import { useLocation, useParams } from "react-router-dom"

//게시글 상세보기 컴포넌트
export default function NoticeDetail(){

    //(1) Link의 state 속성으로 데이터 전달한 경우(*민감한 정보 전달 시*)
    //const location = useLocation();
    //const noticeNo = location.state; //게시글 번호
    //console.log(noticeNo);
    //console.log(location);

    //(2) Link의 path에 데이터 포함시켜 전달한 경우    
    //const params = useParams();
    //console.log(params);

    //(3) Link의 path에 ?key=value 형태로 데이터 포함시켜 전달한 경우
    //const location = useLocation();
    //const params = new URLSearchParams(location.search);
    //console.log(params.get("noticeNo"));
    //console.log(params);

    //(4) 스크립트에서 useNavigate를 통한 데이터 전달. 추출 방법은 (1)과 동일
    const location = useLocation();
    const noticeNo = location.state; //게시글 번호
    console.log(noticeNo);
    
    return (
        <div>
            <h1>게시글 상세보기 화면</h1>
        </div>
    )
}

import { Route, Routes } from "react-router-dom";
import "./board.css";

import BoardList from './BoardList'; 
import BoardWrite from "./BoardWrite";
import BoardView from './BoardView';
import BoardUpdate from "./BoardUpdate";

//게시판 메인
export default function BoardMain(){
    /*
    아래 라우터로 등록한 자식 컴포넌트들 (BoardList, BoardWrite, BoardView, BoardUpdate)에게
    공유해야 하는 State 변수가 있다면, 공통 부모 컴포넌트인 BoardMain 컴포넌트에
    해당 state 변수들을 선언하고 공유할 수 있음. 

    ex) BoardMain 컴포넌트를 생성하지 않고, App 컴포넌트에서 자식 컴포넌트들을 라우터로 등록한다면
        공유해야하는 State 변수들은 App 컴포넌트에 선언해야 할 것임. 
        이 때, App 컴포넌트는 다른 관리 기능 컴포넌트들(Join, Login, MemberMain 등등)이
        렌더링되는 공간이므로, 게시판 관리에만 사용되는 State 변수들이 선언되기에는 부적합하다. 
    */   
    return(
        <Routes>
            <Route path="list" element={<BoardList />} />
            <Route path="write" element={<BoardWrite />} />
            <Route path="view/:boardNo" element={<BoardView />} />
            <Route path="update/:boardNo" element={<BoardUpdate />} />
        </Routes>
    );
}


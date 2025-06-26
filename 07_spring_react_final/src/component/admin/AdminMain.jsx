import { useState } from "react";
import LeftMenu from "../common/LeftMenu";
import { Route, Routes } from "react-router-dom";

import AdminBoard from './AdminBoard';
import AdminMember from './AdminMember';

//관리자 메인
export default function AdminMain(){

    const [menuList, setMenuList] = useState([
        {url : '/admin/member',     text : "회원 관리"},
        {url : '/admin/board',      text : "게시글 관리"}
    ]);
        
    return (
        <div className="mypage-wrap">
            <div className="mypage-side">
                <section className="section account-box">
                    <div className="account-info">
                        <span className="material-icons">manage_accounts</span>
                        <span className="member-name">관리자 페이지</span>
                    </div>
                </section>
                <section className="section">
                    {/* MemberMain에서 사용했던, 컴포넌트 재사용 (이때 좌측에 그려질 메뉴에 추가되는 개념) */}
                    <LeftMenu menuList={menuList} />
                </section>
            </div>
            <div className="mypage-content">
                <section className="section">
                    <Routes>
                        <Route path="board" element={<AdminBoard />} />
                        <Route path="member" element={<AdminMember />} />
                    </Routes>
                </section>
            </div>
        </div>
    );
}
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'

//외부 컴포넌트를 현재 컴포넌트에 포함시키기 위해 import
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import NoticeList from "./component/notice/NoticeList";
import NoticeWrite from './component/notice/NoticeWrite';
import NoticeDetail from './component/notice/NoticeDetail';
import NoticeUpdate from './component/notice/NoticeUpdate';

//라우터 등록을 위한 import
import {Route, Routes} from "react-router-dom";

function App() {  
  return (
    <div>
      <Header />
      {/*
        path로 요청 시, element에 작성된 컴포넌트로 전환
      */}
      <Routes>
        <Route path="/notice/list" element={<NoticeList />} />
        <Route path="/notice/write" element={<NoticeWrite />} />
        
        {/* NoticeDetail 컴포넌트 전환을 위한 URL은 /notice/detail이고, :noticeNo는 파라미터 추출 시 사용 명칭 */}
        <Route path="/notice/detail/:noticeNo" element={<NoticeDetail />} />
        <Route path="/notice/update/:noticeNo" element={<NoticeUpdate />} />
      </Routes>     
      <Footer />
    </div>
  )
}

export default App

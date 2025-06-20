import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//라우터 사용을 위한 import
import {Link, Routes, Route} from "react-router-dom";

//컴포넌트 import
import AllMember from './component/member/AllMember';
import UpdateMember from './component/member/UpdateMember';
import JoinMember from './component/member/JoinMember';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>회원 관리</h1>

      <hr/>

      <h3>
        <Link to='/allMember'>전체 회원 조회 컴포넌트로 전환!!!!!!!!!!!!!!!!!!!!!!!</Link> <br/>
        <Link to='/joinMember'>회원 정보 등록</Link>
      </h3>

      <Routes>
        <Route path='/allMember' element={<AllMember/>} />
        <Route path='/updMember/:memberId' element={<UpdateMember />} />
        <Route path='/joinMember' element={<JoinMember/>} />
      </Routes>
    </> 
  )
}

export default App

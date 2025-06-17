import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'

function App() {
  
  //기존 회원 정보 객체 배열 state로 선언
  const [userList, setUserList] = useState([
    {name : "유저1", age : 24, addr : "주소1", gender : "남자", phone : "010-8585-5544"},
    {name : "유저2", age : 34, addr : "주소2", gender : "여자", phone : "010-1234-5544"},
    {name : "유저3", age : 54, addr : "주소3", gender : "남자", phone : "010-8585-2333"},
    {name : "유저4", age : 24, addr : "주소4", gender : "여자", phone : "010-4244-5544"},
    {name : "유저5", age : 24, addr : "주소5", gender : "남자", phone : "010-8585-5544"}
  ]);

  //회원 정보 신규 등록 시
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [addr, setAddr] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  //신규 회원 등록 버튼 클릭 시
  function insertUser() {

    const user = {name, age, addr, gender, phone};

    //기존 배열 마지막 요소로 추가
    userList.push(user);

    //배열 복사하여 setter 메소드에 전달하여, 재렌더링 유도
    setUserList([...userList]);

    //사용자 입력값 초기화
    setName("");
    setAge("");
    setAddr("");
    setGender("");
    setPhone("");
  };


  return (
    
    <div className='wrap'>
      <h1>회원 목록 출력</h1>
      <table border="1">

        <thead>
          <tr>
            <th>이름</th>
            <th>나이</th>
            <th>주소</th>
            <th>성별</th>
            <th>전화번호</th>
            <th>삭제</th>
          </tr>
        </thead>

        <tbody>

          {
            userList.map(function(item, index){
              return <User key={"user"+index} user={item} userList={userList} setUserList={setUserList} />;
            })
          }

        </tbody>
      </table>
      
      {/* 신규 회원 등록 */}
      <div className='regist-wrap'>
          <h3>회원 정보 등록</h3>
          <InputElWrap text="이름" data={name} setData={setName} />
          <InputElWrap text="나이" data={age} setData={setAge} />
          <InputElWrap text="주소" data={addr} setData={setAddr} />
          <InputElWrap text="성별" data={gender} setData={setGender} />
          <InputElWrap text="전화번호" data={phone} setData={setPhone} />
          <button onClick={insertUser}>회원등록</button>
      </div>    

    </div>

  )
}

const User = function(props) {
  const user = props.user; // 기존 정보 출력용

  const userList = props.userList; //삭제용
  const setUserList = props.setUserList; //삭제용

  function deleteUser(){ //삭제용
    const newUserList = userList.filter(function(fUser,fIndex){
      return fUser != user;
    });

    setUserList(newUserList);
  }


  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.age}</td>
      <td>{user.addr}</td>
      <td>{user.gender}</td>
      <td>{user.phone}</td>
      <td><button onClick={deleteUser}>삭제</button></td>
    </tr>
  );
};

//신규 회원 등록 관련
const InputElWrap = function(props){

  const text = props.text;
  const data = props.data;
  const setData = props.setData;

  const changeInputValue = function(e) {
    setData(e.target.value);
  };

  return (
    <div className='input-wrap'>
      <label>{text}</label>
      <input type="text" value={data} onChange={changeInputValue} />
    </div>
  );

};

export default App

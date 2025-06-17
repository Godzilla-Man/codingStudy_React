import { Component, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//외부 파일에서 작성한 컴포넌트를, 현재 컴포넌트에서 사용하기 위한 import
import UseComponent1 from './component/ComponentTest1';

function App() {
  /*
    컴포넌트(Component) : 사용자에게 보여지는 UI 요소들을 구성하는 단위

    리액트 프로젝트는 SPA(Single Page Applicateion)으로, 브라우저에 보여지는 페이지는 index.html 한 개임. 
    사용자 액션이나 로직에 따라, 화면이 전환되는데(로그인, 회원가입, 게시글 목록 등) 페이지를 여러개 만드는 것이 아닌
    컴포넌트를 여러개 만드는 것.

    컴포넌트 작성 규칙
    - 컴포넌트 명칭은 대문자로 시작할 것. 
    - 컴포넌트는 단일 책임 원칙에 따라, 1가지의 기능만을 담당할 것. 
    - 컴포넌트는 재사용이 가능한 단위로 작성할 것. 
    - 컴포넌트 사용할 때, 속성으로 필요한 데이터를 전달할 수 있음. 
      사용되어지는 컴포넌트에서 전달받은 데이터를 사용할 때, props라는 매개변수(객체)에서 추출하여 사용. 
    - 전달받은 props는 읽기 전용이므로, 변경하여 사용하지 말 것.
    - 'export default App' 구문은 외부에서 컴포넌트를 사용할 수 있도록 정의한 구문
    
    컴포넌트와 State 변수
    - 컴포넌트는 항상 계층(트리) 구조를 따라 상위에서 하위로 내려가는 단방향 데이터 흐름을 가진다.
      부모에서 선언한 State 변수를 자식 컴포넌트에서 사용이 가능하지만,
      자식 컴포넌트에서 선언한 State 변수를 부모 컴포넌트에서는 사용이 불가능하다. 
    - 부모 컴포넌트가 전달한 값은, 자식 컴포넌트에서 선언한 State 변수의 초기값으로는 부적합하다. 
    - State는 어느 컴포넌트에서 정의되어야 하는가?
      만약 여러 자식 컴포넌트가, 동일한 상태를 공유해야 한다면? => 부모 컴포넌트
      자식 컴포넌트 상태가, 부모 컴포넌트에도 필요하다면? => 부모 컴포넌트
      상태가 자식 컴포넌트 내부에서만 쓰인다면? => 자식 컴포넌트
  */


  let[state1, setState1] = useState("State 문자열");    
  let[state2, setState2] = useState(100);
  let[state3, setState3] = useState([1,2,3,4,5]);
  let[state4, setState4] = useState({name : "배재현", age : 10, addr : "경기 부천"});
  let[state5, setState5] = useState([
    {name : "유저1", age : 10, addr : "경기 부천"},
    {name : "유저2", age : 20, addr : "경기 화성"},
    {name : "유저3", age : 30, addr : "경기 남양주"},
    {name : "유저4", age : 40, addr : "경기 의정부"},
    {name : "유저5", age : 50, addr : "경기 수원"}
  ])

  return (
    <>
      {/* 외부 파일에서 작성한 컴포넌트가 반환하는 JSX를 현재 위치에 포함 */}
      <UseComponent1 />   
      {/* 컴포넌트는 재사용 가능한 단위! 여러번 사용할 수 있음 */}
      <UseComponent1 />
      {/* 현재 파일안에서 정의된 컴포넌트 사용. import는 작성 X */}   
      <UseComponent2 />
      <UseComponent3 />

      {/* 자식 컴포넌트에, state 변수 전달하기 */}
      <UseComponent5 a={state1} b={state2} />
      <UseComponent6 stateArr={state3} />
      <UseComponent7 stateObj={state4} />


      <table border="1">
        <thead>
          <tr>
            <th>이름</th>
            <th>나이</th>
            <th>주소</th>
          </tr>
        </thead>
        <tbody>
          {state5.map(function(user, index){
            //state5는 회원 객체 배열.
            //회원 객체당 tr 태그 1개를 생성해야 하는데, 이를 UseComponent8이 담당
            //UseComponent가 tr 내부에 회원 정보를 작성할 때 user가 필요하므로 전달
            return <UseComponent8 key={"user"+index} user={user} />
          })}
        </tbody>
      </table>


      {/* 자식 컴포넌트에, state 변수와 자식 컴포넌트에서 값 변경 시, 호출할 함수 전달 */}
      <UseComponent9 state1={state1} state2={state2} setState1={setState1} setState2={setState2} />
      <UseComponent10 stateArr={state3} setState3={setState3} />

    </>
  )
}

function UseComponent2(){
  return (
    <div>
      <h1>App.jsx의 UseComponent2</h1>
    </div>
  )
}

function UseComponent3(){
  return (
    <div>
      <h1>App.jsx의 UseComponent3</h1>
    </div>
  )
}

function UseComponent5(props){
  //부모 컴포넌트가 전달한 데이터 추출 시, key는 속성명으로!!
  const a = props.a;
  const b = props.b;
  return (
    <>
      부모가 전달한 a : {a} <br/>
      부모가 전달한 b : {b} <br/>    
    </>
  )
}

function UseComponent6(props){
  const stateArr = props.stateArr;

  return (
    <ul>
      {stateArr.map(function(num, index){
        return <li key={"num"+index}>
                  {num}
               </li>
      })}
    </ul>
  )
}

function UseComponent7(props){
  let stateObj = props.stateObj;

  return (
    <>
      <table border="1">
        <thead>
          <tr>
            <th>이름</th>
            <th>나이</th>
            <th>주소</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{stateObj.name}</td>
            <td>{stateObj.age}</td>
            <td>{stateObj.addr}</td>            
          </tr>
        </tbody>
      </table>  
    </>
  )
}

function UseComponent8(props){
  let user = props.user;

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.age}</td>
      <td>{user.addr}</td>
    </tr>
  )
}

function UseComponent9(props){
  let state1 = props.state1;  // 부모 컴포넌트에서 정의한 State 변수
  let state2 = props.state2;  // 부모 컴포넌트에서 정의한 State 변수
  let setState1 = props.setState1;  // 부모 컴포넌트에서 정의한 State 변수 변경 호출 함수
  let setState2 = props.setState2;  // 부모 컴포넌트에서 정의한 State 변수 변경 호출 함수

  function updState1(){
    setState1("변경");
  }

  return(
    <div>
      <h3>state1 : {state1} <button onClick={updState1}>state1 변경하기</button></h3>
      <h3>state2 : {state2} <button onClick={function(){
        setState2(222);
      }}>state2 변경하기</button></h3>
    </div>
  )
}

function UseComponent10(props){
  let stateArr = props.stateArr; //상위 컴포넌트에서 전달 받은 state 변수
  let setState3 = props.setState3; //상위 컴포넌트에서 전달 받은 변경 호출 함수

  //아래 배열에 추가할 값을 입력할 input과 연결
  let [stateVal, setStateVal] = useState('');
  function updStateVal(e){
    setStateVal(e.target.value);
  }

  //배열에 값 추가 버튼 클릭 시, 동작 함수  
  function addArr(){
    let newArr = [...stateArr,stateVal]; //새 배열 만들며, 입력한 값 요소로 추가
    setState3(newArr);                    //새 배열 setter에 전달하며 부모에서 선언된 state 변수 변경 처리
    setStateVal('');                      //입력값 초기화
  }

  return (
    <>
      <h3>{stateArr}</h3>
      <input type='text' value={stateVal} onChange={updStateVal} />
      <button onClick={addArr}>배열에 값 추가</button>
    </>
  )
}

export default App

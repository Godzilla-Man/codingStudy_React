import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

/*
# React
- 페이스북에서 만든 사용자 인터페이스 자바스크립트 기반의 라이브러리. (새로운 언어를 배우는 것이 아님!!)
  리액트를 사용하면 UI를 더 쉽고 효율적으로 개발할 수 있음.
- 페이스북에서 내부적으로 사용하다가 2013년 오픈 라이브러리 소스로 공개함.
- SPA(Single Page Application) : 하나의 페이지(index.html 왼쪽 메뉴에 나와있는) 내부에서 컨텐츠 영역만 변경되는 프로그램.
- 내부 컨텐츠 영역을 컴포넌트라는 재사용이 가능한 단위로 나누어 관리.

# SSR vs CSR (*중요!!)
- SSR(Server Side Rendering)
  EX) 클라이언트가 페이지를 요청하면, 서버는 적절한 html 또는 jsp를 데이터 처리하고 생성하여 응답한다.
- CSR(Client Side Rendering)
  EX) 서버는 단순히 jsx, html, css 등과 같은 파일이 배포되는 공간의 역할만하며, 클라이언트 요청 시 정적 파일을 '제공'만 함.
      |응답 받은 jsx 파일을 Babel 컴파일러가 실행하는 구조. 

# JSX(Javascript Xml)
- 기존 JavaScript를 확장한 문법. 자바스크립트 코드를 HTML과 비슷한 방식으로 작성할 수 있는 문법.
- JSX를 실행 시, 브라우저는 JSX 문법을 기본적으로 이해하지 못하므로, Babel 컴파일러가 Javascript 문법으로 변환해서 화면에 그려질 HTML 코드를 생성.
- 리액트에서는 영역을 크게 JS영역과, JSX 영역으로 분리할 수 있음.
  function App(){ // 펑션 또는 메소드라고 하는데 여기서는 '컴포넌트'라고 함.
    //JS 영역(렌더링 되기 전에 수행)
      - 변수, 이벤트 핸들러, 로직 처리 등
    
    //JSX 영역
      - 화면에 그려질 JSX를 반환
    return (
    
    )

  }

** 리액트에서는 map 배열을 자주 사용함. (map과 filter의 배열 차이는???)
# JSX 문법 작성 규칙
  - 단 하나의 루트 태그만이 존재할 수 있음. <div></div><span></span> 와 같은 형식은 안됨
  - JSX 문법 내부에서, 자바스크립트 표현식(값을 반환하는)을 사용 시, 중괄호 내부에 작성한다. {}
  - IF, FOR 문법은 표현식이 아니기 떄문에, JSX 내부 중괄호 {} 에서 사용할 수 없다. 
  - 컴포넌트 JS 영역에서, JSX 문법을 변수에 저장할 수 있음.
  - 기존에 HTML에서 종료 태그 없는 태그들도 모두 종료 태그를 작성하거나, 시작 태그 마지막에 슬래시를 작성하여야 한다.(input, br, hr등)
  - 기존 HTML 태그 속성명 => JSX 문법에서 작성 시 속성명
    class => className
    for => htmlFor
    태그 속성명, CSS스타일 속성명은 대부분 카멜 표기법으로 작성. colspan => colSpan, onclick => onClick, readonly => readOnly
    이벤트 핸들러 등록 방법
    onclick="test()" => onClick={test}
    스타일 지정 방법
    style="color:red; font-size:16px;" => style={{color:'red', fontSize:'16px'}};
*/

function App() {
  //JSX 문법 - 1. 단 하나의 루트 태그만이 존재할 수 있음.
  let jsx1 = <div>jsx1 123123123123
                  <div></div> {/* JSX 영역 안에서, JS 주석 작성 */}
             </div>;
  
  //JSX 문법 - 2. JSX 문법 내부에서 자바스크립트 표현식 사용 시, 중괄호로 작성
  let hobby = '축구';
  //let jsx2 = <span>hobby</span>; //"hobby"라는 텍스트만 보여짐
  let jsx2 = <span>{hobby}</span>; //"축구"라는 hobby 변수 값이 보여짐
  
  //JSX 문법 - 3. JSX문법 내부에서 if, for 문법은 사용이 불가.
  /* let jsx3 = <span>
    {
      if(hobby == '축구'){
        
      }else{

      }
    }
  </span>
  */

  {/*
    삼항 연산자 표현식

    조건식 ? 조건식의 결과가 true일 떄 반환값 : 조건식의 결과가 false일때 반환값  <-- 삼항연산자 = true아니면 false 
    */}
  let jsx3 = <span>
             {
              hobby == '축구' ? '취미는 축구입니다.' : '취미는 축구가 아닙니다'
             }
             </span>
  
  //JSX 문법 - 4. 기존 종료 태그 없는 태그들 모두 종료 태그 작성 또는 시작 태그 마지막에 슬래시를 작성한다.
  let jsx4 = <input type='text' name='memberId' />;

  //JSX 문법 - 5. 기본 HTML 속성명 => JSX 속성명
  let jsx5 = <label htmlFor='tagId' className='test-class'>라벨</label>;

  //JSX 문법 - 6. 이벤트 핸들러() 등록
  function testHandle(){
    console.log('testHandle 동작');
  }
  let jsx6 = <button onClick={testHandle}>버튼</button>;

  //JSX 문법 - 7. 스타일 지정(자바스크립트 객체에 스타일을 정의하여 지정)
  let testStyle1 = {color : 'red', fontSize : '16px'};
  let jsx7 = <div style={testStyle1}>스타일 지정 Div</div>;

  let jsx8 = <div style={{color : 'red', fontSize : '16px'}}>스타일 지정 Div</div>;

  //JSX 문법
  let jsx9 = <div>
                <button className = 'btn-class' onClick={testHandle}>버튼</button>
                <div style={{backgroundColor : 'pink'}}>DIV</div>
                <input type='text' name='memberName' id='mebmerName'/> <br/>
                <label htmlFor='memberName'>라벨</label>
             </div>;


  //화면에 렌더링 될 값을 저장하고 있는 변수
  let resData = "기존 값";

  //JS 방식의 값 변경
  function restDataUpdate1(){
    //console.log('restDataUpdate1 동작');

    resData = "값 변경";
 
    let spanEl = document.getElementById("resData");
    spanEl.innerText = resData;
  }

  /*
  ** 아래 함수세트를 작성하는 이유는??? 1만개의 똑같은 반복적인 변수를 변경해야 하는 경우에..
  React Hook (함수 세트)
    - 함수들은 use라는 키워드로 시작함. useState, useContext, useReducer 등등..
    - Hook을 정의하는 소스 코드는 컴포넌트(App) 내부의, 제일 바깥에 작성해야 한다.

  useState
    - React Hook 중, 하나이며 이 기술을 사용하면 컴포넌트 내부 상태를 관리할 수 있다
    - state 변수로 관리할 데이터는 동적인 데이터(값이 변경되는)  

    [표현식]

    let [변수명, state 변수 변경 시 호출할 함수명] = useState(초기값);
  */
  let [stateVar, setStateVar] = useState('state 변수 초기값');
  function stateUpdate1(){
    setStateVar("state 변수 값을 변경했습니다.");
  }

  //배열
  let [stateArr, setStateArr] = useState([1,2,3,4,5]);

  function updateArrFunc(){
    stateArr[2] = 300; //3 => 300 배열에 들어가 있는 3을 300으로 바꿈
    
    setStateArr(stateArr); //변경 함수 매개변수로 배열 전달.
    //setStateArr 함수의 매개변수로 전달한 배열의 주소값은 초기에 정의한 배열의 주소값과 동일하여, state 변수가 변경되었다는 것을 인지하지 못함.
    //즉, 화면에 표기되는 배열 요소값은 초기값인 3이 그대로 보여짐.
  }

  //직접 복사
  function updateArrFunc1(){
    let newArr = new Array(); //새 배열
    for(let i=0; i<stateArr.length; i++){
      newArr[i] = stateArr[i];
    }

    newArr[2] = 300;    
    setStateArr(newArr); //새 주소를 가지고 있는 배열을 전달함으로써, 컴포넌트의 렌더링이 다시 일어남.
  }

  //전개 연산자를 통한 깊은 복사
  function updateArrFunc2(){
    let newArr = [...stateArr]; //배열의 깊은 복사
    newArr[3] = 8;
    setStateArr(newArr);
  } 

  //전개 연산자를 통한 깊은 복사 - 값 추가 - 1
  function updateArrFunc3(){
    let newArr = [...stateArr]; // '...' 전개 연산자를 뜻함.
    newArr.push(9);
    setStateArr(newArr);
  }

  //전개 연산자를 통한 깊은 복사 - 값 추가 - 2
  function updateArrFunc4(){
    let newArr = [...stateArr, 10, 11];
    setStateArr(newArr);    
  }

  //객체
  let [userObj, setUserObj] = useState({name:"배재현", age:10, addr:"부천"});

  function updateObjFunc(){
    userObj.addr = "경기도 부천시 오정구";
    setUserObj(userObj); //배열과 마찬가지로, 동일한 주소값을 가지고 있기 때문에 객체가 변경되었다고 인식하지 못하므로 렌더링이 다시 일어나지 않음
                         //화면에는 여전히 "부천"이라는 문자열이 출력됨
  }

  function updateObjFunc1(){
    let newObj = {...userObj};
    newObj.addr = "경기도 부천시 오정구";
    setUserObj(newObj);
  }

  function updateObjFunc2(){
    let newObj = {...userObj, name : "카리나", hobby : "필리피노"};
    setUserObj(newObj);
  }

  return (
    <div>
        <h1>JS에서 선언한 변수 화면에 보여주기 위한 데이터 바인딩</h1>

        <hr/>

        jsx1 : {jsx1} <br/>
        jsx2 : {jsx2} <br/>
        jsx3 : {jsx3} <br/>
        jsx4 : {jsx4} <br/>
        jsx5 : {jsx5} <br/>
        jsx6 : {jsx6} <br/>
        jsx7 : {jsx7} <br/>
        jsx8 : {jsx8} <br/>
        jsx9 : {jsx9} <br/>

        <hr/>

        <h1>기존 데이터 변경</h1>

        <h3>기존 JS 방식의 값 변경</h3>
        resData : <span id="resData">{resData}</span> <br/>
        <button onClick={restDataUpdate1}>값 변경</button>

        <h3>State 방식의 값 변경</h3>
        stateVar : {stateVar} <br/>
        <button onClick={stateUpdate1}>State 값 변경 버튼</button>

        <hr/>

        <h1>배열 state</h1>

        stateArr :  
        <ul>
          {stateArr.map(function(item, index){
            return <li key={"li" + index}>{item}</li> 
          })}
        </ul>

        <br/>

        <button onClick={updateArrFunc}>배열 변경 버튼</button>
        <button onClick={updateArrFunc1}>배열 변경 버튼1</button>
        <button onClick={updateArrFunc2}>배열 변경 버튼2</button>
        <button onClick={updateArrFunc3}>배열 변경 버튼3</button>
        <button onClick={updateArrFunc4}>배열 변경 버튼4</button>        

        <hr/>

        <h1>객체 state</h1> 

        <ul>
          <li>이름 : {userObj.name}</li>
          <li>나이 : {userObj.age}</li>
          <li>주소 : {userObj.addr}</li>
          <li>취미 : {userObj.hobby}</li>
        </ul>

        <br/>

        <button onClick={updateObjFunc}>객체 변경 버튼</button>
        <button onClick={updateObjFunc1}>객체 변경 버튼 1</button>
        <button onClick={updateObjFunc2}>객체 변경 버튼 2</button>
    </div>    
  )
}

export default App

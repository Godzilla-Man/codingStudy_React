import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //기존 회원 리스트
  let [userList, setUserList] = useState([
    {name : "정휘훈", age : 10, addr : "서울 노원구"},
    {name : "홍용기", age : 29, addr : "경기 부천시"},
    {name : "정다은", age : 27, addr : "부산 연수구"},
    {name : "임지헌", age : 65, addr : "경기 용인시"},
    {name : "교회오빠", age : 17, addr : "서울 강남구"}
  ]);

  //회원 정보 등록 - JS 방식
  function regUser1(){
    //사용자가 input에 입력한 값 가져오기
    let nameInput = document.getElementById('name'); //요소 객체
    let ageInput = document.getElementById('age');
    let addrInput = document.getElementById('addr');

    let nameVal = nameInput.value; //입력한 값
    let ageVal = ageInput.value;
    let addrVal = addrInput.value;

    let tdEl1 = document.createElement('td');           // <td><td>
    let tdTxtNode1 = document.createTextNode(nameVal);  // 사용자가 입력한 이름 값
    tdEl1.appendChild(tdTxtNode1);                      // <td>사용자가 입력한 이름 값</td>

    let tdEl2 = document.createElement('td');
    let tdTxtNode2 = document.createTextNode(ageVal);
    tdEl2.appendChild(tdTxtNode2);

    let tdEl3 = document.createElement('td');
    let tdTxtNode3 = document.createTextNode(addrVal);
    tdEl3.appendChild(tdTxtNode3);

    let tdEl4 = document.createElement('td');

    let gbTxt = '';
    if(ageVal <= 13){
      gbTxt = '잼민이';
    }else if(ageVal <= 20){
      gbTxt = '학생';
    }else if(ageVal <= 40){
      gbTxt = '청년';
    }else if(ageVal <= 60){
      gbTxt = '중년';
    }else {
      gbTxt = '노인';
    }

    let tdTxtNode4 = document.createTextNode(gbTxt);
    tdEl4.appendChild(tdTxtNode4);

    let trEl = document.createElement('tr');
    trEl.appendChild(tdEl1);
    trEl.appendChild(tdEl2);
    trEl.appendChild(tdEl3);
    trEl.appendChild(tdEl4);

    let tbody = document.getElementsByTagName('tbody')[0];
    tbody.appendChild(trEl);
    
  }

  //회원 정보 등록 - React State - 1
  function regUser2(){
    let nameInput = document.getElementById('name');
    let ageInput = document.getElementById('age');
    let addrInput = document.getElementById('addr');

    let nameVal = nameInput.value;
    let ageVal = ageInput.value;
    let addrVal = addrInput.value;

    let newUser = {name : nameVal, age : ageVal, addr : addrVal}; //userList State 변수에 추가할 회원 객체
    let newUserList = [...userList]; //기존 배열 깊은 복사하여 새 배열 생성
    newUserList.push(newUser); //마지막 요소로 회원 객체 추가

    setUserList(newUserList); //새 배열 전달하여, 컴포넌트 재랜더링이 일어남.
  }

  function regUser3(){
    let nameInput = document.getElementById('name');
    let ageInput = document.getElementById('age');
    let addrInput = document.getElementById('addr');

    let nameVal = nameInput.value;
    let ageVal = ageInput.value;
    let addrVal = addrInput.value;

    /*
    let newUser = {name : nameVal, age : ageVal, addr : addrVal};
    let newUserList = [...userList, newUser]; //깊은 복사하며, 새 요소 추가
    setUserList(newUserList);
    */
    
    setUserList([...userList, {name : nameVal, age : ageVal, addr : addrVal}]);
  }

  let[name, setName] = useState("");
  function updName(e){ //이름 input에 입력값 변화가 일어날 때 호출 함수
    let nameVal = e.target.value; 
    setName(nameVal);
  }

  let[age, setAge] = useState(10);
  function updAge(e){
    let ageVal = e.target.value;
    setAge(ageVal);
  }

  let[addr, setAddr] = useState("");
  function updAddr(e){
    let addrVal = e.target.value;
    setAddr(addrVal);
  }
  

  //회원 정보 등록 - React State - 3
  function regUser4(){
    let newUser = {name : name, age : age, addr : addr};
    let newUserList = [...userList, newUser];
    setUserList(newUserList);
  }
c

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>이름</th>
            <th>나이</th>
            <th>주소</th>
            <th>분류</th>
            <th>삭제(splice)</th>
            <th>삭제(filter)</th>
          </tr>
        </thead>
        <tbody>

          {userList.map(function(user, index){
            
            //배열 각 요소마다 적용되는 함수
            
            //splice를 이용한 회원 삭제
            function delUser(){
              /*
              splice : 원본에 영향을 미치는 함수
              
              배열에서 수정 : 배열.splice(수정하고 싶은 인덱스 번호, 1, 수정할 데이터)
              배열에서 추가 : 배열.splice(추가하고 싶은 인덱스 번호, 0, 추가할 데이터)
              배열에서 삭제 : 배열.splice(삭제하고 싶은 인덱스 번호, 1)
              */
              
              //console.log(index);
              userList.splice(index, 1);
              setUserList([...userList]);
            }

            function delUser1(){
              let newUserList = userList.filter(function(fUser, fIndex){
                return user != fUser; 
              });

              setUserList(newUserList);
            }


            return <tr key={"user"+index}>
                     <td>{user.name}</td>
                     <td>{user.age}</td>
                     <td>{user.addr}</td>                     
                     <td>
                       {user.age <= 13 ? "잼민이" : 
                        user.age <= 20 ? "학생" :
                        user.age <= 40 ? "청년" :
                        user.age <= 60 ? "중년" :
                        "노인"
                       }
                     </td>
                     <td>
                       <button onClick={delUser}>삭제(splice)</button>
                    </td> 
                    <td>
                       <button onClick={delUser1}>삭제(filter)</button>
                     </td>
                   </tr>
          })}

        </tbody>
      </table>

      <hr/>

      <div className='reg-wrap'>

          <div>
            <label htmlFor='name'>이름</label>
            <input type='text' id='name' name='name' value={name} onChange={updName}/>
          </div>
           
          <div>
            <label htmlFor='age'>나이</label>
            <input type='text' id='age' name='age' value={age} onChange={updAge}/>
          </div>
           
          <div>
            <label htmlFor='addr'>주소</label>
            <input type='text' id='addr' name='addr' value={addr} onChange={updAddr}/>
          </div>

          <div>
            <button onClick={regUser1}>회원 정보 등록 1</button>
            <button onClick={regUser2}>회원 정보 등록 2</button>
            <button onClick={regUser3}>회원 정보 등록 3</button>
            <button onClick={regUser4}>회원 정보 등록 4</button>
          </div>

      </div>
    </div>  
  )
}

export default App

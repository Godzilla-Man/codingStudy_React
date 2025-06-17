import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './todo.css'

function App() {
  
  //사용자 입력값을 저장할 state 변수 선언
  let [text, setText] = useState('');
  function updText(e){
    let todoText = e.target.value;
    setText(todoText)
  }

  //기존 할일 리스트
  /*
    isLike : 좋아요 여부(true는 좋아요, false는 좋아요 취소)
    todoContent : 할일 명칭
    regDate : 등록일자
    isDone : 할일 완료 여부(true면 완료, false면 미완료)
    
  */
  let[todoList, setTodoList] = useState([
    {isLike : false, todoContent : "강아지 밥 주기",                 regDate : "2025-04-20", isDone : true},
    {isLike : true, todoContent : "강아지 씻겨주기",                  regDate : "2025-05-15", isDone : false},
    {isLike : true, todoContent : "가까운 거리로 이사해서 성격 고치기",  regDate : "2025-03-20", isDone : true},
    {isLike : false, todoContent : "영양제 먹기",                     regDate : "2025-06-02", isDone : true},
    {isLike : true, todoContent : "종강하기",                         regDate : "2025-06-01", isDone : false}
  ]);

  //할일 등록
  function insertTodo(){
    let isLike = false;   //좋아요 여부(기본값은 false)
    let todoContent = text;   //사용자 입력값 변화를 저장하고 있는 state 변수
    let isDone = false;   //할일 완료 여부

    let today = new Date();   //Date 내장 객체 생성
    let year = String(today.getFullYear());   //년도

    let monthStr = String(today.getMonth()+1);
    let month = monthStr.length < 2 ? "0" + monthStr : monthStr; //모든 월 두 자리로 만들어주기

    let dayStr = String(today.getDate());
    let day = dayStr.length < 2 ? "0" + dayStr : dayStr;

    let regDate = year + "-" + month + "-" + day;

    let todo = {isLike, todoContent, regDate, isDone}; //할일 객체
    let newTodoList = [...todoList, todo];    //할일이 추가된 새 배열
    setTodoList(newTodoList);   //state 변수 변경하여, 재랜더링

    //새 배열(사용자가 입력한 할일 정보를 가지고 있는 객체가 추가되어 있는 상태)
    //setTodoList(새 배열)
    setText(''); //입력값 초기화(이거를 안하면 기존에 입력했었던 값이 남아있음.)
  }

  //할일 삭제 처리
  function delDone(index){ //매개 변수 == 삭제 대상 객체의 인덱스 번호
    //todoList.splice(index, 1); *스플라이스를 이용한 삭제 방식
    //setTodoList([...todoList]);

    //새 배열 == 삭제 대상 객체를 제외한 요소들로 구성된 배열
    let newTodoList = todoList.filter(function(todo, idx){
      return index != idx;
    });

    setTodoList(newTodoList);
  }

  return (
    <div className='todo-wrap'>
      <div className='todo-header'>
        <h1>Todo List</h1>
      </div>
      <div className='todo-content'>
        <div className='input-box'>
          <input type='text' name='todo-text' value={text} onChange={updText} />
          <button onClick={insertTodo}>등록</button>
        </div>
        {todoList.map(function(todo, index){

          /*
          function like1(){ //좋아요 -> 좋아요 취소
            todoList[index].isLike = false;
            setTodoList([...todoList]);
          }
          function like2(){ //좋아요 취소 -> 좋아요
            todoList[index].isLike = true;
            setTodoList([...todoList]);
          }
          */

          //좋아요 버튼 하트 채우기 처리
          function like(){
            //기존값 반전시켜 재할당 (false -> true, true -> false)
            todoList[index].isLike =! todoList[index].isLike;
            setTodoList([...todoList]);
          }

          //할일 완료 처리(체크 버튼 클릭 시, 동작 함수)
          function chkDone(){
            todoList[index].isDone = true;
            setTodoList([...todoList]);
          }

          return <ul key={"todo" + index} className='todo'>
                    <li className='todo-like'>
                      {todo.isLike ? <span onClick={like}>💚</span> : <span onClick={like}>🤍</span>}
                    </li>
                    <li className={todo.isDone ? 'todo-text todo-done' : 'todo-text'}>{todo.todoContent}</li>
                    <li className='todo-Date'>{todo.regDate}</li>
                    <li calssName='todo-btn'>
                      <span className='delete' onClick={function(e){delDone(index);
                      }}>❌</span>
                      {todo.isDone ? '' : <span className='done' onClick={chkDone}>✅</span>}                      
                    </li>
                 </ul>
        })}
      </div>
    </div>  
  )
}

export default App

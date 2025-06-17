import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './todo.css'

function App() {

  let[todoList, setTodoList] = useState([
      {isLike : false, todoContent : "강아지 밥 주기",                 regDate : "2025-04-20", isDone : true},
      {isLike : true, todoContent : "강아지 씻겨주기",                  regDate : "2025-05-15", isDone : false},
      {isLike : true, todoContent : "가까운 거리로 이사",  regDate : "2025-03-20", isDone : true},
      {isLike : false, todoContent : "영양제 먹기",                     regDate : "2025-06-02", isDone : true},
      {isLike : true, todoContent : "종강하기",                         regDate : "2025-06-01", isDone : false}
  ]);

  //사용자 입력값을 저장할 state 변수 선언
  let [text, setText] = useState('');
  function updText(e){
    let todoText = e.target.value;
    setText(todoText)
  }

  //할일 등록
  function insertTodo(){
    let isLike = false; //좋아요 여부(기본값 false)
    let todoContent = text; //사용자 입력값 변화를 저장하고 있는 state 변수
    let isDone = false; //할일 완료 여부
    
    let today = new Date(); //Date 내장 객체 생성    
    let year = String(today.getFullYear()); //년도  

    let monthStr = String(today.getMonth()+1);
    let month = monthStr.length < 2 ? "0" + monthStr : monthStr; //모든 월 두 자리로 만들어주기

    let dayStr = String(today.getDate());    
    let day = d

  }
  
  

  return (
    <div className='todo-wrap'>

      <div className='todo-header'>
        <h1>To-Do List</h1>
      </div>

      <div className='todo-content'>
        
        <div className='input-box'>
          <input type='text' name='todo-text' />
          <button>등록</button>          
        </div>      

        {/* 맵 배열을 통해 초기값 불러오기 */}
        {todoList.map(function(todo, index){
          
          //좋아요 버튼 하트 채우기
          function like(){
            todoList[index].isLike =! todoList[index].isLike;
            setTodoList([...todoList]);
          }

          //할일 완료 처리(체크 버튼 클릭 시, 동작 함수)
          function chkDone(){
            console.log([index]);
            todoList[index].isDone = true;
            setTodoList([...todoList]);
          }

          return <ul key={"todo" + index} className='todo'>
                    
                    <li className='todo-like'>
                      {todo.isLike ? <span onClick={like}>💛</span> : <span onClick={like}>🤍</span>}
                    </li>

                    <li className={todo.isDone ? 'todo-text todo-done' : 'todo-text'}>
                      {todo.todoContent}
                    </li>

                    <li className='todo-Date'>
                      {todo.regDate}
                    </li>

                    <li className='todo-btn'>
                      <span className='delete'>삭제 </span>

                      {todo.isDone ? '✅' : <span className='done' onClick={chkDone}>🟩</span>}                      
                    </li>

                 </ul>
        })}

      </div>
    </div>
        
  )
}

export default App

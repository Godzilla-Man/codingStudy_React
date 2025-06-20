import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinMember(){

    //회원 정보 상태를 관리할 state 변수    
    const [member, setMember] = useState({
        memberId : "",
        memberName : "",
        memberPhone : "",
        memberIntro : ""        
    });

        
    const navigate = useNavigate();

    //가입하기 버튼 클릭 시, 동작 함수
    function joinMember(){
        let options = {};
        options.url = "http://localhost:9999/member";
        options.method = 'post';
        options.data = member;
        
        axios(options)
        .then(function(res){
            if(res.data.resData){ //true일 때
                //전체 회원 조회 컴포넌트(AllMember)로 전환
                navigate('/allMember'); //전환하고자 하는 컴포넌트를 Route로 등록했을 때 path값
            }
        })
        .catch(function(err){
            console.log(err);
        });
    }

    //사용자 입력값 State 변수에 적용하기 위한 onChange 속성에 작성된 함수
    function joinVal(e){
        //e.target.id : meberId or meberName or memberPhone or memberIntro
        member[e.target.id] = e.target.value;
        setMember({...member});
    }

    return(
        <>
            <h1>회원 정보 등록</h1>

            <hr/>

            <div>
                <div>
                    <table border={1}>
                        <tbody>
                            <tr>
                                <th>아이디</th>
                                <td>
                                    <input type='text' id='memberId' value={member.memberId} onChange={joinVal} />
                                </td>
                            </tr>
                            <tr>
                                <th>이름</th>
                                <td>
                                    <input type='text' id='memberName' value={member.memberName} onChange={joinVal} />
                                </td>
                            </tr>
                            <tr>
                                <th>전화번호</th>
                                <td>
                                    <input type='text' id='memberPhone' value={member.memberPhone} onChange={joinVal} />
                                </td>
                            </tr>
                            <tr>
                                <th>회원소개</th>
                                <td>
                                    <input type='text' id='memberIntro' value={member.memberIntro} onChange={joinVal} />
                                </td>
                            </tr>                            
                        </tbody>
                    </table>

                    <div>
                        <button onClick={joinMember}>가입하기</button>
                    </div>

                </div>
            </div>
        </>
    )
    
}
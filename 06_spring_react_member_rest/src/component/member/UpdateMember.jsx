import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

import axios from "axios";

/*
  서버에 회원 1명 정보를 조회 요청하고, 
  수정 정보를 입력받아 서버에 수정 요청.
*/
export default function UpdateMember(){

    const params = useParams();
    const memberId = params.memberId;
    

    //서버에서 조회한 회원 정보 저장 State 변수
    const [member, setMember] = useState({
        memberId : "",
        memberName : "",
        memberPhone : "",
        memberIntro : "",
        enrollDate : ""
    });


    //첫 렌더링 이후, 실행
    useEffect(function(){
        let options = {};
        options.url = "http://localhost:9999/member/" + memberId;
        options.method = 'get';

        axios(options)
        .then(function(res){
            //일치하는 회원이 존재할 때
            if(res.data.resData != null){
                setMember(res.data.resData);
            }
        })
        .catch(function(err){
            console.log(err);
        });

    }, []);


    //각 입력 값 변경 시 호출 함수
    function chgVal(e){        
        member[e.target.id] = e.target.value;
        setMember({...member});
    }

    const navigate = useNavigate();

    //수정하기 버튼 클릭 시, 동작 함수
    function updateMember(){
        let options = {};
        options.url = "http://localhost:9999/member";
        options.method = 'patch';
        options.data = member;

        axios(options)
        .then(function(res){
            //등록, 수정, 삭제 결과에 따라 reseData에는 true 또는 false

            if(res.data.resData){
                navigate('/allMember');
            }
        })
        .catch(function(err){
            console.log(err);
        });
    }

    return(
        <>
            <h1>회원 정보 수정</h1>

            <hr/>

            <div>
                <div>
                    <table border={1}>
                        <tbody>
                            <tr>
                                <th>아이디</th>
                                <td>{member.memberId}</td>                                
                            </tr>
                            <tr>
                                <th>이름</th>
                                <td>
                                    <input type='text' id='memberName' value={member.memberName} onChange={chgVal} />
                                </td>
                            </tr>
                            <tr>
                                <th>전화번호</th>
                                <td>{member.memberPhone}</td>
                            </tr>
                            <tr>
                                <th>소개</th>
                                <td>
                                    <input type='text' id='memberIntro' value={member.memberIntro} onChange={chgVal} />
                                </td>
                            </tr>
                            <tr>
                                <th>가입일</th>
                                <td>{member.enrollDate}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div>
                        <button onClick={updateMember}>수정하기</button>
                    </div>
                </div>
            </div>
        </>
    )
}
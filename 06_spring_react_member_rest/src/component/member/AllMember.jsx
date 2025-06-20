import { useEffect, useState } from "react"

//서버에 HTTP 비동기 요청을 보내기 위한 라이브러리
import axios from 'axios';
import { Link } from "react-router-dom";

export default function AllMember() {

    //회원 목록을 저장할 state 변수
    const [memberList, setMemberList] = useState([]);

    //서버에 회원 목록 요청
    useEffect(function(){
        let options = {};
        options.url = 'http://localhost:9999/member';
        options.method = 'get';

        axios(options)
        .then(function(res){
            //res.data == 서버에서 응답한 ResponseDTO
            //res.data.resData == 전체 회원 목록
            setMemberList(res.data.resData);
        })
        .catch(function(err){
            console.log(err);
        })

    }, []);

    return (
        <div>
            <h2>전체 회원 조회</h2>

            <hr/>
            
            <table border={1}>
                <thead>
                    <tr>
                        <th>아이디</th>
                        <th>이름</th>
                        <th>전화번호</th>
                        <th>소개</th>
                        <th>가입일</th>
                        <th>삭제</th>
                        <th>수정</th>
                    </tr>
                </thead>
                <tbody>
                    {memberList.map(function(member, index){
                        return <Member key={"member"+index} member={member} memberList={memberList} setMemberList={setMemberList} />
                    })}
                </tbody>
            </table>
        </div>
    )
}

//memberList의 객체 정보를 가지고, 하나의 tr 리턴
function Member(props){
    const member = props.member; //부모 컴포넌트가 전달한 객체 추출

    //화면에서 삭제를 위한 state 변수와 변경 호출 함수
    const memberList = props.memberList;
    const setMemberList = props.setMemberList;

    //삭제 버튼 클릭 시, 동작 함수
    function deleteMember(){
        let options = {};
        options.url = "http://localhost:9999/member/"+member.memberId;        
        options.method = 'delete';

        axios(options)
        .then(function(res){
            
            //정상 삭제 되었을 때 화면에 반영
            if(res.data.resData){
                let newMemberList = memberList.filter(function(fMember, fIndex){
                    return member != fMember;
                });

                setMemberList(newMemberList);
            }
        })
        .catch(function(err){
            console.log(err);
        });
    }
    

    return(
        <tr>
            <td>{member.memberId}</td>
            <td>{member.memberName}</td>
            <td>{member.memberPhone}</td>
            <td>{member.memberIntro}</td>
            <td>{member.enrollDate}</td>   
            <td><button onClick={deleteMember}>삭제</button></td>
            <td>
                <Link to={'/updMember/'+member.memberId}>수정</Link>
            </td>
        </tr>
    )

}
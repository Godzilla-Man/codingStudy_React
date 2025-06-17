
//css 파일 적용을 위한 import
import "./common.css";

//라우터로 등록한 컴포넌트로 전환하기 위한 Link import
import {Link} from "react-router-dom";

export default function Header(){

    return (
        <header className="header">
            <div>
                <div className="logo">
                    <a href="#">KH-I-Class</a>
                </div>
                <ul className="nav">
                    <li>
                        {/* 클릭 시, to 속성에 작성된 URL과 매핑되는 컴포넌트로 전환이 이루어짐 */}
                        {/* Link태그는 a 태그로 인식하여 CSS 에서 a태그로 작성 */}
                        <Link to="/notice/list">게시판</Link> 
                    </li>
                    <li>
                        <a href="#">메뉴1</a>
                    </li>
                    <li>
                        <a href="#">메뉴2</a>
                    </li>
                    <li>
                        <a href="#">메뉴3</a>
                    </li>
                </ul>
            </div>
        </header>
    )
}
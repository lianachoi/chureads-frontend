import React, { useState } from 'react'
/**사용자의 이름입력 -> 인사 문구와 함께 메시지 보여줌 */
const Greeting = ({name = "??", onButtonClick}) => {
    // logic
    // let userName = "sunyoung";
    // [변수, 함수]
    // const [userName, setUserName] = useState(name);

    const handleClick = () => {
        // userName = userName.toUpperCase();
        // console.log("🚀 ~ handleClick ~ userName:", userName);
        // setUserName(userName.toUpperCase());
        onButtonClick(name)
    };

    // view
  return (
    <>
    <div>
        <p>
        {name}님! 반갑습니다.
        </p>
        <button type="button" onClick={handleClick}> 대문자로 수정 </button>
    </div>
    </>
  )
}

export default Greeting
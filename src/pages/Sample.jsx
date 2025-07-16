import React, { useEffect, useState } from 'react'
import Greeting from '../components/sample/Greeting'


const Sample = () => {
    //logic
    const handleButtonClick = (data) =>{
        console.log(data,"button click!")
    }

    const [userNames, setUserNames] = useState([]);

    useEffect(()=>{
        //컴포넌트 생성시 한번만 실행
        const nameData = ["liana", "cindy", "jacklyn","Andy"];
        setUserNames(nameData);
    }, [])

    //view
  return (
    <div>Sample
        {userNames.map((userName, index)=><><Greeting key={`userName${index}`} name = {userName} onButtonClick={handleButtonClick}/><br/></>)}
    </div>
  )
}

export default Sample
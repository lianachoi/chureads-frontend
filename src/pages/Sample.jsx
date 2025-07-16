import React from 'react'
import Greeting from '../components/sample/Greeting'


const Sample = () => {
    
    const handleButtonClick = (data) =>{
        console.log(data,"button click!")
    }
  return (
    <div>Sample
        <Greeting name="sunyoung" onButtonClick={handleButtonClick}/>
        <Greeting onButtonClick={handleButtonClick}/>
        <Greeting onButtonClick={handleButtonClick}/>
    </div>
  )
}

export default Sample
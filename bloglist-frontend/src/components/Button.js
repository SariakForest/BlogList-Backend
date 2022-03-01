import React from "react"
const Button = ({onClick,text, type}) =>{
    let delBtnStyles ={}
    if(type==="del"){
        delBtnStyles ={
            color:"white",
            backgroundColor:"red",
            padding:".35rem .5rem",
            border:"none",
            cursor:"pointer"
        }
    }
    return <button style={delBtnStyles} type={type} onClick={onClick}>{text}</button>
}
export default Button

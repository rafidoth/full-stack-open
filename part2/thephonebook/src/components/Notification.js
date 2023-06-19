
function Notification ({message}){
    const messageStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 18,
        border: '2px solid green',
        padding : 5,
        margin : 5,
    }


    if(message === null){
        return null;
    }else{
        return(
            <span style={messageStyle}>{message}</span>
        )
    }
   
}

export default Notification
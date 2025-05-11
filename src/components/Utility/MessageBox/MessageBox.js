import './MessageBox.css'

const MessageBox = ({title, message, buttonsType, callBackFunction, show, setShow, navigateMethod}) => {

  const handleClose = () => {
      setShow(false)   
  }

  const handleConfirmation = () => {
    if (callBackFunction) callBackFunction()
    if (navigateMethod) navigateMethod()
    setShow(false)
  }

  let buttons 
  if(buttonsType === 'confirm'){
    buttons = (
      <button
      className='message-box-btn'
      onClick={() => {
        handleClose()
      }}
      >Ok</button>
    )
  }else{
    buttons = (<>
        <button className='message-box-btn'
    onClick={() => {
      handleConfirmation()
    }}
    >Yes</button>

    <button className='message-box-btn'
    onClick={() => {
      handleClose()
    }}
    >No</button>
    </>)
  }
  return (
    <div className={`message-box-container ${show ? 'show' : ' '}`}>
      <div className='message-box'>
        <h2 className='msg-title'>{title}</h2>
           <p className='message'>{message}</p>
           <br/>
           <div className='buttons-container'>
            {buttons}
           </div>
      </div>
    </div>
  )
}

export default MessageBox

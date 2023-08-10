import React from 'react'

function ChatRoomComponent() {
  return (
    <div className='chatRoom'>
      <div className='quickChatLogo'>
        <img src={require('../assets/images/quick_chat.png')} alt='#' />
        <h1>Quick Chat...</h1>
      </div>
    </div>
  )
}

export default ChatRoomComponent
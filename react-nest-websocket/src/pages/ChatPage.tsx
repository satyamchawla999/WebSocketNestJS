import React, { FC, useEffect, useState } from 'react'
import { UsersComponent, ChatRoomComponent } from '../components'
import { currentUserSelector, userSelector } from '../features/users/usersSlice'
import '../assets/styles/chatPage.scss'
import { useAppSelector } from '../app/hooks'

const ChatPage: FC = () => {
  const [chatRoom, setChatRoom] = useState({});
  let v = Math.random();

  const currentUser = useAppSelector(currentUserSelector)
  const currentUserID = currentUser?._id

  // useEffect(()=>{
  // console.log('update')
  // },[chatRoom])

  const openChatRoom = async (recipientData: { id: string, name: string }) => {
    if (recipientData.id && currentUserID) {
      let chatRoomID: string = recipientData.id > currentUserID ? recipientData.id + currentUserID : currentUserID + recipientData.id;
      v = Math.random();
      // const response = await axios.post('http://localhost:3001/chat/createroom',{ chatRoomID:chatRoomID })
      // console.log('frontend chat',response);

      setChatRoom({
        recipientName: recipientData.name,
        recipientID: recipientData.id,
        chatRoomID
      })
    }
  }

  return (
    <div className="chatPage">
      <UsersComponent openChatRoom={openChatRoom} />
      {
        Object.keys(chatRoom).length !== 0 ?
          <ChatRoomComponent chatRoom={chatRoom} v={v} /> :
          <div className='chatRoom'>
            <div className='quickChatLogo'>
              <img src={require('../assets/images/quick_chat.png')} alt='#' />
              <h1>Quick Chat...</h1>
            </div>
          </div>
      }

    </div>
  )
}

export default ChatPage
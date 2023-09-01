import React, { FC, useEffect, useState } from 'react'
import { UsersComponent, ChatRoomComponent } from '../components'
import { currentUserSelector, userSelector } from '../features/users/usersSlice'
import axios from 'axios'
import '../assets/styles/chatPage.scss'
import { useAppSelector } from '../app/hooks'

const ChatPage: FC = () => {
  const currentUser = useAppSelector(currentUserSelector)
  const currentUserID = currentUser?._id
  const [chatRoom, setChatRoom] = useState({});
  const [ chatMessageArray, setChatMessageArray ] = useState([]);
 

  const openChatRoom = async (recipientData: { id: string, name: string }) => {
    if (recipientData.id && currentUserID) {
      let chatRoomID: string = recipientData.id > currentUserID ? recipientData.id + currentUserID : currentUserID + recipientData.id;
      const response = await axios.post('http://localhost:3001/chat/createroom',{ chatRoomID:chatRoomID })
      
      if(response.status === 201 && response.data !== undefined) {
        console.log("response data",response.data)
        setChatMessageArray(response.data)
        setChatRoom({
          recipientName: recipientData.name,
          recipientID: recipientData.id,
          currentUserID,
          chatRoomID,
        })
      }
    }
  }

  return (
    <div className="chatPage">
      <UsersComponent openChatRoom={openChatRoom} />
      {
        Object.keys(chatRoom).length !== 0 ?
          <ChatRoomComponent chatRoom={chatRoom} chatMessageArray={chatMessageArray} /> :
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
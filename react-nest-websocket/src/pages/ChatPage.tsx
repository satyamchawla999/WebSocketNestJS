import React, { FC, useState } from 'react'
import { UsersComponent, ChatRoomComponent } from '../components'
import { userSelector } from '../features/users/usersSlice'
import '../assets/styles/chatPage.scss'
import { useAppSelector } from '../app/hooks'

const ChatPage: FC = () => {
  const users = useAppSelector(userSelector);
  const [chatRoom, setChatRoom] = useState('');
  
  const openChatRoom = (id: string | undefined) => {

  }

  return (
    <div className="chatPage">
      <UsersComponent openChatRoom={openChatRoom} />
      <ChatRoomComponent />
    </div>
  )
}

export default ChatPage
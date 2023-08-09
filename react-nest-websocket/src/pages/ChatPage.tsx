import React,{FC} from 'react'
import { UsersComponent,ChatRoomComponent } from '../components'
import '../assets/styles/chatPage.scss'

const ChatPage:FC = () => {
  return (
    <div className="chatPage">
      <UsersComponent/>
      <ChatRoomComponent/>
    </div>
  )
}

export default ChatPage
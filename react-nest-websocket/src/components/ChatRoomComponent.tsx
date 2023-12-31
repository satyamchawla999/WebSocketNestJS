import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { WebsocketContext } from '../context/WebsocketContext';

type messageArray = {
  value: string
  recipientID: string
  senderID: string
}

type messagePyload = {
  messageArray: messageArray[]
}

interface chatRoomData {
  chatRoom: {
    recipientName?: string,
    recipientID?: string,
    chatRoomID?: string,
    currentUserID?: string
    
  },
  chatMessageArray: messageArray[]
}

const ChatRoomComponent: React.FC<chatRoomData> = (props) => {

  const { chatRoom, chatMessageArray } = props;
  const { chatRoomID, recipientName, recipientID, currentUserID } = chatRoom

  const socket = useContext(WebsocketContext);

  const [message, setMessage] = useState<messageArray[]>(chatMessageArray)
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setMessage(chatMessageArray)
    socket.on('connect', () => {
      console.log('Connected');
    })

    const sucscribedChatRoom = `${chatRoom.chatRoomID}SUBSCRIBE`

    socket.on(sucscribedChatRoom, (newMessage: messagePyload) => {
      console.log('chat room component recieved');
      setMessage(newMessage.messageArray)
    });

    return () => {
      setMessage([]);
      console.log('Unregistering Events...');
      socket.off('connect');
      socket.off(sucscribedChatRoom);
    }
  }, [chatRoomID])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const message = {
      value,
      recipientID,
      senderID: currentUserID
    }
    socket.emit('newChatRoom', { message, chatRoomID });
    setValue('');
  }

  return (
    <div className='chatRoom'>

      <div className="chatRoomHeader">

        <div className='info'>
          <img src="data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MS44IDYxLjgiPjxnIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PGcgZGF0YS1uYW1lPSLigJTDjsOTw4ggMSI+PGNpcmNsZSBjeD0iMzAuOSIgY3k9IjMwLjkiIHI9IjMwLjkiIGZpbGw9IiM1OGIwZTAiLz48cGF0aCBmaWxsPSIjMzAyZTMzIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0yMy4yNTUgMzguNjggMTUuOTA3LjE0NnYxNS42MDJsLTE1LjkwNy0uMTQ3VjM4LjY4eiIvPjxwYXRoIGQ9Ik01My40NzggNTEuOTkzQTMwLjgxMyAzMC44MTMgMCAwIDEgMzAuOSA2MS44YTMxLjIyNSAzMS4yMjUgMCAwIDEtMy44MzctLjIzN0EzNC4wNzIgMzQuMDcyIDAgMCAxIDE1LjkgNTcuOTE5YTMxLjAzNiAzMS4wMzYgMCAwIDEtNy44NTctNi4yMjVsMS4yODQtMy4xIDEzLjkyNS02LjIxMmMwIDQuNTM1IDEuMzEgMTAuMDIgNy40MzkgMTAuMTEzIDcuNTcuMTEzIDguNDctNS40NzUgOC40Ny0xMC4xNWwxMi43OSA2LjI4MnoiIGZpbGw9IiM4NTdhNmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGQ9Ik0zMS40NjIgNTIuNDk1Yy0zLjM0Mi01LjQ3Mi05LjM4OC02LjI4Ny0xMS4zNTktNi42LTUuNDItLjg2LTE0LjU2LTQuMjgtOC41NjQtOS43MiAxMC43NjUtOS43NjQgNi44OTgtMjIuMDMyIDE5LjUxMy0yMi4wMzIgMTMuNDcgMCA4Ljg3MyAxMi4yNjggMTkuNjM4IDIyLjAzMiA1Ljk5NyA1LjQ0LTMuMTQzIDguODYtOC41NjUgOS43MmExNC4yOTIgMTQuMjkyIDAgMCAwLTEwLjY2MyA2LjZ6IiBmaWxsPSIjMzAyZTMzIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNMzkuOTY0IDQyLjI1MmMtMS4xMjUgNC4wMS00LjAwOCA2LjM5Ny04LjU5OCA2LjIwNy0zLjk0LS4xNjMtNy4yOTctMi4zOTctOC4xMS02LjIwNHoiIGZpbGwtcnVsZT0iZXZlbm9kZCIgb3BhY2l0eT0iLjE4Ii8+PHBhdGggZD0iTTMxLjEyOSA4LjQzMmMyMS4yODEgMCAxMi45ODcgMzUuMjY2IDAgMzUuMjY2LTEyLjI2NyAwLTIxLjI4MS0zNS4yNjYgMC0zNS4yNjZ6IiBmaWxsPSIjZmZlOGJlIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNMTguMzY1IDI0LjA0NWMtMy4wNyAxLjM0LS40NiA3LjY4NyAxLjQ3MiA3LjY1OGEzMS45NzMgMzEuOTczIDAgMCAxLTEuNDcyLTcuNjU4ek00NC4xNCAyNC4wNDVjMy4wNyAxLjMzOS40NiA3LjY4Ny0xLjQ3MSA3LjY1OGEzMS45OTMgMzEuOTkzIDAgMCAwIDEuNDcxLTcuNjU4eiIgZmlsbD0iI2Y5ZGNhNCIgZmlsbC1ydWxlPSJldmVub2RkIi8+PHBhdGggZD0iTTE5LjExMyAyNS43MDZjLTIuODMtNC45NTgtMi43ODMtOS4zNzUtMS4zNjItMTEuODE3IDIuMDQ4LTMuNTIgNC45MjItMy42ODggNS4zMTUtNC41MTcgNC4wMjUtOC40NzkgMjQuODM5LTIuMDQ4IDIzLjk3IDExLjA5YTE0Ljc5OCAxNC43OTggMCAwIDAtMS41MjItMi40ODZzLS4wNzUgNC45OTEtMS40MzcgNi45NTdjLTEuNjQuNDY0LTE1LjA2MS4yMzktMjAuMDUzLTkuOTQ4LTQuMDA2IDIuMjY4LTUuMDYgNy4wMTUtNC45MSAxMC43MnoiIGZpbGw9IiM5Njk2OTYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGQ9Ik0zMS4xNSA0Ni41NDNjLTIuNjYuMDIyLTE1LjYxNy00LjAyMi0xMi42MS0yNi4wNDUgMCAwIC42NSA5LjkxNiAyLjc3NSAxMi43ODggMS4zODIgMS44NjggMi42MjUgMi41NyAzLjgyLjc0NiAxLjI0OC0xLjkgMy45NDYtMy40NzMgNi4wMzgtMS42NzcgMS43MzctMS44NSA0Ljg0OC0uMjEyIDYuMDg0IDEuNjc3IDEuMTk1IDEuODIzIDIuNDQgMS4xMjMgMy44MjItLjc0NiAyLjEyNS0yLjg3MiAyLjU4Ni0xMi40NTYgMi41ODYtMTIuNDU2IDMuNDU2IDIzLjYtOS44NTUgMjUuNzM1LTEyLjUxNSAyNS43MTN6IiBmaWxsPSIjOTY5Njk2IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNMjYuNTI3IDM2LjgwMmE3LjExOCA3LjExOCAwIDAgMSA0LjU2OC0yLjA5NiA3LjI5IDcuMjkgMCAwIDEgNC41MDMgMi4wOTljLS43ODguNTI1LTUuODc0IDEuNzM3LTkuMDcxLS4wMDN6IiBmaWxsPSIjZmZlOGJlIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNMjYuNjExIDUxLjI5N2EyOS4zNSAyOS4zNSAwIDAgMC04LjE3MS0zLjUwMWMtNC43NzgtLjc1OC0xMy40MjMtMS41MTgtMTEuMjcxLTEwLjA4NkMxMi4wMjMgMTguMzggMTguODUgMy42ODggMzEuNDU3IDMuODdjMTIuODM2LjE4NCAxOS4wOSAxNS44IDIzLjg0IDMzLjg2NSAxLjkwNCA3LjIzOC02Ljc5IDkuMzEzLTExLjUwOCAxMC4wNkEyMS4xMjkgMjEuMTI5IDAgMCAwIDM2IDUxLjE0Yy02Ljk2MyA0Ljc2NS0xLjgxMiA0LjctOS4zODkuMTU4em00Ljg1MSAxLjE5OGExNC4yOTIgMTQuMjkyIDAgMCAxIDEwLjY2My02LjZjNS40MjItLjg2IDE0LjU2Mi00LjI4IDguNTY1LTkuNzItMTAuNzY1LTkuNzY0LTYuMTY3LTIyLjAzMi0xOS42MzgtMjIuMDMyLTEyLjYxNSAwLTguNzQ4IDEyLjI2OC0xOS41MTMgMjIuMDMyLTUuOTk3IDUuNDQgMy4xNDMgOC44NiA4LjU2NCA5LjcyIDEuOTcuMzEzIDguMDE3IDEuMTI3IDExLjM2IDYuNnoiIGZpbGw9IiM3ZDcwNjIiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGQ9Ik0yNC4yMDIgNTAuMjEzczUuOTg4IDMuMjU2IDcuNTg4IDcuOTkyYzEuNjEtNS4xMjEgNy42MjctOC4zMjcgNy42MjctOC4zMjdTMzMuMDcgNTIuMzMgMzEuNyA1NS41MzRjLS45NzMtMS43MjItMi43MDctMy40LTcuNDk3LTUuMzIxeiIgZmlsbD0iIzMwMmUzMyIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9nPjwvZz48L3N2Zz4=" alt="#" />
          <p>{recipientName}</p>
        </div>

        <div className='icons'>
          <i className="fa-regular fa-bell"></i>
          <i className="fa-regular fa-heart"></i>
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>

      <div className='messageBox'>

        {message.length === 0 ? <div className='noMessage'>

          No Message

        </div> : <div>
          {message.map((msg, index) =>

            <div key={index}>

              {msg.senderID === currentUserID ? <div className='leftMessage'>

                <p>{msg.value}</p>

              </div> : <div className='rightMessage'>

                <p>{msg.value}</p>

              </div>}

            </div>

          )}
        </div>}

      </div>

      <form className='inputBar'>
        <i className="fa-solid fa-microphone-lines"></i>
        <input placeholder='Write Something' type="text" value={value} onChange={(e) => {
          console.log("askdasb");
          setValue(e.target.value)
        }} />
        <i className="fa-solid fa-paperclip"></i>
        <i className="fa-solid fa-camera"></i>
        <i className="fa-regular fa-face-smile"></i>
        <button onClick={handleSubmit}><i style={{ color: 'white' }} className="fa-solid fa-paper-plane"></i></button>
      </form>
    </div>
  )
}

export default ChatRoomComponent
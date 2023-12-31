import React, { useContext, useEffect, useState } from 'react'
import { addNewUser, currentUserSelector, userSelector, User } from '../features/users/usersSlice'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { WebsocketContext } from '../context/WebsocketContext'
import UserItem from './UserItem'

// type messagePyload = {
//   content: string,
//   msg: string
// }

interface propsData {
  openChatRoom: (recipientData: { id: string, name: string }) => void
}

const UsersComponent: React.FC<propsData> = (props) => {

  const users: User[] | undefined = useAppSelector(userSelector)
  const currentUser = useAppSelector(currentUserSelector)
  const currentUserID = currentUser?._id
  const [select, setSelect] = useState<string>('');

  const { openChatRoom } = props

  useEffect(() => {
    setSelect('')
    console.log('hello')
    return () => {
      setSelect('')
    }
  }, [])

  const handleClick = (id:string|undefined, name:string|undefined) => {
    if(id && name) {
        const recipientData = {
            id: id,
            name: name
        }
        openChatRoom(recipientData)
        setSelect(id)
    }

    
}


  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('Connected');
  //   })

  //   socket.on('onNewUser', (newUser: any) => {
  //     console.log('onNewUser event received!');
  //     console.log("frontend", newUser);
  //     dispatch(addNewUser(newUser.user))
  //   });

  //   return () => {
  //     console.log('Unregistering Events...');
  //     socket.off('connect');
  //     socket.off('onNewUser');
  //   }
  // }, [])

  return (
    <div className='users'>

      <div className='userProfileSection'>
        <div className='userImage'>
          <img
            src='data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MS44IDYxLjgiPjxnIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PGcgZGF0YS1uYW1lPSLigJTDjsOTw4ggMSI+PGNpcmNsZSBjeD0iMzAuOSIgY3k9IjMwLjkiIHI9IjMwLjkiIGZpbGw9IiM1OGIwZTAiLz48cGF0aCBmaWxsPSIjMzAyZTMzIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0yMy4yNTUgMzguNjggMTUuOTA3LjE0NnYxNS42MDJsLTE1LjkwNy0uMTQ3VjM4LjY4eiIvPjxwYXRoIGQ9Ik01My40NzggNTEuOTkzQTMwLjgxMyAzMC44MTMgMCAwIDEgMzAuOSA2MS44YTMxLjIyNSAzMS4yMjUgMCAwIDEtMy44MzctLjIzN0EzNC4wNzIgMzQuMDcyIDAgMCAxIDE1LjkgNTcuOTE5YTMxLjAzNiAzMS4wMzYgMCAwIDEtNy44NTctNi4yMjVsMS4yODQtMy4xIDEzLjkyNS02LjIxMmMwIDQuNTM1IDEuMzEgMTAuMDIgNy40MzkgMTAuMTEzIDcuNTcuMTEzIDguNDctNS40NzUgOC40Ny0xMC4xNWwxMi43OSA2LjI4MnoiIGZpbGw9IiM4NTdhNmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGQ9Ik0zMS40NjIgNTIuNDk1Yy0zLjM0Mi01LjQ3Mi05LjM4OC02LjI4Ny0xMS4zNTktNi42LTUuNDItLjg2LTE0LjU2LTQuMjgtOC41NjQtOS43MiAxMC43NjUtOS43NjQgNi44OTgtMjIuMDMyIDE5LjUxMy0yMi4wMzIgMTMuNDcgMCA4Ljg3MyAxMi4yNjggMTkuNjM4IDIyLjAzMiA1Ljk5NyA1LjQ0LTMuMTQzIDguODYtOC41NjUgOS43MmExNC4yOTIgMTQuMjkyIDAgMCAwLTEwLjY2MyA2LjZ6IiBmaWxsPSIjMzAyZTMzIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNMzkuOTY0IDQyLjI1MmMtMS4xMjUgNC4wMS00LjAwOCA2LjM5Ny04LjU5OCA2LjIwNy0zLjk0LS4xNjMtNy4yOTctMi4zOTctOC4xMS02LjIwNHoiIGZpbGwtcnVsZT0iZXZlbm9kZCIgb3BhY2l0eT0iLjE4Ii8+PHBhdGggZD0iTTMxLjEyOSA4LjQzMmMyMS4yODEgMCAxMi45ODcgMzUuMjY2IDAgMzUuMjY2LTEyLjI2NyAwLTIxLjI4MS0zNS4yNjYgMC0zNS4yNjZ6IiBmaWxsPSIjZmZlOGJlIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNMTguMzY1IDI0LjA0NWMtMy4wNyAxLjM0LS40NiA3LjY4NyAxLjQ3MiA3LjY1OGEzMS45NzMgMzEuOTczIDAgMCAxLTEuNDcyLTcuNjU4ek00NC4xNCAyNC4wNDVjMy4wNyAxLjMzOS40NiA3LjY4Ny0xLjQ3MSA3LjY1OGEzMS45OTMgMzEuOTkzIDAgMCAwIDEuNDcxLTcuNjU4eiIgZmlsbD0iI2Y5ZGNhNCIgZmlsbC1ydWxlPSJldmVub2RkIi8+PHBhdGggZD0iTTE5LjExMyAyNS43MDZjLTIuODMtNC45NTgtMi43ODMtOS4zNzUtMS4zNjItMTEuODE3IDIuMDQ4LTMuNTIgNC45MjItMy42ODggNS4zMTUtNC41MTcgNC4wMjUtOC40NzkgMjQuODM5LTIuMDQ4IDIzLjk3IDExLjA5YTE0Ljc5OCAxNC43OTggMCAwIDAtMS41MjItMi40ODZzLS4wNzUgNC45OTEtMS40MzcgNi45NTdjLTEuNjQuNDY0LTE1LjA2MS4yMzktMjAuMDUzLTkuOTQ4LTQuMDA2IDIuMjY4LTUuMDYgNy4wMTUtNC45MSAxMC43MnoiIGZpbGw9IiM5Njk2OTYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGQ9Ik0zMS4xNSA0Ni41NDNjLTIuNjYuMDIyLTE1LjYxNy00LjAyMi0xMi42MS0yNi4wNDUgMCAwIC42NSA5LjkxNiAyLjc3NSAxMi43ODggMS4zODIgMS44NjggMi42MjUgMi41NyAzLjgyLjc0NiAxLjI0OC0xLjkgMy45NDYtMy40NzMgNi4wMzgtMS42NzcgMS43MzctMS44NSA0Ljg0OC0uMjEyIDYuMDg0IDEuNjc3IDEuMTk1IDEuODIzIDIuNDQgMS4xMjMgMy44MjItLjc0NiAyLjEyNS0yLjg3MiAyLjU4Ni0xMi40NTYgMi41ODYtMTIuNDU2IDMuNDU2IDIzLjYtOS44NTUgMjUuNzM1LTEyLjUxNSAyNS43MTN6IiBmaWxsPSIjOTY5Njk2IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNMjYuNTI3IDM2LjgwMmE3LjExOCA3LjExOCAwIDAgMSA0LjU2OC0yLjA5NiA3LjI5IDcuMjkgMCAwIDEgNC41MDMgMi4wOTljLS43ODguNTI1LTUuODc0IDEuNzM3LTkuMDcxLS4wMDN6IiBmaWxsPSIjZmZlOGJlIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNMjYuNjExIDUxLjI5N2EyOS4zNSAyOS4zNSAwIDAgMC04LjE3MS0zLjUwMWMtNC43NzgtLjc1OC0xMy40MjMtMS41MTgtMTEuMjcxLTEwLjA4NkMxMi4wMjMgMTguMzggMTguODUgMy42ODggMzEuNDU3IDMuODdjMTIuODM2LjE4NCAxOS4wOSAxNS44IDIzLjg0IDMzLjg2NSAxLjkwNCA3LjIzOC02Ljc5IDkuMzEzLTExLjUwOCAxMC4wNkEyMS4xMjkgMjEuMTI5IDAgMCAwIDM2IDUxLjE0Yy02Ljk2MyA0Ljc2NS0xLjgxMiA0LjctOS4zODkuMTU4em00Ljg1MSAxLjE5OGExNC4yOTIgMTQuMjkyIDAgMCAxIDEwLjY2My02LjZjNS40MjItLjg2IDE0LjU2Mi00LjI4IDguNTY1LTkuNzItMTAuNzY1LTkuNzY0LTYuMTY3LTIyLjAzMi0xOS42MzgtMjIuMDMyLTEyLjYxNSAwLTguNzQ4IDEyLjI2OC0xOS41MTMgMjIuMDMyLTUuOTk3IDUuNDQgMy4xNDMgOC44NiA4LjU2NCA5LjcyIDEuOTcuMzEzIDguMDE3IDEuMTI3IDExLjM2IDYuNnoiIGZpbGw9IiM3ZDcwNjIiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGQ9Ik0yNC4yMDIgNTAuMjEzczUuOTg4IDMuMjU2IDcuNTg4IDcuOTkyYzEuNjEtNS4xMjEgNy42MjctOC4zMjcgNy42MjctOC4zMjdTMzMuMDcgNTIuMzMgMzEuNyA1NS41MzRjLS45NzMtMS43MjItMi43MDctMy40LTcuNDk3LTUuMzIxeiIgZmlsbD0iIzMwMmUzMyIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9nPjwvZz48L3N2Zz4='
            alt='#'
          />
        </div>
        <div className='userInfo'>
          <p className='userName'>{currentUser?.name}</p>
          <p className='userDescription'>Web Devloper</p>
        </div>
        <div className='editIcon'>
          <i style={{ color: "grey" }} className="fa-solid fa-pencil"></i>
        </div>
      </div>

      <div className='searchBar'>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder='Search Friends' />
      </div>

      <div className='allUsers'>
        {
          (currentUserID !== undefined || users !== undefined) && (
            users.length === 0 ? <p> No Users! </p> :
              users.map((user, index) => user._id !== currentUserID &&
                <div className={select === user._id ? 'selected' : ''} onClick={() => handleClick(user._id,user.name)} >
                  <UserItem select={select} setSelect={setSelect} key={index} user={user}  />
                </div>
              ))
        }
      </div>

    </div>
  )
}

export default UsersComponent
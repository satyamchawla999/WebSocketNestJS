import { FC } from "react"
import { socket, WebsocketProvider } from './context/WebsocketContext';
// import Websocket from './components/Websocket';
import { ChatPage } from "./pages";

const Main:FC = () => {
  return <WebsocketProvider value={socket}>
    <ChatPage/>
    {/* <Websocket /> */}
  </WebsocketProvider>
}

export default Main;

import { type FC } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { ChatPage, Signin, Signup } from './pages'

interface routesData {
  path: string
  element: JSX.Element
}

const routes: routesData[] = [
  { path: '/', element: <ChatPage /> },
  { path: '/signin', element: <Signin /> },
  { path: '/signup', element: <Signup /> }
]

const Main: FC = () => {
  return (
    <div className="Main">
      <Router>
        <Routes>
          {routes.map((route, index) => (<Route path={route.path} key={index} element={route.element} />))}
        </Routes>
      </Router>
    </div>
  )
}

export default Main





// import { FC } from "react"
// import { socket, WebsocketProvider } from './context/WebsocketContext';
// // import Websocket from './components/Websocket';
// import { ChatPage } from "./pages";

// const Main:FC = () => {
//   return <WebsocketProvider value={socket}>
//     <ChatPage/>
//     {/* <Websocket /> */}
//   </WebsocketProvider>
// }

// export default Main;

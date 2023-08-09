import React, { FC, useContext, useEffect, useState } from 'react'
import { WebsocketContext } from '../context/WebsocketContext'

type messagePyload = {
    content: string,
    msg: string
}

const Websocket: FC = () => {
    const socket = useContext(WebsocketContext);
    const [value, setValue] = useState('');
    const [message, setMessage] = useState<messagePyload[]>([]);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected');
        })

        socket.on('onMessage', (newMessage: messagePyload) => {
            console.log('onMessage event received!');
            console.log(newMessage);
            setMessage((prev) => [...prev, newMessage]);
        });

        return () => {
            console.log('Unregistering Events...');
            socket.off('connect');
            socket.off('onMessage');
        }
    }, [])

    const handleSubmit = () => {
        socket.emit('newMessage', value);
        setValue('');
    }
    return (
        <div>
            <h1>Websocket componenet</h1>

            <div>
                {message.length === 0 ? <div>
                    No Message
                </div> : <div>
                    {message.map((msg,index)=> <div key={index}>
                            <p>{msg.content}</p>
                    </div>)}    
                </div>}
            </div>

            <div>
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                <button onClick={handleSubmit}>Submit</button>
            </div>

        </div>
    )
}

export default Websocket
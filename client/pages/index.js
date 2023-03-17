import Head from 'next/head';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export default function Home() {
    const [messages, setMessages] = useState([])

    const socket = useRef(null)
    useEffect(() => {
        socket.current = io("ws://nadleeh.local:3001");
        socket.current.on('message', (text) => {
            setMessages((messages) => messages.concat({
                id: Math.random(),
                author: "other",
                text
            }))
        });
    }, []);

    const inputField = useRef();
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        const text = inputField.current.value;
        inputField.current.value = '';
        console.log(`Sending text: ${text}`);
        setMessages((messages) => messages.concat({
            id: Math.random(),
            author: "me",
            text
        }))
        socket.current.emit('message', text);
    }, []);

    const messageList = useMemo(() => {
        return messages.map((m) => {
            return <div key={m.id} className={`chat ${m.author === 'me' ? 'chat-end' : 'chat-start'}`}>
                <div className={`chat-bubble ${m.author === 'me' ? 'chat-bubble-primary' : ''}`}>{m.text}</div>
            </div>
        })
    }, [messages])

    return (
        <div>
            <Head>
                <title>Create Next App</title>
            </Head>
            <form onSubmit={onSubmit}>
                <input ref={inputField} type="text" placeholder="Type here"
                       className="input input-bordered w-full max-w-xs" autoComplete="off" autoFocus={true} />
                <button className="btn">Send text</button>
            </form>
            <div>
                {messageList}
            </div>
        </div>
    );
}

'use client'

import React, {useState, useEffect} from 'react'
import './Popchat.css'
import SendIcon from '@mui/icons-material/Send';

export const PopChat = () => {
    let textRef = React.createRef()
    const [messages, setMessages] = useState([]);
    const [chatopen, setChatopen] = useState(false);

    useEffect(() => {
        if (messages.length === 0 || messages[0].author !== 'me')
            return

        fetch('/api/ai?query=' + messages[0].text, {
            method: 'POST'
        }).then((res) =>
            res.json().then((result) => {
                setMessages([{
                    author: 'assistant',
                    text: result
                }, ...messages])
            })
        );
    }, [messages]);

    let hide = {
        display: 'none',
    }
    let show = {
        display: 'block'
    }

    const toggle = e => {
        setChatopen(!chatopen)
    }

    function handleSend(e) {
        setMessages([{
            author: 'me',
            text: textRef.current.value
        }, ...messages]);
        textRef.current.value = ''
    }

    return (
        <div id='chatCon'>
            <div className="chat-box" style={chatopen ? show : hide}>
                <div className="header">Chat with me</div>
                <div className="msg-area" style={{
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column-reverse'
                }}>
                    {
                        messages.map((msg, i) => (
                            msg.author === 'me' ? (
                                <div className="textbox right"><span>{msg.text}</span></div>
                            ) : (
                                <div className="textbox left"><span>{msg.text}</span></div>
                            )
                        ))
                    }

                </div>
                <div className="footer" onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        handleSend();
                    }
                }}>
                    <input type="text" ref={textRef}/>
                    <button onClick={handleSend}><SendIcon/></button>
                </div>
            </div>
            <div className="pop">
                <p><img onClick={toggle}
                        src="https://p7.hiclipart.com/preview/151/758/442/iphone-imessage-messages-logo-computer-icons-message.jpg"
                        alt=""/></p>
            </div>
        </div>
    )
}

export default PopChat
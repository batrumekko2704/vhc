'use client'

import React, {useState} from 'react'
import './Popchat.css'
//import the css here

export const PopChat = () => {
    let hide = {
        display: 'none',
    }
    let show = {
        display: 'block'
    }
    let textRef = React.createRef()

    const [messages, setMessages] = useState([]);

    const [chatopen, setChatopen] = useState(false)
    const toggle = e => {
        setChatopen(!chatopen)
    }

    const get = (msg) => {
        setMessages([msg, ...messages]);
    }

    const handleSend = e => {
        get(textRef.current.value)
    }

    return (
        <div id='chatCon'>
            <div class="chat-box" style={chatopen ? show : hide}>
                <div class="header">Chat with me
                </div>
                <div class="msg-area" style={{
                    overflowY: 'scroll',
                    display: 'flex',
                    flexDirection: 'column-reverse'
                }}>
                    {
                        messages.map((msg, i) => (
                            i % 2 ? (
                                <p class="right"><span>{msg}</span></p>
                            ) : (
                                <p class="left"><span>{msg}</span></p>
                            )
                        ))
                    }

                </div>
                <div class="footer">
                    <input type="text" ref={textRef}/>
                    <button onClick={handleSend}><i class="fa fa-paper-plane"></i></button>
                </div>
            </div>
            <div class="pop">
                <p><img onClick={toggle}
                        src="https://p7.hiclipart.com/preview/151/758/442/iphone-imessage-messages-logo-computer-icons-message.jpg"
                        alt=""/></p>
            </div>
        </div>
    )
}

export default PopChat
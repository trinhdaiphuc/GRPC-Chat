import React, {useContext} from 'react';
import {GlobalContext} from "./Context";

const MessageList = () => {
    const {messages} = useContext(GlobalContext);
    return (
        <ul className="message-list">
            {messages?.map((message, index) => {
                return (
                    <li key={message.id} className="message">
                        <div>{message.user}</div>
                        <div>{message.text}</div>
                    </li>
                );
            })}
        </ul>
    );
}

export default MessageList;
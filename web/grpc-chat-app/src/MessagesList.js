import React from 'react';

const MessageList = ({messages}) => {
    console.log("Message ",messages)
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
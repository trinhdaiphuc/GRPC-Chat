import React, {useState} from "react";

const SendMessageForm = ({sendMessage}) => {
    const [message, setMessage] = useState("")

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        sendMessage(message)
        setMessage("")
    }

    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            className="send-message-form">
            <input
                onChange={(e) => handleChange(e)}
                value={message}
                autoFocus={true}
                placeholder="Type your message and hit ENTER"
                type="text"/>
        </form>
    )
}

export default SendMessageForm;
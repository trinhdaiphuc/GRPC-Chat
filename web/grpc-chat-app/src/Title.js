import React, {useState} from 'react';

const Title = ({onSubmitName}) => {
    const [submit, setSubmit] = useState(false)
    const [name, setName] = useState("")

    const handleChange = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmit(true);
        onSubmitName(name);
    }

    return (
        <div className="title">
            {submit ? (<p>{name}</p>) :
                (<form
                    onSubmit={(e) => handleSubmit(e)}
                    className="send-message-form">
                    <label>Your name: </label>
                    <input
                        onChange={(e) => handleChange(e)}
                        autoFocus={true}
                        value={name}
                        placeholder="Type your name and hit ENTER"
                        type="text"/>
                </form>)}
        </div>
    );
}

export default Title;
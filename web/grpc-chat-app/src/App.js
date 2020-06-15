import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import Title from "./Title";
import MessageList from "./MessagesList";
import SendMessageForm from "./SendMessageForm";
import {GrpcChatClient} from "./protos/service_grpc_web_pb";
import {Connect, Message, User} from "./protos/service_pb"
import {v4 as uuidV4} from 'uuid';
import {GlobalContext} from "./Context";


const App = () => {
    const [user, setUser] = useState({});
    const [userGrpc, setUserGrpc] = useState({});
    const [grpcChatService, setGrpcChatService] = useState({});
    const {addMessages} = useContext(GlobalContext);

    const sendMessage = (text, roomId) => {
        const id = uuidV4();
        const newMessage = {id, user: user.name, text}
        const messageGrpc = new Message();
        messageGrpc.setUser(userGrpc);
        messageGrpc.setContent(text);
        messageGrpc.setId(id);
        grpcChatService.broadcastMessage(messageGrpc, {}, (err, _) => {
            if (err) {
                console.log(err.code);
                console.log(err.message);
            }
        })
    }

    useEffect(() => {
        const newClient = new GrpcChatClient('http://' + window.location.hostname + ':8080', null,
            null);
        setGrpcChatService(newClient);
    }, [])

    const onSubmitName = (name) => {
        const id = uuidV4();
        setUser({id, name});
        const request = new Connect();
        const newUserGrpc = new User();
        newUserGrpc.setId(id);
        newUserGrpc.setName(name);
        setUserGrpc(newUserGrpc);
        request.setUser(newUserGrpc);
        request.setActive(true);
        const stream = grpcChatService.createStream(request);
        stream.on('data', (response) => {
            const newMessage = {
                id: response.getId(),
                user: response.getUser().getName(),
                text: response.getContent()
            }
            console.log("Message: ", newMessage)
            addMessages(newMessage);
        });
    }

    return (
        <div className="app">
            <Title onSubmitName={(name) => onSubmitName(name)}/>
            <MessageList/>
            <SendMessageForm
                sendMessage={(text, roomId) => sendMessage(text, roomId)}/>
        </div>
    );
}

export default App;

import React, {useEffect, useState} from 'react';
import './App.css';
import Title from "./Title";
import MessageList from "./MessagesList";
import SendMessageForm from "./SendMessageForm";
import {GrpcChatClient} from "./protos/service_grpc_web_pb";
import {Connect, Message, User} from "./protos/service_pb"
import {v4 as uuidv4} from 'uuid';


const App = () => {
    const [message, setMessage] = useState({});
    const [stream, setStream] = useState({});
    const [messageList, setMessageList] = useState([])
    const [user, setUser] = useState({});
    const [userGrpc, setUserGrpc] = useState({});
    const [grpcChatService, setGrpcChatService] = useState({});

    const sendMessage = (text, roomId) => {
        const id = uuidv4();
        const newMessageList = messageList;
        const newMessage = {id, text}
        newMessageList.push(newMessage);
        setMessageList(newMessageList);
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
        const id = uuidv4();
        setUser({id, name});
        const request = new Connect();
        const newUserGrpc = new User();
        newUserGrpc.setId(id);
        newUserGrpc.setName(name);
        setUserGrpc(newUserGrpc);
        request.setUser(newUserGrpc);
        request.setActive(true);
        const newStream = grpcChatService.createStream(request);
        setStream(newStream);
        newStream.on('data', (response) => {
            const newMessageList = messageList;
            const newMessage = {id: response.getId(), text: response.getContent()}
            newMessageList.push(newMessage);
            setMessageList(newMessageList);
        });
    }

    useEffect(() => {
        if (!stream) {
            stream.on('data', (response) => {
                const newMessageList = messageList;
                const newMessage = {id: response.getId(), text: response.getContent()}
                newMessageList.push(newMessage);
                setMessageList(newMessageList);
            });
        }
    }, [stream, messageList])


    return (
        <div className="app">
            <Title onSubmitName={(name) => onSubmitName(name)}/>
            <MessageList
                messages={messageList}/>
            <SendMessageForm
                sendMessage={(text, roomId) => sendMessage(text, roomId)}/>
        </div>
    );
}

export default App;

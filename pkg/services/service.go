package services

import "github.com/trinhdaiphuc/GRPC-Chat/internal/gen/chat/proto"

type Connection struct {
	Stream proto.GrpcChat_CreateStreamServer
	ID     string
	Name   string
	Active bool
	Error  chan error
}
type GrpcChatServer struct {
	Connection []*Connection
}

package services

import "github.com/trinhdaiphuc/GRPC-Chat/internal/gen/chat/proto"

// Connection is a struct declare a stream connection
type Connection struct {
	Stream proto.GrpcChat_CreateStreamServer
	ID     string
	Name   string
	Active bool
	Error  chan error
}

// GrpcChatServer is a struct for interface grpc service
type GrpcChatServer struct {
	Connection []*Connection
}

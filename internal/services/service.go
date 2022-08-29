package services

import "github.com/trinhdaiphuc/GRPC-Chat/pkg/api/chat"

// Connection is a struct declare a stream connection
type Connection struct {
	Stream chat.GrpcChat_CreateStreamServer
	ID     string
	Name   string
	Active bool
	Error  chan error
}

// GrpcChatService is a struct for interface grpc service
type GrpcChatService struct {
	Connection []*Connection
}

func NewGrpcChatServer() *GrpcChatService {
	return &GrpcChatService{
		Connection: []*Connection{},
	}
}

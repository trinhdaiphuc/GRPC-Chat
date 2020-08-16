package services

import (
	"github.com/sirupsen/logrus"
	"github.com/trinhdaiphuc/GRPC-Chat/internal/gen/chat/proto"
)

// CreateStream is a service use for create a stream connect to client
func (s *GrpcChatServer) CreateStream(req *proto.Connect, stream proto.GrpcChat_CreateStreamServer) error {
	logrus.Debug("Service create stream with request: ", req.GetUser())
	conn := &Connection{
		Stream: stream,
		ID:     req.GetUser().GetId(),
		Name:   req.GetUser().GetName(),
		Active: true,
		Error:  make(chan error),
	}

	s.Connection = append(s.Connection, conn)

	return <-conn.Error
}

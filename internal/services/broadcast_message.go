package services

import (
	"context"
	"sync"

	"github.com/sirupsen/logrus"
	"github.com/trinhdaiphuc/GRPC-Chat/pkg/api/chat"
	"google.golang.org/protobuf/types/known/emptypb"
)

// BroadcastMessage is a service use for broadcasting message to all user
func (s *GrpcChatService) BroadcastMessage(ctx context.Context, msg *chat.Message) (*emptypb.Empty, error) {
	logrus.Debug("Service broadcast message")
	wait := sync.WaitGroup{}

	for _, conn := range s.Connection {
		wait.Add(1)

		go func(msg *chat.Message, conn *Connection) {
			defer wait.Done()

			if conn.Active {
				err := conn.Stream.Send(msg)
				logrus.Infof("Sending message %v to user %v", msg.GetId(), conn.ID)

				if err != nil {
					logrus.Errorf("Error with Stream: %v - Error: %v", conn.Stream, err)
					conn.Active = false
					conn.Error <- err
				}
			}
		}(msg, conn)
	}

	wait.Wait()
	return &emptypb.Empty{}, nil
}

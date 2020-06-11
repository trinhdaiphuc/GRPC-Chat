package services

import (
	"context"
	"sync"

	"github.com/sirupsen/logrus"
	"github.com/trinhdaiphuc/GRPC-Chat/internal/gen/chat/proto"
	"google.golang.org/protobuf/types/known/emptypb"
)

func (s *GrpcChatServer) BroadcastMessage(ctx context.Context, msg *proto.Message) (*emptypb.Empty, error) {
	logrus.Debug("Service broadcast message")
	wait := sync.WaitGroup{}
	done := make(chan int)

	for _, conn := range s.Connection {
		wait.Add(1)

		go func(msg *proto.Message, conn *Connection) {
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

	go func() {
		wait.Wait()
		close(done)
	}()

	<-done
	return &emptypb.Empty{}, nil
}

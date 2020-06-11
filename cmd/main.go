package main

import (
	"net"
	"os"
	"os/signal"

	"github.com/sirupsen/logrus"
	"github.com/trinhdaiphuc/GRPC-Chat/internal/gen/chat/proto"
	"github.com/trinhdaiphuc/GRPC-Chat/pkg/services"
	"google.golang.org/grpc"
)

func main() {
	connections := []*services.Connection{}
	grpcChatServer := &services.GrpcChatServer{
		Connection: connections,
	}
	grpcServer := grpc.NewServer()

	logrus.SetFormatter(&logrus.TextFormatter{
		FullTimestamp: false,
	})

	logrus.SetLevel(logrus.DebugLevel)

	listener, err := net.Listen("tcp", ":8080")

	if err != nil {
		logrus.Fatal("error creating the server %v", err)
	}

	logrus.Info("Starting server at port :8080")
	proto.RegisterGrpcChatServer(grpcServer, grpcChatServer)

	go func() {
		if err := grpcServer.Serve(listener); err != nil {
			logrus.Fatal("Failed to serve: %v", err)
		}
	}()

	c := make(chan os.Signal)

	signal.Notify(c, os.Interrupt)

	<-c

	// After receiving CTRL+C Properly stop the server
	logrus.Info("Stopping the server...")
	grpcServer.Stop()
	if err := listener.Close(); err != nil {
		logrus.Error("Error when close listener ", err)
	}
	logrus.Info("Closing MongoDB connection")
	logrus.Info("Done.")
}

package main

import (
	"net"
	"os"
	"os/signal"

	"github.com/sirupsen/logrus"
	"github.com/trinhdaiphuc/GRPC-Chat/internal/services"
	"github.com/trinhdaiphuc/GRPC-Chat/pkg/api/chat"
	"google.golang.org/grpc"
)

var defaultPort = "50051"

func main() {
	grpcServer := grpc.NewServer()
	grpcChatService := services.NewGrpcChatServer()

	logrus.SetFormatter(&logrus.TextFormatter{
		FullTimestamp: false,
	})

	logrus.SetLevel(logrus.DebugLevel)

	listener, err := net.Listen("tcp", ":"+defaultPort)
	if err != nil {
		logrus.Fatalf("error creating the server %v", err)
	}

	logrus.Infof("Starting server at port :%s", defaultPort)
	chat.RegisterGrpcChatServer(grpcServer, grpcChatService)

	go func() {
		if err := grpcServer.Serve(listener); err != nil {
			logrus.Fatalf("Failed to serve: %v", err)
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
	logrus.Info("Done.")
}

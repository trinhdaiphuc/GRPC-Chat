package main

import (
	"bufio"
	"crypto/sha256"
	"encoding/hex"
	"flag"
	"fmt"
	"log"
	"os"
	"sync"
	"time"

	"github.com/golang/protobuf/ptypes"
	"github.com/trinhdaiphuc/GRPC-Chat/pkg/api/chat"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var client chat.GrpcChatClient
var wait *sync.WaitGroup

func init() {
	wait = &sync.WaitGroup{}
}

func connect(user *chat.User) error {
	var streamerror error

	stream, err := client.CreateStream(context.Background(), &chat.Connect{
		User:   user,
		Active: true,
	})

	if err != nil {
		return fmt.Errorf("connection failed: %v", err)
	}

	wait.Add(1)
	go func(str chat.GrpcChat_CreateStreamClient) {
		defer wait.Done()

		for {
			msg, err := str.Recv()
			if err != nil {
				streamerror = fmt.Errorf("Error reading message: %v", err)
				break
			}

			fmt.Printf("User %v : %s\n", msg.GetUser().GetName(), msg.GetContent())

		}
	}(stream)

	return streamerror
}

func main() {
	timestamp := time.Now()

	name := flag.String("n", "Anon", "The name of the user")
	flag.Parse()

	id := sha256.Sum256([]byte(timestamp.String() + *name))

	conn, err := grpc.Dial("localhost:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("Couldnt connect to service: %v", err)
	}

	client = chat.NewGrpcChatClient(conn)
	user := &chat.User{
		Id:   hex.EncodeToString(id[:]),
		Name: *name,
	}

	connect(user)

	wait.Add(1)
	go func() {
		defer wait.Done()

		scanner := bufio.NewScanner(os.Stdin)
		for scanner.Scan() {
			timestampProto, err := ptypes.TimestampProto(timestamp)
			msg := &chat.Message{
				Id:        user.Id,
				Content:   scanner.Text(),
				User:      user,
				Timestamp: timestampProto,
			}

			_, err = client.BroadcastMessage(context.Background(), msg)
			if err != nil {
				fmt.Printf("Error Sending Message: %v", err)
				break
			}
		}

	}()

	wait.Wait()
}

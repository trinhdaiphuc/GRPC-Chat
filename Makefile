install-protoc-gen-go:
	go get -u github.com/golang/protobuf

install-protoc-gen-grpc-web:
	wget https://github.com/grpc/grpc-web/releases/download/1.2.1/protoc-gen-grpc-web-1.2.1-linux-x86_64
	sudo mv ./protoc-gen-grpc-web-1.2.1-linux-x86_64 \
    /usr/local/bin/protoc-gen-grpc-web
	chmod +x /usr/local/bin/protoc-gen-grpc-web

pb:
	protoc -Iprotos protos/service.proto \
		-Ithird_party/googleapis \
		--go_out=plugins=grpc:./internal/gen/ \
		--js_out=import_style=commonjs,binary:./web/grpc-chat-app/src/protos \
		--grpc-web_out=import_style=commonjs,mode=grpcwebtext:./web/grpc-chat-app/src/protos
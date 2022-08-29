install-protoc-gen-go:
	go install github.com/golang/protobuf/protoc-gen-go

install-protoc-gen-grpc-web:
	wget https://github.com/grpc/grpc-web/releases/download/1.3.1/protoc-gen-grpc-web-1.3.1-darwin-x86_64
	sudo mv ./protoc-gen-grpc-web-1.3.1-darwin-x86_64 \
    /usr/local/bin/protoc-gen-grpc-web
	chmod +x /usr/local/bin/protoc-gen-grpc-web

pb:
	protoc -Iprotos protos/service.proto \
		-Ithird_party/googleapis \
		--go_out=plugins=grpc:./pkg/api/ \
		--js_out=import_style=commonjs,binary:./web/src/protos \
		--grpc-web_out=import_style=commonjs,mode=grpcwebtext:./web/src/protos
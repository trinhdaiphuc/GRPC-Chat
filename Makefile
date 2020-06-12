pb:
	protoc -Iprotos protos/service.proto \
		-Ithird_party/googleapis \
		--go_out=plugins=grpc:./internal/gen/ \
		--js_out=import_style=commonjs,binary:./web/grpc-chat-app/src/protos \
		--grpc-web_out=import_style=commonjs,mode=grpcwebtext:./web/grpc-chat-app/src/protos
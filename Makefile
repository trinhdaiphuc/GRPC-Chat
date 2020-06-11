pb:
	protoc -Iprotos protos/service.proto \
		-Ithird_party/googleapis \
		--go_out=plugins=grpc:./internal/gen/
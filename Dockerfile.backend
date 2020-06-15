FROM golang:alpine AS builder

RUN apk update && apk add --virtual build-dependencies build-base --no-cache

ENV GOROOT=/usr/local/go \
  GOPATH=/app

ADD . /app/src

WORKDIR /app/src

RUN go build -o bin/server cmd/main.go

FROM alpine

WORKDIR /app

COPY --from=builder /app/src/bin/server /app/

ENTRYPOINT ["/app/server"]
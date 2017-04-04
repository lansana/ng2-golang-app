FROM golang:1.8

ADD . $GOPATH/src/github.com/lansana/angular2-golang-chat-room

WORKDIR $GOPATH/src/github.com/lansana/angular2-golang-chat-room

RUN go install

ENTRYPOINT angular2-golang-chat-room

EXPOSE 80
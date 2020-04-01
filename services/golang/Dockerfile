FROM golang:alpine AS development
WORKDIR $GOPATH/src
COPY . .
RUN go build -o app

FROM alpine:latest AS production
#RUN apk --no-cache add ca-certificates && \
#apk add --no-cache tzdata
WORKDIR /root/
COPY --from=development /go/src/app .
EXPOSE 8088
ENTRYPOINT ["./app"]
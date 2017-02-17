FROM golang:alpine

WORKDIR /go/src/gogetter
RUN apk add --no-cache git && \
    go get github.com/go-kit/kit/endpoint && \
    go get github.com/go-kit/kit/metrics && \
    go get github.com/go-kit/kit/log && \
    go get github.com/prometheus/client_golang/prometheus && \
    go get github.com/go-kit/kit/metrics/prometheus && \
    go get github.com/go-kit/kit/transport/http && \
    go get github.com/bradfitz/gomemcache/memcache && \
    go get github.com/jmoiron/jsonq


COPY *.go /go/src/gogetter/
RUN go build

EXPOSE 8080

CMD ["./gogetter"]

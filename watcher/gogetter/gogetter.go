package main

import (
	"context"
	"encoding/json"
	"net/http"
	stdprometheus "github.com/prometheus/client_golang/prometheus"
	kitprometheus "github.com/go-kit/kit/metrics/prometheus"
	httptransport "github.com/go-kit/kit/transport/http"
	"github.com/bradfitz/gomemcache/memcache"
	"github.com/go-kit/kit/log"
	"github.com/jmoiron/jsonq"
	"strings"
	"os"
)

const memcachedUrl = "watcher-memcached.b67oqh.0001.use1.cache.amazonaws.com:11211"
var logger = log.NewLogfmtLogger(os.Stderr)

// Memcached connection
var mc = memcache.New(memcachedUrl)

// Creates and returns a new json query object.
// This allows for an easy method to search and retrieve
// values in a json string.
func getQueryable(data string) *jsonq.JsonQuery {
	dataContainer := map[string]interface{}{}
	dataDecoder := json.NewDecoder(strings.NewReader(data))
	dataDecoder.Decode(&dataContainer)
	return jsonq.NewQuery(dataContainer)
}

// Saves WatchAPI data to memcached
func setKey (keyName string, data string) {
	// Cache response before sending it back to Alexa
	mc.Set(&memcache.Item{Key: keyName,
		Value: []byte(data)})
}

// Saves WatchAPI data to memcached
func getKey (keyName string) (*memcache.Item, error) {
	return mc.Get(keyName)
}

func main() {
	ctx := context.Background()


	fieldKeys := []string{"method", "error"}
	requestCount := kitprometheus.NewCounterFrom(stdprometheus.CounterOpts{
		Namespace: "my_group",
		Subsystem: "gogetter_service",
		Name:      "request_count",
		Help:      "Number of requests received.",
	}, fieldKeys)
	requestLatency := kitprometheus.NewSummaryFrom(stdprometheus.SummaryOpts{
		Namespace: "my_group",
		Subsystem: "gogetter_service",
		Name:      "request_latency_microseconds",
		Help:      "Total duration of requests in microseconds.",
	}, fieldKeys)

	var svc GoGetterService
	svc = goGetterService{}
	svc = loggingMiddleware{logger, svc}
	svc = instrumentingMiddleware{requestCount, requestLatency, svc}

	goGetHandler := httptransport.NewServer(
		ctx,
		makeGoGetEndpoint(svc),
		decodeGoGetRequest,
		encodeResponse,
	)

	http.Handle("/goget", goGetHandler)
	http.Handle("/metrics", stdprometheus.Handler())
	logger.Log("msg", "HTTP", "addr", ":8080")
	logger.Log("err", http.ListenAndServe(":8080", nil))
}

package main

import (
	"context"
	"encoding/json"
	"net/http"
	"github.com/go-kit/kit/endpoint"
)

// The function creates an endpoint and links it to the internal GoGet function
func makeGoGetEndpoint(svc GoGetterService) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(goGetRequest)
		show, err := svc.GoGet(req.Channel, req.Date)
		if err != nil {
			return goGetResponse{req.Channel, req.Date, show, err.Error()}, nil
		}
		return goGetResponse{req.Channel, req.Date, show, ""}, nil
	}
}

// Decodes incoming requests to the /goget endpoint
func decodeGoGetRequest(_ context.Context, r *http.Request) (interface{}, error) {
	var request goGetRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		return nil, err
	}
	return request, nil
}

// Encodes outgoing responses
func encodeResponse(_ context.Context, w http.ResponseWriter, response interface{}) error {
	return json.NewEncoder(w).Encode(response)
}

type goGetRequest struct {
	Channel string		`json:"channel"`
	Date	string		`json:"date"`
}

type goGetResponse struct {
	Channel string		`json:"channel"`
	Date    string		`json:"date"`
	Show	string		`json:"show"`
	Error 	string		`json:"error,omitempty"`
}

type ingesterRequest struct {
	Channel string		`json:"channel"`
	Date	string		`json:"date"`
}

type ingesterResponse struct {
	Listings	string	`json:"listings"`
	Err 		string	`json:"error,omitempty"`
}

package main

import (
	"errors"
	"time"
	"io/ioutil"
	"net/http"
	//"fmt"
	"fmt"
	"github.com/jmoiron/jsonq"
	"os"
)

const ISO8601 = "2006-01-02T15:04:05"
const ISO_MIN_LEN = 19
const INGESTER_URL = "http://" + INGESTER_HOST + ":" + INGESTER_PORT + "/get_listing"

var INGESTER_PORT = os.Getenv("INGESTER_PORT_5000_TCP_PORT")
var  INGESTER_HOST = os.Getenv("INGESTER_PORT_5000_TCP_ADDR")

type GoGetterService interface {
	GoGet(string, string) (string, error)
}

type goGetterService struct{}


type Ingester interface {
	sendIngesterRequest(string, string) (string, error)
}

type ingester struct{}

// The function will first determine if memcached contains the needed WatchAPI listings.
// If it doesn't, it creates a request and sends it to the ingester services to get the data.
// It then saves the data to memcached and returns the name of the show
func (goGetterService) GoGet(channel string, date string) (string, error) {
	var formattedDate string
	var RFCDate time.Time
	var watchDataListQuery *jsonq.JsonQuery

	// Date parsing/formatting
	if len(date) > ISO_MIN_LEN {
		RFCDate, _ = time.Parse(time.RFC3339, date[0:ISO_MIN_LEN] + "Z")
		formattedDate = RFCDate.Format(ISO8601) + "EST"
	} else {
		return "", errors.New("Incorrect Date format: " +  date)
	}
	formattedShortDate := formattedDate[0:10]

	logger.Log("regularDate", date)
	logger.Log("fullDate", formattedDate)
	logger.Log("shortDate", formattedShortDate)

	// Search Elasticache, return value
	watchData, err := getKey(channel + "-" + formattedShortDate)
	if err != nil {
		// Key DOES NOT exist in memcached
		// Send request to ingester
		// Get back raw watch json data from ingester
		ingesterWatchResponse, err := ingester{}.sendIngesterRequest(channel, formattedShortDate)
		if err != nil {
			return "", err
		}
		// Close body later
		defer ingesterWatchResponse.Body.Close()
		ingesterWatchData, err := ioutil.ReadAll(ingesterWatchResponse.Body)

		// Save data to cache before sending it back
		setKey(channel + "-" + formattedDate[0:10], string(ingesterWatchData))

		// Unmarshal the data into something searchable
		fmt.Println(string(ingesterWatchData))
		watchDataListQuery = getQueryable(string(ingesterWatchData))
	} else {
		// Key DOES exist in memcached
		// Unmarshal the data into something searchable
		watchDataListQuery = getQueryable(string(watchData.Value[:]))
	}
	watchDataListObj, err := watchDataListQuery.ArrayOfObjects("listings")

	if err != nil {
		return "", err
	}

	// Search through each listing
	for _, listingData := range watchDataListObj {
		listingStartTimeStr := listingData["startTime"]
		listingStartTimeRFC, _ := time.Parse(time.RFC3339, listingStartTimeStr.(string)[0:ISO_MIN_LEN] + "Z")

		if (listingStartTimeRFC.Year() == RFCDate.Year()) &&
			(listingStartTimeRFC.Month() == RFCDate.Month()) &&
			(listingStartTimeRFC.Day() == RFCDate.Day()) &&
			(listingStartTimeRFC.Hour() == RFCDate.Hour())	{
				return listingData["name"].(string), nil
		}
	}
	return "", errors.New("No shows found")
}


// Sends the ingester service a request
func (ingester) sendIngesterRequest(channel string, date string) (*http.Response, error){
	logger.Log("ingesterRequest", INGESTER_URL + "/" + channel + "/" + date)
	return http.Get(INGESTER_URL + "/" + channel + "/" + date)
}

// ErrEmpty is returned when an input string is empty.
var ErrEmpty = errors.New("empty string")
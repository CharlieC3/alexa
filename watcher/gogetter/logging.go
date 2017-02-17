package main

import (
	"time"
	"github.com/go-kit/kit/log"
)

type loggingMiddleware struct {
	logger log.Logger
	next   GoGetterService
}

func (mw loggingMiddleware) GoGet(channel string, date string) (output string, err error) {
	defer func(begin time.Time) {
		_ = mw.logger.Log(
			"method", "goget",
			"channel", channel,
			"date", date,
			"output", output,
			"err", err,
			"took", time.Since(begin),
		)
	}(time.Now())

	output, err = mw.next.GoGet(channel, date)
	return
}

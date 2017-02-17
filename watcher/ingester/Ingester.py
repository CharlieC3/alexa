import json
import urllib2
import datetime
import difflib

from flask import Flask
from flask import jsonify
app = Flask(__name__)

# Get the listing
base_url = 'http://api-app.espn.com/v1/watch/listings'
base_queries = '?type=live,upcoming&result=1000'
query_channel = 'networks='
query_date = 'dates='

api_channel_queries = ['ESPNEWS',
                       'ESPNU',
                       'ESPNDEPORTES',
                       'LONGHORN',
                       'SEC',
                       'SECPLUS',
                       'ACCEXTRA',
                       'ESPN2',
                       'ESPN3',
                       'ESPN']


def get_error_response(message):
    if not message:
        message = ''
    error_response = {
         'listings': [
            {
                'error': message,
                'name': '',
                'description': '',
                'startTime': '',
                'endTime': '',
                'channel': ''
            }
         ]
    }
    print(type(error_response))
    return error_response


def get_sanitized_response(api_full_response):
    if 'listings' not in api_full_response:
        return get_error_response('No Listings object found in API response')

    sanitized_response = {'listings': []}
    for item in api_full_response['listings']:

        # Error out response if one of the required items are missing
        if 'name' not in item:
            sanitized_response['listings'].append(get_error_response('Missing name')['listings'][0])
            continue
        if 'startTime' not in item:
            sanitized_response['startTime'].append(get_error_response('Missing startTime')['listings'][0])
            continue
        if 'endTime' not in item:
            sanitized_response['endTime'].append(get_error_response('Missing endTime')['listings'][0])
            continue

        if 'broadcasts' not in item:
            sanitized_response['listings'].append(get_error_response('Missing broadcasts')['listings'][0])
            continue
        elif len(item['broadcasts']) is 0:
            sanitized_response['listings'].append(get_error_response('Broadcasts is empty')['listings'][0])
            continue
        elif 'name' not in item['broadcasts'][0]:
            sanitized_response['listings'].append(get_error_response('Missing channel name')['listings'][0])
            continue

        sanitized_response['listings'].append({
            'name': item['name'],
            'description': item['description'],
            'startTime': item['startTime'],
            'endTime': item['endTime'],
            'channel': item['broadcasts'][0]['name']
        })

    return sanitized_response


def get_api_request_url(channel, date):
    api_request_url = base_url + base_queries

    if channel:
        if channel.upper() not in api_channel_queries:  # channel is present but not valid
            channel = difflib.get_close_matches(channel.upper(), api_channel_queries, 1, 0.4)
            if channel:
                channel = channel[0]
            else:
                channel = 'ESPN'
    else:
        channel = 'ESPN'

    api_request_url += ('&' + query_channel + channel)
    if date:
        api_request_url += ('&' + query_date + date)

    print("Request URL: " + api_request_url)
    return api_request_url


def get_api_listing(channel, date):
    api_request = urllib2.Request(get_api_request_url(channel, date))
    response_from_api = urllib2.urlopen(api_request)

    if response_from_api.getcode() is not 200:
        response_json = get_error_response('Failed to get listings- status code '+str(response_from_api.getcode()))
    else:
        response_json = json.loads(response_from_api.read())
        response_json = get_sanitized_response(response_json)

    return json.dumps(response_json)


@app.route('/get_listing/', defaults={'date': '', 'channel': ''})
@app.route('/get_listing/<channel>/', defaults={'date': ''})
@app.route('/get_listing/<channel>/<date>')
def get_listing(channel, date):
    print("Channel provided: "+channel)
    print("Date provided: "+date)
    print(type(date))
    if not date:
        date = datetime.datetime.now().strftime("%Y%m%d")
    else:
        date = date.replace('-', '')
    if not channel:
        channel = ''
    api_response = get_api_listing(channel, date)

    return app.response_class(
        response=api_response,
        status=200,
        mimetype='application/json'
    )

if __name__ == '__main__':
    app.run(host='0.0.0.0')



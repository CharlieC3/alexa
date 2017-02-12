from __future__ import print_function

import json
import difflib

# Use the list to check malformed values and get a closest match
channel_list = ['ESPN',
                'ESPN1',
                'E1',
                'ESPN2',
                'E2',
                'ESPN News',
                'ESPN U',
                'SEC',
                'SEC Plus',
                'Longhorn Network',
                'ESPN Deportes',
                'Deportes',
                'ESPN3',
                'E3']

api_channels_and_comparisons = {'ESPNEWS': [
                                    'ESPNEWS',
                                    'ESPN NEWS',
                                    'E S P N NEWS',
                                    'E NEWS'
                                ],
                                'ESPNU': [
                                    'ESPNU',
                                    'E S P N U',
                                    'E S P N YOU',
                                    'E U',
                                    'E YOU'
                                ],
                                'ESPNDEPORTES': [
                                    'ESPNDEPORTES',
                                    'ESPN DEPORTES',
                                    'E S P N DEPORTES',
                                    'DEPORTES'
                                ],
                                'LONGHORN': [
                                    'LONGHORN',
                                    'THE LONGHORN NETWORK',
                                    'LONGHORN NETWORK'
                                ],
                                'SEC': [
                                    'SEC',
                                    'S E C',
                                    'S E SEE',
                                    'SEC NETWORK',
                                ],
                                'SECPLUS': [
                                    'SECPLUS',
                                    'SEC PLUS',
                                    'S E C PLUS',
                                    'S E SEE PLUS',
                                    'SEC PLUS NETWORK',
                                ],
                                'ACCEXTRA': [
                                    'ACCEXTRA',
                                    'A C C EXTRA',
                                    'A SEE SEE EXTRA',
                                    'ACC',
                                    'A SEE SEE'
                                ],
                                'ESPN2': [
                                    'ESPN2',
                                    'ESPN 2',
                                    'E S P N 2',
                                    'ESPN TWO',
                                    'E S P N TWO',
                                    'E2',
                                    'E TWO'
                                ],
                                'ESPN3': [
                                    'ESPN3',
                                    'ESPN 3',
                                    'E S P N 3',
                                    'ESPN THREE',
                                    'E S P N THREE',
                                    'E3',
                                    'E THREE'
                                ],
                                'ESPN': [
                                    'ESPN',
                                    'ESPN 1',
                                    'E S P N',
                                    'E S P N 1',
                                    'ESPN ONE',
                                    'E S P N ONE',
                                    'E1',
                                    'E ONE'
                                ]
                                }
print(api_channels_and_comparisons)
print(type(api_channels_and_comparisons))

default_channel = 'ESPN'

channel_comparison_strings = []
for i in api_channels_and_comparisons:
    for j in i:
        channel_comparison_strings.append(j)

def get_channel_by_matched_comparison_string(comparison_string):
    for i in api_channels_and_comparisons:
        if comparison_string in i:
            return i

# if there is a fatal issue, populate and return this
def get_error_response(error_message):
    if type(error_message) is str:
        return {'error': error_message}
    else:
        return {'error': 'there was an error processing the intent'}


# For debugging
def walk_and_print(node):
    for key, item in node.items():
        if type(item) is 'dict':
            walk_and_print(item)
        else:
            print(item)


def get_sanitized_channel_name(channel_provided_by_skill):
    channel_provided_by_skill = channel_provided_by_skill.upper()
    if channel_provided_by_skill in api_channels_and_comparisons:
        return channel_provided_by_skill

    closest_match = difflib.get_close_matches(channel_provided_by_skill, channel_comparison_strings, 1, 0.65)
    if closest_match:
        return get_channel_by_matched_comparison_string(closest_match[0])

    return default_channel


# Event Handler - called when an utterance is given to the skill
def lambda_handler(event, context):
    if 'request' in event:
        if 'type' in event['request']:
            if event['request']['type'] == "LaunchRequest":
                return on_launch()  # TODO: respond to launch
            elif event['request']['type'] == "IntentRequest":
                return on_intent(event['request'])
            elif event['request']['type'] == "SessionEndedRequest":
                return on_session_ended()  # TODO: respond to session end
        else:
            return get_error_response('missing type in request')
    else:
        return get_error_response('missing request in event')
    return get_error_response('could not find a request type to process')


def on_intent(intent_request):
    if not 'intent' in intent_request:
        get_error_response('intent is not present in request')
    intent = intent_request['intent']
    print('Intent:')
    print(intent)

    if not 'name' in intent:
        return get_error_response('no name in intent')
    intent_name = intent['name']

    # Dispatch to intent handlers
    if intent_name == "Get_WhatsOnChannel":
        return on_get_intent_listing(intent)
    elif intent_name == "Get_PartyTime":
        return on_get_intent_party_time(intent)

    return get_error_response('Intent ' + intent_name + ' is not valid')


# return: response to skill
def on_get_intent_listing(intent_request):
    if not 'slots' in intent_request:
        return get_error_response('No Slots object found in intent')
    if not 'Channel' in intent_request['slots']:
        return get_error_response('No Channel object found in intent slots')

    channel_object = intent_request['slots']['Channel']

    if 'value' in channel_object:
        channel = get_sanitized_channel_name(channel_object['value'])
    else:
        channel = default_channel

    # if 'Team' in intent_request['slots']:
    #     if 'value' in intent_request['slots']['Team']:
    #         team = intent_request['slots']['Team']['value']
    #     else:
    #         team = 'none'
    # else:
    #     team = 'none'


    # if 'City' in intent_request['slots']:
    #     if 'value' in intent_request['slots']['City']:
    #         city = intent_request['slots']['City']['value']
    #     else:
    #         city = 'none'
    # else:
    #     city = 'none'

    if 'Date' in intent_request['slots']:
        if 'value' in intent_request['slots']['Date']:
            date = intent_request['slots']['Date']['value']
        else:
            date = 'none'
    else:
        date = 'none'

    response_text = 'You have requested the item on ' + channel
    if date == 'none':
        response_text += ' right now'
    else:
        response_text += ' at ' + date

    response_text += ' however I am not yet smart enough to answer that. Please ask Treb, for he is a god.'
    return {
        'version': '1.0',
        'sessionAttributes': {},
        'response': {
            'outputSpeech': {
                'type': 'PlainText',
                'text': response_text
            },
            'shouldEndSession': 'true'
        }
    }


def on_launch():
    print('on_launch handler reached')


def on_session_ended():
    print('on_session_ended handler reached')
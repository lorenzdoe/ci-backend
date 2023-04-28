#!/bin/sh

# test authenticate
curl -X GET -H "Authorization: Bearer myToken123" http://localhost:3000/todos
echo 

# without token
curl -X GET http://localhost:3000/todos
echo 

# create new todo
curl --location --request POST 'http://localhost:3000/todos' \
--header 'Authorization: Bearer myToken123' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Buy milk"
}'
echo 

# get created todos
curl --location --request GET 'http://localhost:3000/todos' \
--header 'Authorization: Bearer myToken123'
echo 
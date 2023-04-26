#!/bin/sh

# create new todo
curl --location --request POST 'http://localhost:3000/todos' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Buy milk"
}'
echo 

# get created todos
curl --location --request GET 'http://localhost:3000/todos'
echo 
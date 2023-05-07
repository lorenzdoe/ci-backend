#!/bin/sh

# Create User
echo "1) CREATE USERS (Registration)"
curl -i -X POST http://localhost:3000/users --header "Content-Type: application/json" \
-d "{\"username\":\"papaschlumpf\", \"password\":\"strenggeheim\"}"
echo
read -p "Press any key to resume ..." null
echo "------------------------------"

# Create User - Username already exists
echo "ERROR - Username already exists"
curl -i -X POST http://localhost:3000/users --header "Content-Type: application/json" \
-d "{\"username\":\"papaschlumpf\", \"password\":\"strenggeheim\"}"
echo
read -p "Press any key to resume ..." null
echo "------------------------------"

# Create User - Wrong named parameter
echo "WRONG NAMED PARAMETER"
curl -i -X POST http://localhost:3000/users --header "Content-Type: application/json" \
-d "{\"name\":\"papaschlumpf\", \"password\":\"strenggeheim\"}"
echo
read -p "Press any key to resume ..." null
echo "------------------------------"

echo .
echo "-----------------------------------------------------------------------------------------"
# LOGIN - User
echo "2) LOGIN correct"
curl -i -X POST http://localhost:3000/sessions --header "Content-Type: application/json" \
-d "{\"username\":\"papaschlumpf\", \"password\":\"strenggeheim\"}"
echo
read -p "Press any key to resume ..." null
echo "------------------------------"

# LOGIN - User
echo "2) LOGIN wrong password"
curl -i -X POST http://localhost:3000/sessions --header "Content-Type: application/json" \
-d "{\"username\":\"papaschlumpf\", \"password\":\"wrong\"}"
echo
read -p "Press any key to resume ..." null
echo "------------------------------"

# LOGIN - User
echo "2) LOGIN wrong username"
curl -i -X POST http://localhost:3000/sessions --header "Content-Type: application/json" \
-d "{\"username\":\"not_found\", \"password\":\"wrong\"}"
echo
read -p "Press any key to resume ..." null
echo "------------------------------"

echo .
echo "-----------------------------------------------------------------------------------------"
# Authentication (protected route todo)
echo "3) AUTHENTICATION (protected route todo)"
echo "SHOULD FAIL - wrongToken"
curl -i -X GET http://localhost:3000/todos -H "Authorization: Bearer myToken123"
echo 
read -p "Press any key to resume ..." null
echo "------------------------------"


# without token
echo "WITHOUT TOKEN"
echo "without authorization token - should fail"
curl -i -X GET http://localhost:3000/todos
echo 
read -p "Press any key to resume ..." null
echo "------------------------------"

# right token
echo "RIGHT TOKEN"
curl -i -X GET http://localhost:3000/todos -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhcGFzY2hsdW1wZiIsImlhdCI6MTY4MzQ3MTQwMywiZXhwIjoxNjgzNDc1MDAzfQ.Hste1oX13bVVyaFdNBas_8sM7tUuzMipC21sjgccZZI"
echo 
read -p "Press any key to resume ..." null
echo "------------------------------"

# create new todo
curl -i --location --request POST 'http://localhost:3000/todos' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhcGFzY2hsdW1wZiIsImlhdCI6MTY4MzQ3MTQwMywiZXhwIjoxNjgzNDc1MDAzfQ.Hste1oX13bVVyaFdNBas_8sM7tUuzMipC21sjgccZZI' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Buy milk"
}'
echo 
read -p "Press any key to resume ..." null
echo "------------------------------"


# get created todos
curl -i --location --request GET 'http://localhost:3000/todos' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhcGFzY2hsdW1wZiIsImlhdCI6MTY4MzQ2NTA2MCwiZXhwIjoxNjgzNDY4NjYwfQ.wjJQUigbzyeNWSGjZsvDm3vfDDgbe697AJNEhxwKKpE'
echo
echo "------------------------------"

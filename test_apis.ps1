# Task 13
curl.exe -X GET http://localhost:3001/api/gifts > mainpage

# Task 14
curl.exe -X POST http://localhost:3001/api/auth/register -H "Content-Type: application/json" -d '{\"email\":\"test@test.com\", \"password\":\"password\"}' > register

# Task 15
curl.exe -X POST http://localhost:3001/api/auth/login -H "Content-Type: application/json" -d '{\"email\":\"test@test.com\", \"password\":\"password\"}' > login

# Task 16 - First get an ID
$gifts = curl.exe -s -X GET http://localhost:3001/api/gifts
$firstId = ($gifts | ConvertFrom-Json)[0]._id
curl.exe -X GET http://localhost:3001/api/gifts/$firstId > item_detail

# Task 17
curl.exe -X GET "http://localhost:3001/api/search?category=Furniture" > search_item

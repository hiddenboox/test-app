# API Documentation

## Run api server

In directory `api` run commands:

`npm i` - install dependencies

`npm start` 

This will run local api server based on [JSON server](https://github.com/typicode/json-server) on address http://localhost:8080.


## API  

Available resources:

`/users` - list of the users

```json
{
      "name": "Brenda Jakubowski",
      "username": "Darby.Haag",
      "email": "Cicero_Hermann24@gmail.com",
      "address": {
        "street": "Jaylen Underpass",
        "suite": "Apt. 134",
        "city": "Lake Adellaview",
        "zipcode": "39704-2194",
        "geo": {
          "lat": "-63.1949",
          "lng": "114.8543"
        }
      },
      "phone": "825-356-9347",
      "website": "candida.name",
      "company": {
        "name": "Kohler - Reinger",
        "catchPhrase": "Managed context-sensitive solution",
        "bs": "streamline scalable paradigms"
      }
    }
```


Pagination query params:

`_page` - number of the page

`_limit` - the size of the page

If would be need to get one element it is possible to use filter functionality: 

`GET  http://localhost:8080/users?username=Darby.Haag`




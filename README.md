# calculator

### Docker

`running docker builds and publish calculator-client`

```sh
$   ./scripts/publish.sh
```
### Running docker-compose

```sh
$   docker-compose up -d
```

#### `GET` `/product`
- Method: `GET`
- Endpoint: `/product`
- Curl example: Empty header `x-user-id` 

    ```sh
    $    curl --location --request GET 'http://localhost:3000/product'
    ```
    
- Response:
    ```json
    [
        {
            "id": "001",
            "title": "Whisky Chivas",
            "description": "Chivas",
            "price_in_cents": 12000,
            "discount": {
                "percentage": 0,
                "value_in_cents": 0
            }
        },
        {
            "id": "002",
            "title": "Whisky Blue Label",
            "description": "Blue Label",
            "price_in_cents": 25000,
            "discount": {
                "percentage": 0,
                "value_in_cents": 0
            }
        },
        {
            "id": "003",
            "title": "Whisky Dalmore",
            "description": "Dalmore",
            "price_in_cents": 55000,
            "discount": {
                "percentage": 0,
                "value_in_cents": 0
            }
        }
    ]
    ```
    
- Curl example: If it's the user’s birthday, the product has 5% discount. 02/12/YYYY

    ```sh
    $    curl --location --request GET 'http://localhost:3000/product' --header 'x-user-id: 001'
    ```
    
- Response:
    ```json
    [
        {
            "id": "001",
            "title": "Whisky Chivas",
            "description": "Chivas",
            "price_in_cents": 12000,
            "discount": {
                "percentage": 5,
                "value_in_cents": 11400
            }
        },
        {
            "id": "002",
            "title": "Whisky Blue Label",
            "description": "Blue Label",
            "price_in_cents": 25000,
            "discount": {
                "percentage": 5,
                "value_in_cents": 23750
            }
        },
        {
            "id": "003",
            "title": "Whisky Dalmore",
            "description": "Dalmore",
            "price_in_cents": 55000,
            "discount": {
                "percentage": 5,
                "value_in_cents": 52250
            }
        }
    ]
    ```
    
- Curl example: If it is black friday (for this test you can assume BlackFriday is November 25th), the product has 10% discount 25/11/YYYY

    ```sh
    $    curl --location --request GET 'http://localhost:3000/product' --header 'x-user-id: 001'
    ```
    
- Response:
    ```json
    [
        {
            "id": "001",
            "title": "Whisky Chivas",
            "description": "Chivas",
            "price_in_cents": 12000,
            "discount": {
                "percentage": 10,
                "value_in_cents": 10800
            }
        },
        {
            "id": "002",
            "title": "Whisky Blue Label",
            "description": "Blue Label",
            "price_in_cents": 25000,
            "discount": {
                "percentage": 10,
                "value_in_cents": 22500
            }
        },
        {
            "id": "003",
            "title": "Whisky Dalmore",
            "description": "Dalmore",
            "price_in_cents": 55000,
            "discount": {
                "percentage": 10,
                "value_in_cents": 49500
            }
        }
    ]
    ```

- Curl example: No product discount can be bigger than 10%

    ```sh
    $    curl --location --request GET 'http://localhost:3000/product' --header 'x-user-id: 002'
    ```
    
- Response:
    ```json
    [
        {
            "id": "001",
            "title": "Whisky Chivas",
            "description": "Chivas",
            "price_in_cents": 12000,
            "discount": {
                "percentage": 10,
                "value_in_cents": 10800
            }
        },
        {
            "id": "002",
            "title": "Whisky Blue Label",
            "description": "Blue Label",
            "price_in_cents": 25000,
            "discount": {
                "percentage": 10,
                "value_in_cents": 22500
            }
        },
        {
            "id": "003",
            "title": "Whisky Dalmore",
            "description": "Dalmore",
            "price_in_cents": 55000,
            "discount": {
                "percentage": 10,
                "value_in_cents": 49500
            }
        }
    ]
    ```

- Curl example: If service 1 errors while calculating a discount, the service must returns the product list but with zero discounts for the affected products.

    ```sh
    $   docker-compose stop calculator-grpc
    ```

    ```sh
    $    curl --location --request GET 'http://localhost:3000/product' --header 'x-user-id: 001'
    ```       
    
- Response:
    ```json
    [
        {
            "id": "001",
            "title": "Whisky Chivas",
            "description": "Chivas",
            "price_in_cents": 12000,
            "discount": {
                "percentage": 0,
                "value_in_cents": 0
            }
        },
        {
            "id": "002",
            "title": "Whisky Blue Label",
            "description": "Blue Label",
            "price_in_cents": 25000,
            "discount": {
                "percentage": 0,
                "value_in_cents": 0
            }
        },
        {
            "id": "003",
            "title": "Whisky Dalmore",
            "description": "Dalmore",
            "price_in_cents": 55000,
            "discount": {
                "percentage": 0,
                "value_in_cents": 0
            }
        }
    ]
    ``` 


#### `GET` `/users`
- Method: `GET`
- Endpoint: `/users`

    ```sh
    $    curl --location --request GET 'http://localhost:3000/users'
    ```
    
- Response:
    ```json
    [
        {
            "_id": "001",
            "firstname": "Rami",
            "lastname": "Marriott",
            "dateofbirth": "1990-12-02T00:00:00.000Z"
        },
        {
            "_id": "002",
            "firstname": "Matt",
            "lastname": "Bridges",
            "dateofbirth": "1988-11-25T00:00:00.000Z"
        },
        {
            "_id": "003",
            "firstname": "Aidan",
            "lastname": "Craig",
            "dateofbirth": "1985-05-10T00:00:00.000Z"
        }
    ]
    ```
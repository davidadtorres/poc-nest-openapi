# PoC Nest-OpenAPI
Build a simple CRUD API demo to pets managements. The specification of this API is defined using OpenAPI wrapper for Nest.js.

## Table of Contents
1. [Technologies](#technologies)
2. [Development](#development)
    - [Database schema](#datase-schema)
    - [API design](#api-design)
    - [.env](#env)
    - [OpenAPI](#openapi)
3. [Improvements](#improvements)
4. [Conclusion](#conclusion)

<a name="technologies"></a>
## Technologies
| Name                        | Version     | Notes                                             |
|-----------------------------|-------------|---------------------------------------------------|
| Nest.js                     | 8.0.0       |                                                   |
| Express.js                  | 4.17.1      |                                                   |
| TypeScript                  | 4.4.2       |                                                   |
| swagger-ui-express          | 4.1.6       | NPM specific package                              |
| OpenAPI Specification       | 3.0.3       |                                                   |
| Mongoose                    | 6.0.5       |                                                   |   
| SuperTest                   | 6.1.6       |                                                   |
| Jest                        | 27.1.1      |                                                   |
| class-validator             | 0.13.1      | NPM specific package                              |

<a name="development"></a>
## Development

<a name="api-design"></a>
### **Database schema**

- *createdAt: Date = Date.now
- updatedAt: Date
- ***chipCode**: string
- *name: string
- *breed: string
- age: number
- owners: []
- *isLost: boolean

<a name="api-design"></a>
### **API design**
<u>List all pet data:</u>

```
GET /api/pets?name=<PET_NAME>
```

<u>Add a new pet:</u>

```
POST /api/pets
```

<u>Modify a pet:</u>

```
PUT /api/pets/{id}
```


<u>Remove a pet:</u>

```
DELETE /api/pets/{id}
```

<a name="env"></a>
### **.env**

```sh
# MongoDB configuration
DB_URI=mongodb+srv://<user>:<pass>@<host>/<database>?retryWrites=true&w=majority
```

<a name="openapi"></a>
### **OpenAPI**

OpenAPI Specification URL:

```
http://localhost:3000/swagger
```

<a name="improvements"></a>
## Improvements
no improvement identified.

<a name="conclusion"></a>
## Conclusion
It's verified, it's possible to create a complete API specification using the OpenAPI wrapper of Nest.js.

`Initiated at July 9, 2021`
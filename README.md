# PoC Nest-OpenAPI
Build a simple CRUD API demo to pets managements. The specification of this API is defined using OpenAPI wrapper for Nest.js.

## Table of Contents
1. [Technologies](#technologies)
2. [Development](#development)
    - [Database schema](#database-schema)
    - [API design](#api-design)
    - [.env](#env)
    - [OpenAPI](#openapi)
3. [Getting started](#getting-started)
   - [Packages](#packages)
   - [Source code](#source-code)
   - [Running](#running)
4. [Improvements](#improvements)
5. [References](#references)
6. [Changelog](#changelog)
7. [License](#license)
8. [Conclusion](#conclusion)

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

<a name="database-schema"></a>
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
DB_URI=mongodb+srv://<user>:<pass>@<host:port>/<database>?retryWrites=true&w=majority
#DB_URI=mongodb://<user>:<pass>@<host:port>/<database>?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false
```

<a name="openapi"></a>
### **OpenAPI**

OpenAPI Specification URL:

```
http://localhost:3000/swagger
```

<a name="getting-started"></a>
## Getting started
no improvement identified.

<a name="packages"></a>
### **Packages**

```sh
npm install @nestjs/config @nestjs/mongoose @nestjs/swagger \
            class-transformer class-validator mongoose swagger-ui-express
```

<a name="source-code"></a>
### **Source code**

Add these lines to the next files:

**/src/main.ts**
```javascript
[...]
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3000);
}
[...]
```
**src/app.module.ts**
```javascript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PetsModule } from './pets/pets.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI),
    PetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```
Remove these files:
- **src/app.service.ts**
- **src/app.controller.ts**
- **src/app.controller.spec.ts**

Create **src/pets** directory like [this](https://github.com/davidadtorres/poc-nest-openapi/tree/master/src/pets)

Create **E2E tests** like [this](https://github.com/davidadtorres/poc-nest-openapi/tree/master/test)

<a name="running"></a>
### **Running**

**Run DEV server:**
```bash
npm run start:dev
```

**Run Unit tests:**
```bash
npm run test:watch
```

<a name="improvements"></a>
## Improvements
no improvement identified.

<a name="references"></a>
## References
n/a

<a name="changelog"></a>
## Changelog
[CHANGELOG.md](./CHANGELOG.md)

<a name="license"></a>
## License
[MIT License](./LICENSE)

<a name="conclusion"></a>
## Conclusion
It's possible to create a complete API specification using the OpenAPI wrapper of Nest.js.


*`Initiated at July 9, 2021`*

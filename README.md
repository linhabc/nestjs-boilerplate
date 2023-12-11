# Nestjs template

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Prisma

```bash
npx prisma migrate
```

## Docker

```bash
docker build -t nestjs-demo .

docker run -d -t -p 3000:3000 --env-file .env nest-prisma-server
```

## Nestjs flow

- <https://docs.nestjs.com/faq/request-lifecycle>
- middleware -> guards -> interceptors-> pipes -> **handler** -> interceptors

## Template Components

### Prisma set up

- <https://docs.nestjs.com/recipes/prisma>

### Auth stategy modules

- Passport local: <https://docs.nestjs.com/recipes/passport#implementing-passport-local>
- Passport jwt: <https://docs.nestjs.com/recipes/passport#implementing-passport-jwt>
- Create custom decorator for public routes: <https://docs.nestjs.com/recipes/passport#enable-authentication-globally>

### Using Guard for authorization

- Using with Passport stategy

- Role base: <https://docs.nestjs.com/guards#role-based-authentication>

### Validation pipe

- Validate and transform with packages *class-validator, class-transformer*
: <https://docs.nestjs.com/techniques/validation#validation>

### Interceptor for logging

- <https://docs.nestjs.com/interceptors#interceptors>

### Health checks

- <https://docs.nestjs.com/recipes/terminus>

### Nest miscroservices

- **Transporter** responsible for transmitting messages betwwen different microservice instances.
- Built-in transporter: Redis, Mqtt, Nats, RabbitMQ, Kafka, Grpc

#### Custom transporter

- <https://dev.to/nestjs/integrate-nestjs-with-external-services-using-microservice-transporters-part-3-4m20>

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
$ npx prisma migrate
```

## Docker
```bash
$ docker build -t nestjs-demo .

$ docker run -d -t -p 3000:3000 --env-file .env nest-prisma-server
```

# Nestjs flow
- https://docs.nestjs.com/faq/request-lifecycle
- middleware -> guards -> interceptors-> pipes -> **handler** -> interceptors 

# Template Components
## Description

The repository is the backend of a To-do list made in NodeJS with the NestJS framework using PostgreSQL as the database and TypeORM as the ORM.

Note: The project was made with NodeJS version 20.12.2.

[Here](https://github.com/ClaudioCJunior/To-Do-List-Front.git) is the repository for the Front-End.

## Installation

```bash
$ yarn install
```

## Add file .env

```bash
JWT_SECRET="C709C85D874A9FAE4E57226BFA1A94B5"
JWT_EXPIRES_IN=10min

NODE_ENV=development

#DB DESENV
DB_USERNAME=postgres
DB_PASSWORD=admin
DB_DATABASE=todolist
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres

```
Note: Modify the information as needed.

## Running the seeds

```bash
$ yarn run seed
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

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Stay in touch

- Author - [Claudio Cruz](https://www.linkedin.com/in/claudio-cruz-91156b142)



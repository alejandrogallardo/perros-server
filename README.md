<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Descripcion
Servidor para practicas con Docker

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## MONGODB
```angular2html
npm i @nestjs/mongoose mongoose
```

## VALIDACIONES
```angular2html
npm install class-validator class-transformer
npm install dotenv joi
```

## PERROS
```angular2html
nest g res perros
nest g res personas
```
## COMANDOS
```angular2html
git tag -d nombretag
git tag -a v1.0.0 -m "Primera version"
git tag -a v0.1.0 hash -m ""
git show v1.0.0

docker compose down --volumes
docker compose up

docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up
```


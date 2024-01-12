# jj-it-fetcher

Job board scraper.

## Description

This project is an api scraper written with `Deno` and `Oak`. It let's you aggregate Job offers and save them to DB of your liking. Feel free to fork and adjust it to scrape offers fledged to your profile.

## Getting Started

### Dependencies

- deno 1.39.1

### Installing

- Set environment variables in `.env` file (create it in root of the project). Get your Database connection string. [Getting database String for Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-node-mysql)

```sh
DATABASE_URL=<databaseURL> #your database connection string
PORT=8000 #Port for the process
```

- Install Deno ([Installing Deno](https://docs.deno.com/runtime/manual/getting_started/installation))

```sh
brew install deno # for macOS
```

- Create schemas in db with Prisma ([Quick Prisma deep dive](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql))

```sh
deno task db-push
```

> Check the Modding section on how to adjust the scraper

### Running Scraper

- Start server locally

```sh
deno task start
```

- With docker

```sh
deno task docker-build

docker run -it -p 8000:8000 jj-it-fetcher
```

## Tuning the scraper

### Adjusting scrape parameters

Lets assume you only want to scrape api with predefined set of query strings that match what you're looking for. In each fetch module you'll find `config.ts` file which exports `linkFunction`. This function is what scraper uses to get the data. You can modify it by adding query params to the url.

> WARNING: Some api endpoints are accepting arguments payload, for then there will be a `payload` const in `config.ts` which needs to be adjusted.

## Authors

[@TheKohan](https://twitter.com/The_Kohan)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

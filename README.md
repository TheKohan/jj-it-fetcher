![image](https://github.com/TheKohan/jj-it-fetcher/assets/63232710/101e853b-f9a6-4c31-92bc-02b84aadff6d)

# jj-it-fetcher

Job board scraper with minimalistic web ui. You can check the live version [here](https://jj-it-fetcher.kohan.dev/app).

## Description

This project is an api scraper written with `Bun`, `Hono`,`Supabase` `Vite` and `React`. It Aggregates job offers from multiple services like `justjoinit` or `nofluffjobs`, lets you preview new offers or set up `Discord` webhook based notification to get notified whenever there are job opportunities you cannot miss ! Feel free to fork and adjust it to scrape offers fledged to your profile. You can also drop `feature-request` or `issue` that will be worth looking at.

## Getting Started

### Dependencies

- bun cli
- supabase project set-up

### Installing

- Set environment variables in `.env` file (create it in root of the project). Follow [this](https://supabase.com/partners/integrations/prisma) guide to connect your prisma client to Supabase.

```sh
SUPABASE_URL=<supabaseUrl> #url for your supabase project
SUPABASE_API_KEY=<supabaseApiKey> #api key for your supabase project
DIRECT_URL=<directURL> # db direct url
DATABASE_URL=<databaseURL> #your database connection string
DISCORD_WEBHOOK_URL=<webhookURL> #webhook url for your discord channel
PORT=8000 #Port for the process
```

- Install [Bun](https://bun.sh/)

```sh
curl -fsSL https://bun.sh/install | bash
```

- Create schemas in db with Prisma ([Quick Prisma deep dive](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql))

```sh
bun db-push
```

> Check the Modding section on how to adjust the scraper

### Start Api

- Start server locally

```sh
bun run-dev:api
```

- With docker

```sh
bun docker-build

docker run -it -p 8000:8000 jj-it-fetcher
```

### Start Dashboard

- Start dashboard locally

```sh
bun run-dev:web
```

## Tuning the scraper

### Adjusting scrape parameters

Lets assume you only want to scrape api with predefined set of query strings that match what you're looking for. In each fetch module you'll find `config.ts` file which exports `linkFunction`. This function is what scraper uses to get the data. You can modify it by adding query params to the url.

> WARNING: Some api endpoints are accepting arguments payload, for then there will be a `payload` const in `config.ts` which needs to be adjusted.

## Authors

[@TheKohan](https://twitter.com/The_Kohan)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

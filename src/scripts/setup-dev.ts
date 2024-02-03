import { $ } from 'bun';

/**
 * Start the docker compose environment with postgres.
 */
await $`docker compose up -d`;

/**
 * This script is used to setup the development environment.
 */
await $`echo > .env.local`;
await $`echo PORT=8000 >> .env.local`;
await $`echo DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=jj-it-fetcher&connection_limit=5&socket_timeout=3" >> .env.local`;
await $`echo DISCORD_WEBHOOK_URL="<your-discord-webhook>" >> .env.local`;

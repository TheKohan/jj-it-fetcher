import { $ } from 'bun';

const { DATABASE_URL, DISCORD_WEBHOOK_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL Missing');
}
if (!DISCORD_WEBHOOK_URL) {
  throw new Error('DISCORD_WEBHOOK_URL Missing');
}

await $`docker build \
        --tag "jj-it-fetcher" \
        --build-arg DATABASE_URL=${DATABASE_URL} \
        --build-arg DISCORD_WEBHOOK_URL=${DISCORD_WEBHOOK_URL} \
        -f "./Dockerfile" \
        .`;

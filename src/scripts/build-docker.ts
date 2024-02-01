import { $ } from 'bun';
import { parseArgs } from 'util';

const platforms = ['amd', 'arm'] as const;

type Platforms = (typeof platforms)[number];

const platformConfig: Record<Platforms, string> = {
  amd: 'linux/amd64',
  arm: 'linux/arm64',
};

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    platform: {
      type: 'string',
      short: 'p',
      default: 'arm',
    },
  },
  strict: true,
  allowPositionals: true,
});

const { DATABASE_URL, DISCORD_WEBHOOK_URL } = process.env;
const { platform } = values;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL Missing');
}
if (!DISCORD_WEBHOOK_URL) {
  throw new Error('DISCORD_WEBHOOK_URL Missing');
}
if (!platforms.includes(platform as Platforms)) {
  throw new Error(
    `Unsupported platform, please use one of the following: ${platforms.join(
      ', '
    )}`
  );
}

await $`docker build \
        --tag "jj-it-fetcher" \
        --build-arg DATABASE_URL=${DATABASE_URL} \
        --build-arg DISCORD_WEBHOOK_URL=${DISCORD_WEBHOOK_URL} \
        --platform ${platformConfig[platform as Platforms]} \
        -f "./Dockerfile" \
        .`;

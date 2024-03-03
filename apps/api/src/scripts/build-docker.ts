import { parseArgs } from "util";
import { $ } from "bun";

const platforms = ["amd", "arm"] as const;

type Platforms = (typeof platforms)[number];

const platformConfig: Record<Platforms, string> = {
  amd: "linux/amd64",
  arm: "linux/arm64",
};

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    platform: {
      type: "string",
      short: "p",
      default: "arm",
    },
  },
  strict: true,
  allowPositionals: true,
});

const {
  DIRECT_URL,
  DATABASE_URL,
  DISCORD_WEBHOOK_URL,
  SUPABASE_URL,
  SUPABASE_API_KEY,
  SUPABASE_JWT_SECRET,
} = process.env;
const { platform } = values;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL Missing");
}
if (!SUPABASE_API_KEY) {
  throw new Error("SUPABASE_API_KEY Missing");
}
if (!SUPABASE_URL) {
  throw new Error("SUPABASE_URL Missing");
}
if (!SUPABASE_JWT_SECRET) {
  throw new Error("SUPABASE_JWT_SECRET Missing");
}
if (!DIRECT_URL) {
  throw new Error("DIRECT_URL Missing");
}
if (!DISCORD_WEBHOOK_URL) {
  throw new Error("DISCORD_WEBHOOK_URL Missing");
}
if (!DISCORD_WEBHOOK_URL.startsWith("https://")) {
  throw new Error("DISCORD_WEBHOOK_URL must start with https://");
}
if (!platforms.includes(platform as Platforms)) {
  throw new Error(
    `Unsupported platform, please use one of the following: ${platforms.join(
      ", "
    )}`
  );
}

await $`docker build \
        --tag "jj-it-fetcher" \
        --build-arg DATABASE_URL=${DATABASE_URL} \
        --build-arg DIRECT_URL=${DIRECT_URL} \
        --build-arg DISCORD_WEBHOOK_URL=${DISCORD_WEBHOOK_URL} \
        --build-arg SUPABASE_URL=${SUPABASE_URL} \
        --build-arg SUPABASE_API_KEY=${SUPABASE_API_KEY} \
        --build-arg SUPABASE_JWT_SECRET=${SUPABASE_JWT_SECRET} \
        --platform ${platformConfig[platform as Platforms]} \
        -f "./Dockerfile" \
        .`;

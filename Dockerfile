# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as build

WORKDIR /app

COPY bun.lockb .
COPY package.json .
COPY tsconfig.json .
COPY prisma ./prisma

RUN bun install --frozen-lockfile

COPY src ./src
COPY generated ./generated

ARG DATABASE_URL
ARG DISCORD_WEBHOOK_URL

ENV NODE_ENV production
ENV TZ="Europe/Warsaw"
ENV DATABASE_URL=${DATABASE_URL}
ENV DISCORD_WEBHOOK_URL=${DISCORD_WEBHOOK_URL}
ENV DIRECT_URL=${DIRECT_URL}
ENV PORT=8000

RUN date

EXPOSE 8000

# execute the binary
CMD bun start

# docker save <image> | bzip2 | ssh user@host docker load

FROM denoland/deno:ubuntu-1.39.2 as base

ARG DATABASE_URL
ARG DISCORD_WEBHOOK_URL

ENV TZ="Europe/Warsaw"
ENV DATABASE_URL=${DATABASE_URL}
ENV DISCORD_WEBHOOK_URL=${DISCORD_WEBHOOK_URL}
ENV PORT=8000

RUN date
 
RUN apt-get update -y && apt-get install -y openssl
# The port that your application listens to.


WORKDIR /app

# Prefer not to run as root.
USER deno

# These steps will be re-run upon each file change in your working directory:
ADD . .

# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts

EXPOSE 8000

CMD ["deno", "task", "start"]


# docker save <image> | bzip2 | ssh user@host docker load

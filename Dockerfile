FROM denoland/deno:ubuntu-1.39.2 as base

ARG PORT=8000 

ENV TZ="Europe/Warsaw"

RUN date
 
RUN apt-get update -y && apt-get install -y openssl
# The port that your application listens to.
EXPOSE ${PORT}

WORKDIR /app

# Prefer not to run as root.
USER deno

# These steps will be re-run upon each file change in your working directory:
ADD . .

# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts

CMD ["deno", "task", "start"]


# docker save <image> | bzip2 | ssh user@host docker load

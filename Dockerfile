FROM denoland/deno:ubuntu-1.39.2 as base

ENV TZ="Europe/Warsaw"

RUN date
 
RUN apt-get update -y && apt-get install -y openssl
# The port that your application listens to.
EXPOSE 8000

WORKDIR /app

# Prefer not to run as root.
USER deno

# These steps will be re-run upon each file change in your working directory:
ADD . .

# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts

CMD ["run", "-A", "main.ts"]

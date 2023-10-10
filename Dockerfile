FROM ghcr.io/hazmi35/node:18-dev-alpine as build-stage

LABEL name "SOTN Discord Bot (Docker Build)"
LABEL maintainer "KagChi"

WORKDIR /tmp/build

RUN corepack enable && corepack prepare pnpm@latest

RUN apk add --no-cache build-base git python3

COPY package*.json .
COPY pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

RUN pnpm prune --production

FROM ghcr.io/hazmi35/node:18-alpine

LABEL name "SOTN Discord Bot Production"
LABEL maintainer "KagChi"

WORKDIR /app

RUN apk add --no-cache tzdata git

COPY --from=build-stage /tmp/build/package.json .
COPY --from=build-stage /tmp/build/pnpm-lock.yaml .
COPY --from=build-stage /tmp/build/node_modules ./node_modules
COPY --from=build-stage /tmp/build/dist ./dist

CMD node -r dotenv/config dist/index.js
# syntax:docker/dockerfile:1

FROM node:16.15.1-alpine3.16 AS base

WORKDIR /app
COPY [ "package.json","yarn.lock","./" ]

FROM base AS dev
ENV NODE_ENV=development
RUN yarn install --frozen-lockfile
COPY . .
CMD [ "yarn", "start:dev" ]

FROM dev AS test
ENV NODE_ENV=test
CMD [ "yarn", "test" ]

FROM test AS test-cov
CMD [ "yarn", "test:cov" ]

FROM dev AS test-watch
ENV GIT_WORK_TREE=/app GIT_DIR=/app/.git
RUN apk add git
CMD [ "yarn", "test:watch" ]

FROM base AS prod
ENV NODE_ENV=production
RUN yarn install --frozen-lockfile --production
COPY . .
RUN yarn add global @nestjs/cli
RUN yarn build
CMD [ "yarn", "start:prod" ]
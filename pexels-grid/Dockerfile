FROM node:20-alpine AS builder

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY . .

RUN yarn

RUN yarn build

RUN rm -rf node_modules

FROM node:20-alpine

COPY --from=builder /home/node/app/ /home/node/app/

WORKDIR /home/node/app/

ENTRYPOINT ["node", ".next/standalone/server.js"]
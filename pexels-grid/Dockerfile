FROM node:20-alpine
COPY . .
RUN yarn
RUN yarn build
ENTRYPOINT ["yarn", "start"]
FROM node:20-alpine
COPY . .
RUN yarn
RUN yarn build
RUN rm -rf node_modules
ENTRYPOINT ["node", ".next/standalone/server.js"]
FROM node:18-alpine3.18 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./src .
COPY ./prisma .
COPY ./tsconfig.json .
COPY ./package.json .

RUN npm run build

FROM node:18-alpine3.18
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY --chown=node package*.json ./
RUN npm install
EXPOSE 3000
COPY --chown=node --from=builder /usr/src/app/dist ./dist
USER node
CMD [ "node", "dist/server.js" ]

FROM node:18.12.1 as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run tsc


FROM node:18.12.1
# create app directory
WORKDIR /usr/src/app
# set the 
ENV NODE_ENV production

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

EXPOSE 3000
COPY --from=builder /usr/src/app/dist ./
CMD [ "node", "server.js" ]

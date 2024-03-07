FROM node:18-alpine3.18 as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:18-alpine3.18


# create app directory
WORKDIR /usr/src/app
# set the 
ENV NODE_ENV production

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node package*.json ./

RUN npm install
# expose the port 3000
EXPOSE 3000
# copy dist files to dist forlder in the execution file 
COPY --chown=node --from=builder /usr/src/app/dist ./dist

# Define a health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -fs http://localhost:3000/health || exit 1

# Create a user to run the container 
USER node
CMD [ "node", "dist/server.js" ]

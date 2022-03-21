FROM node:alpine

ENV NPM_CONFIG_PREFIX=/usr/src/api/.npm-global
ENV PATH=$PATH:/usr/src/api/.npm-global/bin

WORKDIR /usr/src/api

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001

RUN chown node:node /usr/src/api
USER node

CMD ["npm", "run", "server"]

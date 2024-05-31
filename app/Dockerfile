FROM node:alpine as base

WORKDIR /usr/src/app

ARG port=3000

COPY package.json ./

RUN npm install

COPY . .

FROM base as builder

ARG base_path="/"
ENV REACT_APP_BASE_PATH=$base_path

RUN npm run build

FROM nginx

ARG port=8080
EXPOSE $port

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

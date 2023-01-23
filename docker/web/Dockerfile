FROM node:18.13 as build-js

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN cd /app \
  && yarn install --frozen-lockfile

COPY . /app

RUN cd /app \
  && yarn build \
  && yarn export

FROM nginx:1.23 as web

COPY --from=build-js /app/out /usr/share/nginx/html

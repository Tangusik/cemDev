FROM node:20.10-alpine

WORKDIR /code/frontend

ADD *.json ./

ADD ./public ./public
ADD ./src ./src

RUN npm install
RUN npm update



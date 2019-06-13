FROM node:8.10.0

RUN mkdir /web

COPY . /web

WORKDIR /web

RUN npm install

CMD node run.js
FROM node:8.10.0

RUN mkdir /web

COPY . /web

WORKDIR /web

EXPOSE 80/udp

RUN npm install

CMD node run.js
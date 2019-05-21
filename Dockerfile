FROM node:carbon

RUN mkdir /app

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY ./run.js ./run.js

CMD node run.js
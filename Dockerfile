FROM node:8.10.0

RUN mkdir /web

WORKDIR /web

COPY ./package.json .

RUN npm install

COPY ./run.js ./run.js

ADD ./ ./

EXPOSE 4444

CMD node run.js
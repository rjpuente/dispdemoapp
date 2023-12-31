FROM node:18.16.0

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 19006

RUN npm run

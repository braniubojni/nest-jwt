FROM node:16.13.0

WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN yarn install

COPY . .

COPY ./dist ./dist

CMD ["yarn", "start:dev"]
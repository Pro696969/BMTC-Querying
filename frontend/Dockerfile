ARG NODE_VERSION=20.14.0

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install --force

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

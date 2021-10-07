FROM node:14.16.0-alpine
WORKDIR /usr/src/app
ADD package*.json ./
RUN npm install
ADD . .
CMD npm run dev

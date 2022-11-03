FROM node:alpine
WORKDIR /usr/src/app
COPY ./package* /usr/src/app/
RUN npm install --save --legacy-peer-deps
RUN npm i
COPY ./ /usr/src/app/
CMD ["npm","run","start"]

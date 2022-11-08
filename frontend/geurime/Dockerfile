FROM node:alpine
WORKDIR /usr/src/app
COPY ./package* /usr/src/app/
RUN npm install --save react-apexcharts apexcharts
COPY ./ /usr/src/app/
CMD ["npm","run","start"]

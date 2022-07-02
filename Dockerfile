FROM node:14

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3003

RUN apt-get update && \
    apt-get install curl -y

RUN curl https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -o wait-for-it.sh

RUN chmod +x ./wait-for-it.sh

RUN npm install -g pm2

CMD ./wait-for-it.sh mongo:28003 -- pm2-runtime start npm -- start
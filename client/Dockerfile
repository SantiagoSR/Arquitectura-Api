FROM ubuntu:20.04

USER root

WORKDIR /home/app

COPY package.json /home/app

RUN apt-get update

RUN apt-get -y install curl

RUN apt install sudo -y

RUN curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh

RUN bash nodesource_setup.sh

RUN apt-get install nodejs -y

COPY . /home/app

RUN npm install bootstrap react-router-dom

EXPOSE 5000
EXPOSE 3000

CMD ["npm","start"]

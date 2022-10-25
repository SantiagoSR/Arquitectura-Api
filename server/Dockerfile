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

RUN curl https://www.npmjs.com/install.sh | sudo sh

# #ENV DEBIAN_FRONTEND=noninteractive
# ENV DBHOST="127.0.0.1"
# ENV DBNAME="movie_db"
# ENV DBUSER="santiago"
# ENV DBPASSWD="lycantropo"
# #RUN DEBIAN_FRONTEND=noninteractive
# #RUN sudo apt-get install mysql-server -y

RUN npm install
RUN npm install mongodb express cors dotenv

COPY . /home/app

# ENV WAIT_VERSION 2.7.2
# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
# RUN chmod +x /wait

EXPOSE 27017
EXPOSE 3000

CMD ["npm","start"]

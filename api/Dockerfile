FROM node:14

WORKDIR /api
COPY package.json .
RUN npm install
COPY . .
CMD npm start

# Instalação das dependências
#COPY ["package*.json","./"]

# Базовый слой
FROM node:13 
WORKDIR /src

COPY package.json ./
RUN npm config set strict-ssl false
RUN npm install

COPY . ./
RUN npm run build

CMD ["node", "server.js"]
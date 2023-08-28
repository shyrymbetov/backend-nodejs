FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run mirgration:up
RUN npm run seed:up

EXPOSE 3003

CMD ["npm", "run", "dev"]

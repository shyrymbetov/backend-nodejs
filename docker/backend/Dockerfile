FROM node:16

COPY ./package.json .
RUN npm cache clean --force
RUN npm install
COPY . .

RUN npm run build

EXPOSE 3003
# CMD npm start
CMD [ "npm", "run", "production" ]

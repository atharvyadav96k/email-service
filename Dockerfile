FROM node:20-alpine

WORKDIR /app


copy package*.json ./
RUN npm install --production

copy . .

EXPOSE 3000
CMD [ "npm", "start" ]

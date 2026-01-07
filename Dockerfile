FROM node:20-alpine

WORKDIR /app

copy package*.json .

RUN npm install --production

COPY . .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "index.js"]
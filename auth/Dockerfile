FROM node:16-alpine

WORKDIR /app
COPY package.json .

RUN npm install --only=production --force
COPY . .

CMD ["npm", "start"]

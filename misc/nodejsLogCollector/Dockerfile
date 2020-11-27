FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY . .

ENV appRoot="/app"

CMD ["npm", "start"]

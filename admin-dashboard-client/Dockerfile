FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY . .

ENV NODE_ENV="prod"
ENV appRoot="/app"

CMD ["npm", "start"]

FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY . .

ENV appRoot="/app"
# COPY ./logs /var/log/*.log

CMD ["npm", "start"]

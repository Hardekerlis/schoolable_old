FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY . .

# COPY ./logs /var/log/*.log

CMD ["npm", "start"]

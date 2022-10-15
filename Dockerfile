FROM node:current-alpine

WORKDIR /app

COPY . .

RUN npm i && chmod 777 -R .

EXPOSE 3000
EXPOSE 24678

CMD "npm" "run" "dev"
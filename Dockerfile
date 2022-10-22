FROM node

RUN mkdir -p /home/app

COPY ./server /home/app

CMD ["node", "/home/app/server.js"]
FROM node:latest

WORKDIR /home/app

# generated prisma files
COPY /server/prisma ./prisma/

# COPY ENV variable
COPY /server/.env ./

# COPY
COPY /server/. .

RUN npm install
RUN npx prisma migrate dev --name init

# Run and expose the server on port 3002
EXPOSE 3002
CMD ["nodemon", "server.js"]
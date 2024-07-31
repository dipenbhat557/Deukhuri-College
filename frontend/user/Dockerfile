FROM node

WORKDIR /user

COPY package*.json ./

RUN npm install

COPY . /user

CMD ["npm", "run", "dev"]

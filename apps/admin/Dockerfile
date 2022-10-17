FROM node as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build admin

CMD ["node", "dist/apps/admin/main"]
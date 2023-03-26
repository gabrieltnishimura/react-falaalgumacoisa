# build environment
FROM node:16-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
RUN yarn global add pm2
COPY . .
RUN yarn build

# production environment
ENV NODE_ENV=production
EXPOSE 80
CMD ["pm2-runtime", "serve", "build", "--port", "80", "--spa"]